type CounterValue = {
    text: string;
    value?: number;
};

interface JQuery {
    dropdown: (
        command: 'expanded',
        args?: boolean
    ) => boolean | JQuery;
    dropdownHead: (
        command: 'set-theme' | 'remove-theme' | 'has-theme' | 'text',
        args?: string | boolean | JQuery
    ) => string | boolean | JQuery;
    dropdownCounter: (
        command: 'value' | 'reset' | 'label',
        args?: number
    ) => number | string | JQuery;
    calendar: (
        command: 'select-date',
        args: 'start' | 'end'
    ) => JQuery;
    button(this: JQuery, command: 'disable'): boolean;
    button(this: JQuery, command: 'disable', state: boolean): JQuery;
    button(this: JQuery, command: 'hidden'): boolean;
    button(this: JQuery, command: 'hidden', state: boolean): JQuery;
}
