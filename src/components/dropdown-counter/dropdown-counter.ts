import * as $ from 'jquery';

import './plugin/plugin';

const CLASSES = {
    BTN_MINUS: 'js-dropdown-counter__btn-minus',
    BTN_PLUS: 'js-dropdown-counter__btn-plus',
    DISPLAY: 'js-dropdown-counter__value',
};

$('.js-dropdown-counter').on(
    'click.dropdown-counter.change-value',
    `.${CLASSES.BTN_MINUS}, .${CLASSES.BTN_PLUS}`,
    (e: JQuery.MouseEventBase): boolean => {
        const counter = $(e.delegateTarget);
        const btn = $(e.target);
        const display = counter.find(`.${CLASSES.DISPLAY}`);
        let count = 0;

        try {
            count = parseInt(display.text(), 10);
        } catch (error) {
            console.error(error);
            return false;
        }

        if (btn.hasClass(CLASSES.BTN_MINUS)) {
            count -= 1;

            if (count < 0) {
                count = 0;
            }

            if (count === 0) {
                btn.button('disable', true);
            }
        } else {
            count += 1;

            if (count === 1) {
                counter.find(`.${CLASSES.BTN_MINUS}`).button('disable', false);
            }
        }

        display.text(String(count));

        return true;
    }
);
