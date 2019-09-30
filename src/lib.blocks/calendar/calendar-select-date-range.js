import $ from 'jquery';

const eventName = 'calendar-select-date';

function stringifyDate(date) {
    return JSON.stringify({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate()
    })
}

function getExtremeDatesOfDateRange(calendar) {
    if (!calendar) {
        calendar = $('.calendar');
    }

    const rangeStartOpt = calendar.attr('data-range-day-start'),
        rangeEndOpt = calendar.attr('data-range-day-end');

    const result = {
        length: 0
    };
    try {
        let tmp = JSON.parse(rangeStartOpt);
        result['start'] = new Date(tmp.year, tmp.month, tmp.day);
        result.length++;
    } catch (error) {}

    try {
        let tmp = JSON.parse(rangeEndOpt);
        result['end'] = new Date(tmp.year, tmp.month, tmp.day);
        result.length++;
    } catch (error) {}

    return result;
}

function updateRangeAttr(calendar, day) {
    const mode = calendar.attr('data-select-mode');
    if (mode !== 'start' && mode !== 'end') {
        return false;
    }

    const renderOpt = JSON.parse(calendar.attr('data-render-date')),
        targetDate = new Date(renderOpt.year, renderOpt.month, Number(day.text())),
        currentDate = new Date((new Date()).toDateString()); // to reset the time

    if (targetDate < currentDate) {
        return false;
    }

    const extDateRange = getExtremeDatesOfDateRange(calendar);

    if (mode === 'start') {
        if (
            extDateRange['end'] &&
            targetDate >= extDateRange['end']
        ) {
            return false;
        }

        calendar.attr('data-range-day-start', stringifyDate(targetDate));
    } else {
        if (extDateRange['start']) {
            const tmpDate = new Date(extDateRange['start'].toDateString());
            tmpDate.setDate(tmpDate.getDate() + 1);

            if (targetDate < tmpDate) {
                return false;
            }
        }

        calendar.attr('data-range-day-end', stringifyDate(targetDate));
    }
}

function clearRange(calendar, clearRangeAttr = false) {
    calendar.find(`.calendar__weekday`).removeClass([
        'calendar__range-day-middle',
        'calendar__range-day-start',
        'calendar__range-day-end',
        'calendar__range-day_only'
    ]);

    if (clearRangeAttr) {
        calendar.attr('data-range-day-start', '');
        calendar.attr('data-range-day-end', '');
    }
}

function renderRange(calendar) {
    const renderOpt = JSON.parse(calendar.attr('data-render-date')),
        extDateRange = getExtremeDatesOfDateRange(calendar);

    if (extDateRange.length === 0) {
        return;
    }

    const days = calendar.find('.calendar__weekday:not(.calendar__weekday_another-month)');
    const dayStart = extDateRange['start'];
    const dayEnd = extDateRange['end'];

    if (dayStart && dayStart.getMonth() === renderOpt.month) {
        days.each(function () {
            const num = Number(this.innerHTML);
            if (num === Number(dayStart.getDate())) {
                this.classList.add('calendar__range-day-start');
                if (extDateRange.length === 1) {
                    this.classList.add('calendar__range-day_only');
                }
            }
        });
    }

    if (dayEnd && dayEnd.getMonth() === renderOpt.month) {
        days.each(function () {
            const num = Number(this.innerHTML);
            if (num === Number(dayEnd.getDate())) {
                this.classList.add('calendar__range-day-end');
                if (extDateRange.length === 1) {
                    this.classList.add('calendar__range-day_only');
                }
            }
        });
    }

    if (extDateRange.length === 2) {
        const tmpDate = new Date(renderOpt.year, renderOpt.month);
        days.each(function () {
            tmpDate.setDate(Number(this.innerHTML));
            if (tmpDate > dayStart && tmpDate < dayEnd) {
                this.classList.add('calendar__range-day-middle');
            }
        });
    }
}

export {
    updateRangeAttr,
    clearRange,
    renderRange,
    getExtremeDatesOfDateRange
};