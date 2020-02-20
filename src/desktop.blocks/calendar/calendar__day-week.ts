import * as $ from 'jquery';

import CLASSES from './classes';

import {
    getRenderedDate,
    updateCalendar,
    redrawRange,
} from './view/view';

import {
    dateToString,
    getStartAndEndRange,
    xor,
} from './lib';

const getDayDate = function getDayDate($day: JQuery, renderDate: Date): Date {
    const dayDate = new Date(renderDate.getFullYear(), renderDate.getMonth());
    const dayNumber = parseInt($day.text(), 10);

    if ($day.hasClass(CLASSES.DAY_WEEK_ANOTHER_MONTH)) {
        let month = dayDate.getMonth();

        if (dayNumber < 7) {
            month += 1;
        } else {
            month -= 1;
        }

        dayDate.setMonth(month);
    }

    dayDate.setDate(dayNumber);

    return dayDate;
};

const isPossibleSetDateRange = function isPossibleSetDateRange(
    options: {
        targetDate: Date;
        rangeStart: Date;
        rangeEnd: Date;
        selectDate: 'start' | 'end';
    }
): boolean {
    const {
        targetDate,
        rangeStart = null,
        rangeEnd = null,
        selectDate = 'start',
    } = options;
    const currentDate = new Date();

    if (targetDate < currentDate) {
        return false;
    }

    const rangeEndIsNull = rangeEnd === null;
    const rangeStartIsNull = rangeStart === null;

    if (rangeStartIsNull && rangeEndIsNull) {
        return true;
    }

    if (xor(rangeEndIsNull, rangeStartIsNull)) {
        return true;
    }

    if (
        selectDate === 'start' &&
        !rangeEndIsNull &&
        targetDate < rangeEnd
    ) {
        return true;
    }

    if (
        selectDate === 'end' &&
        !rangeStartIsNull &&
        targetDate > rangeStart
    ) {
        return true;
    }

    return false;
};

const selectDayHandler = function selectDayHandler(e: JQuery.MouseEventBase): boolean {
    const $calendar = $(e.delegateTarget);
    const $day = $(e.currentTarget);
    const renderDate = getRenderedDate($calendar);
    const targetDate = getDayDate($day, renderDate);

    if (targetDate.getMonth() !== renderDate.getMonth()) {
        updateCalendar($calendar, targetDate);
    }

    const {
        start: rangeStart = null,
        end: rangeEnd = null,
    } = getStartAndEndRange($calendar);

    const selectDate = ($calendar.attr('data-select-date') as 'start' | 'end') || 'start';

    if (isPossibleSetDateRange({
        targetDate,
        rangeStart,
        rangeEnd,
        selectDate,
    })) {
        $calendar.attr(`data-range-${selectDate}`, dateToString(targetDate));
        redrawRange($calendar);
    }

    return true;
};

$(`.${CLASSES.CALENDAR}`).each(function(): void {
    const $calendar = $(this);

    $calendar.on(
        'click.calendar.select-date',
        `.${CLASSES.DAY_WEEK}`,
        selectDayHandler
    );
});
