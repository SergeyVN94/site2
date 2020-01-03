const CLASSES = {
    TEXT_ELEMENT: 'js-dropdown-head__text',
};

const handler = function pluginHandler(
    this: JQuery,
    command: 'set-theme' | 'remove-theme' | 'value' | 'select-date',
    args: 'expanded' | string | boolean = null
): void | string | boolean | JQuery {
    switch (command) {
        case 'set-theme':
            this.addClass(`dropdown-head_theme_${args}`);
            return this;

        case 'remove-theme':
            this.removeClass(`dropdown-head_theme_${args}`);
            return this;

        case 'value':
            if (args === null) {
                return this.find(`.${CLASSES.TEXT_ELEMENT}`).text();
            }

            this.find(`.${CLASSES.TEXT_ELEMENT}`).text(args);
            return this;

        case 'select-date':
            if (args === null) {
                return this.hasClass('dropdown-head_theme_select-date');
            }

            this.toggleClass('dropdown-head_theme_select-date', args as boolean);
            return this;

        default:
            throw new Error(`Unknown command '${command}'`);
    }
};

export default handler;
