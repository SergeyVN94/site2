type DropdownHeadPlugin = (
    command: 'set-theme' | 'remove-theme',
    args?: 'expanded' | string,
) => void | string;
