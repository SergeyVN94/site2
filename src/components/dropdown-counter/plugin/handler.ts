const CLASSES = {
    DISPLAY: 'js-dropdown-counter__value',
    LABEL: 'js-dropdown-counter__label',
    BTN_MINUS: 'js-dropdown-counter__btn-minus',
};

const handler = function dropdownCounterPlugin(
    this: JQuery,
    command: 'value' | 'reset' | 'text',
    args: number = null,
): void | number | string {
    switch (command) {
        case 'reset':
            this.find(`.${CLASSES.DISPLAY}`).text('0');
            this.find(`.${CLASSES.BTN_MINUS}`).button('disable', true);

            break;

        case 'value':
            if (args === null) {
                const text = this.find(`.${CLASSES.DISPLAY}`).text();

                try {
                    return parseInt(text, 10);
                } catch (error) {
                    console.error(error);
                    return 0;
                }
            }

            this.find(CLASSES.DISPLAY).text(String(args));

            break;

        case 'text':
            if (args === null) {
                return this.find(`.${CLASSES.LABEL}`).text();
            }

            break;

        default:
            throw new Error(`Unknown command '${command}'`);
    }

};

export default handler;
