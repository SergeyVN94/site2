const isCorrectDateStr = function isCorrectDateStr(dateStr: string): boolean {
    return /\d{1,2}\.\d{1,2}\.\d{4}/i.test(dateStr);
};

const dateToString = function dateToString(date: Date): string {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

const parseDateString = function dateStrToDate(dateStr: string): Date {
    const [
        day,
        month,
        year,
    ] = dateStr.split('.').map<number>((item) => {
        return parseInt(item, 10);
    });

    return new Date(year, month - 1, day);
};

const getStartAndEndRange = function getStartAndEndRange($calendar: JQuery): {
    start: Date;
    end: Date;
} {
    const startStr = $calendar.attr('data-range-start');
    const endStr = $calendar.attr('data-range-end');

    let start: Date = null;
    let end: Date = null;

    if (isCorrectDateStr(startStr)) {
        start = parseDateString(startStr);
    }

    if (isCorrectDateStr(endStr)) {
        end = parseDateString(endStr);
    }

    return {
        start,
        end,
    };
};

const xor = function xor(...args: boolean[]): boolean {
    if (args.length < 2) {
        throw new TypeError('Expected at least 2 parameters');
    }

    let flag = false;

    args.reduce((previous: boolean, current: boolean): boolean => {
        if (previous !== current) {
            flag = true;
        }

        return false;
    });

    return flag;
};

export {
    isCorrectDateStr,
    dateToString,
    parseDateString,
    getStartAndEndRange,
    xor,
};
