class MaskedTextField {
  private readonly $input: JQuery;

  private lastValue: string;

  private readonly mask: string;

  constructor($input: JQuery, mask: string) {
    this.$input = $input;
    this.lastValue = '';
    this.mask = mask;
    $input.on('input.maskedTextField.checkValue', this._handleInputInput.bind(this));
  }

  private _handleInputInput(): void {
    const currentValue = String(this.$input.val());
    this.lastValue = this._checkValue(currentValue);

    const input = (this.$input.get()[0] as HTMLInputElement);
    const cursorPosition = input.selectionStart;

    this.$input.val(this.lastValue);

    if (cursorPosition !== currentValue.length) {
      input.selectionStart = cursorPosition;
      input.selectionEnd = cursorPosition;
    }
  }

  private _checkValue(value: string): string {
    if (value.length > this.mask.length) return this.lastValue;

    const numbers = value.match(/\d/g) || [];
    const numItems = this.mask.match(/[0]/g) || [];

    if (numbers.length > numItems.length && numItems.length) return this.lastValue;

    const newItems: string[] = [];

    for (let i = 0, j = 0; j < numbers.length; i += 1) {
      if (this.mask[i] !== '0') newItems.push(this.mask[i]);
      else {
        newItems.push(numbers[j]);
        j += 1;
      }
    }

    return newItems.join('');
  }
}

$('.js-text-field').each((index, element) => {
  const $textField = $(element);
  const mask = String($textField.data('mask') || '');

  if (mask.length) new MaskedTextField($textField.find('input'), mask);
});
