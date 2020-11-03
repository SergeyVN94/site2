import Model, { ModelStatePackage, DayInfo } from './Model';
import CLASSES from './classes';

type SelectMode = 'range-start' | 'range-end' | 'auto';

const MONTH_NAMES = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

interface ICalendarDomElements {
  readonly $calendar: JQuery;
  readonly $btnNextMonth: JQuery;
  readonly $btnPrevMonth: JQuery;
  readonly $drawnDate: JQuery;
  readonly $daysContainer: JQuery;
  readonly $btnApply: JQuery;
  readonly $btnClear: JQuery;
}

class View {
  private readonly domElements: ICalendarDomElements;

  private readonly model: Model;

  private cacheModelState: ModelStatePackage;

  private selectMode: SelectMode;

  constructor($calendar: JQuery, model: Model) {
    this.domElements = View.createDomElements($calendar);
    this.model = model;
    this.selectMode = 'auto';
    this.model.onUpdate(this.update.bind(this));
    this.initListeners();
  }

  public getRange(): { start: Date; end: Date } {
    return this.cacheModelState.rangeDays;
  }

  public setSelectMode(mode: SelectMode): void {
    if (['range-start', 'range-end', 'auto'].includes(mode)) this.selectMode = mode;
    else console.error(new Error(`Invalid select mode: '${mode}'`));

    this.update(this.cacheModelState);
  }

  private update(packet: ModelStatePackage): void {
    this.cacheModelState = packet;
    const {
      days,
      rangeDays: { start, end },
      currentDate,
    } = packet;

    this.renderHead(currentDate);
    this.renderBody(days);

    this.domElements.$btnClear.button('hidden', (start === null && end === null));
  }

  private renderHead(date: Date): void {
    const currentDate = new Date();
    const isCannotSwitchToPreviousMonth = date.getMonth() === currentDate.getMonth()
      && date.getFullYear() === currentDate.getFullYear();

    this.domElements.$btnPrevMonth.button('hidden', isCannotSwitchToPreviousMonth);

    const monthName = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const headText = `${monthName} ${year}`;

    this.domElements.$drawnDate.text(headText);
  }

  private renderBody(days: DayInfo[]): void {
    const body = document.createDocumentFragment();

    days.forEach((dayInfo) => {
      body.append(this.createDay(dayInfo));
    });

    this.domElements.$daysContainer.html(body);
  }

  private createDay(info: DayInfo): Element {
    const day = document.createElement('li');
    const innerWrapper = document.createElement('p');
    const textContainer = document.createElement('span');

    const { labels } = info;

    day.classList.add(CLASSES.DAY_WEEK, `js-${CLASSES.DAY_WEEK}`, ...this.parseLabels(labels));

    textContainer.classList.add(CLASSES.DAY_NUMBER);
    textContainer.innerHTML = info.date.getDate().toString();

    innerWrapper.classList.add(CLASSES.DAY_INNER);
    innerWrapper.append(textContainer);

    day.append(innerWrapper);

    return day;
  }

  private parseLabels(labels: string[]): string[] {
    const classList: string[] = [];

    const isAnotherMonth = labels.includes('next-month') || labels.includes('previous-month');
    if (isAnotherMonth) classList.push(CLASSES.DAY_THEME_ANOTHER_MONTH, `js-${CLASSES.DAY_THEME_ANOTHER_MONTH}`);
    if (labels.includes('today')) classList.push(CLASSES.DAY_THEME_TODAY);
    if (labels.includes('range')) classList.push(CLASSES.DAY_THEME_RANGE_DAY);
    if (labels.includes('range-start')) classList.push(CLASSES.RANGE_DAY_START);
    if (labels.includes('range-end')) classList.push(CLASSES.RANGE_DAY_END);
    if (labels.includes('range-middle')) classList.push(CLASSES.DAY_THEME_RANGE_DAY_MIDDLE);
    if (labels.includes('not-selectable')) classList.push(CLASSES.DAY_THEME_NOT_CLICKABLE);

    const isNotSelectable = this.selectMode === 'range-end'
      && labels.includes('not-selectable-as-range-end');
    if (isNotSelectable) classList.push(CLASSES.DAY_THEME_NOT_CLICKABLE);

    return classList;
  }

  private static createDomElements($calendar: JQuery): ICalendarDomElements {
    const $btnNextMonth = $calendar.find(`.js-${CLASSES.BUTTON_NEXT_MONTH}`);
    const $btnPrevMonth = $calendar.find(`.js-${CLASSES.BUTTON_PREVIOUS_MONTH}`);
    const $drawnDate = $calendar.find(`.js-${CLASSES.DRAWN_DATE}`);
    const $daysContainer = $calendar.find(`.js-${CLASSES.DAYS_CONTAINER}`);
    const $btnApply = $calendar.find(`.js-${CLASSES.BUTTON_APPLY}`);
    const $btnClear = $calendar.find(`.js-${CLASSES.BUTTON_CLEAR}`);

    return {
      $calendar,
      $btnNextMonth,
      $btnPrevMonth,
      $drawnDate,
      $daysContainer,
      $btnApply,
      $btnClear,
    };
  }

  private initListeners(): void {
    this.domElements.$btnNextMonth.on(
      'click.calendar.nextMonth',
      this.handleClickBtnNextMonth.bind(this),
    );
    this.domElements.$btnPrevMonth.on(
      'click.calendar.prevMonth',
      this.handleClickBtnPrevMonth.bind(this),
    );

    this.domElements.$daysContainer.on(
      'click.calendar.clickOnDay',
      `.js-${CLASSES.DAY_WEEK}`,
      this.handleClickDaysContainer.bind(this),
    );

    this.domElements.$btnApply.on(
      'click.calendar.apply',
      this.handleClickBtnApply.bind(this),
    );

    this.domElements.$btnClear.on(
      'click.calendar.clear',
      this.handleClickBtnClear.bind(this),
    );
  }

  private handleClickBtnClear(): void {
    this.model.resetRangeDays();
    this.domElements.$calendar.trigger('clear');
  }

  private handleClickBtnApply(): void {
    const {
      start = null,
      end = null,
    } = this.cacheModelState.rangeDays;

    this.domElements.$calendar.trigger('apply', [start, end]);
  }

  private handleClickBtnNextMonth(): void {
    this.model.nextMonth();
  }

  private handleClickBtnPrevMonth(): void {
    this.model.previousMonth();
  }

  private handleClickDaysContainer(ev: JQuery.MouseEventBase): void {
    const $day = $(ev.currentTarget);
    const dayNumber = parseInt($day.find(`.${CLASSES.DAY_NUMBER}`).text(), 10);

    if ($day.hasClass(CLASSES.DAY_THEME_ANOTHER_MONTH)) {
      (dayNumber > 20) ? this.model.previousMonth() : this.model.nextMonth();
    }

    this.model.addDayInRange(
      dayNumber,
      (this.selectMode === 'auto') ? undefined : (this.selectMode === 'range-start'),
    );
  }
}

export default View;
