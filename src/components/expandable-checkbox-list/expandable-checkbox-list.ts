import * as $ from 'jquery';

const CLASSES = {
    CHECKBOX_LIST: 'js-expandable-checkbox-list',
    EXPAND_ICON: 'js-expandable-checkbox-list__icon',
    EXPANDED: 'expandable-checkbox-list_expanded',
};

const checkboxListClickHandler = function checkboxListClickHandler(e: JQuery.MouseEventBase): void {
    const checkboxList = $(e.delegateTarget);
    checkboxList.toggleClass(CLASSES.EXPANDED);
};

$(`.${CLASSES.CHECKBOX_LIST}`).on(
    'click.expandable-checkbox-list.expand',
    `.${CLASSES.EXPAND_ICON}`,
    checkboxListClickHandler
);
