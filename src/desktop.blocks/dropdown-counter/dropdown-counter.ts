import COUNTER_CLASSES from './classes';

$('.js-dropdown-counter').on(
    'click.dropdown-counter.change-value',
    `.${COUNTER_CLASSES.BTN_MINUS}, .${COUNTER_CLASSES.BTN_PLUS}`,
    (e: JQuery.MouseEventBase): boolean => {
        const $counter = $(e.delegateTarget);
        const $btn = $(e.target);
        const $display = $counter.find(`.${COUNTER_CLASSES.DISPLAY}`);
        let count = 0;

        try {
            count = parseInt($display.text(), 10);
        } catch (error) {
            console.error(error);
            return false;
        }

        if ($btn.hasClass(COUNTER_CLASSES.BTN_MINUS)) {
            count -= 1;

            if (count < 0) {
                count = 0;
            }

            if (count === 0) {
                $btn.button('disable', true);
            }
        } else {
            count += 1;

            if (count === 1) {
                $counter.find(`.${COUNTER_CLASSES.BTN_MINUS}`).button('disable', false);
            }
        }

        $display.text(String(count));

        return true;
    }
);
