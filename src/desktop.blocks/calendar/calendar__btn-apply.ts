import * as $ from 'jquery';

import CLASSES from './classes';
import { getStartAndEndRange } from './lib';

const btnApplyClickHandler = function btnApplyClickHandler(e: JQuery.MouseEventBase): void {
    const $calendar = $(e.delegateTarget);
    const {
        start = null,
        end = null,
    } = getStartAndEndRange($calendar);

    $calendar.trigger('apply', [start, end]);
};

$(`.${CLASSES.CALENDAR}`).on(
    'click.calendar.apply',
    `.${CLASSES.BTN_APPLY}`,
    btnApplyClickHandler
);
