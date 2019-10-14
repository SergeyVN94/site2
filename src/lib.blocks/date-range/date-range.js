import $ from 'jquery';

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
    const dropdownDateStart = dateRange.find('.dropdown-date.start .dropdown__text');
    const dropdownDateEnd = dateRange.find('.dropdown-date.end .dropdown__text');
    
    dateRange.find('.dropdown-date').click(function () {
        const dropdown = $(this);
        
        // hide or show calendar
        const dMode = dropdown.hasClass('start') ? 'start' : 'end';
        const selectMode = calendar.calendar('mode');
        const isCalendarHide = calendar.css('display') === 'none';        
        
        if (isCalendarHide) {
            calendar.css('display', 'block');
            calendar.calendar('mode', dMode);
            dropdown.addClass('dropdown-date_focus');
        } else if (dMode !== selectMode) {
            calendar.calendar('mode', dMode);
            dateRange.find('.dropdown-date').removeClass('dropdown-date_focus');
            dropdown.addClass('dropdown-date_focus');
        } else {
            calendar.css('display', 'none');
            dropdown.removeClass('dropdown-date_focus');
        }
    });

    calendar.calendar('on-inter', function() {
        const range = calendar.calendar('range');

        dropdownDateStart.text(dateMask);
        dropdownDateEnd.text(dateMask);                

        if (range.start) {
            dropdownDateStart.text(dateToString(range.start));
        } 

        if (range.end) {
            dropdownDateEnd.text(dateToString(range.end));
        }

        dateRange.find('.dropdown-date').removeClass('dropdown-date_focus');
        calendar.css('display', 'none');
    });

    calendar.calendar('on-clear', function() {
        dropdownDateStart.text(dateMask);
        dropdownDateEnd.text(dateMask);
        
        dateRange.find('.dropdown-date').removeClass('dropdown-date_focus');
        calendar.css('display', 'none');
    });
});