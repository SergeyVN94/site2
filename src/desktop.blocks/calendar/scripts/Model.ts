type UpdateHandler = () => void;
type RangeDays = {
    start: Date;
    end: Date;
};

class Model {
    private readonly _renderDate: Date;
    private readonly _updateHandler: UpdateHandler;
    private _rangeDays: RangeDays;

    constructor(updateHandler: UpdateHandler) {
        this._updateHandler = updateHandler;
        this._rangeDays = {
            start: null,
            end: null,
        };

        this._renderDate = new Date();
        this._renderDate.setHours(0, 0, 0, 0);
    }

    public nextMonth(): void {
        const currentMonth = this._renderDate.getMonth();
        this._renderDate.setMonth(currentMonth + 1);
        this._updateHandler();
    }

    public previousMonth(): void {
        const currentMonth = this._renderDate.getMonth();
        this._renderDate.setMonth(currentMonth - 1);
        this._updateHandler();
    }

    public getPageDays(): number[] {
        const daysInMonth = this._getDaysInMonth(
            this._renderDate.getMonth(),
            this._renderDate.getFullYear()
        );

        const daysMonth: number[] = [];
        for (let i = 1; i <= daysInMonth; i += 1) {
            daysMonth.push(i);
        }

        const tmpDate = new Date(
            this._renderDate.getFullYear(),
            this._renderDate.getMonth(),
            1
        );
        const daysInPrevMonth = this._getDaysInMonth(
            tmpDate.getMonth() - 1,
            tmpDate.getFullYear()
        );
        const dayOfWeekFirstDay = (tmpDate.getDay() || 7) - 1; // Monday - 0, Sunday - 6

        const daysPrevMonth: number[] = [];
        for (let i = dayOfWeekFirstDay - 1, j = daysInPrevMonth; i >= 0; i -= 1, j -= 1) {
            daysPrevMonth.push(j);
        }

        tmpDate.setDate(daysInMonth);
        const dayOfWeekLastDay = (tmpDate.getDay() || 7) - 1;

        const daysNextMonth: number[] = [];
        for (let i = dayOfWeekLastDay + 1, j = 1; i <= 6; i += 1, j += 1) {
            daysNextMonth.push(j);
        }

        return daysPrevMonth
            .reverse()
            .concat(daysMonth)
            .concat(daysNextMonth);
    }

    public getRenderDate(): Date {
        return this._renderDate;
    }

    public getRangeDays(): RangeDays {
        return this._rangeDays;
    }

    public resetRangeDays(): void {
        this._rangeDays = {
            start: null,
            end: null,
        };
        this._updateHandler();
    }

    public updateRangeDays(day: number, setRangeStart = true): boolean {
        const targetDate = new Date(
            this._renderDate.getFullYear(),
            this._renderDate.getMonth(),
            day
        );
        targetDate.setHours(0, 0, 0, 0); // Что бы сравнивать даты без учета времени.
        const targetDateTime = targetDate.getTime();

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (targetDateTime <= currentDate.getTime()) {
            return false;
        }

        const {
            start = null,
            end = null,
        } = this._rangeDays;

        const rangeStartIsNull = start === null;
        const rangeEndIsNull = end === null;
        const isTargetDateCanBeSetToEnd = rangeEndIsNull || targetDateTime < end.getTime();
        const isTargetDateCanBeSetToStart = rangeStartIsNull || targetDateTime > start.getTime();

        if (setRangeStart) {
            if (isTargetDateCanBeSetToEnd) {
                this._rangeDays.start = targetDate;
                this._updateHandler();
                return true;
            }

            return false;
        }

        if (isTargetDateCanBeSetToStart) {
            this._rangeDays.end = targetDate;
            this._updateHandler();
            return true;
        }

        return false;
    }

    private _getDaysInMonth(month: number, year: number): number {
        return new Date(year, month + 1, 0).getDate();
    }
}

export default Model;
