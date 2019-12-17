type DropdownPlugin = (
    command: 'expand' | 'counters',
    args?: boolean | CounterValue,
) => void | boolean | CounterValue[];
