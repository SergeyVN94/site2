import CALENDAR_CLASSES from './classes';
import View from './View';

// eslint-disable-next-line @typescript-eslint/unbound-method
$.fn.calendar = function calendarPlugin(
  this: JQuery,
  command: 'select-date',
  args: 'start' | 'end',
): JQuery {
  switch (command) {
    case 'select-date':
      this.attr('data-select-date', args);
      return this;

    default:
      throw new Error(`Unknown command '${command}'`);
  }
};

$(`.${CALENDAR_CLASSES.CALENDAR}`).each((index, element) => {
  new View($(element)).update();
});
