const BUTTON_CLASSES = {
    DISABLE: 'button_disable',
    HIDDEN: 'button_hidden',
};

// eslint-disable-next-line @typescript-eslint/unbound-method
$.fn.button = function buttonPlugin(
    this: JQuery,
    command: 'disable' | 'hidden',
    args: boolean = null,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): boolean | JQuery | any {
    switch (command) {
        case 'disable':
            if (args === null) {
                return this.hasClass(BUTTON_CLASSES.DISABLE);
            }

            this.toggleClass(BUTTON_CLASSES.DISABLE, args);
            return this;

        case 'hidden':
            if (args === null) {
                return this.hasClass(BUTTON_CLASSES.HIDDEN);
            }

            this.toggleClass(BUTTON_CLASSES.HIDDEN, args);
            return this;

        default:
            throw new Error(`Unknown command '${command}'`);
    }
};
