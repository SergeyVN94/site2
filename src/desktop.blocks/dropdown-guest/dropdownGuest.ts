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

    private _getIndexGraduation(index: number): number {
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
    }

    private _createGuestTextEntry(adults: number, babies: number): string {
        const guestText: string[] = [];

        if (adults > 0) {
            const wordEnding = ['ь', 'я', 'ей'];
            const index = this._getIndexGraduation(adults);
            guestText.push(`${adults} гост${wordEnding[index]}`);
        }

        if (babies > 0) {
            const wordEnding = ['ец', 'ца', 'цев'];
            const index = this._getIndexGraduation(babies);
            guestText.push(`${babies} младен${wordEnding[index]}`);
        }

        return guestText.join(', ');
    }
}

$(`.${DROPDOWN_GUEST_CLASSES.DROPDOWN}`).each((index, element) => {
    new DropdownGuest($(element));
});
