import {
  HandlerUpdateEvent,
  RangeDays,
  DayLabelGenerator,
  ModelStatePackage,
  DayInfo,
} from './config';

class Model {
  private readonly currentDate: Date;

  private handlerUpdateEvent: HandlerUpdateEvent;

  private rangeDays: RangeDays;

  private static dayLabelGenerators: DayLabelGenerator[] = [];

  constructor() {
    this.handlerUpdateEvent = null;
    this.rangeDays = {
      start: null,
      end: null,
    };
    this.currentDate = new Date();
    this.currentDate.setDate(15); // Фиксит баг.
    this.currentDate.setHours(0, 0, 0, 0);
  }

  public onUpdate(handlerUpdateEvent: HandlerUpdateEvent): void {
    this.handlerUpdateEvent = handlerUpdateEvent;
    this.triggerUpdateEvent();
  }

  public nextMonth(): void {
    const currentMonth = this.currentDate.getMonth();
    this.currentDate.setMonth(currentMonth + 1);
    this.triggerUpdateEvent();
  }

  public previousMonth(): void {
    const currentMonth = this.currentDate.getMonth();
    this.currentDate.setMonth(currentMonth - 1);
    this.triggerUpdateEvent();
  }

  public resetRangeDays(): void {
    this.rangeDays = {
      start: null,
      end: null,
    };
    this.triggerUpdateEvent();
  }

  public addDayInRange(day: number, setRangeStart?: boolean): boolean {
    const targetDate = new Date(this.currentDate);
    targetDate.setDate(day);
    targetDate.setHours(0, 0, 0, 0);
    const targetDateInMilliseconds = targetDate.getTime();

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (targetDateInMilliseconds <= currentDate.getTime()) return false;

    if (setRangeStart !== undefined) return this.updateRangeDays(targetDate, setRangeStart);

    const startIsNull = this.rangeDays.start === null;
    const endIsNull = this.rangeDays.end === null;

    if (!startIsNull && !endIsNull) {
      this.rangeDays = { start: targetDate, end: null };
      this.triggerUpdateEvent();
      return true;
    }

    if (startIsNull && endIsNull) {
      this.rangeDays.start = targetDate;
      this.triggerUpdateEvent();
      return true;
    }

    if (!startIsNull) {
      if (this.rangeDays.start.getTime() < targetDateInMilliseconds) {
        this.rangeDays.end = targetDate;
      } else {
        this.rangeDays.end = this.rangeDays.start;
        this.rangeDays.start = targetDate;
      }

      this.triggerUpdateEvent();
      return true;
    }

    if (!endIsNull) {
      if (this.rangeDays.end.getTime() > targetDateInMilliseconds) {
        this.rangeDays.start = targetDate;
      } else {
        this.rangeDays.start = this.rangeDays.end;
        this.rangeDays.end = targetDate;
      }

      this.triggerUpdateEvent();
      return true;
    }

    return false;
  }

  public static addDayLabelGenerator(generator: DayLabelGenerator): void {
    Model.dayLabelGenerators.push(generator);
  }

  private updateRangeDays(targetDate: Date, setRangeStart = true): boolean {
    const targetDateInMilliseconds = targetDate.getTime();

    const { start, end } = this.rangeDays;
    const rangeStartIsNull = start === null;
    const rangeEndIsNull = end === null;

    const isTargetDateCanBeSetToStart = !rangeEndIsNull && targetDateInMilliseconds < end.getTime();
    const isTargetDateCanBeSetToEnd = !rangeStartIsNull
    && targetDateInMilliseconds > start.getTime();
    const inNeedResetRangeEnd = !isTargetDateCanBeSetToStart && !rangeEndIsNull;

    if (setRangeStart) {
      this.rangeDays.start = targetDate;

      if (inNeedResetRangeEnd) {
        this.rangeDays.end = null;
      }

      this.triggerUpdateEvent();
      return true;
    }

    if (rangeStartIsNull || isTargetDateCanBeSetToEnd) {
      this.rangeDays.end = targetDate;
      this.triggerUpdateEvent();
      return true;
    }

    return false;
  }

  private createModelStatePackage(): ModelStatePackage {
    const days: DayInfo[] = [];

    const previousMonth = new Date(this.currentDate);
    previousMonth.setMonth(this.currentDate.getMonth() - 1);
    const daysInPrevMonth = Model.getDaysInMonth(previousMonth);
    previousMonth.setDate(daysInPrevMonth);

    let dayOfWeek = (previousMonth.getDay() || 7); // Monday - 1, Sunday - 7
    if (dayOfWeek < 7) { // last day of the previous month is not Sunday
      for (
        let dayOfMonth = daysInPrevMonth;
        dayOfWeek > 0;
        dayOfWeek -= 1, dayOfMonth -= 1
      ) {
        const date = new Date(previousMonth);
        date.setDate(dayOfMonth);
        days.unshift({ date, labels: this.getDayLabels(date) });
      }
    }

    const currentMonth = new Date(this.currentDate);
    const daysInMonth = Model.getDaysInMonth(currentMonth);
    for (let i = 1; i <= daysInMonth; i += 1) {
      const date = new Date(currentMonth);
      date.setDate(i);
      days.push({ date, labels: this.getDayLabels(date) });
    }

    const nextMonth = new Date(this.currentDate);
    nextMonth.setMonth(this.currentDate.getMonth() + 1);
    nextMonth.setDate(1);

    let dayOfWeekFirstDay = (nextMonth.getDay() || 7); // Monday - 1, Sunday - 7
    if (dayOfWeekFirstDay > 1) {
      for (let dayOfMonth = 1; dayOfWeekFirstDay <= 7; dayOfWeekFirstDay += 1, dayOfMonth += 1) {
        const date = new Date(nextMonth);
        date.setDate(dayOfMonth);
        days.push({ date, labels: this.getDayLabels(date) });
      }
    }

    return {
      days,
      currentDate: new Date(this.currentDate),
      rangeDays: {
        start: this.rangeDays.start && new Date(this.rangeDays.start),
        end: this.rangeDays.end && new Date(this.rangeDays.end),
      },
    };
  }

  private triggerUpdateEvent(): void {
    this.handlerUpdateEvent && this.handlerUpdateEvent(this.createModelStatePackage());
  }

  private getDayLabels(day: Date): string[] {
    const labels: string[] = [];
    const { start, end } = this.rangeDays;

    Model.dayLabelGenerators.forEach((generator) => {
      const currentDateCopy = new Date(this.currentDate);
      const rangeDaysCopy = {
        start: start ? new Date(start) : null,
        end: end ? new Date(end) : null,
      };

      const labelsOfDay = generator(day, currentDateCopy, rangeDaysCopy);
      if (labelsOfDay) (typeof labelsOfDay === 'string') ? labels.push(labelsOfDay) : labels.push(...labelsOfDay);
    });

    return labels;
  }

  private static getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }
}

Model.addDayLabelGenerator((day, currentDate) => {
  if (
    day.getMonth() !== currentDate.getMonth()
  ) return (day.getMonth() < currentDate.getMonth()) ? 'previous-month' : 'next-month';

  return null;
});

Model.addDayLabelGenerator((day) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (day.getTime() === today.getTime()) ? 'today' : null;
});

Model.addDayLabelGenerator((day, _, { start, end }) => {
  const dayInMilliseconds = day.getTime();
  const labels: string[] = [];

  if (start && dayInMilliseconds === start.getTime()) {
    labels.push('range');
    if (end) labels.push('range-start');
  }

  if (end && dayInMilliseconds === end.getTime()) {
    labels.push('range');
    if (start) labels.push('range-end');
  }

  if (
    start && end
    && dayInMilliseconds > start.getTime()
    && dayInMilliseconds < end.getTime()
  ) labels.push('range-middle');

  return labels;
});

Model.addDayLabelGenerator((day, _, { start }) => {
  const labels: string[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateLessThatToday = day.getTime() <= today.getTime();

  if (dateLessThatToday) labels.push('not-selectable');
  else if (start && (day.getTime() <= start.getTime())) labels.push('not-selectable-as-range-end');

  return labels;
});

export default Model;
export { ModelStatePackage, DayInfo };
