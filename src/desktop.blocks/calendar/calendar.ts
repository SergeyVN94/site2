import * as $ from 'jquery';

import './__btn-change-month/calendar__btn-change-month';
import CLASSES from './classes';
import {
    updateCalendar,
    getRenderedDate,
} from './view/view';

$(`.${CLASSES.CALENDAR}`).each(function(): void {
    const $calendar = $(this);
    const renderDate = getRenderedDate($calendar);
    updateCalendar($calendar, renderDate);
});
