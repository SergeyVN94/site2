const DROPDOWN_GUEST_CLASSES = {
    BTN_APPLY: 'js-dropdown-guest__btn-apply',
    BTN_CLEAR: 'js-dropdown-guest__btn-clear',
    DROPDOWN_HEAD: 'js-dropdown-head',
    COUNTER: 'js-dropdown-counter',
    DROPDOWN: 'js-dropdown-guest',
};

interface IDropdownGuestDomElements {
    $dropdown: JQuery;
    $dropdownHead: JQuery;
    $counters: JQuery;
    $btnApply: JQuery;
    $btnClear: JQuery;
}

class DropdownGuest {
    private readonly _domElements: IDropdownGuestDomElements;
    private readonly _defaultHeadText: string;

    constructor($dropdown: JQuery) {
        this._domElements = this._getDomElements($dropdown);
        this._initEventListeners();
        this._defaultHeadText = 'Сколько гостей';
    }

    private _getDomElements($dropdown: JQuery): IDropdownGuestDomElements {
        const $dropdownHead = $dropdown.find(`.${DROPDOWN_GUEST_CLASSES.DROPDOWN_HEAD}`);
        const $btnApply = $dropdown.find(`.${DROPDOWN_GUEST_CLASSES.BTN_APPLY}`);
        const $btnClear = $dropdown.find(`.${DROPDOWN_GUEST_CLASSES.BTN_CLEAR}`);
        const $counters = $dropdown.find(`.${DROPDOWN_GUEST_CLASSES.COUNTER}`);

        return {
            $dropdown,
            $dropdownHead,
            $btnApply,
            $btnClear,
            $counters,
        };
    }

    private _initEventListeners(): void {
        this._domElements.$btnApply.on(
            'click.dropdownGuest.updateHead',
            this._handleBtnApplyClick.bind(this)
        );

        this._domElements.$counters.on(
            'click.dropdownGuest.updateBtnClear',
            this._handleCounterUpdate.bind(this)
        );

        this._domElements.$btnClear.on(
            'click.dropdownGuest.resetDropdown',
            this._handleBtnClearClick.bind(this)
        );
    }

    private _handleBtnClearClick(): void {
        this._domElements.$counters.each((index, element) => {
            $(element).dropdownCounter('reset');
        });
        this._domElements.$btnClear.button('hidden', true);
        this._domElements.$dropdownHead.dropdownHead('text', 'Сколько гостей');
        this._domElements.$dropdown.dropdown('expanded', false);
    }

    private _handleCounterUpdate(): void {
        let guest = 0;

        this._domElements.$counters.each((index, element) => {
            guest += Number($(element).dropdownCounter('value'));
        });

        const isBtnClearHidden = guest === 0;
        this._domElements.$btnClear.button('hidden', isBtnClearHidden);
    }

    private _handleBtnApplyClick(): void {
        let adults = 0;
        let babies = 0;

        this._domElements.$counters.each((index, element) => {
            const $counter = $(element);
            const label = String($counter.dropdownCounter('label')).toLowerCase();
            const value = Number($counter.dropdownCounter('value'));

            if (label === 'взрослые' || label === 'дети') {
                adults += value;
            }

            if (label === 'младенцы') {
                babies += value;
            }
        });

        this._domElements
            .$dropdownHead
            .dropdownHead('text', this._createGuestTextEntry(adults, babies));
        this._domElements.$dropdown.dropdown('expanded', false);
    }

    private _getWordWithEnding(value: number, words: [string, string, string]): string {
        const [
            digitOne,
            digitZero,
        ] = `0${value}`
            .slice(-2)
            .split('')
            .map((digit) => parseInt(digit, 10));

        const isDigitZeroIsOne = digitZero === 1;
        const isDigitOneIsOne = digitOne === 1;
        const isDigitZeroBetweenOneAndFive = digitZero > 1 && digitZero < 5;

        if (isDigitZeroIsOne && !isDigitOneIsOne) {
            return words[0];
        }

        if (isDigitZeroBetweenOneAndFive && !isDigitOneIsOne) {
            return words[1];
        }

        return words[2];
    }

    private _createGuestTextEntry(adults: number, babies: number): string {
        const guestText: string[] = [];

        if ((adults + babies) === 0) {
            return 'Сколько гостей';
        }

        if (adults > 0) {
            const word = this._getWordWithEnding(
                adults,
                [
                    'гость',
                    'гостя',
                    'гостей',
                ]
            );
            guestText.push(`${adults} ${word}`);
        }

        if (babies > 0) {
            const word = this._getWordWithEnding(
                babies,
                [
                    'младенец',
                    'младенца',
                    'младенцев',
                ]
            );
            guestText.push(`${babies} ${word}`);
        }

        return guestText.join(', ');
    }
}

$(`.${DROPDOWN_GUEST_CLASSES.DROPDOWN}`).each((index, element) => {
    new DropdownGuest($(element));
});
