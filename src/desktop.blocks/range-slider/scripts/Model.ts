type modelUpdateCallback = (
  positions: [number, number],
  values: string,
) => void;

interface IModelInterface {
  update: (targetPosition: number, type: 'min' | 'max' | null) => void;
  onUpdate: (callback: modelUpdateCallback) => void;
  initModel: (start: [number, number]) => void;
}

class Model implements IModelInterface {
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
      this._updatePointSteps(targetPosition);
    } else {
      this._updatePointStep(targetPosition, type);
    }

    this._toggleUpdateEvent();
  }

  public onUpdate(callback: modelUpdateCallback): void {
    this.callback = callback;
  }

  public initModel(start: [number, number]): void {
    const [startMin, startMax] = start;
    this.pointMinStep = this._valueToPointStep(startMin);
    this.pointMaxStep = this._valueToPointStep(startMax);
    this._toggleUpdateEvent();
  }

  private _updatePointSteps(targetPosition: number): void {
    const targetStep = this._positionToStep(targetPosition);
    const pointMinPosition = this._stepToPointPosition(this.pointMinStep);
    const pointMaxPosition = this._stepToPointPosition(this.pointMaxStep);

    const distanceToMinPoint = Math.abs(pointMinPosition - targetPosition);
    const distanceToMaxPoint = Math.abs(pointMaxPosition - targetPosition);

    if (distanceToMinPoint < distanceToMaxPoint) {
      if (targetStep <= this.pointMaxStep) {
        this.pointMinStep = targetStep;
      }
    } else if (distanceToMaxPoint < distanceToMinPoint) {
      if (targetStep >= this.pointMinStep) {
        this.pointMaxStep = targetStep;
      }
    } else if (distanceToMaxPoint === distanceToMinPoint) {
      if (targetPosition < pointMinPosition) {
        this.pointMinStep = targetStep;
      } else if (targetPosition > pointMaxPosition) {
        this.pointMaxStep = targetStep;
      }
    }
  }

  private _updatePointStep(targetPosition: number, type: 'min' | 'max' | null): void {
    const targetStep = this._positionToStep(targetPosition);

    if (type === 'min') {
      if (targetStep <= this.pointMaxStep) {
        this.pointMinStep = targetStep;
      }
    }

    if (type === 'max') {
      if (targetStep >= this.pointMinStep) {
        this.pointMaxStep = targetStep;
      }
    }
  }

  private _toggleUpdateEvent(): void {
    if (this.callback !== null) {
      const positions = [
        this._stepToPointPosition(this.pointMinStep),
        this._stepToPointPosition(this.pointMaxStep),
      ] as [number, number];
      const values = this._getValuesStr();
      this.callback(positions, values);
    }
  }

  private _getValuesStr(): string {
    const valMin = this._stepToValue(this.pointMinStep);
    const valMax = this._stepToValue(this.pointMaxStep);
    const min = Model._divideNumberByDigits(valMin);
    const max = Model._divideNumberByDigits(valMax);
    return `${min}₽ - ${max}₽`;
  }

  private static _divideNumberByDigits(val: number): string {
    const numStr = String(val);

    if (numStr.length <= 3) {
      return numStr;
    }

    const tmpNumStr = numStr.split('').reverse();
    let indexSlice = 0;
    const result = [];

    while (indexSlice + 3 <= tmpNumStr.length) {
      result.push(
        ...tmpNumStr.slice(indexSlice, indexSlice + 3),
      );
      result.push(' ');

      indexSlice += 3;
    }

    result.push(
      ...tmpNumStr.slice(indexSlice),
    );
    result.push(' ');

    return result.reverse().join('');
  }

  private _valueToPointStep(value: number): number {
    return Math.round(value / this.stepSize);
  }

  private _stepToPointPosition(step: number): number {
    return step / this.steps;
  }

  private _stepToValue(step: number): number {
    return (step * this.stepSize) + this.rangeMin;
  }

  private _positionToStep(position: number): number {
    return Math.round(position * this.steps);
  }
}

export default Model;
export { IModelInterface };
