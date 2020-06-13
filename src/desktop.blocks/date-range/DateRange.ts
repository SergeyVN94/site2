const enum DATE_RANGE_CLASSES {
  DATE_RANGE = 'js-date-range',
  DROPDOWN = 'js-date-range__dropdown',
  DROPDOWN_TEXT = 'js-date-range__dropdown-text',
  DROPDOWN_SELECTED = 'date-range__dropdown_selected',
  RANGE_SELECT = 'date-range_range-select',
  CALENDAR = 'js-calendar',
}

interface IDateRangeDomElements {
  readonly $dateRange: JQuery;
  readonly $dropdownStart: JQuery;
  readonly $dropdownEnd: JQuery;
  readonly $dropdownStartText: JQuery;
  readonly $dropdownEndText: JQuery;
  readonly $calendar: JQuery;
}

class DateRange {
  private readonly domElements: IDateRangeDomElements;

  private static DEFAULT_TEXT = 'ДД.ММ.ГГГГ';

  constructor($dateRange: JQuery) {
    this.domElements = DateRange._createDomElements($dateRange);
    this._initEventListeners();
  }

  private static _createDomElements($dateRange: JQuery): IDateRangeDomElements {
    return {
      $dateRange,
      $dropdownStart: $dateRange.find(`.${DATE_RANGE_CLASSES.DROPDOWN}[data-type='start']`),
      $dropdownEnd: $dateRange.find(`.${DATE_RANGE_CLASSES.DROPDOWN}[data-type='end']`),
      $dropdownStartText: $dateRange.find(`.${DATE_RANGE_CLASSES.DROPDOWN}[data-type='start'] .${DATE_RANGE_CLASSES.DROPDOWN_TEXT}`),
      $dropdownEndText: $dateRange.find(`.${DATE_RANGE_CLASSES.DROPDOWN}[data-type='end'] .${DATE_RANGE_CLASSES.DROPDOWN_TEXT}`),
      $calendar: $dateRange.find(`.${DATE_RANGE_CLASSES.CALENDAR}`),
    };
  }

  private _initEventListeners(): void {
    const {
      $calendar,
      $dropdownStart,
      $dropdownEnd,
    } = this.domElements;

    $dropdownStart.on('click.dateRange.selectStart', this._handleDropdownStartClick.bind(this));
    $dropdownEnd.on('click.dateRange.selectStart', this._handleDropdownEndClick.bind(this));

    $calendar
      .on('clear.dateRange.clear', this._handleCalendarClear.bind(this))
      .on('apply.dateRange.updateDateRange', this._handleCalendarApply.bind(this));
  }

  private _handleDropdownStartClick(): void {
    const {
      $dropdownStart,
      $dropdownEnd,
      $dateRange,
      $calendar,
    } = this.domElements;

    if ($dropdownStart.hasClass(DATE_RANGE_CLASSES.DROPDOWN_SELECTED)) {
      this._deselectDateRange();
    } else {
      $dropdownStart.addClass(DATE_RANGE_CLASSES.DROPDOWN_SELECTED);
      $dropdownEnd.removeClass(DATE_RANGE_CLASSES.DROPDOWN_SELECTED);
      $dateRange.addClass(DATE_RANGE_CLASSES.RANGE_SELECT);
      $calendar.calendar('select-date', 'start');
    }
  }

  private _handleDropdownEndClick(): void {
    const {
      $dropdownStart,
      $dropdownEnd,
      $dateRange,
      $calendar,
    } = this.domElements;

    if ($dropdownEnd.hasClass(DATE_RANGE_CLASSES.DROPDOWN_SELECTED)) {
      this._deselectDateRange();
    } else {
      $dropdownEnd.addClass(DATE_RANGE_CLASSES.DROPDOWN_SELECTED);
      $dropdownStart.removeClass(DATE_RANGE_CLASSES.DROPDOWN_SELECTED);
      $dateRange.addClass(DATE_RANGE_CLASSES.RANGE_SELECT);
      $calendar.calendar('select-date', 'end');
    }
  }

  private _handleCalendarClear(): void {
    const { $dropdownStartText, $dropdownEndText } = this.domElements;

    $dropdownStartText.text(DateRange.DEFAULT_TEXT);
    $dropdownEndText.text(DateRange.DEFAULT_TEXT);
    this._deselectDateRange();
  }

  private _handleCalendarApply(ev: JQuery.EventBase, start: Date, end: Date): void {
    const { $dropdownStartText, $dropdownEndText } = this.domElements;

    $dropdownStartText.text(
      start === null ? DateRange.DEFAULT_TEXT : DateRange._dateToString(start),
    );
    $dropdownEndText.text(end === null ? DateRange.DEFAULT_TEXT : DateRange._dateToString(end));

    this._deselectDateRange();
  }

  private static _dateToString(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  private _deselectDateRange(): void {
    const { $dropdownStart, $dropdownEnd, $dateRange } = this.domElements;

    $dropdownStart.removeClass(DATE_RANGE_CLASSES.DROPDOWN_SELECTED);
    $dropdownEnd.removeClass(DATE_RANGE_CLASSES.DROPDOWN_SELECTED);
    $dateRange.removeClass(DATE_RANGE_CLASSES.RANGE_SELECT);
  }
}

$(`.${DATE_RANGE_CLASSES.DATE_RANGE}`).each((index, element) => {
  new DateRange($(element));
});
