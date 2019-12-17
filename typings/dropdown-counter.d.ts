type CounterValue = {
    text: string,
    value?: number,
}

type DropdownCounterPlugin = (
    command: 'value' | 'reset' | 'text',
    args?: number,
) => void | number | string;
