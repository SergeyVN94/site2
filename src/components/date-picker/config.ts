enum DATE_PICKER_SELECTORS {
  DATE_PICKER = 'js-date-picker',
  DATE_PICKER_OPENED = 'date-picker_opened',
  DROPDOWN = 'js-date-picker__dropdown',
  DROPDOWN_INPUT = 'js-date-picker__input',
  DROPDOWN_SELECTED = 'date-picker__dropdown_selected',
  CALENDAR = 'js-calendar',
}

interface IDomElements {
  readonly $datePicker: JQuery;
  readonly $dropdown: JQuery;
  readonly $calendar: JQuery;
  readonly $document: JQuery<Document>;
}

export default DATE_PICKER_SELECTORS;
export { IDomElements };
