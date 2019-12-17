const CLASSES = {
    EXPANDED: 'dropdown_expanded',
    HEAD: 'js-dropdown-head',
};

const handler: DropdownPlugin = function pluginHandler(
    this: JQuery,
    command: 'expand',
    state: boolean = null
): void | boolean {
    switch (command) {
        case 'expand':
            if (state === null) {
                return this.hasClass(CLASSES.EXPANDED);
            }

            this.toggleClass(CLASSES.EXPANDED, state);

            if (state) {
                this.find(`.${CLASSES.HEAD}`).dropdownHead('set-theme', 'expanded');
            } else {
                this.find(`.${CLASSES.HEAD}`).dropdownHead('remove-theme', 'expanded');
            }

            break;

        default:
            throw new Error(`Unknown command '${command}'`);
    }
};

export default handler;
