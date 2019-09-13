import $ from 'jquery';

function dateToString(date, format, monthFromOne = true) {
    const items = {
        "%Y": date => {
            return date.getFullYear();
        },
        "%m": date => {
            let month = date.getMonth();
            if (monthFromOne) {
                month++;
            }
            return String(month).padStart(2, '0');
        },
        "%d": date => {
            return String(date.getDate()).padStart(2, '0');
        }
    };

    let result = format;

    for (const key in items) {
        result = result.replace(key, items[key](date));
    }

    return result;
}


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

$('.date-range').on('calendar-set-range', function(event, start, end){
    event.preventDefault();
    const dateRange = $(this);
    const dateMask = 'ДД.ММ.ГГГГ';
    const itemStart = dateRange.find('.dropdown-date.start .dropdown-head__text');
    const itemEnd = dateRange.find('.dropdown-date.end .dropdown-head__text');

    if (start) {
        itemStart.html(dateToString(start, '%d.%m.%Y'));
    } else {
        itemStart.html(dateMask);
    }

    if (end) {
        itemEnd.html(dateToString(end, '%d.%m.%Y'));
    } else {
        itemEnd.html(dateMask);
    }
});