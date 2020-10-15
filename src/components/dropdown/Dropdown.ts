const enum DROPDOWN_CLASSES {
  DROPDOWN = 'js-dropdown',
  DROPDOWN_HEAD = 'js-dropdown__head',
  DROPDOWN_IS_OPENED = 'dropdown_opened',
  DROPDOWN_BODY = 'js-dropdown__body',
  BTN_PLUS = 'js-button[data-action="plus"]',
  BTN_MINUS = 'js-button[data-action="minus"]',
  BTN_APPLY = 'js-button[data-action="apply"]',
  BTN_CLEAR = 'js-button[data-action="clear"]',
  COUNTER_OUT = 'js-dropdown__counter-out',
  INPUT = 'js-dropdown__input',
}

interface IDropdownDomElements {
  readonly $dropdown: JQuery;
  readonly $dropdownHead: JQuery;
  readonly $dropdownBody: JQuery;
  readonly $countersOut: JQuery;
  readonly $headText: JQuery;
  readonly $btnApply: JQuery;
  readonly $btnClear: JQuery;
  readonly $document: JQuery<Document>;
}

interface ICounterValuesTable {
  [index: string]: number;
}

class Dropdown {
  private domElements: IDropdownDomElements;

  private readonly defaultHeadText: string;

  private readonly variationsTable: { [index: string]: [string, string, string] };

  private counterGroupsValues: { [index: string]: number };

  constructor($dropdown: JQuery) {
    this.domElements = Dropdown._getDomElements($dropdown);
    this.defaultHeadText = this.domElements.$headText.val().toString();
    this.variationsTable = $dropdown.data('variations');
    this.counterGroupsValues = {};
    this._resetGroupsValues();
    this._initEventListeners();
  }

  private _resetGroupsValues(): void {
    this.counterGroupsValues = {};
    this.domElements.$countersOut.each((index, out) => {
      const group = $(out).data('group');
      this.counterGroupsValues[group] = 0;
    });
  }

  private static _getDomElements($dropdown: JQuery): IDropdownDomElements {
    return {
      $dropdown,
      $dropdownHead: $dropdown.find(`.${DROPDOWN_CLASSES.DROPDOWN_HEAD}`),
      $dropdownBody: $dropdown.find(`.${DROPDOWN_CLASSES.DROPDOWN_BODY}`),
      $countersOut: $dropdown.find(`.${DROPDOWN_CLASSES.COUNTER_OUT}`),
      $headText: $dropdown.find(`.${DROPDOWN_CLASSES.INPUT}`),
      $btnApply: $dropdown.find(`.${DROPDOWN_CLASSES.BTN_APPLY}`),
      $btnClear: $dropdown.find(`.${DROPDOWN_CLASSES.BTN_CLEAR}`),
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

  private static _cropHeadText(head: string): string {
    const words = head.split(' ');

    if (words.length < 5) {
      return head;
    }

    const firstFourWords = words.slice(0, 4);
    const lastWord = firstFourWords[firstFourWords.length - 1];

    if (lastWord.endsWith(',')) {
      firstFourWords[firstFourWords.length - 1] = lastWord.slice(0, -1);
    }

    return `${firstFourWords.join(' ')}...`;
  }

  private _initEventListeners(): void {
    const { $dropdownHead, $dropdownBody } = this.domElements;

    $dropdownHead.on('click.dropdown.expanded', this._handleDropdownHeadClick.bind(this));
    $dropdownBody.on(
      'click.dropdown.selectControl',
      '.js-button',
      this._handleButtonClick.bind(this),
    );
  }

  private _updateDropdownHeadText(): boolean {
    const { $headText } = this.domElements;

    if (this.countSumCounters() === 0) {
      $headText.val(this.defaultHeadText);
      return true;
    }

    const headTextItems: string[] = [];

    Object.keys(this.counterGroupsValues).forEach((group) => {
      const groupValue = this.counterGroupsValues[group];
      const word = Dropdown._getWordWithEnding(groupValue, this.variationsTable[group]);
      if (groupValue > 0) headTextItems.push(`${groupValue} ${word}`);
    });

    if (!headTextItems.length) {
      $headText.val(this.defaultHeadText);
      return true;
    }

    const headText = headTextItems.join(', ');
    $headText.val(Dropdown._cropHeadText(headText));

    return true;
  }

  private countSumCounters(): number {
    return Object.keys(this.counterGroupsValues).reduce((accumulator: number, key: string) => {
      const counterValue = this.counterGroupsValues[key];
      return (accumulator + (typeof counterValue === 'number' ? counterValue : 0));
    }, 0);
  }

  private _resetDropdown(): void {
    this._resetGroupsValues();

    const { $countersOut, $btnClear, $headText } = this.domElements;

    $countersOut.each((index, out) => {
      $(out)
        .text(0)
        .parent()
        .find(`.${DROPDOWN_CLASSES.BTN_MINUS}`)
        .button('disable', true);
    });

    $btnClear.button('hidden', true);
    $headText.val(this.defaultHeadText);
  }

  private _handleDocumentClick(ev: JQuery.MouseEventBase): void {
    const { $document, $dropdown } = this.domElements;
    const isHidden = $(ev.target).parents(`.${DROPDOWN_CLASSES.DROPDOWN}`).length === 0;

    if (isHidden) {
      $dropdown.removeClass(DROPDOWN_CLASSES.DROPDOWN_IS_OPENED);
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
      const $out = $controls.find(`.${DROPDOWN_CLASSES.COUNTER_OUT}`);
      const $btnMinus = isBtnMinus ? $button : $controls.find(`.${DROPDOWN_CLASSES.BTN_MINUS}`);
      const group = $out.data('group');

      if (isBtnPlus) this.counterGroupsValues[group] += 1;
      if (isBtnMinus && this.counterGroupsValues[group]) this.counterGroupsValues[group] -= 1;

      $btnMinus.button('disable', this.counterGroupsValues[group] === 0);
      $out.text(this.counterGroupsValues[group]);

      this._updateDropdownHeadText();
      this.domElements.$btnClear.button('hidden', this.countSumCounters() === 0);
    }

    if (isBtnClear) this._resetDropdown();
    if (isBtnApply) this.domElements.$dropdown.removeClass(DROPDOWN_CLASSES.DROPDOWN_IS_OPENED);
  }

  private _handleDropdownHeadClick(): void {
    const { $dropdown, $document } = this.domElements;
    $dropdown.toggleClass(DROPDOWN_CLASSES.DROPDOWN_IS_OPENED);

    if ($dropdown.hasClass(DROPDOWN_CLASSES.DROPDOWN_IS_OPENED)) {
      $document.on('click.document.dropdown.unexpended', this._handleDocumentClick.bind(this));
    }
  }
}

$(() => {
  $(`.${DROPDOWN_CLASSES.DROPDOWN}`).each((index, element) => {
    new Dropdown($(element));
  });
});
