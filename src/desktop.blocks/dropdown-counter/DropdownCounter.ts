const COUNTER_CLASSES = {
    BUTTON: 'js-button',
    OUT: 'js-text_assignment_count-out',
    BTN_MINUS: 'js-button_action_minus',
    BTN_PLUS: 'js-button_action_plus',
    COUNTER: 'js-dropdown-counter',
};

interface ICounterDomElements {
    $counter: JQuery;
    $buttons: JQuery;
    $btnMinus: JQuery;
    $out: JQuery;
}

class DropdownCounter {
    private readonly _domElements: ICounterDomElements;
    private _value: number;
    private readonly _group: string;

    constructor($counter: JQuery) {
        this._domElements = this._getDomElements($counter);
        const { $out } = this._domElements;

        try {
            const valueStr = $out.text();
            this._value = parseInt(valueStr, 10);
        } catch (error) {
            console.error(error);
            this._value = 0;
            $out.text(0);
        }

        this._group = $counter.data('group') || '';

        this._updateButtons();
        this._initEventListeners();
    }

    public set value(value: number) {
        const { $out } = this._domElements;

        if (value >= 0) {
            this._value = value;
            $out.text(value);
        } else {
            this._value = 0;
            $out.text(0);
        }

        this._updateButtons();
    }

    public get value(): number {
        return this._value;
    }

    public reset(): void {
        this.value = 0;
    }

    public getGroup(): string {
        return this._group;
    }

    private _getDomElements($counter: JQuery): ICounterDomElements {
        const $buttons = $counter.find(`.${COUNTER_CLASSES.BUTTON}`);
        const $btnMinus = $counter.find(`.${COUNTER_CLASSES.BTN_MINUS}`);
        const $out = $counter.find(`.${COUNTER_CLASSES.OUT}`);

        return {
            $counter,
            $buttons,
            $btnMinus,
            $out,
        };
    }

    private _updateButtons(): void {
        const btnMinusIsDisable = this._value === 0;
        this._domElements.$btnMinus.button('disable', btnMinusIsDisable);
    }

    private _initEventListeners(): void {
        this._domElements.$buttons.on(
            'click.dropdownCounter.update',
            this._handleButtonClick.bind(this)
        );
    }

    private _handleButtonClick(ev: JQuery.MouseEventBase): boolean {
        const $target = $(ev.currentTarget);

        if ($target.hasClass(COUNTER_CLASSES.BTN_PLUS)) {
            this._value += 1;
        }

        if ($target.hasClass(COUNTER_CLASSES.BTN_MINUS)) {
            this._value -= 1;

            if (this._value < 0) {
                this._value = 0;
            }
        }

        this._domElements.$out.text(this._value);
        this._updateButtons();
        this._domElements.$counter.trigger('update', [this._value]);

        return true;
    }
}

// eslint-disable-next-line @typescript-eslint/unbound-method
$.fn.dropdownCounter = function dropdownCounterPlugin(
    this: JQuery,
    command: 'value' | 'reset' | 'group',
    args: number = null,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
    const counter: DropdownCounter = this.data('counter');

    switch (command) {
        case 'reset':
            counter.reset();
            return this;

        case 'value':
            if (args === null) {
                return counter.value;
            }

            counter.value = args;
            return this;

        case 'group':
            return counter.getGroup();

        default:
            throw new Error(`Unknown command '${command}'`);
    }
};

$(`.${COUNTER_CLASSES.COUNTER}`).each((index, element) => {
    const $counter = $(element);
    $counter.data('counter', new DropdownCounter($counter));
});
