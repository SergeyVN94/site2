import * as $ from 'jquery';

const CLASSES = {
    EXPANDED: 'dropdown_expanded',
    HEAD: 'js-dropdown-head',
    COUNTER: 'js-dropdown-counter',
};

const handler: DropdownPlugin = function pluginHandler(
    this: JQuery,
    command: 'expand' | 'counters',
    args: boolean | CounterValue = null
): void | boolean | CounterValue[] {
    switch (command) {
        case 'expand':
            if (args === null) {
                return this.hasClass(CLASSES.EXPANDED);
            }

            if (typeof args !== 'boolean') {
                throw new TypeError('Expected boolean.');
            }

            this.toggleClass(CLASSES.EXPANDED, args);

            if (args) {
                this.find(`.${CLASSES.HEAD}`).dropdownHead('set-theme', 'expanded');
            } else {
                this.find(`.${CLASSES.HEAD}`).dropdownHead('remove-theme', 'expanded');
            }

            break;

        case 'counters':
            if (args === null) {
                const counterValues: CounterValue[] = [];

                this.find(`.${CLASSES.COUNTER}`).each(function() {
                    const $counter = $(this);
                    counterValues.push({
                        text: $counter.dropdownCounter('text') as string,
                        value: $counter.dropdownCounter('value') as number,
                    });
                });

                return counterValues;
            }

            break;

        default:
            throw new Error(`Unknown command '${command}'`);
    }
};

export default handler;
