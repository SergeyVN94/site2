import CLASSES from './classes';
import { getCounterValues } from './view/view';
import { groupingElementValues } from './lib';
import './dropdown-guest__btn-apply';
import './dropdown-guest__btn-clear';

const dropdownChangeGuestHandler = function dropdownUpdateHandler(
    e: JQuery.MouseEventBase
): void {
    const $dropdown = $(e.delegateTarget);

    const counterValues = getCounterValues($dropdown);
    const { allGuests } = groupingElementValues(counterValues);

    const isNeedHidden = allGuests === 0;

    $dropdown.find(`.${CLASSES.BTN_CLEAR}`).button('hidden', isNeedHidden);
};

$(`.${CLASSES.DROPDOWN}`).on(
    'click.dropdown-guest.check-counters',
    `.${CLASSES.BTN_PLUS}, .${CLASSES.BTN_MINUS}`,
    dropdownChangeGuestHandler
);
