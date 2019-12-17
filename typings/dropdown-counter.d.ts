type DropdownCounterPlugin = (
    command: 'value' | 'reset',
    args?: number,
) => void | number;
