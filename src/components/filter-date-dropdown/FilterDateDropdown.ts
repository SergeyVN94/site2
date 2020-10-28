const enum FILTER_DATE_CLASSES {
  DROPDOWN = 'js-filter-date-dropdown',
  DROPDOWN_HEAD = 'js-filter-date-dropdown__input-wrapper',
  DROPDOWN_IS_OPENED = 'filter-date-dropdown_opened',
  INPUT = 'js-filter-date-dropdown__input',
  CALENDAR = 'js-calendar',
}

interface IDomElements {
  readonly $dropdown: JQuery;
  $document: JQuery<Document>;
  $calendar: JQuery;
  $input: JQuery;
}

const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

class FilterDateDropdown {
  private readonly domElements: IDomElements;

  constructor($dropdown: JQuery) {
    this.domElements = FilterDateDropdown._getDomElements($dropdown);
    this.domElements.$calendar.calendar('select-date', 'auto');
    this._initEventListeners();
  }

  private static _getDomElements($dropdown: JQuery): IDomElements {
    return {
      $dropdown,
      $document: $(document),
      $calendar: $dropdown.find(`.${FILTER_DATE_CLASSES.CALENDAR}`),
      $input: $dropdown.find(`.${FILTER_DATE_CLASSES.INPUT}`),
    };
  }

  private _initEventListeners(): void {
    const { $dropdown, $calendar } = this.domElements;

    $dropdown.on(
      'click.filterDateDropdown.expanded',
      `.${FILTER_DATE_CLASSES.DROPDOWN_HEAD}`,
      this._handleHeadClick.bind(this),
    );

    $calendar
      .on('apply.filterDate.setDate', this._handleCalendarApply.bind(this))
      .on('clear.filterDate.clearDate', this._handleCalendarClear.bind(this));
  }

  private _handleCalendarClear(): void {
    this.domElements.$input.val('');
  }

  private _handleCalendarApply(_: JQuery.Event, start: Date, end: Date): void {
    const headChunks: string[] = [];

    if (start) headChunks.push(`${start.getDate()} ${monthNames[start.getMonth()].toLowerCase().slice(0, 3)}`);
    if (end) headChunks.push(`${end.getDate()} ${monthNames[end.getMonth()].toLowerCase().slice(0, 3)}`);

    const { $dropdown, $input } = this.domElements;
    if (start || end) $input.val(headChunks.join(' - '));
    $dropdown.removeClass(FILTER_DATE_CLASSES.DROPDOWN_IS_OPENED);
  }

  private _handleDocumentClick(ev: JQuery.MouseEventBase): void {
    const path = ev.originalEvent.composedPath() as Element[];

    // $(ev.target).parents не работает!
    const onDropdown = path.some((element) => (
      element.classList && element.classList.contains(FILTER_DATE_CLASSES.DROPDOWN_IS_OPENED)
    ));

    if (!onDropdown) {
      const { $dropdown, $document } = this.domElements;
      $dropdown.removeClass(FILTER_DATE_CLASSES.DROPDOWN_IS_OPENED);
      $document.off('click.filterDateDropdown.unexpanded');
    }
  }

  private _handleHeadClick(): void {
    const { $dropdown, $document } = this.domElements;

    $dropdown.toggleClass(FILTER_DATE_CLASSES.DROPDOWN_IS_OPENED);

    if ($dropdown.hasClass(FILTER_DATE_CLASSES.DROPDOWN_IS_OPENED)) {
      $document.on(
        'click.filterDateDropdown.unexpanded',
        this._handleDocumentClick.bind(this),
      );
    }
  }
}

$(`.${FILTER_DATE_CLASSES.DROPDOWN}`).each((index, element) => {
  new FilterDateDropdown($(element));
});
