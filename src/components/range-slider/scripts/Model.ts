type modelUpdateCallback = (
  positions: [number, number],
  values: [number, number],
) => void;

class Model {
  private callback: modelUpdateCallback;

  private pointMinStep: number;

  private pointMaxStep: number;

  private readonly rangeMin: number;

  private readonly range: number;

  private readonly stepSize: number;

  private readonly steps: number;

  constructor(config: {
    range: [number, number];
    step: number;
  }) {
    const {
      range,
      step,
    } = config;

    this.stepSize = step;
    const [rangeMin, rangeMax] = range;
    this.rangeMin = rangeMin;
    this.range = rangeMax - rangeMin;
    this.steps = Math.floor(this.range / step);
    this.callback = null;
    this.pointMinStep = 0;
    this.pointMaxStep = this.steps;
  }

  public update(targetPosition: number, type: 'min' | 'max' | null): void {
    if (type === null) {
      this.updatePointSteps(targetPosition);
    } else {
      this.updatePointStep(targetPosition, type);
    }

    this.triggerUpdateEvent();
  }

  public onUpdate(callback: modelUpdateCallback): void {
    this.callback = callback;
    this.triggerUpdateEvent();
  }

  public initModel(start: [number, number]): void {
    const [startMin, startMax] = start;
    this.pointMinStep = this.valueToPointStep(startMin);
    this.pointMaxStep = this.valueToPointStep(startMax);
  }

  public getState(): {
    positions: [number, number];
    values: [number, number];
  } {
    return {
      positions: [
        this.stepToPointPosition(this.pointMinStep),
        this.stepToPointPosition(this.pointMaxStep),
      ],
      values: [
        this.stepToValue(this.pointMinStep),
        this.stepToValue(this.pointMaxStep),
      ],
    };
  }

  private updatePointSteps(targetPosition: number): void {
    const targetStep = this.positionToStep(targetPosition);
    const pointMinPosition = this.stepToPointPosition(this.pointMinStep);
    const pointMaxPosition = this.stepToPointPosition(this.pointMaxStep);

    const distanceToMinPoint = Math.abs(pointMinPosition - targetPosition);
    const distanceToMaxPoint = Math.abs(pointMaxPosition - targetPosition);

    if (distanceToMinPoint < distanceToMaxPoint) {
      if (targetStep <= this.pointMaxStep) this.pointMinStep = targetStep;
    } else if (distanceToMaxPoint < distanceToMinPoint) {
      if (targetStep >= this.pointMinStep) this.pointMaxStep = targetStep;
    } else if (distanceToMaxPoint === distanceToMinPoint) {
      if (targetPosition < pointMinPosition) this.pointMinStep = targetStep;
      else if (targetPosition > pointMaxPosition) this.pointMaxStep = targetStep;
    }
  }

  private updatePointStep(targetPosition: number, type: 'min' | 'max' | null): void {
    const targetStep = this.positionToStep(targetPosition);

    if (type === 'min' && targetStep <= this.pointMaxStep) this.pointMinStep = targetStep;
    if (type === 'max' && targetStep >= this.pointMinStep) this.pointMaxStep = targetStep;
  }

  private triggerUpdateEvent(): void {
    if (this.callback !== null) {
      const { positions, values } = this.getState();
      this.callback(positions, values);
    }
  }

  private valueToPointStep(value: number): number {
    return Math.round(value / this.stepSize);
  }

  private stepToPointPosition(step: number): number {
    return step / this.steps;
  }

  private stepToValue(step: number): number {
    return (step * this.stepSize) + this.rangeMin;
  }

  private positionToStep(position: number): number {
    return Math.round(position * this.steps);
  }
}

export default Model;
