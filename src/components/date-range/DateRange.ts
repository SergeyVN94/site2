const enum DATE_RANGE_CLASSES {
  DATE_RANGE = 'js-date-range',
  DROPDOWN = 'js-date-range__dropdown',
  DROPDOWN_INPUT = 'js-date-range__input',
  DROPDOWN_INPUT_SELECTED = 'date-range__input_selected',
  DROPDOWN_OPENED = 'date-range_opened',
  CALENDAR = 'js-calendar',
}

interface IDateRangeDomElements {
  readonly $dateRange: JQuery;
  readonly $dropdownStartInput: JQuery;
  readonly $dropdownEndInput: JQuery;
  readonly $dropdownStart: JQuery;
  readonly $dropdownEnd: JQuery;
  readonly $calendar: JQuery;
  readonly $document: JQuery<Document>;
}

class DateRange {
  private readonly domElements: IDateRangeDomElements;


  constructor($dateRange: JQuery) {
    this.domElements = DateRange._createDomElements($dateRange);
    this._initEventListeners();
  }

  private static _createDomElements($dateRange: JQuery): IDateRangeDomElements {
    return {
      $dateRange,
      $dropdownStartInput: $dateRange.find(`.${DATE_RANGE_CLASSES.DROPDOWN}[data-type='start'] input`),
      $dropdownEndInput: $dateRange.find(`.${DATE_RANGE_CLASSES.DROPDOWN}[data-type='end'] input`),
      $dropdownStart: $dateRange.find(`.${DATE_RANGE_CLASSES.DROPDOWN}[data-type='start']`),
      $dropdownEnd: $dateRange.find(`.${DATE_RANGE_CLASSES.DROPDOWN}[data-type='end']`),
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
    $dropdownEnd.on('click.dateRange.selectEnd', this._handleDropdownEndClick.bind(this));

    $calendar
      .on('clear.dateRange.clear', this._handleCalendarClear.bind(this))
      .on('apply.dateRange.updateDateRange', this._handleCalendarApply.bind(this));
  }

  private _handleDropdownStartClick(): void {
    const {
      $dropdownStartInput,
      $dropdownEndInput,
      $dateRange,
      $calendar,
    } = this.domElements;

    if ($dropdownStartInput.hasClass(DATE_RANGE_CLASSES.DROPDOWN_INPUT_SELECTED)) {
      this._deselectDateRange();
    } else {
      this._initFocusout();
      $dropdownStartInput.addClass(DATE_RANGE_CLASSES.DROPDOWN_INPUT_SELECTED);
      $dropdownEndInput.removeClass(DATE_RANGE_CLASSES.DROPDOWN_INPUT_SELECTED);
      $dateRange.addClass(DATE_RANGE_CLASSES.DROPDOWN_OPENED);
      $calendar.calendar('select-date', 'start');
    }
  }

  private _handleDropdownEndClick(): void {
    const {
      $dropdownStartInput,
      $dropdownEndInput,
      $dateRange,
      $calendar,
    } = this.domElements;

    if ($dropdownEndInput.hasClass(DATE_RANGE_CLASSES.DROPDOWN_INPUT_SELECTED)) {
      this._deselectDateRange();
    } else {
      this._initFocusout();
      $dropdownEndInput.addClass(DATE_RANGE_CLASSES.DROPDOWN_INPUT_SELECTED);
      $dropdownStartInput.removeClass(DATE_RANGE_CLASSES.DROPDOWN_INPUT_SELECTED);
      $dateRange.addClass(DATE_RANGE_CLASSES.DROPDOWN_OPENED);
      $calendar.calendar('select-date', 'end');
    }
  }

  private _handleDocumentClick(ev: JQuery.MouseEventBase): void {
    const path = ev.originalEvent.composedPath() as Element[];

    // $(ev.target).parents не работает!
    const dateRangeInPath = path.some((element) => (
      (element.classList) && element.classList.contains(DATE_RANGE_CLASSES.DATE_RANGE)
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
    const { $dropdownStartInput, $dropdownEndInput } = this.domElements;

    $dropdownStartInput.val('');
    $dropdownEndInput.val('');
    this._deselectDateRange();
  }

  private _handleCalendarApply(ev: JQuery.EventBase, start: Date, end: Date): void {
    this.updateDropdowns(start, end);
  }

  private updateDropdowns(start: Date, end: Date): void {
    const { $dropdownStartInput, $dropdownEndInput } = this.domElements;

    $dropdownStartInput.val(start ? DateRange._dateToString(start) : '');
    $dropdownEndInput.val(end ? DateRange._dateToString(end) : '');

    this._deselectDateRange();
  }

  private static _dateToString(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  private _deselectDateRange(): void {
    const { $dropdownStartInput, $dropdownEndInput, $dateRange } = this.domElements;

    $dropdownStartInput.removeClass(DATE_RANGE_CLASSES.DROPDOWN_INPUT_SELECTED);
    $dropdownEndInput.removeClass(DATE_RANGE_CLASSES.DROPDOWN_INPUT_SELECTED);
    $dateRange.removeClass(DATE_RANGE_CLASSES.DROPDOWN_OPENED);
  }
}

$(`.${DATE_RANGE_CLASSES.DATE_RANGE}`).each((_, element) => {
  new DateRange($(element));
});
