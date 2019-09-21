import $ from 'jquery';
import {
    updateRangeAttr,
    clearRange,
    renderRange
} from './calendar-select-date-range';
import {
    updateCalendar,
    renderCurrentDate
} from './calendar-update-month';

$('.calendar').click(function (event) {
    const calendar = $(this);
    const target = $(event.target);
    const renderOpt = JSON.parse(calendar.attr('data-render-date'));
    const renderDate = new Date(renderOpt.year, renderOpt.month);

    if (target.hasClass('calendar__head-btn-arrow')) {
        let month = renderDate.getMonth();
        target.html() === 'arrow_back' ? month-- : month++;
        const newDate = new Date(
            renderDate.getFullYear(), month);
        calendar.attr('data-render-date', JSON.stringify({
            year: newDate.getFullYear(),
            month: newDate.getMonth()
        }));
        updateCalendar(calendar, newDate);
        renderCurrentDate(calendar);
        renderRange(calendar);
        return true;
    }

    if (
        target.hasClass('calendar__weekday') &&
        !target.hasClass('calendar__weekday_another-month')
    ) {
        updateRangeAttr(calendar, target);
        clearRange(calendar);
        renderRange(calendar);
        return true;
    }

    if (target.hasClass('calendar__button-clear')) {
        clearRange(calendar, true);
        return true;
    }
});