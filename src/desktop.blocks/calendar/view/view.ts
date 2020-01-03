import * as $ from 'jquery';

import CLASSES from '../classes';
import {
    dateToString,
    isCorrectDateStr,
    parseDateString,
    getStartAndEndRange,
    xor,
} from '../lib';

const MONTH_NAMES = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

const getRenderedDate = function getRenderedDateFromCalendar($calendar: JQuery): Date {
    const dateStr = $calendar.attr('data-date');

    if (isCorrectDateStr(dateStr)) {
        return parseDateString(dateStr);
    }

    return new Date();
};

const updateCalendarHead = function updateCalendarHead($calendar: JQuery, date: Date): void {
    const calendarHead = `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;

    $calendar.find(`.${CLASSES.DRAWN_DATE}`).text(calendarHead);
};

const getDaysInMonth = function getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
};

const createCalendarDay = function createCalendarDay(
    dayNumber: number,
    isCurrentMonth = true
): HTMLElement {
    const day = document.createElement('div');
    day.innerHTML = String(dayNumber);

    const classes: string[] = [
        'calendar__day-week',
        'js-calendar__day-week',
    ];

    if (!isCurrentMonth) {
        classes.push(...[
            'calendar__day-week_theme_another-month',
            'js-calendar__day-week_theme_another-month',
        ]);
    }

    day.classList.add(...classes);

    return day;
};

const createCalendarDays = function createCalendarDays(renderDate: Date): DocumentFragment {
    const calendarDays = document.createDocumentFragment();

    const daysInMonth = getDaysInMonth(renderDate.getMonth(), renderDate.getFullYear());
    const daysInPrevMonth = getDaysInMonth(renderDate.getMonth() - 1, renderDate.getFullYear());

    const tmpDate = new Date(renderDate.getFullYear(), renderDate.getMonth(), 1);
    const dayWeekFirstDay = (tmpDate.getDay() || 7) - 1; // Monday - 0, Sunday - 6

    tmpDate.setDate(daysInMonth);
    const dayWeekLastDay = (tmpDate.getDay() || 7) - 1;

    for (let i = daysInPrevMonth - dayWeekFirstDay + 1; i <= daysInPrevMonth; i += 1) {
        calendarDays.appendChild(createCalendarDay(i, false));
    }

    for (let i = 1; i <= daysInMonth; i += 1) {
        calendarDays.appendChild(createCalendarDay(i));
    }

    if (dayWeekLastDay < 6) {
        for (let i = dayWeekLastDay + 1, j = 1; i <= 6; i += 1, j += 1) {
            calendarDays.appendChild(createCalendarDay(j, false));
        }
    }

    return calendarDays;
};

const markCurrentDay = function markCurrentDay(days: DocumentFragment, renderDate: Date): void {
    const currentDate = new Date();

    if (
        currentDate.getMonth() === renderDate.getMonth() &&
        currentDate.getFullYear() === renderDate.getFullYear()
    ) {
        const index = currentDate.getDate() - 1;
        const selector = '.calendar__day-week:not(.calendar__day-week_theme_another-month)';
        const day = days.querySelectorAll(selector)[index];
        day.classList.add('calendar__day-week_theme_today');
    }
};

const updateCalendar = function updateCalendar($calendar: JQuery, renderDate: Date): void {
    $calendar.attr('data-date', dateToString(renderDate));

    updateCalendarHead($calendar, renderDate);

    const calendarDays = createCalendarDays(renderDate);
    markCurrentDay(calendarDays, renderDate);

    $calendar
        .find(`.${CLASSES.DAYS_CONTAINER}`)
        .html('')
        .append(calendarDays);
};

const eraseRange = function eraseRange($calendar: JQuery): void {
    $calendar.find(`.${CLASSES.DAY_WEEK}`).removeClass([
        CLASSES.RANGE_DAY,
        CLASSES.RANGE_DAY_MIDDLE,
        CLASSES.RANGE_DAY_START,
        CLASSES.RANGE_DAY_END,
    ]);
};

const drawRange = function drawRange($calendar: JQuery): boolean {
    const renderDate = getRenderedDate($calendar);
    const {
        start: rangeStart = null,
        end: rangeEnd = null,
    } = getStartAndEndRange($calendar);

    const rangeStartIsNull = rangeStart === null;
    const rangeEndIsNull = rangeEnd === null;

    if (rangeEndIsNull && rangeStartIsNull) {
        return true;
    }

    if (xor(rangeEndIsNull, rangeStartIsNull)) {
        let tmpDate = rangeStart;

        if (rangeStartIsNull) {
            tmpDate = rangeEnd;
        }

        if (
            tmpDate.getMonth() === renderDate.getMonth() &&
            tmpDate.getFullYear() === renderDate.getFullYear()
        ) {
            $calendar
                .find(`.${CLASSES.DAY_WEEK}:not(.${CLASSES.DAY_WEEK_ANOTHER_MONTH})`)
                .each(function() {
                    const $day = $(this);
                    const dayNumber = parseInt($day.text(), 10);

                    if (dayNumber === tmpDate.getDate()) {
                        $day.addClass(CLASSES.RANGE_DAY);
                    }
                });
        }

        return true;
    }

    const isRenderRangeStart = rangeStart.getMonth() === renderDate.getMonth() &&
        rangeStart.getFullYear() === renderDate.getFullYear();
    const isRenderRangeEnd = rangeEnd.getMonth() === renderDate.getMonth() &&
        rangeEnd.getFullYear() === renderDate.getFullYear();
    const isRenderRangeMiddle = rangeStart.getFullYear() <= renderDate.getFullYear() &&
        rangeStart.getMonth() <= renderDate.getMonth() &&
        rangeEnd.getFullYear() >= renderDate.getFullYear() &&
        rangeEnd.getMonth() >= renderDate.getMonth();

    if (!isRenderRangeStart && !isRenderRangeMiddle && !isRenderRangeEnd) {
        return true;
    }

    $calendar
        .find(`.${CLASSES.DAY_WEEK}:not(.${CLASSES.DAY_WEEK_ANOTHER_MONTH})`)
        .each(function() {
            const $day = $(this);
            const dayNumber = parseInt($day.text(), 10);

            if (isRenderRangeStart && dayNumber === rangeStart.getDate()) {
                $day.addClass([
                    CLASSES.RANGE_DAY,
                    CLASSES.RANGE_DAY_START,
                ]);
            }

            if (isRenderRangeEnd && dayNumber === rangeEnd.getDate()) {
                $day.addClass([
                    CLASSES.RANGE_DAY,
                    CLASSES.RANGE_DAY_END,
                ]);
            }

            if (isRenderRangeMiddle) {
                if (
                    (!isRenderRangeStart || dayNumber > rangeStart.getDate()) &&
                    (!isRenderRangeEnd || dayNumber < rangeEnd.getDate())
                ) {
                    $day.addClass(CLASSES.RANGE_DAY_MIDDLE);
                }
            }
        });

    return true;
};

const redrawRange = function redrawRange($calendar: JQuery): void {
    eraseRange($calendar);
    drawRange($calendar);
};

export {
    getRenderedDate,
    updateCalendar,
    redrawRange,
};
