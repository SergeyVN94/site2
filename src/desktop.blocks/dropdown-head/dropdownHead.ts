const DROPDOWN_HEAD_CLASSES = {
    MAIN_TEXT: 'js-text_assignment_main',
};

// eslint-disable-next-line @typescript-eslint/unbound-method
$.fn.dropdownHead = function pluginHandler(
    this: JQuery,
    command: 'set-theme' | 'remove-theme' | 'has-theme' | 'text',
    args: string = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
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
                return this.find(`.${DROPDOWN_HEAD_CLASSES.MAIN_TEXT}`).text();
            }

            this.find(`.${DROPDOWN_HEAD_CLASSES.MAIN_TEXT}`).text(args);
            return this;

        default:
            throw new Error(`Unknown command '${command}'`);
    }
};
