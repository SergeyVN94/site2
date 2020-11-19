import DATE_PICKER_SELECTORS, { IDomElements } from './config';

class DatePicker {
  private readonly domElements: IDomElements;


  constructor($datePicker: JQuery) {
    this.domElements = DatePicker.createDomElements($datePicker);
    this.initEventListeners();
  }

  private static createDomElements($datePicker: JQuery): IDomElements {
    return {
      $datePicker,
      $document: $(document),
      $calendar: $datePicker.find(`.${DATE_PICKER_SELECTORS.CALENDAR}`),
      $dropdown: $datePicker.find(`.${DATE_PICKER_SELECTORS.DROPDOWN}`),
    };
  }

  private initEventListeners(): void {
    const { $calendar, $dropdown } = this.domElements;

    $dropdown.on('click.datePicker.selectStart', this.handleDropdownClick.bind(this));
    $calendar
      .on('clear.datePicker.clearValues', this.handleCalendarClear.bind(this))
      .on('apply.datePicker.updateValues', this.handleCalendarApply.bind(this));
  }

  private handleDropdownClick(ev: JQuery.MouseEventBase): void {
    const $selectedDropdown = $(ev.currentTarget);

    if ($selectedDropdown.hasClass(DATE_PICKER_SELECTORS.DROPDOWN_SELECTED)) {
      this.close();
    } else {
      const { $dropdown, $datePicker, $calendar } = this.domElements;

      const type = $selectedDropdown.data('type');
      $calendar.calendar(
        'select-date',
        (type === 'start' || type === 'end') ? type : 'auto',
      );

      $dropdown.removeClass(DATE_PICKER_SELECTORS.DROPDOWN_SELECTED);
      $selectedDropdown.addClass(DATE_PICKER_SELECTORS.DROPDOWN_SELECTED);
      $datePicker.addClass(DATE_PICKER_SELECTORS.DATE_PICKER_OPENED);
      this.initFocusout();
    }
  }

  private handleDocumentClick(ev: JQuery.MouseEventBase): void {
    const path = ev.originalEvent.composedPath() as Element[];

    // $(ev.target).parents не работает!
    const dateRangeInPath = path.some((element) => (
      (element.classList) && element.classList.contains(DATE_PICKER_SELECTORS.DATE_PICKER)
    ));

    if (!dateRangeInPath) {
      const { start, end } = this.domElements.$calendar.calendar('get-range');
      this.updateDropdowns(start, end);
      this.close();
    }
  }

  private handleCalendarClear(): void {
    this.updateDropdowns(null, null);
    this.close();
  }

  private handleCalendarApply(_: JQuery.EventBase, start: Date, end: Date): void {
    this.updateDropdowns(start, end);
    this.close();
  }

  private close(): void {
    const { $datePicker, $document, $dropdown } = this.domElements;
    $dropdown.removeClass(DATE_PICKER_SELECTORS.DROPDOWN_SELECTED);
    $datePicker.removeClass(DATE_PICKER_SELECTORS.DATE_PICKER_OPENED);
    $document.off('click.document.dateRange.unexpended');
  }

  private initFocusout(): void {
    this.domElements.$document
      .off('click.document.dateRange.unexpended')
      .on(
        'click.document.dateRange.unexpended',
        this.handleDocumentClick.bind(this),
      );
  }

  private updateDropdowns(start: Date, end: Date): void {
    const startStr = start ? DatePicker.dateToString(start) : '';
    const endStr = end ? DatePicker.dateToString(end) : '';

    const { $dropdown } = this.domElements;

    if ($dropdown.length === 1) {
      const value = (startStr || endStr)
        ? [startStr, endStr].filter((i) => i.length).join(' - ')
        : '';

      $dropdown.find('input').val(value);
    } else if ($dropdown.length === 2) {
      $dropdown.get(0).querySelector('input').value = startStr;
      $dropdown.get(1).querySelector('input').value = endStr;
    } else {
      throw new Error('Компоненты не найдены!');
    }
  }

  private static dateToString(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }
}

$(`.${DATE_PICKER_SELECTORS.DATE_PICKER}`).each((_, element) => {
  new DatePicker($(element));
});
