const enum DATE_RANGE_CLASSES {
  DATE_RANGE = 'js-date-range',
  DROPDOWN_HEAD = 'js-dropdown-head',
  DROPDOWN_HEAD_LEFT = 'js-dropdown-head_assignment_left',
  DROPDOWN_HEAD_RIGHT = 'js-dropdown-head_assignment_right',
  RANGE_SELECT = 'date-range_range-select',
  CALENDAR = 'js-calendar',
}
const DROPDOWN_HEAD_TEXT_DEFAULT = 'ДД.ММ.ГГГГ';

interface IDateRangeDomElements {
  readonly $dateRange: JQuery;
  readonly $dropdownHeads: JQuery;
  readonly $dropdownHeadLeft: JQuery;
  readonly $dropdownHeadRight: JQuery;
  readonly $calendar: JQuery;
}

class DateRange {
  private readonly domElements: IDateRangeDomElements;

  constructor($dateRange: JQuery) {
    this.domElements = DateRange._createDomElements($dateRange);
    this._initEventListeners();
  }

  private static _createDomElements($dateRange: JQuery): IDateRangeDomElements {
    const $dropdownHeads = $dateRange.find(`.${DATE_RANGE_CLASSES.DROPDOWN_HEAD}`);
    const $dropdownHeadLeft = $dateRange.find(`.${DATE_RANGE_CLASSES.DROPDOWN_HEAD_LEFT}`);
    const $dropdownHeadRight = $dateRange.find(`.${DATE_RANGE_CLASSES.DROPDOWN_HEAD_RIGHT}`);
    const $calendar = $dateRange.find(`.${DATE_RANGE_CLASSES.CALENDAR}`);

    return {
      $dateRange,
      $dropdownHeads,
      $dropdownHeadLeft,
      $dropdownHeadRight,
      $calendar,
    };
  }

  private _initEventListeners(): void {
    this.domElements.$dropdownHeads.on(
      'click.dateRange.setDateRange',
      this._handleDropdownHeadClick.bind(this),
    );

    this.domElements.$calendar.on(
      'clear.dateRange.clear',
      this._handleCalendarClear.bind(this),
    );
    this.domElements.$calendar.on(
      'apply.dateRange.updateDateRange',
      this._handleCalendarApply.bind(this),
    );
  }

  private static _dateToString(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  private _deselectDateRange(): void {
    this.domElements.$dropdownHeads.dropdownHead('remove-theme', 'select-date');
    this.domElements.$dateRange.removeClass(DATE_RANGE_CLASSES.RANGE_SELECT);
  }

  private _handleDropdownHeadClick(ev: JQuery.MouseEventBase): boolean {
    const $dropdownHead = $(ev.currentTarget);

    if ($dropdownHead.dropdownHead('has-theme', 'select-date')) {
      this._deselectDateRange();
      return true;
    }

    $dropdownHead.dropdownHead('set-theme', 'select-date');
    this.domElements.$dateRange.addClass(DATE_RANGE_CLASSES.RANGE_SELECT);

    if ($dropdownHead.hasClass(DATE_RANGE_CLASSES.DROPDOWN_HEAD_LEFT)) {
      this.domElements.$dropdownHeadRight.dropdownHead('remove-theme', 'select-date');
      this.domElements.$calendar.calendar('select-date', 'start');
      return true;
    }

    this.domElements.$dropdownHeadLeft.dropdownHead('remove-theme', 'select-date');
    this.domElements.$calendar.calendar('select-date', 'end');

    return true;
  }

  private _handleCalendarClear(): void {
    this.domElements.$dropdownHeads.dropdownHead('text', DROPDOWN_HEAD_TEXT_DEFAULT);
    this._deselectDateRange();
  }

  private _handleCalendarApply(ev: JQuery.EventBase, start: Date, end: Date): void {
    const {
      $dropdownHeadLeft,
      $dropdownHeadRight,
    } = this.domElements;

    $dropdownHeadLeft.dropdownHead(
      'text',
      start === null ? DROPDOWN_HEAD_TEXT_DEFAULT : DateRange._dateToString(start),
    );

    $dropdownHeadRight.dropdownHead(
      'text',
      end === null ? DROPDOWN_HEAD_TEXT_DEFAULT : DateRange._dateToString(end),
    );

    this._deselectDateRange();
  }
}

$(`.${DATE_RANGE_CLASSES.DATE_RANGE}`).each((index, element) => {
  new DateRange($(element));
});
