const CLASSES = {
    MOBILE_BTN: 'js-button_action_expand-mobile-menu',
    HEADER: 'js-header',
    EXPANDED_MENU: 'header_extended',
};

const handleBtnMobileClick = function handleBtnMobileClick(ev: JQuery.MouseEventBase): void {
    $(ev.delegateTarget).toggleClass(CLASSES.EXPANDED_MENU);
};

$(`.${CLASSES.HEADER}`).on(
    'click.header.expand-menu',
    `.${CLASSES.MOBILE_BTN}`,
    handleBtnMobileClick
);
