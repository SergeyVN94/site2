import COUNTER_CLASSES from '../classes';

$.fn.dropdownCounter = function dropdownCounterPlugin(
    this: JQuery,
    command: 'value' | 'reset' | 'text',
    args: number = null,
): void | number | string {
    switch (command) {
        case 'reset':
            this.find(`.${COUNTER_CLASSES.DISPLAY}`).text('0');
            this.find(`.${COUNTER_CLASSES.BTN_MINUS}`).button('disable', true);

            break;

        case 'value':
            if (args === null) {
                const text = this.find(`.${COUNTER_CLASSES.DISPLAY}`).text();

                try {
                    return parseInt(text, 10);
                } catch (error) {
                    console.error(error);
                    return 0;
                }
            }

            this.find(COUNTER_CLASSES.DISPLAY).text(String(args));

            break;

        case 'text':
            if (args === null) {
                return this.find(`.${COUNTER_CLASSES.LABEL}`).text();
            }

            break;

        default:
            throw new Error(`Unknown command '${command}'`);
    }

}
