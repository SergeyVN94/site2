type CalendarPlugin = (
    command: 'select-date',
    args?: 'start' | 'end',
) => void | JQuery;
