const ROOM_AMENITIES_CLASSES = {
    DROPDOWN: 'js-dropdown-room-amenities',
    DROPDOWN_HEAD: 'js-dropdown-head',
    COUNTER: 'js-dropdown-counter',
};

const CASE_TABLES = {
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
            const gradation = this._getIndexGraduation(value);

            if (value !== 0) {
                if (label === 'кровати') {
                    headTextChunks.push(`${value} ${CASE_TABLES['кровати'][gradation]}`);
                }

                if (label === 'спальни') {
                    headTextChunks.push(`${value} ${CASE_TABLES['спальни'][gradation]}`);
                }

                if (label === 'ванные комнаты') {
                    headTextChunks.push(`${value} ${CASE_TABLES['ванные комнаты'][gradation]}`);
                }
            }
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
}

$(`.${ROOM_AMENITIES_CLASSES.DROPDOWN}`).each((index, element) => {
    new DropdownRoomAmenities($(element));
});
