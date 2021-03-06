import DROPDOWN_SELECTORS, { IDomElements } from './config';

class Dropdown {
  private domElements: IDomElements;

  private readonly variationsTable: { [index: string]: [string, string, string] };

  constructor($dropdown: JQuery) {
    this.domElements = Dropdown._getDomElements($dropdown);
    this.variationsTable = $dropdown.data('variations');
    this._initEventListeners();
  }

  private static _getDomElements($dropdown: JQuery): IDomElements {
    return {
      $dropdown,
      $dropdownHead: $dropdown.find(`.${DROPDOWN_SELECTORS.DROPDOWN_HEAD}`),
      $dropdownBody: $dropdown.find(`.${DROPDOWN_SELECTORS.DROPDOWN_BODY}`),
      $countersOut: $dropdown.find(`.${DROPDOWN_SELECTORS.COUNTER_OUT}`),
      $input: $dropdown.find(`.${DROPDOWN_SELECTORS.INPUT}`),
      $btnClear: $dropdown.find(DROPDOWN_SELECTORS.BTN_CLEAR),
      $document: $(document),
    };
  }

  private static _getWordWithEnding(value: number, words: [string, string, string]): string {
    const tens = Math.floor(value / 10) % 10;
    const units = value % 10;
    const isUnitsEqualToOne = units === 1;
    const isTensEqualToOne = tens === 1;
    const isUnitsBetweenOneAndFive = units > 1 && units < 5;

    if (isUnitsEqualToOne && !isTensEqualToOne) {
      return words[0];
    }

    if (isUnitsBetweenOneAndFive && !isTensEqualToOne) {
      return words[1];
    }

    return words[2];
  }

  private _initEventListeners(): void {
    const { $dropdownHead, $dropdownBody } = this.domElements;

    $dropdownHead.on('click.dropdown.expanded', this._handleDropdownHeadClick.bind(this));
    $dropdownBody.on(
      'click.dropdown.selectControl',
      'button',
      this._handleButtonClick.bind(this),
    );
  }

  private _updateDropdownHeadText(): void {
    const groupsValues: { [index: string]: number } = {};

    this.domElements.$countersOut.each((_, counterOut) => {
      const { group } = counterOut.dataset;
      const count = parseInt(counterOut.textContent, 10);

      if (group && !Number.isNaN(count)) {
        if (count) {
          groupsValues[group] = typeof groupsValues[group] === 'number'
            ? groupsValues[group] + count
            : count;
        }
      } else {
        console.error(new Error('Failed to get value from counter'));
      }
    });

    const headText = Object.keys(groupsValues)
      .map((group) => {
        const count = groupsValues[group];
        const word = Dropdown._getWordWithEnding(count, this.variationsTable[group]);
        return `${count} ${word}`;
      })
      .join(', ');

    this.domElements.$input.val(headText);
  }

  private _countSumCounters(): number {
    let sum = 0;

    this.domElements.$countersOut.each((_, counterOut) => {
      const count = parseInt(counterOut.textContent, 10);
      if (!Number.isNaN(count)) sum += count;
    });

    return sum;
  }

  private _resetDropdown(): void {
    const { $countersOut, $btnClear, $input } = this.domElements;

    $countersOut.each((_, out) => {
      $(out)
        .text(0)
        .parent()
        .find(DROPDOWN_SELECTORS.BTN_MINUS)
        .attr('disabled', 'disabled');
    });

    $btnClear.parent().toggleClass(DROPDOWN_SELECTORS.BTN_CLEAR_HIDDEN, true);
    $input.val('');
  }

  private _handleDocumentClick(ev: JQuery.MouseEventBase): void {
    const { $document, $dropdown } = this.domElements;
    const isHidden = $(ev.target).parents(`.${DROPDOWN_SELECTORS.DROPDOWN}`).length === 0;

    if (isHidden) {
      $dropdown.removeClass(DROPDOWN_SELECTORS.DROPDOWN_IS_OPENED);
      $document.off('click.document.dropdown.unexpended');
    }
  }

  private _handleButtonClick(ev: JQuery.MouseEventBase): void {
    const $button = $(ev.currentTarget);

    const isBtnPlus = $button.data('action') === 'plus';
    const isBtnMinus = $button.data('action') === 'minus';
    const isBtnApply = $button.data('action') === 'apply';
    const isBtnClear = $button.data('action') === 'clear';

    if (isBtnPlus || isBtnMinus) {
      const $controls = $button.parent();
      const $out = $controls.find(`.${DROPDOWN_SELECTORS.COUNTER_OUT}`);
      const $btnMinus = isBtnMinus ? $button : $controls.find(DROPDOWN_SELECTORS.BTN_MINUS);
      let outCount = parseInt($out.text(), 10);

      if (Number.isNaN(outCount)) outCount = 0;

      if (isBtnPlus) outCount += 1;
      if (isBtnMinus && outCount) outCount -= 1;

      (outCount === 0)
        ? $btnMinus.attr('disabled', 'disabled')
        : $btnMinus.removeAttr('disabled');

      $out.text(outCount);

      this._updateDropdownHeadText();
      this.domElements.$btnClear.parent().toggleClass(
        DROPDOWN_SELECTORS.BTN_CLEAR_HIDDEN, this._countSumCounters() === 0,
      );
    }

    if (isBtnClear) this._resetDropdown();
    if (isBtnApply) this.domElements.$dropdown.removeClass(DROPDOWN_SELECTORS.DROPDOWN_IS_OPENED);
  }

  private _handleDropdownHeadClick(): void {
    const { $dropdown, $document } = this.domElements;
    $dropdown.toggleClass(DROPDOWN_SELECTORS.DROPDOWN_IS_OPENED);

    if ($dropdown.hasClass(DROPDOWN_SELECTORS.DROPDOWN_IS_OPENED)) {
      $document.on('click.document.dropdown.unexpended', this._handleDocumentClick.bind(this));
    }
  }
}

$(() => {
  $(`.${DROPDOWN_SELECTORS.DROPDOWN}`).each((index, element) => {
    new Dropdown($(element));
  });
});
