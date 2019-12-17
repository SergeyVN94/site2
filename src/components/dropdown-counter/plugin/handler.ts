const CLASSES = {
    DISPLAY: 'js-dropdown-counter__value',
};

const handler = function dropdownCounterPlugin(
    this: JQuery,
    command: 'value' | 'reset',
    args: number = null,
): void | number {
    switch (command) {
        case 'reset':
            this.find(CLASSES.DISPLAY).text('0');

            break;

        case 'value':
            if (args === null) {
                const text = this.find(CLASSES.DISPLAY).text();

                try {
                    return parseInt(text, 10);
                } catch (error) {
                    console.error(error);
                    return 0;
                }
            }

            this.find(CLASSES.DISPLAY).text(String(args));

            break;

        default:
            throw new Error(`Unknown command '${command}'`);
    }

};

export default handler;
