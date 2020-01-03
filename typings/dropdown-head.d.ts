type DropdownHeadPlugin = (
    command: 'set-theme' | 'remove-theme' | 'value' | 'select-date',
    args?: 'expanded' | string | boolean,
) => void | string | boolean | JQuery;
