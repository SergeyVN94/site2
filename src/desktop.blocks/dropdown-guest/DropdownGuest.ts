import Dropdown, { IDropdownDomElements } from '../dropdown/Dropdown';

const DROPDOWN_GUEST_CLASSES = {
    BTN_APPLY: 'js-dropdown-guest__btn-apply',
    BTN_CLEAR: 'js-dropdown-guest__btn-clear',
    DROPDOWN_HEAD: 'js-dropdown-head',
    COUNTER: 'js-dropdown-counter',
    DROPDOWN: 'js-dropdown-guest',
};

interface IDropdownGuestDomElements extends IDropdownDomElements {
    $btnApply: JQuery;
    $btnClear: JQuery;
}

class DropdownGuest extends Dropdown {
    protected _domElements: IDropdownGuestDomElements;

    constructor($dropdown: JQuery) {
        super($dropdown);
        this._domElements = this._getDomElements($dropdown);
        this._initEventListeners();
    }

    protected _getDomElements($dropdown: JQuery): IDropdownGuestDomElements {
        const $btnApply = $dropdown.find(`.${DROPDOWN_GUEST_CLASSES.BTN_APPLY}`);
        const $btnClear = $dropdown.find(`.${DROPDOWN_GUEST_CLASSES.BTN_CLEAR}`);

        return {
            ...super._getDomElements($dropdown),
            $btnApply,
            $btnClear,
        };
    }

    protected _initEventListeners(): void {
        super._initEventListeners();

        this._domElements.$counters.on(
            'click.dropdownGuest.updateBtnClear',
            this._handleCounterUpdate.bind(this)
        );

        this._domElements.$btnApply.on(
            'click.dropdownGuest.updateHead',
            this._handleBtnApplyClick.bind(this)
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
        this._domElements.$dropdownHead.dropdownHead('text', this._defaultHeadText);
        this._expanded(false);
    }

    private _handleCounterUpdate(): void {
        let isBtnClearHidden = true;

        this._domElements.$counters.each((index, element) => {
            if ($(element).dropdownCounter('value') !== 0) {
                isBtnClearHidden = false;
            }
        });

        this._domElements.$btnClear.button('hidden', isBtnClearHidden);
    }

    private _handleBtnApplyClick(): void {
        const counterValuesTable = this._getCounterValuesTable();

        this._domElements
            .$dropdownHead
            .dropdownHead('text', this._createGuestTextEntry(counterValuesTable));

        this._expanded(false);
    }

    private _createGuestTextEntry(counterValuesTable: {
        [index: string]: number;
    }): string {
        const headTextChunks: string[] = [];

        for (const group in counterValuesTable) {
            const variations = this._variationsTable[group];
            const groupValue = counterValuesTable[group];

            if (groupValue !== 0) {
                const wordVariation = this._getWordWithEnding(groupValue, variations);
                headTextChunks.push(`${groupValue} ${wordVariation}`);
            }
        }

        if (headTextChunks.length === 0) {
            return this._defaultHeadText;
        }

        return headTextChunks.join(', ');
    }
}

$(() => {
    $(`.${DROPDOWN_GUEST_CLASSES.DROPDOWN}`).each((index, element) => {
        new DropdownGuest($(element));
    });
});
