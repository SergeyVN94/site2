import CLASSES from './classes';
import { redrawRange } from './view/view';

const btnClearClickHandler = function btnClearClickHandler(e: JQuery.MouseEventBase): void {
    const $calendar = $(e.delegateTarget);
    $calendar.attr('data-range-start', '');
    $calendar.attr('data-range-end', '');

    redrawRange($calendar);

    $calendar.trigger('clear');
};

$(`.${CLASSES.CALENDAR}`).on(
    'click.calendar.clear',
    `.${CLASSES.BTN_CLEAR}`,
    btnClearClickHandler
);
