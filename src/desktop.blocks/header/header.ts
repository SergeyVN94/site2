const enum HEADER_CLASSES {
    MOBILE_BTN = 'js-button_action_expand-mobile-menu',
    HEADER = 'js-header',
    EXPANDED_MENU = 'header_extended',
}

const handleBtnMobileClick = function handleBtnMobileClick(ev: JQuery.MouseEventBase): void {
    $(ev.delegateTarget).toggleClass(HEADER_CLASSES.EXPANDED_MENU);
};

$(`.${HEADER_CLASSES.HEADER}`).on(
    'click.header.expand-menu',
    `.${HEADER_CLASSES.MOBILE_BTN}`,
    handleBtnMobileClick
);
