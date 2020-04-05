const CHECKBOX_LIST_CLASSES = {
    CHECKBOX_LIST: 'js-expandable-checkbox-list',
    HEAD: 'js-expandable-checkbox-list__head',
    EXPANDED: 'expandable-checkbox-list_expanded',
};

const handleExpandIconClick = function handleExpandIconClick(ev: JQuery.MouseEventBase): void {
    const checkboxList = $(ev.delegateTarget);
    checkboxList.toggleClass(CHECKBOX_LIST_CLASSES.EXPANDED);
};

$(`.${CHECKBOX_LIST_CLASSES.CHECKBOX_LIST}`).on(
    'click.expandable-checkbox-list.expand',
    `.${CHECKBOX_LIST_CLASSES.HEAD}`,
    handleExpandIconClick
);
