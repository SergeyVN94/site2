const enum FILTER_DATE_CLASSES {
  DROPDOWN = 'js-filter-date-dropdown',
  DROPDOWN_HEAD = 'js-filter-date-dropdown__head',
  DROPDOWN_EXPANDED = 'filter-date-dropdown_expanded',
  DROPDOWN_HEAD_TEXT = 'js-filter-date-dropdown__text',
  CALENDAR = 'js-calendar',
}

interface IDomElements {
  readonly $dropdown: JQuery;
  $document: JQuery<Document>;
  $calendar: JQuery;
  $headText: JQuery;
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
      $headText: $dropdown.find(`.${FILTER_DATE_CLASSES.DROPDOWN_HEAD_TEXT}`),
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
      .on('clear.filterDate.setDate', this._handleCalendarClear.bind(this));
  }

  private _handleCalendarClear(): void {
    this.domElements.$headText.text('Выберите дату');
  }

  private _handleCalendarApply(ev: JQuery.Event, start: Date, end: Date): void {
    const headChunks: string[] = [];

    if (start) headChunks.push(`${start.getDate()} ${monthNames[start.getMonth()].toLowerCase().slice(0, 3)}`);
    if (end) headChunks.push(`${end.getDate()} ${monthNames[end.getMonth()].toLowerCase().slice(0, 3)}`);

    const { $dropdown, $headText } = this.domElements;
    if (start || end) $headText.text(headChunks.join(' - '));
    $dropdown.removeClass(FILTER_DATE_CLASSES.DROPDOWN_EXPANDED);
  }

  private _handleDocumentClick(ev: { originalEvent: { path: Element[] } }): void {
    const { path } = ev.originalEvent;

    // $(ev.target).parents не работает!
    const onDropdown = path.some((element) => {
      // Object.prototype.hasOwnProperty не работает! ни через call, ни через apply.
      if (element.classList) {
        return element.classList.contains(FILTER_DATE_CLASSES.DROPDOWN_EXPANDED);
      }

      return false;
    });

    if (!onDropdown) {
      const { $dropdown, $document } = this.domElements;
      $dropdown.removeClass(FILTER_DATE_CLASSES.DROPDOWN_EXPANDED);
      $document.off('click.filterDateDropdown.unexpanded');
    }
  }

  private _handleHeadClick(): void {
    const { $dropdown, $document } = this.domElements;

    $dropdown.toggleClass(FILTER_DATE_CLASSES.DROPDOWN_EXPANDED);

    if ($dropdown.hasClass(FILTER_DATE_CLASSES.DROPDOWN_EXPANDED)) {
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
