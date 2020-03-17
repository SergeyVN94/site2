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
    private _callback: modelUpdateCallback;
    private _pointMinStep: number;
    private _pointMaxStep: number;
    private readonly _rangeMin: number;
    private readonly _range: number;
    private readonly _stepSize: number;
    private readonly _steps: number;

    constructor(config: {
        range: [number, number];
        step: number;
    }) {
        const {
            range,
            step,
        } = config;

        this._stepSize = step;
        const [rangeMin, rangeMax] = range;
        this._rangeMin = rangeMin;
        this._range = rangeMax - rangeMin;
        this._steps = Math.floor(this._range / step);
        this._callback = null;
        this._pointMinStep = 0;
        this._pointMaxStep = this._steps;
    }

    public update(targetPosition: number, type: 'min' | 'max' | null): void {
        if (type === null) {
            this.updatePointSteps(targetPosition);
        } else {
            this.updatePointStep(targetPosition, type);
        }

        this.toggleUpdateEvent();
    }

    public onUpdate(callback: modelUpdateCallback): void {
        this._callback = callback;
    }

    public initModel(start: [number, number]): void {
        const [startMin, startMax] = start;
        this._pointMinStep = this.valueToPointStep(startMin);
        this._pointMaxStep = this.valueToPointStep(startMax);
        this.toggleUpdateEvent();
    }

    private updatePointSteps(targetPosition: number): void {
        const targetStep = this.positionToStep(targetPosition);
        const pointMinPosition = this.stepToPointPosition(this._pointMinStep);
        const pointMaxPosition = this.stepToPointPosition(this._pointMaxStep);

        const distanceToMinPoint = Math.abs(pointMinPosition - targetPosition);
        const distanceToMaxPoint = Math.abs(pointMaxPosition - targetPosition);

        if (distanceToMinPoint < distanceToMaxPoint) {
            if (targetStep <= this._pointMaxStep) {
                this._pointMinStep = targetStep;
            }
        } else if (distanceToMaxPoint < distanceToMinPoint) {
            if (targetStep >= this._pointMinStep) {
                this._pointMaxStep = targetStep;
            }
        } else if (distanceToMaxPoint === distanceToMinPoint) {
            if (targetPosition < pointMinPosition) {
                this._pointMinStep = targetStep;
            } else if (targetPosition > pointMaxPosition) {
                this._pointMaxStep = targetStep;
            }
        }
    }

    private updatePointStep(targetPosition: number, type: 'min' | 'max' | null): void {
        const targetStep = this.positionToStep(targetPosition);

        if (type === 'min') {
            if (targetStep <= this._pointMaxStep) {
                this._pointMinStep = targetStep;
            }
        }

        if (type === 'max') {
            if (targetStep >= this._pointMinStep) {
                this._pointMaxStep = targetStep;
            }
        }
    }

    private toggleUpdateEvent(): void {
        if (this._callback !== null) {
            const positions = [
                this.stepToPointPosition(this._pointMinStep),
                this.stepToPointPosition(this._pointMaxStep),
            ] as [number, number];
            const values = this.getValuesStr();
            this._callback(positions, values);
        }
    }

    private getValuesStr(): string {
        const valMin = this.stepToValue(this._pointMinStep);
        const valMax = this.stepToValue(this._pointMaxStep);
        const min = this.divideNumberByDigits(valMin);
        const max = this.divideNumberByDigits(valMax);
        return `${min}₽ - ${max}₽`;
    }

    private divideNumberByDigits(val: number): string {
        const numStr = String(val);

        if (numStr.length <= 3) {
            return numStr;
        }

        const tmpNumStr = numStr.split('').reverse();
        let indexSlice = 0;
        const result = [];

        while (indexSlice + 3 <= tmpNumStr.length) {
            result.push(
                ...tmpNumStr.slice(indexSlice, indexSlice + 3)
            );
            result.push(' ');

            indexSlice += 3;
        }

        result.push(
            ...tmpNumStr.slice(indexSlice)
        );
        result.push(' ');

        return result.reverse().join('');
    }

    private valueToPointStep(value: number): number {
        return Math.round(value / this._stepSize);
    }

    private stepToPointPosition(step: number): number {
        return step / this._steps;
    }

    private stepToValue(step: number): number {
        return (step * this._stepSize) + this._rangeMin;
    }

    private positionToStep(position: number): number {
        return Math.round(position * this._steps);
    }
}

export default Model;
export { IModelInterface };
