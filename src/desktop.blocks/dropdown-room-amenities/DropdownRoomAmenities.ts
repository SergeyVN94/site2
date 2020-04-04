import Dropdown from '../dropdown/Dropdown';

class DropdownRoomAmenities extends Dropdown {
    constructor($dropdown: JQuery) {
        super($dropdown);
        this._initEventListeners();
    }

    protected _initEventListeners(): void {
        super._initEventListeners();

        this._domElements.$counters.on(
            'click.dropdownGuest.updateBtnClear',
            this._handleCounterUpdate.bind(this)
        );
    }

    private _handleCounterUpdate(): void {
        const counterValuesTable = this._getCounterValuesTable();
        const headTextChunks: string[] = [];

        for (const group in counterValuesTable) {
            const groupValue = counterValuesTable[group];
            if (groupValue) {
                const variations = this._variationsTable[group];
                headTextChunks.push(`${groupValue} ${this._getWordWithEnding(groupValue, variations)}`);
            }
        }

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
}

$(() => {
    $('.js-dropdown-room-amenities').each((index, element) => {
        new DropdownRoomAmenities($(element));
    });
});
