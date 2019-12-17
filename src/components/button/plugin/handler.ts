const CLASSES = {
    DISABLE: 'button_disable',
};

const handler = function buttonPlugin(
    this: JQuery,
    command: 'disable',
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

        default:
            throw new Error(`Unknown command '${command}'`);
    }
};

export default handler;
