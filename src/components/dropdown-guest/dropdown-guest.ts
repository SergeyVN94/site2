import * as $ from 'jquery';

const CLASSES = {
    BTN_INTER: 'js-dropdown-guest__btn-inter',
    BTN_CLEAR: 'js-dropdown-guest__btn-clear',
    BTN_PLUS: 'js-dropdown-counter__btn-plus',
    BTN_MINUS: 'js-dropdown-counter__btn-minus',
    HEAD: 'js-dropdown-head',
    COUNTER: 'js-dropdown-counter',
};

const DEFAULT_TEXT = 'Сколько гостей';

const getIndexGraduation = function calcIndexGraduation(index: number): number {
    const ost10 = index % 10;
    const ost100 = index % 100;
    let grad = 0;

    if (ost10 === 1 && (ost100 > 20 || index === 1)) {
        grad = 0;
    }

    if (ost10 >= 2 && ost10 <= 4) {
        grad = 1;
    }

    if (ost10 >= 5 && ost10 <= 9 || ost10 === 0 || (ost100 >= 11 && ost100 <= 20)) {
        grad = 2;
    }

    return grad;
};

const createGuestText = function createGuestTextEntry(
    adults: number, babies: number
): string {
    let guestText: string[] = [];

    if (adults > 0) {
        const wordEnding = ['ь', 'я', 'ей'];
        const index = getIndexGraduation(adults);
        guestText.push(`${adults} гост${wordEnding[index]}`);
    }

    if (babies > 0) {
        const wordEnding = ['ец', 'ца', 'цев'];
        const index = getIndexGraduation(babies);
        guestText.push(`${babies} младен${wordEnding[index]}`);
    }

    return guestText.join(', ');
};

const getNewTextHead = function getTextForHead($dropdown: JQuery): string {
    const counterStates = $dropdown.dropdown('counters') as CounterValue[];

    let allGuests = 0;
    let adults = 0;
    let babies = 0;
    counterStates.forEach((currentValue) => {
        const text = currentValue.text.toLowerCase();
        if (text === 'взрослые' || text === 'дети') {
            adults += currentValue.value;
        } else {
            babies += currentValue.value;
        }

        allGuests += currentValue.value;
    });

    if (allGuests === 0) {
        return DEFAULT_TEXT;
    }

    return createGuestText(adults, babies);
};

const isNeedHideClearBtn = function getNewStateForClearBtn($dropdown: JQuery): boolean {
    const counterStates = $dropdown.dropdown('counters') as CounterValue[];

    let allGuests = 0;
    counterStates.forEach((currentValue) => {
        allGuests += currentValue.value;
    });

    if (allGuests === 0) {
        return true;
    }

    return false;
};

const resetCounters = function resetAllCounters($dropdown: JQuery, $btn: JQuery) {
    $dropdown.find(`.${CLASSES.COUNTER}`).each(function() {
        $(this).dropdownCounter('reset');
    });

    $btn.button('hidden', true);
    $dropdown.find(`.${CLASSES.HEAD}`).dropdownHead('value', DEFAULT_TEXT);
};

$('.js-dropdown-guest').on(
    'click.dropdown-guest.update-counters',
    `.${CLASSES.BTN_INTER}, .${CLASSES.BTN_CLEAR}, .${CLASSES.BTN_PLUS}, .${CLASSES.BTN_MINUS}`,
    (e: JQuery.MouseEventBase) => {
        const $dropdown = $(e.delegateTarget);
        const $btn = $(e.target);

        if ($btn.hasClass(CLASSES.BTN_INTER)) {
            const newText = getNewTextHead($dropdown);
            $dropdown.find(`.${CLASSES.HEAD}`).dropdownHead('value', newText);
        }

        if ($btn.hasClass(CLASSES.BTN_PLUS) || $btn.hasClass(CLASSES.BTN_MINUS)) {
            const isHidden = isNeedHideClearBtn($dropdown);
            $dropdown.find(`.${CLASSES.BTN_CLEAR}`).button('hidden', isHidden);
        }

        if ($btn.hasClass(CLASSES.BTN_CLEAR)) {
            resetCounters($dropdown, $btn);
        }
    }
);
