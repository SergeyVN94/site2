import CLASSES from './classes';
import './date-range__dropdown';
import { dateToString } from './lib';

const DEFAULT_DATE_TEXT = 'ДД.ММ.ГГГГ';

const deselectDateRange = function deselectDateRange($dateRange: JQuery): void {
    $dateRange.removeClass(CLASSES.RANGE_SELECT);
    $dateRange
        .find(`.${CLASSES.DROPDOWN_HEAD}`)
        .dropdownHead('select-date', false);
};

const calendarApplyHandler = function(e: JQuery.EventBase, start: Date, end: Date): void {
    e.preventDefault();

    const $dateRange = $(e.delegateTarget);

    if (start !== null) {
        $dateRange
            .find(`.${CLASSES.DROPDOWN_HEAD_LEFT}`)
            .dropdownHead('value', dateToString(start));
    } else {
        $dateRange
            .find(`.${CLASSES.DROPDOWN_HEAD_LEFT}`)
            .dropdownHead('value', DEFAULT_DATE_TEXT);
    }

    if (end !== null) {
        $dateRange
            .find(`.${CLASSES.DROPDOWN_HEAD_RIGHT}`)
            .dropdownHead('value', dateToString(end));
    } else {
        $dateRange
            .find(`.${CLASSES.DROPDOWN_HEAD_RIGHT}`)
            .dropdownHead('value', DEFAULT_DATE_TEXT);
    }

    deselectDateRange($dateRange);
};

const calendarClearHandler = function calendarClearHandler(e: JQuery.EventBase): void {
    e.preventDefault();

    const $dateRange = $(e.delegateTarget);
    $dateRange
        .find(`.${CLASSES.DROPDOWN_HEAD}`)
        .dropdownHead('value', DEFAULT_DATE_TEXT);

    deselectDateRange($dateRange);
};

$(`.${CLASSES.DATE_RANGE}`)
    .on('apply', calendarApplyHandler)
    .on('clear', calendarClearHandler);
