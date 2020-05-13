const enum COUNTER_CLASSES {
  BUTTON = 'js-button',
  OUT = 'js-dropdown-counter__out',
  BTN_MINUS = 'js-button_action_minus',
  BTN_PLUS = 'js-button_action_plus',
  COUNTER = 'js-dropdown-counter',
}

interface ICounterDomElements {
  readonly $counter: JQuery;
  readonly $buttons: JQuery;
  readonly $btnMinus: JQuery;
  readonly $out: JQuery;
}

class DropdownCounter {
  private readonly domElements: ICounterDomElements;

  private count: number;

  private readonly group: string;

  constructor($counter: JQuery) {
    this.domElements = DropdownCounter._getDomElements($counter);
    const { $out } = this.domElements;

    try {
      const valueStr = $out.text();
      this.count = parseInt(valueStr, 10);
    } catch (error) {
      console.error(error);
      this.count = 0;
      $out.text(0);
    }

    this.group = $counter.data('group') || '';

    this._updateButtons();
    this._initEventListeners();
  }

  public set value(value: number) {
    const { $out } = this.domElements;

    if (value >= 0) {
      this.count = value;
      $out.text(value);
    } else {
      this.count = 0;
      $out.text(0);
    }

    this._updateButtons();
  }

  public get value(): number {
    return this.count;
  }

  public reset(): void {
    this.value = 0;
  }

  public getGroup(): string {
    return this.group;
  }

  private static _getDomElements($counter: JQuery): ICounterDomElements {
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
    const btnMinusIsDisable = this.count === 0;
    this.domElements.$btnMinus.button('disable', btnMinusIsDisable);
  }

  private _initEventListeners(): void {
    this.domElements.$buttons.on(
      'click.dropdownCounter.update',
      this._handleButtonClick.bind(this),
    );
  }

  private _handleButtonClick(ev: JQuery.MouseEventBase): boolean {
    const $target = $(ev.currentTarget);

    if ($target.hasClass(COUNTER_CLASSES.BTN_PLUS)) {
      this.count += 1;
    }

    if ($target.hasClass(COUNTER_CLASSES.BTN_MINUS)) {
      this.count -= 1;

      if (this.count < 0) {
        this.count = 0;
      }
    }

    this.domElements.$out.text(this.count);
    this._updateButtons();
    this.domElements.$counter.trigger('update', [this.count]);

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
