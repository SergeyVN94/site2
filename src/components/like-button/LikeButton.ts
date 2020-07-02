const enum LIKE_BTN_CLASSES {
  LIKE_BTN = 'js-like-button',
  CHECKED = 'like-button_checked',
  ICON = 'js-like-button__icon',
  COUNTER = 'js-like-button__counter',
}

const enum LIKE_BTN_ICONS {
  CHECKED = 'favorite',
  UNCHECKED = 'favorite_border',
}

interface ILikeBtnDomElements {
  readonly $button: JQuery;
  readonly $icon: JQuery;
  readonly $counter: JQuery;
}

class LikeButton {
  private readonly domElements: ILikeBtnDomElements;

  private likes: number;

  constructor($button: JQuery) {
    this.domElements = LikeButton._getDomElements($button);
    this._initDomElements();
  }

  private static _getDomElements($button: JQuery): ILikeBtnDomElements {
    const $icon = $button.find(`.${LIKE_BTN_CLASSES.ICON}`);
    const $counter = $button.find(`.${LIKE_BTN_CLASSES.COUNTER}`);

    return {
      $button,
      $icon,
      $counter,
    };
  }

  private _initDomElements(): void {
    const {
      $button,
      $counter,
    } = this.domElements;

    $button.on(
      'click.likeButton.checked',
      this._handleLikeButtonClick.bind(this),
    );

    try {
      this.likes = parseInt($counter.text(), 10);
    } catch (error) {
      console.error(error);
      this.likes = 0;
    }
  }

  private _handleLikeButtonClick(): void {
    const {
      $button,
      $counter,
      $icon,
    } = this.domElements;
    const isChecked = $button.hasClass(LIKE_BTN_CLASSES.CHECKED);

    $button.toggleClass(LIKE_BTN_CLASSES.CHECKED, !isChecked);
    $icon.text(isChecked ? LIKE_BTN_ICONS.UNCHECKED : LIKE_BTN_ICONS.CHECKED);
    this.likes += isChecked ? -1 : 1;

    if (this.likes < 0) {
      this.likes = 0;
    }

    $counter.text(this.likes);
  }
}

$(`.${LIKE_BTN_CLASSES.LIKE_BTN}`).each((index, element) => {
  new LikeButton($(element));
});
