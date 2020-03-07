import CLASSES from './classes';
import { getCounterValues } from './view/view';
import {
    groupingElementValues,
    createGuestText,
} from './lib';

const DEFAULT_TEXT = 'Сколько гостей';

const dropdownUpdateGuestHandler = function dropdownUpdateGuestHandler(
    e: JQuery.MouseEventBase
): void {
    const $dropdown = $(e.delegateTarget);

    const counterValues = getCounterValues($dropdown);
    const {
        allGuests,
        adults,
        babies,
    } = groupingElementValues(counterValues);

    if (allGuests === 0) {
        $dropdown.find(`.${CLASSES.HEAD}`).dropdownHead('value', DEFAULT_TEXT);
    } else {
        const newText = createGuestText(adults, babies);
        $dropdown.find(`.${CLASSES.HEAD}`).dropdownHead('value', newText);
    }

    $dropdown.dropdown('expand', false);
};

$(`.${CLASSES.DROPDOWN}`).on(
    'click.dropdown-guest.update-guest',
    `.${CLASSES.BTN_INTER}`,
    dropdownUpdateGuestHandler
);
