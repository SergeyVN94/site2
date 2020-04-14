const enum DROPDOWN_CLASSES {
    DROPDOWN_HEAD = 'js-dropdown-head',
    DROPDOWN_EXPANDED = 'dropdown_expanded',
    COUNTER = 'js-dropdown-counter',
}

interface IDropdownDomElements {
    readonly $dropdown: JQuery;
    readonly $dropdownHead: JQuery;
    readonly $counters: JQuery;
}

interface ICounterValuesTable {
    [index: string]: number;
}

class Dropdown {
    protected domElements: IDropdownDomElements;
    protected readonly defaultHeadText: string;
    protected readonly variationsTable: {
        [index: string]: [string, string, string];
    };
    private isExpanded: boolean;

    constructor($dropdown: JQuery) {
        this.domElements = this._getDomElements($dropdown);
        const { $dropdownHead } = this.domElements;
        this.defaultHeadText = $dropdownHead.dropdownHead('text');
        this.variationsTable = $dropdown.data('variations');
        this.isExpanded = $dropdown.hasClass(DROPDOWN_CLASSES.DROPDOWN_EXPANDED);
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

        this.domElements.$counters.each((index, element) => {
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
        const { $dropdownHead } = this.domElements;

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
        } = this.domElements;

        $dropdown.toggleClass(DROPDOWN_CLASSES.DROPDOWN_EXPANDED, state);
        $dropdownHead.dropdownHead((state ? 'set-theme' : 'remove-theme'), 'expanded');
        this.isExpanded = state;
    }

    private _handleDropdownHeadClick(): void {
        this.isExpanded = !this.isExpanded;
        this._expanded(this.isExpanded);
    }
}

export default Dropdown;
export {
    ICounterValuesTable,
    IDropdownDomElements,
};
