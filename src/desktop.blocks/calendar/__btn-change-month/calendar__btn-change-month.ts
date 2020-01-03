import * as $ from 'jquery';

import CLASSES from '../classes';

import {
    getRenderedDate,
    updateCalendar,
    redrawRange,
} from '../view/view';

const handler = function btnChangeMonthHandler(e: JQuery.MouseEventBase): void {
    const $calendar = $(e.delegateTarget);
    const $btnChangeMonth = $(e.target);

    const renderedDate = getRenderedDate($calendar);
    const month = renderedDate.getMonth();

    if ($btnChangeMonth.hasClass(CLASSES.BTN_PREV_MONTH)) {
        renderedDate.setMonth(month - 1);
    }

    if ($btnChangeMonth.hasClass(CLASSES.BTN_NEXT_MONTH)) {
        renderedDate.setMonth(month + 1);
    }

    updateCalendar($calendar, renderedDate);
    redrawRange($calendar);
};

$(`.${CLASSES.CALENDAR}`).on(
    'click.calendar.change-month',
    `.${CLASSES.BTN_PREV_MONTH}, .${CLASSES.BTN_NEXT_MONTH}`,
    handler
);
