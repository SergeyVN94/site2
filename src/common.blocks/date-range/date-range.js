import $ from 'jquery';
import {
    getExtremeDatesOfDateRange
} from '../calendar/calendar-select-date-range';

function dateToString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}.${month}.${year}`;
}

$('.date-range').each(function() {
    const dateRange = $(this);
    const calendar = dateRange.find('.calendar');

    const dateMask = 'ДД.ММ.ГГГГ';
    const dropdownDateStart = dateRange.find('.dropdown-date.start .dropdown-head__text');
    const dropdownDateEnd = dateRange.find('.dropdown-date.end .dropdown-head__text');
    
    dateRange.find('.dropdown-date').click(function () {
        const dropdown = $(this);
        
        // hide or show calendar
        const dMode = dropdown.hasClass('start') ? 'start' : 'end';
        const selectMode = calendar.attr('data-select-mode');
        const isCalendarHide = calendar.css('display') === 'none';
        
        if (isCalendarHide) {
            calendar.css('display', 'block');
            calendar.attr('data-select-mode', dMode);
            dropdown.addClass('dropdown-date_focus');
        } else if (dMode !== selectMode) {
            calendar.attr('data-select-mode', dMode);
            dateRange.find('.dropdown-date').removeClass('dropdown-date_focus');
            dropdown.addClass('dropdown-date_focus');
        } else {
            calendar.css('display', 'none');
            dropdown.removeClass('dropdown-date_focus');
        }
    });

    calendar.find('.calendar__button-enter').click(function() {
        const extDateRange = getExtremeDatesOfDateRange(calendar);

        dropdownDateStart.text(dateMask);
        dropdownDateEnd.text(dateMask);

        if (extDateRange['start']) {
            dropdownDateStart.text(dateToString(extDateRange['start']));
        } 

        if (extDateRange['end']) {
            dropdownDateEnd.text(dateToString(extDateRange['end']));
        }
    });

    calendar.find('.calendar__button-clear').click(function() {
        dropdownDateStart.text(dateMask);
        dropdownDateEnd.text(dateMask);
    });
});