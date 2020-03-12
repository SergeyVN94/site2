const LIKE_BTN_CLASSES = {
    LIKE_BTN: 'js-like-button',
    CHECKED: 'like-button_checked',
    ICON: 'js-like-button__icon',
    COUNTER: 'js-like-button__counter',
};

class LikeButton {
    private readonly _$button: JQuery;
    private readonly _$icon: JQuery;
    private readonly _$counter: JQuery;
    private readonly _icons: {
        CHECKED: string;
        UNCHECKED: string;
    };
    private _likes: number;

    constructor($button: JQuery) {
        this._$button = $button;
        this._$icon = $button.find(`.${LIKE_BTN_CLASSES.ICON}`);
        this._$counter = $button.find(`.${LIKE_BTN_CLASSES.COUNTER}`);

        this._icons = {
            CHECKED: 'favorite',
            UNCHECKED: 'favorite_border',
        };

        this._initDomElements();
    }

    private _initDomElements(): void {
        this._$button.on(
            'click.likeButton.checked',
            this._handleLikeButtonClick.bind(this)
        );

        try {
            this._likes = parseInt(this._$counter.text(), 10);
        } catch (error) {
            console.error(error);
            this._likes = 0;
        }
    }

    private _handleLikeButtonClick(): void {
        const isChecked = this._$button.hasClass(LIKE_BTN_CLASSES.CHECKED);

        this._$button.toggleClass(LIKE_BTN_CLASSES.CHECKED, !isChecked);
        this._$icon.text(isChecked ? this._icons.UNCHECKED : this._icons.CHECKED);
        this._likes += isChecked ? -1 : 1;

        if (this._likes < 0) {
            this._likes = 0;
        }

        this._$counter.text(this._likes);
    }
}

$(`.${LIKE_BTN_CLASSES.LIKE_BTN}`).each((index, element) => {
    new LikeButton($(element));
});
