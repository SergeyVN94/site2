const IMAGE_SLIDER_CLASSES = {
    SLIDER: 'js-image-slider',
    IMAGE: 'image-slider__image',
    IMAGE_SELECTED: 'image-slider__image_selected',
    INDICATOR: 'js-image-slider__indicator',
    INDICATOR_SELECTED: 'image-slider__indicator_theme_selected',
    NAV_BTN: 'js-image-slider__nav-button',
    BTN_PREV: 'js-image-slider__nav-button_action_prev-img',
    BTN_NEXT: 'js-image-slider__nav-button_action_next-img',
    INDEX_ITEM: 'js-image-slider__image_index-item',
};

interface IImageSliderDomElements {
    $slider: JQuery;
    $btnNext: JQuery;
    $btnPrev: JQuery;
    $images: JQuery;
    $indicators: JQuery;
    $currentImageOut: JQuery;
}

class ImageSlider {
    private readonly _domElements: IImageSliderDomElements;
    private readonly _allImages: number;
    private _selectedImage: number;

    constructor($slider: JQuery) {
        this._domElements = this._getDomElements($slider);
        this._allImages = this._domElements.$images.length;
        this._selectedImage = 1;
        this._domElements.$currentImageOut.text(1);

        this._initEventListeners();
    }

    private _getDomElements($slider: JQuery): IImageSliderDomElements {
        const $btnNext = $slider.find(`.${IMAGE_SLIDER_CLASSES.BTN_NEXT}`);
        const $btnPrev = $slider.find(`.${IMAGE_SLIDER_CLASSES.BTN_PREV}`);
        const $images = $slider.find(`.${IMAGE_SLIDER_CLASSES.IMAGE}`);
        const $indicators = $slider.find(`.${IMAGE_SLIDER_CLASSES.INDICATOR}`);
        const $currentImageOut = $slider.find(`.${IMAGE_SLIDER_CLASSES.INDEX_ITEM}`);

        return {
            $slider,
            $btnNext,
            $btnPrev,
            $images,
            $indicators,
            $currentImageOut,
        };
    }

    private _initEventListeners(): void {
        this._domElements.$btnNext.on(
            'click.imageSlider.nextImage',
            this._handleBtnNextClick.bind(this)
        );

        this._domElements.$btnPrev.on(
            'click.imageSlider.prevImage',
            this._handleBtnPrevClick.bind(this)
        );
    }

    private _handleBtnNextClick(): void {
        this._selectedImage += 1;
        if (this._selectedImage > this._allImages) {
            this._selectedImage = 1;
        }

        this._update();
    }

    private _handleBtnPrevClick(): void {
        this._selectedImage -= 1;
        if (this._selectedImage < 1) {
            this._selectedImage = this._allImages;
        }

        this._update();
    }

    private _update(): void {
        this._domElements.$images.removeClass(IMAGE_SLIDER_CLASSES.IMAGE_SELECTED);
        this._domElements.$images.each((index, element) => {
            if (index + 1 === this._selectedImage) {
                element.classList.add(IMAGE_SLIDER_CLASSES.IMAGE_SELECTED);
            }
        });

        this._domElements.$indicators.removeClass(IMAGE_SLIDER_CLASSES.INDICATOR_SELECTED);
        this._domElements.$indicators.each((index, element) => {
            if (index + 1 === this._selectedImage) {
                element.classList.add(IMAGE_SLIDER_CLASSES.INDICATOR_SELECTED);
            }
        });

        this._domElements.$currentImageOut.text(this._selectedImage);
    }
}

$(`.${IMAGE_SLIDER_CLASSES.SLIDER}`).each((index, element) => {
    new ImageSlider($(element));
});
