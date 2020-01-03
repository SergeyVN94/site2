import * as $ from 'jquery';

import CLASSES from './classes';

const DEFAULT_TEXT = 'Сколько гостей';

const dropdownClearGuestHandler = function dropdownClearGuestHandler(
    e: JQuery.MouseEventBase
): void {
    const $dropdown = $(e.delegateTarget);

    $dropdown.find(`.${CLASSES.COUNTER}`).dropdownCounter('reset');

    $(e.currentTarget).button('hidden', true);
    $dropdown.find(`.${CLASSES.HEAD}`).dropdownHead('value', DEFAULT_TEXT);

    $dropdown.dropdown('expand', false);
};

$(`.${CLASSES.DROPDOWN}`).on(
    'click.dropdown-guest.clear-guest',
    `.${CLASSES.BTN_CLEAR}`,
    dropdownClearGuestHandler
);
