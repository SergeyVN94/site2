const DROPDOWN_HEAD_CLASSES = {
    TEXT_ELEMENT: 'js-dropdown-head__text',
};

$.fn.dropdownHead = function pluginHandler(
    this: JQuery,
    command: 'set-theme' | 'remove-theme' | 'has-theme' | 'text',
    args: string = null
): string | boolean | JQuery {
    switch (command) {
        case 'set-theme':
            this.addClass(`dropdown-head_theme_${args}`);
            return this;

        case 'remove-theme':
            this.removeClass(`dropdown-head_theme_${args}`);
            return this;

        case 'has-theme':
            return this.hasClass(`dropdown-head_theme_${args}`);

        case 'text':
            if (args === null) {
                return this.find(`.${DROPDOWN_HEAD_CLASSES.TEXT_ELEMENT}`).text();
            }

            this.find(`.${DROPDOWN_HEAD_CLASSES.TEXT_ELEMENT}`).text(args);
            return this;

        default:
            throw new Error(`Unknown command '${command}'`);
    }
};