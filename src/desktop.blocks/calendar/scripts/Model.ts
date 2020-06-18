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
    const daysInMonth = Model._getDaysInMonth(
      this.renderDate.getMonth(),
      this.renderDate.getFullYear(),
    );

    const daysMonth: number[] = [];
    for (let i = 1; i <= daysInMonth; i += 1) {
      daysMonth.push(i);
    }

    const tmpDate = new Date(
      this.renderDate.getFullYear(),
      this.renderDate.getMonth(),
      1,
    );
    const daysInPrevMonth = Model._getDaysInMonth(
      tmpDate.getMonth() - 1,
      tmpDate.getFullYear(),
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
      day,
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
    const inNeedResetRangeEnd = !isTargetDateCanBeSetToStart && !rangeEndIsNull;

    if (setRangeStart) {
      this.rangeDays.start = targetDate;

      if (inNeedResetRangeEnd) {
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

  public addedDayInRange(day: number): boolean {
    const targetDate = new Date(
      this.renderDate.getFullYear(),
      this.renderDate.getMonth(),
      day,
    );
    targetDate.setHours(0, 0, 0, 0); // Что бы сравнивать даты без учета времени.
    const targetDateTime = targetDate.getTime();

    const startIsNull = this.rangeDays.start === null;
    const endIsNull = this.rangeDays.end === null;

    if (!startIsNull && !endIsNull) {
      this.resetRangeDays();
      this.rangeDays.start = targetDate;
      this.updateHandler();
      return true;
    }

    if (startIsNull && endIsNull) {
      this.rangeDays.start = targetDate;
      this.updateHandler();
      return true;
    }

    if (!startIsNull) {
      if (this.rangeDays.start.getTime() < targetDateTime) {
        this.rangeDays.end = targetDate;
      } else {
        this.rangeDays.end = this.rangeDays.start;
        this.rangeDays.start = targetDate;
      }

      this.updateHandler();
      return true;
    }

    if (!endIsNull) {
      if (this.rangeDays.end.getTime() > targetDateTime) {
        this.rangeDays.start = targetDate;
      } else {
        this.rangeDays.start = this.rangeDays.end;
        this.rangeDays.end = targetDate;
      }

      this.updateHandler();
      return true;
    }

    return false;
  }

  private static _getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }
}

export default Model;
