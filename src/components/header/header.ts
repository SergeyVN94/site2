const enum HEADER_CLASSES {
  MOBILE_BTN = 'js-button[data-action="expand-mobile-menu"]',
  HEADER = 'js-header',
  EXPANDED_MENU = 'header_extended',
}

const handleBtnMobileClick = function handleBtnMobileClick(ev: JQuery.MouseEventBase): void {
  const $header = $(ev.delegateTarget);
  $header.toggleClass(HEADER_CLASSES.EXPANDED_MENU);
  $(ev.currentTarget).button('text', $header.hasClass(HEADER_CLASSES.EXPANDED_MENU) ? 'close' : 'view_headline');
};

$(`.${HEADER_CLASSES.HEADER}`).on(
  'click.header.expand-menu',
  `.${HEADER_CLASSES.MOBILE_BTN}`,
  handleBtnMobileClick,
);
