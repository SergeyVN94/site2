import CASE_TABLES from './case-tables';

const CLASSES = {
    DROPDOWN: 'js-dropdown-room-amenities',
    BTN_PLUS: 'js-dropdown-counter__btn-plus',
    BTN_MINUS: 'js-dropdown-counter__btn-minus',
    HEAD: 'js-dropdown-head',
};

const DEFAULT_TEXT = 'Удобства номера';

const getCaseNumber = function calcIndexGraduation(index: number): number {
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

const createNewHeadText = function createNewHeadText(values: CounterValue[]): string {
    const headText: string[] = [];

    values.forEach((item) => {
        if (
            item.value > 0 &&
            Object.prototype.hasOwnProperty.apply(CASE_TABLES, [item.text])
        ) {
            const phraseList: string[] = CASE_TABLES[item.text];

            const endingIndex = getCaseNumber(item.value);
            headText.push(`${item.value} ${phraseList[endingIndex]}`);
        }
    });

    return headText.join(', ');
};

const cropTextToDesiredLength = function cropTextToDesiredLength(
    text: string,
    maxLength: number
): string {
    if (text.length <= maxLength) {
        return text;
    }

    let lenNewText = 0;
    const newText: string[] = [];

    text.split(', ').forEach((phrase) => {
        if (lenNewText + phrase.length <= maxLength) {
            newText.push(phrase);
            lenNewText += phrase.length;
        } else {
            const phraseSlice = phrase
                .split(' ')
                .slice(0, 2)
                .join(' ');

            if (lenNewText + phraseSlice.length <= maxLength) {
                newText.push(phraseSlice);
                lenNewText += phraseSlice.length;
            }
        }
    });

    return `${newText.join(', ')}...`;
};

const addCounterValues = function addCounterValues(values: CounterValue[]): number {
    let sum = 0;

    values.forEach((item) => {
        sum += item.value;
    });

    return sum;
};

const dropdownCounterUpdateHandler = function handler(e: JQuery.MouseEventBase): void {
    const $dropdown = $(e.delegateTarget);
    const $dropdownHead = $dropdown.find(`.${CLASSES.HEAD}`);

    const values = $dropdown.dropdown('counters') as CounterValue[];
    const sumValues = addCounterValues(values);

    if (sumValues === 0) {
        $dropdownHead.dropdownHead('value', DEFAULT_TEXT);
    } else {
        const newText = createNewHeadText(values);
        const textSlice = cropTextToDesiredLength(newText, 22);
        $dropdownHead.dropdownHead('value', textSlice);
    }
};

$(`.${CLASSES.DROPDOWN}`).on(
    'click.room-amenities.handler',
    `.${CLASSES.BTN_MINUS}, .${CLASSES.BTN_PLUS}`,
    dropdownCounterUpdateHandler
);
