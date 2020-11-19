const enum DROPDOWN_SELECTORS {
  DROPDOWN = 'js-dropdown',
  DROPDOWN_HEAD = 'js-dropdown__input-wrapper',
  DROPDOWN_IS_OPENED = 'dropdown_opened',
  DROPDOWN_BODY = 'js-dropdown__body',
  BTN_PLUS = '[data-action="plus"]',
  BTN_MINUS = '[data-action="minus"]',
  BTN_APPLY = '[data-action="apply"]',
  BTN_CLEAR = '[data-action="clear"]',
  BTN_CLEAR_HIDDEN = 'dropdown__button-clear_hidden',
  COUNTER_OUT = 'js-dropdown__counter-out',
  INPUT = 'js-dropdown__input',
}

interface IDomElements {
  readonly $dropdown: JQuery;
  readonly $dropdownHead: JQuery;
  readonly $dropdownBody: JQuery;
  readonly $countersOut: JQuery;
  readonly $input: JQuery;
  readonly $btnClear: JQuery;
  readonly $document: JQuery<Document>;
}

export default DROPDOWN_SELECTORS;
export { IDomElements };
