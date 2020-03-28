const ROOM_AMENITIES_CLASSES = {
    DROPDOWN: 'js-dropdown-room-amenities',
    DROPDOWN_HEAD: 'js-dropdown-head',
    COUNTER: 'js-dropdown-counter',
};

const CASE_TABLES: {
    [index: string]: [string, string, string];
} = {
    спальни: [
        'спальня',
        'спальни',
        'спален',
    ],
    кровати: [
        'кровать',
        'кровати',
        'кроватей',
    ],
    'ванные комнаты': [
        'ванная комната',
        'ванные комнаты',
        'ванныx комнат',
    ],
};

interface IDropdownRoomAmenitiesDomElements {
    $dropdown: JQuery;
    $dropdownHead: JQuery;
    $counters: JQuery;
}

class DropdownRoomAmenities {
    private readonly _domElements: IDropdownRoomAmenitiesDomElements;
    private readonly _defaultHeadText: string;

    constructor($dropdown: JQuery) {
        this._domElements = this._getDomElements($dropdown);
        this._initEventListeners();
        this._defaultHeadText = 'Удобства номера';
    }

    private _getDomElements($dropdown: JQuery): IDropdownRoomAmenitiesDomElements {
        const $dropdownHead = $dropdown.find(`.${ROOM_AMENITIES_CLASSES.DROPDOWN_HEAD}`);
        const $counters = $dropdown.find(`.${ROOM_AMENITIES_CLASSES.COUNTER}`);

        return {
            $dropdown,
            $dropdownHead,
            $counters,
        };
    }

    private _initEventListeners(): void {
        this._domElements.$counters.on(
            'click.dropdownGuest.updateBtnClear',
            this._handleCounterUpdate.bind(this)
        );
    }

    private _handleCounterUpdate(): void {
        const headTextChunks: string[] = [];

        this._domElements.$counters.each((index, element) => {
            const $counter = $(element);
            const label = String($counter.dropdownCounter('label')).toLowerCase();
            const value = Number($counter.dropdownCounter('value'));
            const words = CASE_TABLES[label];
            headTextChunks.push(`${value} ${this._getWordWithEnding(value, words)}`);
        });

        if (headTextChunks.length > 0) {
            this._domElements.$dropdownHead.dropdownHead('text', this._cropHeadText(headTextChunks.join(', ')));
        } else {
            this._domElements.$dropdownHead.dropdownHead('text', this._defaultHeadText);
        }
    }

    private _cropHeadText(head: string): string {
        const words = head.split(' ');

        if (words.length < 4) {
            return head;
        }

        const firstFourWords = words.slice(0, 4);
        const lastWord = firstFourWords[firstFourWords.length - 1];

        if (lastWord.endsWith(',')) {
            firstFourWords[firstFourWords.length - 1] = lastWord.slice(0, -1);
        }

        return `${firstFourWords.join(' ')}...`;
    }

    private _getWordWithEnding(value: number, words: [string, string, string]): string {
        const [
            digitOne,
            digitZero,
        ] = `0${value}`
            .slice(-2)
            .split('')
            .map((digit) => {
                return parseInt(digit, 10);
            });

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
}

$(`.${ROOM_AMENITIES_CLASSES.DROPDOWN}`).each((index, element) => {
    new DropdownRoomAmenities($(element));
});
