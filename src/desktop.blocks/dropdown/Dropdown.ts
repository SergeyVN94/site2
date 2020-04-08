const DROPDOWN_CLASSES = {
    DROPDOWN_HEAD: 'js-dropdown-head',
    DROPDOWN_EXPANDED: 'dropdown_expanded',
    COUNTER: 'js-dropdown-counter',
};

interface IDropdownDomElements {
    $dropdown: JQuery;
    $dropdownHead: JQuery;
    $counters: JQuery;
}

interface ICounterValuesTable {
    [index: string]: number;
}

class Dropdown {
    protected _domElements: IDropdownDomElements;
    protected readonly _defaultHeadText: string;
    protected readonly _variationsTable: {
        [index: string]: [string, string, string];
    };
    private _isExpanded: boolean;

    constructor($dropdown: JQuery) {
        this._domElements = this._getDomElements($dropdown);
        const { $dropdownHead } = this._domElements;
        this._defaultHeadText = $dropdownHead.dropdownHead('text');
        this._variationsTable = $dropdown.data('variations');
        this._isExpanded = $dropdown.hasClass(DROPDOWN_CLASSES.DROPDOWN_EXPANDED);
    }

    protected _getDomElements($dropdown: JQuery): IDropdownDomElements {
        const $dropdownHead = $dropdown.find(`.${DROPDOWN_CLASSES.DROPDOWN_HEAD}`);
        const $counters = $dropdown.find(`.${DROPDOWN_CLASSES.COUNTER}`);

        return {
            $dropdown,
            $dropdownHead,
            $counters,
        };
    }

    protected _getCounterValuesTable(): ICounterValuesTable {
        const counterValuesTable: ICounterValuesTable = {};

        this._domElements.$counters.each((index, element) => {
            const $counter = $(element);
            const group = $counter.dropdownCounter('group');
            const value = $counter.dropdownCounter('value');
            if (counterValuesTable[group]) {
                counterValuesTable[group] += value;
            } else {
                counterValuesTable[group] = value;
            }
        });

        return counterValuesTable;
    }

    protected _initEventListeners(): void {
        const { $dropdownHead } = this._domElements;

        $dropdownHead.on(
            'click.dropdown.expanded',
            this._handleDropdownHeadClick.bind(this)
        );
    }

    protected _getWordWithEnding(value: number, words: [string, string, string]): string {
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

    protected _expanded(state: boolean): void {
        const {
            $dropdown,
            $dropdownHead,
        } = this._domElements;

        $dropdown.toggleClass(DROPDOWN_CLASSES.DROPDOWN_EXPANDED, state);
        $dropdownHead.dropdownHead((state ? 'set-theme' : 'remove-theme'), 'expanded');
        this._isExpanded = state;
    }

    private _handleDropdownHeadClick(): void {
        this._isExpanded = !this._isExpanded;
        this._expanded(this._isExpanded);
    }
}

export default Dropdown;
export {
    ICounterValuesTable,
    IDropdownDomElements,
};
