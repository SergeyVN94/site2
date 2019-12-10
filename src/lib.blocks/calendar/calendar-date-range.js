const clearRangeButtons = function removeClassesOfRangeItems(calendar) {
    calendar.find(`.calendar__weekday`).removeClass([
        'calendar__range-day-middle',
        'calendar__range-day-start',
        'calendar__range-day-end',
        'calendar__range-day_only',
    ]);
}

const clearRange = function removeRangeFromAttributes(calendar) {
    clearRangeButtons(calendar);
    calendar.attr('data-range-start', '');
    calendar.attr('data-range-end', '');
}

const drawRange = function updateRangeItems(calendar) {
    const drawnDate = calendar.calendar('drawn-date');
    const {
        start,
        end,
    } = calendar.calendar('range');

    if (start === null && end === null) {
        return;
    }

    const days = calendar.find('.calendar__weekday:not(.calendar__weekday_another-month)');
    const isDrawStart = start &&
    start.getMonth() === drawnDate.getMonth() &&
    start.getFullYear() === drawnDate.getFullYear();
    const isDrawEnd = end &&
    end.getMonth() === drawnDate.getMonth() &&
    end.getFullYear() === drawnDate.getFullYear();

    days.each(function() {
        const num = Number(this.innerHTML);

        if (isDrawStart) {
            if (num === start.getDate()) {
                this.classList.add('calendar__range-day-start');
                if (end === null) {
                    this.classList.add('calendar__range-day_only');
                }
            }
        }

        if (isDrawEnd) {
            if (num === end.getDate()) {
                this.classList.add('calendar__range-day-end');
                if (start === null) {
                    this.classList.add('calendar__range-day_only');
                }
            }
        }
    });

    if (start && end) {
        const tmpDate = new Date(drawnDate.getFullYear(), drawnDate.getMonth());
        days.each(function() {
            tmpDate.setDate(Number(this.innerHTML));
            if (tmpDate > start && tmpDate < end) {
                this.classList.add('calendar__range-day-middle');
            }
        });
    }
}

const redrawRange = function redrawRange(calendar) {
    clearRangeButtons(calendar);
    drawRange(calendar);
}

const mode = function mode(calendar, modeValue = null) {
    if (modeValue) {
        calendar.attr('data-select-mode', modeValue);
        return;
    }

    if (calendar.attr('data-select-mode')) {
        return calendar.attr('data-select-mode');
    }
        return null;
}

const getRange = function getRange(calendar) {
    const result = {
        start: null,
        end: null,
    };

    try {
        const start = calendar.attr('data-range-start');
        const date = JSON.parse(start);
        result.start = new Date(date.year, date.month, date.day);
    } catch (error) {
        console.error(error);
    }

    try {
        const end = calendar.attr('data-range-end');
        const date = JSON.parse(end);
        result.end = new Date(date.year, date.month, date.day);
    } catch (error) {
        console.error(error);
    }

    return result;
}

const setRange = function setRange(calendar, _range) {
    const {
        start,
        end,
    } = _range;

    if (start) {
        try {
            const date = JSON.stringify({
                year: start.getFullYear(),
                month: start.getMonth(),
                day: start.getDate(),
            });
            calendar.attr('data-range-start', date);
        } catch (error) {
            throw new TypeError('Invalid date parameter passed. Date object expected.');
        }
    }

    if (end) {
        try {
            const date = JSON.stringify({
                year: end.getFullYear(),
                month: end.getMonth(),
                day: end.getDate(),
            });
            calendar.attr('data-range-end', date);
        } catch (error) {
            throw new TypeError('Invalid date parameter passed. Date object expected.');
        }
    }

    clearRangeButtons(calendar);
    drawRange(calendar);
}

const range = function range(calendar, _range = null) {
    if (_range !== null) {
        setRange(calendar, range);
        redrawRange(calendar);
        return;
    }

    return getRange(calendar);
}

const addDayInRange = function addDayInRange(calendar, day) {
    const _mode = calendar.calendar('mode');
    if (_mode !== 'start' && _mode !== 'end') {
        return false;
    }

    const drawnDate = calendar.calendar('drawn-date');
    const targetDate = new Date(drawnDate.getFullYear(), drawnDate.getMonth(), Number(day.text()));
    const currentDate = new Date((new Date()).toDateString()); // to reset the time

    if (targetDate < currentDate) {
        return false;
    }

    const {
        start,
        end,
    } = getRange(calendar);

    if (_mode === 'start') {
        if (end && targetDate > end) {
            return false;
        }

        range.start = targetDate;
    } else {
        if (start) {
            const tmpDate = new Date(start.toDateString());
            tmpDate.setDate(tmpDate.getDate() + 1);

            if (targetDate < tmpDate) {
                return false;
            }
        }

        range.end = targetDate;
    }

    setRange(calendar, range);
    redrawRange(calendar);
}

export {
    clearRange,
    range,
    addDayInRange,
    mode,
    redrawRange,
};
