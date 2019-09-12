import $ from 'jquery';

$('.date-range .dropdown-date').on('click', function () {
    const dropdown = $(this);

    const arr = dropdown.parent('.date-range').find('.calendar');
    if (!arr.length) {
        return false;
    }
    const calendar = $(arr[0]);

    // hide or show calendar
    const dMode = dropdown.hasClass('start') ? 'start' : 'end';
    const selectMode = calendar.attr('data-select-mode');
    const isCalendarHide = calendar.css('display') === 'none';
    if (isCalendarHide) {
        calendar.css('display', 'block');
        calendar.attr('data-select-mode', dMode);
    } else if (dMode !== selectMode) {
        calendar.attr('data-select-mode', dMode);
    } else {
        calendar.css('display', 'none');
    }
});

$('.date-range').on('calendar-select-date', function (event, mode, date) {
    event.preventDefault();

    const dateRange = $(this);

    if (
        !mode ||
        typeof mode !== 'string' ||
        !date ||
        typeof date !== 'string'
    ) {
        return false;
    }

    dateRange.find(`.dropdown-date.${mode} .dropdown-head__text`).html(date);
});