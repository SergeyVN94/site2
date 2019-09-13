import './calendar-update-month';
import './calendar-select-date-range';
import $ from 'jquery';
import {
    clearRange,
    getOutRangeDays
} from './calendar-select-date-range';

const calendar = $('.calendar');

calendar.find('.calendar__button-clear').on('click', () => {
    clearRange(true);
    calendar.trigger('calendar-set-range');
});

calendar.find('.calendar__button-enter').on('click', function () {
    const outRangeDays = getOutRangeDays();

    if (outRangeDays.length === 0) {
        return;
    }

    calendar.trigger('calendar-set-range', [
        outRangeDays['start'],
        outRangeDays['end']
    ]);
});