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
  readonly $document: JQuery<Document>;
}

class DateRange {
  private readonly domElements: IDateRangeDomElements;

  private defaultText: string;

  constructor($dateRange: JQuery) {
    this.domElements = DateRange._createDomElements($dateRange);
    this.defaultText = this.domElements.$dateRange.data('dropdown-default-text') || '';
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
      $document: $(document),
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
      this._initFocusout();
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
      this._initFocusout();
      $dropdownEnd.addClass(DATE_RANGE_CLASSES.DROPDOWN_SELECTED);
      $dropdownStart.removeClass(DATE_RANGE_CLASSES.DROPDOWN_SELECTED);
      $dateRange.addClass(DATE_RANGE_CLASSES.RANGE_SELECT);
      $calendar.calendar('select-date', 'end');
    }
  }

  private _handleDocumentClick(ev: { originalEvent: { path: Element[] } }): void {
    const { path } = ev.originalEvent;

    // $(ev.target).parents не работает!
    const dateRangeInPath = path.some((element) => (
      ('classList' in element) && element.classList.contains(DATE_RANGE_CLASSES.DATE_RANGE)
    ));

    if (!dateRangeInPath) {
      const { start = null, end = null } = this.domElements.$calendar.calendar('get-range');
      this.updateDropdowns(start, end);
      this.domElements.$document.off('click.document.dateRange.unexpended');
    }
  }

  private _initFocusout(): void {
    this.domElements.$document
      .off('click.document.dateRange.unexpended')
      .on(
        'click.document.dateRange.unexpended',
        this._handleDocumentClick.bind(this),
      );
  }

  private _handleCalendarClear(): void {
    const { $dropdownStartText, $dropdownEndText } = this.domElements;

    $dropdownStartText.text(this.defaultText);
    $dropdownEndText.text(this.defaultText);
    this._deselectDateRange();
  }

  private _handleCalendarApply(ev: JQuery.EventBase, start: Date, end: Date): void {
    this.updateDropdowns(start, end);
  }

  private updateDropdowns(start: Date, end: Date): void {
    const { $dropdownStartText, $dropdownEndText } = this.domElements;

    $dropdownStartText.text(
      start === null ? this.defaultText : DateRange._dateToString(start),
    );
    $dropdownEndText.text(end === null ? this.defaultText : DateRange._dateToString(end));

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

$(`.${DATE_RANGE_CLASSES.DATE_RANGE}`).each((_, element) => {
  new DateRange($(element));
});
