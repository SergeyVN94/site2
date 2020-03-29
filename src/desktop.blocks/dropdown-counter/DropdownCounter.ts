const COUNTER_CLASSES = {
    OUT: 'js-dropdown-counter__out',
    LABEL: 'js-dropdown-counter__label',
    BTN_MINUS: 'js-dropdown-counter__btn-minus',
    BTN_PLUS: 'js-dropdown-counter__btn-plus',
    BUTTON: 'js-dropdown-counter__btn',
    COUNTER: 'js-dropdown-counter',
};

interface ICounterDomElements {
    $counter: JQuery;
    $buttons: JQuery;
    $btnPlus: JQuery;
    $btnMinus: JQuery;
    $out: JQuery;
    $label: JQuery;
}

class DropdownCounter {
    private readonly _domElements: ICounterDomElements;
    private _value: number;
    private readonly _labelText: string;

    constructor($counter: JQuery) {
        this._domElements = this._getDomElements($counter);

        try {
            const valueStr = this._domElements.$out.text();
            this._value = parseInt(valueStr, 10);
        } catch (error) {
            console.error(error);
            this._value = 0;
            this._domElements.$out.text(0);
        }

        this._labelText = this._domElements.$label.text();

        this._updateButtons();
        this._initEventListeners();
    }

    public reset(): void {
        this.setValue(0);
    }

    public getValue(): number {
        return this._value;
    }

    public setValue(value: number): void {
        if (value >= 0) {
            this._value = value;
            this._domElements.$out.text(value);
        } else {
            this._value = 0;
            this._domElements.$out.text(0);
        }

        this._updateButtons();
    }

    public getLabel(): string {
        return this._labelText;
    }

    private _getDomElements($counter: JQuery): ICounterDomElements {
        const $buttons = $counter.find(`.${COUNTER_CLASSES.BUTTON}`);
        const $btnPlus = $counter.find(`.${COUNTER_CLASSES.BTN_PLUS}`);
        const $btnMinus = $counter.find(`.${COUNTER_CLASSES.BTN_MINUS}`);
        const $out = $counter.find(`.${COUNTER_CLASSES.OUT}`);
        const $label = $counter.find(`.${COUNTER_CLASSES.LABEL}`);

        return {
            $counter,
            $buttons,
            $btnPlus,
            $btnMinus,
            $out,
            $label,
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

    private _handleButtonClick(ev: JQuery.MouseEventBase): void {
        const $btn = $(ev.currentTarget);

        if ($btn.hasClass(COUNTER_CLASSES.BTN_PLUS)) {
            this._value += 1;
        }

        if ($btn.hasClass(COUNTER_CLASSES.BTN_MINUS)) {
            this._value -= 1;

            if (this._value < 0) {
                this._value = 0;
            }
        }

        this._domElements.$out.text(this._value);
        this._updateButtons();
        this._domElements.$counter.trigger('update', [this._value]);
    }
}

$.fn.dropdownCounter = function dropdownCounterPlugin(
    this: JQuery,
    command: 'value' | 'reset' | 'label',
    args: number = null,
): number | string | JQuery {
    const counter: DropdownCounter = this.data('counter');

    switch (command) {
        case 'reset':
            counter.reset();
            return this;

        case 'value':
            if (args === null) {
                return counter.getValue();
            }

            counter.setValue(args);
            return this;

        case 'label':
            return counter.getLabel();

        default:
            throw new Error(`Unknown command '${command}'`);
    }
};

$(`.${COUNTER_CLASSES.COUNTER}`).each((index, element) => {
    const $counter = $(element);
    $counter.data('counter', new DropdownCounter($counter));
});
