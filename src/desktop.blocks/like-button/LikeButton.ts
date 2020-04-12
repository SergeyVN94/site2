const LIKE_BTN_CLASSES = {
    LIKE_BTN: 'js-like-button',
    CHECKED: 'like-button_checked',
    ICON: 'js-like-button__icon',
    COUNTER: 'js-like-button__counter',
};

class LikeButton {
    private readonly $button: JQuery;
    private readonly $icon: JQuery;
    private readonly $counter: JQuery;
    private readonly icons: {
        CHECKED: string;
        UNCHECKED: string;
    };
    private likes: number;

    constructor($button: JQuery) {
        this.$button = $button;
        this.$icon = $button.find(`.${LIKE_BTN_CLASSES.ICON}`);
        this.$counter = $button.find(`.${LIKE_BTN_CLASSES.COUNTER}`);

        this.icons = {
            CHECKED: 'favorite',
            UNCHECKED: 'favorite_border',
        };

        this._initDomElements();
    }

    private _initDomElements(): void {
        this.$button.on(
            'click.likeButton.checked',
            this._handleLikeButtonClick.bind(this)
        );

        try {
            this.likes = parseInt(this.$counter.text(), 10);
        } catch (error) {
            console.error(error);
            this.likes = 0;
        }
    }

    private _handleLikeButtonClick(): void {
        const isChecked = this.$button.hasClass(LIKE_BTN_CLASSES.CHECKED);

        this.$button.toggleClass(LIKE_BTN_CLASSES.CHECKED, !isChecked);
        this.$icon.text(isChecked ? this.icons.UNCHECKED : this.icons.CHECKED);
        this.likes += isChecked ? -1 : 1;

        if (this.likes < 0) {
            this.likes = 0;
        }

        this.$counter.text(this.likes);
    }
}

$(`.${LIKE_BTN_CLASSES.LIKE_BTN}`).each((index, element) => {
    new LikeButton($(element));
});
