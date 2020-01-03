const getCounterValues = function getDropdownCounterValues($dropdown: JQuery): CounterValue[] {
    return $dropdown.dropdown('counters') as CounterValue[];
};

export { getCounterValues };
