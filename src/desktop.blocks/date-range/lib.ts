const dateToString = function dateToString(date: Date): string {
    const day = `0${String(date.getDate())}`.slice(-2);
    const month = `0${String(date.getMonth() + 1)}`.slice(-2);
    return `${day}.${month}.${date.getFullYear()}`;
};

export {
    dateToString,
};
