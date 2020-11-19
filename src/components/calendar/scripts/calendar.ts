import CALENDAR_CLASSES from './config';
import Model from './Model';
import View from './View';

// eslint-disable-next-line @typescript-eslint/unbound-method
$.fn.calendar = function calendarPlugin(
  command: 'select-date' | 'get-range',
  args?: 'start' | 'end' | 'auto',
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  const view = this.data('view') as View;

  switch (command) {
    case 'select-date':
      if (args === 'start') view.setSelectMode('range-start');
      else if (args === 'end') view.setSelectMode('range-end');
      else view.setSelectMode('auto');
      return this;

    case 'get-range':
      return view.getRange();

    default:
      console.error(new Error(`Unknown command '${command}'`));
  }

  return this;
};

$(`.${CALENDAR_CLASSES.CALENDAR}`).each((_, element) => {
  const $calendar = $(element);
  const model = new Model();
  const view = new View($calendar, model);

  $calendar.data('view', view);
});
