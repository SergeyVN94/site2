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
    const guestText: string[] = [];

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

const groupingElementValues = function groupingElementValues(values: CounterValue[]): {
    allGuests: number;
    adults: number;
    babies: number;
} {
    let allGuests = 0;
    let adults = 0;
    let babies = 0;
    values.forEach((currentValue) => {
        const text = currentValue.text.toLowerCase();
        if (text === 'взрослые' || text === 'дети') {
            adults += currentValue.value;
        } else {
            babies += currentValue.value;
        }

        allGuests += currentValue.value;
    });

    return {
        allGuests,
        adults,
        babies,
    };
};

export {
    getIndexGraduation,
    createGuestText,
    groupingElementValues,
};
