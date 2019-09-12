import $ from 'jquery';

const eventName = 'calendar-select-date';

function dateToString(date, format, monthFromOne = false) {
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

function sendDate(mode, date) {
    $('.calendar').trigger('calendar-select-date', [
        mode,
        date
    ]);
}

function clearRange() {
    $('.calendar').find('.calendar__range-day').each(function () {
        this.classList.remove('calendar__range-day');
    });
}

function removeButtonOutRange(className) {
    $('.calendar').find(`.${className}`).each(function() {
        this.classList.remove(className);
    });
}

function isSetDatePossible(day) {
    const calendar = $('.calendar');
    const mode = calendar.attr('data-select-mode');

    if (mode !== 'start' && mode !== 'end') {
        return false;
    }

    const currentDate = new Date(calendar.attr('data-current-date'));
    const renderDate = new Date(calendar.attr('data-render-date'));
    const targetDate = new Date(renderDate.toDateString());
    targetDate.setDate(Number(day.text()));

    if (targetDate.valueOf() < currentDate.valueOf()) {
        return false;
    }

    const otherOutDateValue = calendar.attr(`data-range-day-${mode === 'start' ? 'end' : 'start'}`);
    
    if (
        !otherOutDateValue ||
        (typeof otherOutDateValue === 'string' && otherOutDateValue.length === 0)
    ) {
        return true;
    }

    const otherOutDate = new Date(otherOutDateValue);

    if (mode === 'start' && targetDate.valueOf() >= otherOutDate.valueOf()) {        
        return false;
    }

    if (mode === 'end' && targetDate.valueOf() <= otherOutDate.valueOf()) {
        return false;
    }

    return true;
}

function renderOutRangeDay(name) {
    const calendar = $('.calendar');
    const renderDate = new Date(calendar.attr('data-render-date'));
    let date = calendar.attr(`data-range-day-${name}`);

    if (!date) {
        return;
    }

    date = new Date(date);

    if (date.getMonth() !== renderDate.getMonth()) {
        return;
    }

    const dayNum = date.getDate();

    calendar.find('.calendar__week-day:not(.calendar__week-day-another-month)').each(function() {
        const day = $(this);

        if (day.text() == dayNum) {
            day.addClass(`calendar__range-day-${name}`);
        }
    });
}

function renderRange() {
    const calendar = $('.calendar');
    const renderDate = new Date(calendar.attr('data-render-date'));
    const tmpDate = new Date(renderDate.toDateString());

    let start = calendar.attr('data-range-day-start');
    let end = calendar.attr('data-range-day-end');

    if (start) {
        start = new Date(start);        
        renderOutRangeDay('start');
    }

    if (end) {
        end = new Date(end);
        end.setHours(0);        
        renderOutRangeDay('end');
    }

    if (!start || !end) {
        return;
    }

    calendar.find('.calendar__week-day').each(function() {
        const day = $(this);

        if (!day.hasClass('calendar__week-day-another-month')) {
            tmpDate.setDate(Number(day.text()));
            const t = tmpDate.valueOf();

            if (t > start.valueOf() && t < end.valueOf()) {
                day.addClass('calendar__range-day');
            }
        }
    });
}

function updateDateRange(day) {
    const calendar = $('.calendar');
    const mode = calendar.attr('data-select-mode');

    if (!isSetDatePossible(day)) {
        return false;
    }

    clearRange();
    const classNameOutBtn = `calendar__range-day-${mode}`;
    removeButtonOutRange(classNameOutBtn);

    day.addClass(classNameOutBtn);

    const renderDate = new Date(calendar.attr('data-render-date'));
    const targetDate = new Date(renderDate.toDateString());
    targetDate.setDate(Number(day.text()));

    calendar.attr(`data-range-day-${mode}`, dateToString(targetDate, '%Y-%m-%d', true));

    renderRange()

    sendDate(mode, dateToString(targetDate, '%d.%m.%Y', true))
}

function initDateMonitor() {
    $('.calendar').on('click', function (event) {
        const calendar = $(this);
        const target = $(event.target);

        if (
            !target.hasClass('calendar__week-day') ||
            target.hasClass('calendar__week-day-another-month')
        ) {
            return false;
        }
        
        updateDateRange(target);
    });
}

initDateMonitor();

$('.calendar').on('calendar-update', function (event, oldDate, newDate) {
    event.preventDefault();

    renderRange();

    if (oldDate !== newDate) {
        initDateMonitor();
    }
})