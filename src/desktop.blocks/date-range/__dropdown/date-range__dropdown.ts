import * as $ from 'jquery';

import CLASSES from '../classes';

const dateRangeClickHandler = function dateRangeClickHandler(e: JQuery.MouseEventBase): boolean {
    const $dateRange = $(e.delegateTarget);
    const $dropdownHead = $(e.currentTarget);

    if ($dropdownHead.dropdownHead('select-date')) {
        $dateRange.removeClass(CLASSES.RANGE_SELECT);
        $dropdownHead.dropdownHead('select-date', false);
    } else {
        $dateRange.addClass(CLASSES.RANGE_SELECT);
        $dateRange.find(`.${CLASSES.DROPDOWN_HEAD}`).dropdownHead('select-date', false);
        $dropdownHead.dropdownHead('select-date', true);

        const selectDate = $dropdownHead.hasClass(CLASSES.DROPDOWN_HEAD_LEFT) ? 'start' : 'end';
        $dateRange.find(`.${CLASSES.CALENDAR}`).calendar('select-date', selectDate);
    }

    return true;
};

$(`.${CLASSES.DATE_RANGE}`).on(
    'click.date-range.select-date-range',
    `.${CLASSES.DROPDOWN_HEAD}`,
    dateRangeClickHandler
);
