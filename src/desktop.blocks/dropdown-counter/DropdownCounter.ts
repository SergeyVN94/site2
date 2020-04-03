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
    private readonly _label: string;
    private readonly _group: string;

    constructor($counter: JQuery) {
        this._domElements = this._getDomElements($counter);
        const {
            $label,
            $out,
        } = this._domElements;

        try {
            const valueStr = $out.text();
            this._value = parseInt(valueStr, 10);
        } catch (error) {
            console.error(error);
            this._value = 0;
            $out.text(0);
        }

        this._label = $label.text();
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

    public getLabel(): string {
        return this._label;
    }

    public getGroup(): string {
        return this._group;
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
                return counter.value;
            }

            counter.value = args;
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
