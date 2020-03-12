import CALENDAR_CLASSES from './classes';
import View from './view';

$.fn.calendar = function calendarPlugin(
    this: JQuery,
    command: 'select-date',
    args: 'start' | 'end'
): JQuery {
    switch (command) {
        case 'select-date':
            this.attr('data-select-date', args);
            return this;

        default:
            throw new Error(`Unknown command '${command}'`);
    }
};

$(`.${CALENDAR_CLASSES.CALENDAR}`).each(function(): void {
    new View($(this)).update();
});
