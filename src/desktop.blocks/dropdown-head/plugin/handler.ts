const CLASSES = {
    TEXT_ELEMENT: 'js-dropdown-head__text',
};

const handler = function pluginHandler(
    this: JQuery,
    command: 'set-theme' | 'remove-theme' | 'value',
    args: 'expanded' | string = null
): void | string {
    switch (command) {
        case 'set-theme':
            this.addClass(`dropdown-head_theme_${args}`);
            break;

        case 'remove-theme':
            this.removeClass(`dropdown-head_theme_${args}`);
            break;

        case 'value':
            if (args === null) {
                return this.find(`.${CLASSES.TEXT_ELEMENT}`).text();
            }

            this.find(`.${CLASSES.TEXT_ELEMENT}`).text(args);

            break;

        default:
            throw new Error(`Unknown command '${command}'`);
    }
};

export default handler;
