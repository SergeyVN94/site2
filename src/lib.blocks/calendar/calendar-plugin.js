import jQuery from 'jquery';
import {
    addDayInRange,
    clearRange,
    range,
    mode,
    redrawRange
} from './calendar-date-range';
import {
    drawnDate
} from './calendar-update-month';

(function($) {
    function init(_calendar) {
        _calendar.click(function (event) {
            const calendar = $(this);
            const target = $(event.target);
            const drawnDate = calendar.calendar('drawn-date');
        
            if (target.hasClass('calendar__head-btn-arrow')) {
                let month = drawnDate.getMonth();
                target.html() === 'arrow_back' ? month-- : month++;
                const newDate = new Date(drawnDate.getFullYear(), month);
                calendar.calendar('drawn-date', newDate);
                redrawRange(calendar);
                return true;
            }
        
            if (
                target.hasClass('calendar__weekday') &&
                !target.hasClass('calendar__weekday_another-month')
            ) {
                addDayInRange(calendar, target);
                return true;
            }
        
            if (target.hasClass('calendar__button-clear')) {
                clearRange(calendar);
                return true;
            }
        });
    }

    $.fn.calendar = function () {
        const args = Array.from(arguments);
        const calendar = this;        

        if (args.length === 1) {
            switch (args[0]) {
                case 'clear-range':
                    clearRange(calendar);
                    break;
                case 'range':
                    return range(calendar);
                case 'mode':
                    return mode(calendar);
                case 'drawn-date':
                    return drawnDate(calendar);
                case 'init':
                    return init(calendar);
                default:
                    throw `The command "${args[0]}" is unknown.`;
            }
        }

        if (args.length === 2) {
            switch (args[0]) {
                case 'range':
                    range(calendar, args[1]);
                    break;
                case 'mode':
                    if (typeof args[0] !== 'string') {
                        throw 'Wrong argument type! expected string.';
                    }
                    mode(calendar, args[1]);
                    break;
                case 'drawn-date':
                    if (typeof args[1] !== 'object') {
                        throw 'Wrong argument type! expected object.';
                    }
                    return drawnDate(calendar, args[1]);
                case 'on-inter':
                    if (typeof args[1] !== 'function') {
                        throw 'Wrong argument type! expected function.';
                    }
                    calendar.find('.calendar__button-enter').click(args[1]);
                    break;
                case 'on-clear':
                    if (typeof args[1] !== 'function') {
                        throw 'Wrong argument type! expected function.';
                    }
                    calendar.find('.calendar__button-clear').click(args[1]);
                    break;
                default:
                    throw `The command "${args[0]}" is unknown.`;
            }
        }

        return calendar;
    }
}(jQuery));