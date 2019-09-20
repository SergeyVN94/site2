import './calendar-update-month';
import './calendar-select-date-range';
import $ from 'jquery';
import {
    clearRange,
    renderRange,
    getExtremeDatesOfDateRange
} from './calendar-select-date-range';

const calendar = $('.calendar');

calendar.on('calendar-update', function(event, newDate) {
    clearRange();
    renderRange();

    const currentDate = new Date();
    if (
        currentDate.getFullYear() !== newDate.getFullYear() ||
        currentDate.getMonth() !== newDate.getMonth()
    ) {
        return false;
    }

    calendar.find('.calendar__weekday:not(.calendar__weekday_another-month)')
    .each(function() {
        const day = $(this);
        if (Number(day.html()) === currentDate.getDate()) {
            day.addClass('calendar__weekday_current-day');
        }
    });
});

calendar.find('.calendar__button-clear').click(() => {
    clearRange();
    calendar.attr('data-range-day-start', '');
    calendar.attr('data-range-day-end', '');
    calendar.trigger('calendar-set-range');
});

calendar.find('.calendar__button-enter').click(() => {
    const extDateRange = getExtremeDatesOfDateRange();

    if (extDateRange.length === 0) {
        return;
    }

    calendar.trigger('calendar-set-range', [
        extDateRange['start'],
        extDateRange['end']
    ]);
});