type UpdateHandler = () => void;
type RangeDays = {
    start: Date;
    end: Date;
};

class Model {
    private readonly _renderDate: Date;
    private readonly _updateHandler: UpdateHandler;
    private _rangeDays: RangeDays;

    constructor(renderDate: Date, updateHandler: UpdateHandler) {
        this._renderDate = renderDate;
        this._updateHandler = updateHandler;
        this._rangeDays = {
            start: null,
            end: null,
        };

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
        const newDate = new Date(
            this._renderDate.getFullYear(),
            this._renderDate.getMonth(),
            day
        );
        newDate.setHours(0, 0, 0, 0); // Что бы сравнивать даты без учета времени.

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (newDate.getTime() <= currentDate.getTime()) {
            return false;
        }

        const {
            start = null,
            end = null,
        } = this._rangeDays;

        if (setRangeStart) {
            if (end === null || newDate.getTime() < end.getTime()) {
                this._rangeDays.start = newDate;
                this._updateHandler();
                return true;
            }

            return false;
        }

        if (start === null || newDate.getTime() > start.getTime()) {
            this._rangeDays.end = newDate;
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