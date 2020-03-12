const DROPDOWN_CLASSES = {
    DROPDOWN: 'js-dropdown',
    DROPDOWN_HEAD: 'js-dropdown-head',
    DROPDOWN_EXPANDED: 'dropdown_expanded',
};

$.fn.dropdown = function dropdownPlugin(
    command: 'expanded',
    args: boolean = null
): boolean | JQuery {
    switch (command) {
        case 'expanded':
            if (args === null) {
                return this.hasClass(DROPDOWN_CLASSES.DROPDOWN_EXPANDED);
            }

            if (typeof args !== 'boolean') {
                throw (new TypeError('Expected boolean.'));
            }

            this.toggleClass(DROPDOWN_CLASSES.DROPDOWN_EXPANDED, args);
            this
                .find(`.${DROPDOWN_CLASSES.DROPDOWN_HEAD}`)
                .dropdownHead((args ? 'set-theme' : 'remove-theme'), 'expanded');

            return this;

        default:
            throw (new TypeError(`Invalid '${command}' command.`));
    }
};

const handleDropdownClick = function handleDropdownClick(ev: JQuery.MouseEventBase): void {
    const $dropdown = $(ev.delegateTarget);
    const isExpanded = $dropdown.dropdown('expanded');
    $dropdown.dropdown('expanded', !isExpanded);
};

$(`.${DROPDOWN_CLASSES.DROPDOWN}`).on(
    'click.dropdown.expanded',
    `.${DROPDOWN_CLASSES.DROPDOWN_HEAD}`,
    handleDropdownClick
);
