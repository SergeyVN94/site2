import Model, { ModelStatePackage, DayInfo } from './Model';
import CLASSES from './classes';

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

  constructor($calendar: JQuery) {
    this.domElements = View.createDomElements($calendar);
    this.model = new Model(this.update.bind(this));
    this.initListeners();
  }

  public update(packet: ModelStatePackage): void {
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

  private renderHead(currentDate: Date): void {
    const monthName = MONTH_NAMES[currentDate.getMonth()];
    const year = currentDate.getFullYear();
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
    const day = document.createElement('div');
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

    if (
      labels.includes('next-month') || labels.includes('previous-month')
    ) classList.push(CLASSES.DAY_THEME_ANOTHER_MONTH, `js-${CLASSES.DAY_THEME_ANOTHER_MONTH}`);
    if (labels.includes('today')) classList.push(CLASSES.DAY_THEME_TODAY);
    if (labels.includes('range')) classList.push(CLASSES.DAY_THEME_RANGE_DAY);
    if (labels.includes('range-start')) classList.push(CLASSES.RANGE_DAY_START);
    if (labels.includes('range-end')) classList.push(CLASSES.RANGE_DAY_END);
    if (labels.includes('range-middle')) classList.push(CLASSES.DAY_THEME_RANGE_DAY_MIDDLE);
    if (labels.includes('not-selectable')) classList.push(CLASSES.DAY_THEME_NOT_CLICKABLE);

    const selectRange = this.domElements.$calendar.attr('data-select-date') || '';
    const isNotSelectable = labels.includes('not-selectable-as-range-end');
    if (selectRange === 'end' && isNotSelectable) classList.push(CLASSES.DAY_THEME_NOT_CLICKABLE);

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

    new MutationObserver(
      this.handleCalendarAttributesUpdate.bind(this),
    ).observe(this.domElements.$calendar.get()[0], {
      attributes: true,
    });
  }

  private handleCalendarAttributesUpdate(): void {
    this.update(this.cacheModelState);
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

    const selectRange = this.domElements.$calendar.attr('data-select-date') || '';
    this.model.addDayInRange(dayNumber, (selectRange === 'auto') ? undefined : (selectRange === 'start'));
  }
}

export default View;
