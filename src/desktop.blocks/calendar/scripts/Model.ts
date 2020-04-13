type UpdateHandler = () => void;
type RangeDays = {
    start: Date;
    end: Date;
};

class Model {
    private readonly renderDate: Date;
    private readonly updateHandler: UpdateHandler;
    private rangeDays: RangeDays;

    constructor(updateHandler: UpdateHandler) {
        this.updateHandler = updateHandler;
        this.rangeDays = {
            start: null,
            end: null,
        };

        this.renderDate = new Date();
        this.renderDate.setHours(0, 0, 0, 0);
    }

    public nextMonth(): void {
        const currentMonth = this.renderDate.getMonth();
        this.renderDate.setMonth(currentMonth + 1);
        this.updateHandler();
    }

    public previousMonth(): void {
        const currentMonth = this.renderDate.getMonth();
        this.renderDate.setMonth(currentMonth - 1);
        this.updateHandler();
    }

    public getPageDays(): number[] {
        const daysInMonth = this._getDaysInMonth(
            this.renderDate.getMonth(),
            this.renderDate.getFullYear()
        );

        const daysMonth: number[] = [];
        for (let i = 1; i <= daysInMonth; i += 1) {
            daysMonth.push(i);
        }

        const tmpDate = new Date(
            this.renderDate.getFullYear(),
            this.renderDate.getMonth(),
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
        return this.renderDate;
    }

    public getRangeDays(): RangeDays {
        return this.rangeDays;
    }

    public resetRangeDays(): void {
        this.rangeDays = {
            start: null,
            end: null,
        };
        this.updateHandler();
    }

    public updateRangeDays(day: number, setRangeStart = true): boolean {
        const targetDate = new Date(
            this.renderDate.getFullYear(),
            this.renderDate.getMonth(),
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
        } = this.rangeDays;

        const rangeStartIsNull = start === null;
        const rangeEndIsNull = end === null;
        const isTargetDateCanBeSetToStart = !rangeEndIsNull && targetDateTime < end.getTime();
        const isTargetDateCanBeSetToEnd = !rangeStartIsNull && targetDateTime > start.getTime();
        const inNeedResetRangeForStartDay = !isTargetDateCanBeSetToStart &&
            !rangeEndIsNull && !rangeStartIsNull;

        if (setRangeStart) {
            this.rangeDays.start = targetDate;

            if (inNeedResetRangeForStartDay) {
                this.rangeDays.end = null;
            }

            this.updateHandler();
            return true;
        }

        if (rangeStartIsNull || isTargetDateCanBeSetToEnd) {
            this.rangeDays.end = targetDate;
            this.updateHandler();
            return true;
        }

        return false;
    }

    private _getDaysInMonth(month: number, year: number): number {
        return new Date(year, month + 1, 0).getDate();
    }
}

export default Model;
