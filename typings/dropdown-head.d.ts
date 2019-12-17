type DropdownHeadPlugin = (
    command: 'set-theme' | 'remove-theme' | 'value',
    args?: 'expanded' | string,
) => void | string;
