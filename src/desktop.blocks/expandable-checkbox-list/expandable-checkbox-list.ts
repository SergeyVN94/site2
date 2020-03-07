const CHECKBOX_LIST_CLASSES = {
    CHECKBOX_LIST: 'js-expandable-checkbox-list',
    EXPAND_ICON: 'js-expandable-checkbox-list__icon',
    EXPANDED: 'expandable-checkbox-list_expanded',
};

const checkboxListClickHandler = function checkboxListClickHandler(e: JQuery.MouseEventBase): void {
    const checkboxList = $(e.delegateTarget);
    checkboxList.toggleClass(CHECKBOX_LIST_CLASSES.EXPANDED);
};

$(`.${CHECKBOX_LIST_CLASSES.CHECKBOX_LIST}`).on(
    'click.expandable-checkbox-list.expand',
    `.${CHECKBOX_LIST_CLASSES.EXPAND_ICON}`,
    checkboxListClickHandler
);
