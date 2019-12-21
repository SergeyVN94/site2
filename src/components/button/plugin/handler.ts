const CLASSES = {
    DISABLE: 'button_disable',
    HIDDEN: 'button_hidden',
};

const handler = function buttonPlugin(
    this: JQuery,
    command: 'disable' | 'hidden',
    args: boolean = null,
): void | boolean {
    switch (command) {
        case 'disable':
            if (args === null) {
                this.toggleClass(CLASSES.DISABLE);
            } else {
                this.toggleClass(CLASSES.DISABLE, args);
            }

            break;

        case 'hidden':
            if (args === null) {
                this.toggleClass(CLASSES.HIDDEN);
            } else {
                this.toggleClass(CLASSES.HIDDEN, args);
            }

            break;

        default:
            throw new Error(`Unknown command '${command}'`);
    }
};

export default handler;
