import $ from 'jquery';

const eventName = 'calendar-select-date';

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

function sendDate(mode, date) {
    $('.calendar').trigger('calendar-select-date', [
        mode,
        date
    ]);
}

function clearRange(clearAttributes = false) {
    const calendar = $('.calendar');

    const classes = [
        'calendar__range-day',
        'calendar__range-day_out-only',
        'calendar__range-day-start',
        'calendar__range-day-end'
    ];

    for (let i = 0; i < classes.length; i++) {
        const className = classes[i];
        
        calendar.find(`.${className}`).each(function () {
            this.classList.remove(className);
        });
    }

    if (clearAttributes) {
        calendar.removeAttr('data-range-day-start');
        calendar.removeAttr('data-range-day-end');
    }
}

function getOutRangeDays() {
    const calendar = $('.calendar');
    const start = calendar.attr('data-range-day-start');
    const end = calendar.attr('data-range-day-end');
    const result = {
        length: 0
    };

    if (start && (typeof start === 'string' && start.length !== 0)) {
        result['start'] = new Date(start);
        result['start'].setHours(0);
        result.length++;
    }

    if (end && (typeof end === 'string' && end.length !== 0)) {
        result['end'] = new Date(end);
        result['end'].setHours(0);
        result.length++;
    }

    return result;
}

function getTargetDate(day) {
    const calendar = $('.calendar');
    const renderDate = new Date(calendar.attr('data-render-date'));
    const targetDate = new Date(renderDate.toDateString());
    targetDate.setDate(Number(day.text()));

    return targetDate;
}

function isSetDatePossible(day) {
    const calendar = $('.calendar');
    const mode = calendar.attr('data-select-mode');

    if (mode !== 'start' && mode !== 'end') {
        return false;
    }

    const currentDate = new Date(calendar.attr('data-current-date'));
    const targetDate = getTargetDate(day);

    if (targetDate.valueOf() < currentDate.valueOf()) {
        return false;
    }

    const outRangeDays = getOutRangeDays();

    if (outRangeDays.length === 0) {
        return true;
    }

    const otherOutDate = outRangeDays[mode === 'start' ? 'end' : 'start'];

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
    const outRangeDays = getOutRangeDays();
    const renderDate = new Date(calendar.attr('data-render-date'));
    
    const outDate = outRangeDays[name];

    if (!outDate) {
        return;
    }

    if (outDate.getMonth() !== renderDate.getMonth()) {
        return;
    }

    const dayNum = outDate.getDate();

    calendar.find('.calendar__week-day:not(.calendar__week-day-another-month)').each(function() {
        const day = $(this);

        if (day.text() == dayNum) {
            day.addClass(`calendar__range-day-${name}`);
            if (outRangeDays.length === 1) {
                day.addClass(`calendar__range-day_out-only`);
            }
        }
    });
}

function renderRange() {
    const calendar = $('.calendar');
    const outRangeDays = getOutRangeDays();

    if (outRangeDays.length === 0) {
        return;
    }    

    const start = outRangeDays['start'];
    if (start) {     
        renderOutRangeDay('start');
    }

    const end = outRangeDays['end'];
    if (end) {  
        renderOutRangeDay('end');
    }

    if (outRangeDays.length < 2) {
        return;
    }

    const renderDate = new Date(calendar.attr('data-render-date'));
    const tmpDate = new Date(renderDate.toDateString());

    calendar.find('.calendar__week-day:not(.calendar__week-day-another-month)').each(function() {
        const day = $(this);

        tmpDate.setDate(Number(day.text()));
        const t = tmpDate.valueOf();

        if (t > start.valueOf() && t < end.valueOf()) {
            day.addClass('calendar__range-day');
        }
    });
}

function updateRange(day) {
    const calendar = $('.calendar');
    const mode = calendar.attr('data-select-mode');    

    if (!isSetDatePossible(day)) {
        return false;
    }

    const renderDate = new Date(calendar.attr('data-render-date'));
    const targetDate = new Date(renderDate.toDateString());
    targetDate.setDate(Number(day.text()));

    calendar.attr(`data-range-day-${mode}`, dateToString(targetDate, '%Y-%m-%d'));

    clearRange();
    renderRange();

    sendDate(mode, targetDate);
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
        
        updateRange(target);
    });
}

initDateMonitor();

$('.calendar').on('calendar-update', function (event) {
    event.preventDefault();
    renderRange();
    initDateMonitor();
})

export {clearRange, getOutRangeDays};