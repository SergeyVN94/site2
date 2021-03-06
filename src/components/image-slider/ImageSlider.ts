enum IMAGE_SLIDER_SELECTORS {
  SLIDER = 'js-image-slider',
  IMAGE = 'image-slider__image',
  IMAGE_SELECTED = 'image-slider__image_selected',
  INDICATOR_CONTAINER = 'js-image-slider__indicators',
  INDICATOR = 'js-image-slider__indicator',
  INDICATOR_SELECTED = 'image-slider__indicator_selected',
  BTN_PREV = 'js-image-slider__switch-button[name="previous-image"]',
  BTN_NEXT = 'js-image-slider__switch-button[name="next-image"]',
  INDEX_ITEM = 'js-image-slider__image_index-item',
}

interface IImageSliderDomElements {
  readonly $slider: JQuery;
  readonly $btnNext: JQuery;
  readonly $btnPrev: JQuery;
  readonly $images: JQuery;
  readonly $indicators: JQuery;
  readonly $indicatorContainer: JQuery;
  readonly $currentImageOut: JQuery;
}

class ImageSlider {
  private readonly domElements: IImageSliderDomElements;

  private readonly allImages: number;

  private selectedImage: number;

  constructor($slider: JQuery) {
    this.domElements = ImageSlider._getDomElements($slider);
    this.allImages = this.domElements.$images.length;
    this.selectedImage = 1;
    this.domElements.$currentImageOut.text(1);

    this._initEventListeners();
    this._update();
  }

  private static _getDomElements($slider: JQuery): IImageSliderDomElements {
    const $btnNext = $slider.find(`.${IMAGE_SLIDER_SELECTORS.BTN_NEXT}`);
    const $btnPrev = $slider.find(`.${IMAGE_SLIDER_SELECTORS.BTN_PREV}`);
    const $images = $slider.find(`.${IMAGE_SLIDER_SELECTORS.IMAGE}`);
    const $indicators = $slider.find(`.${IMAGE_SLIDER_SELECTORS.INDICATOR}`);
    const $currentImageOut = $slider.find(`.${IMAGE_SLIDER_SELECTORS.INDEX_ITEM}`);

    return {
      $slider,
      $btnNext,
      $btnPrev,
      $images,
      $indicators,
      $indicatorContainer: $slider.find(`.${IMAGE_SLIDER_SELECTORS.INDICATOR_CONTAINER}`),
      $currentImageOut,
    };
  }

  private _initEventListeners(): void {
    const { $btnNext, $btnPrev, $indicatorContainer } = this.domElements;

    $btnNext.on(
      'click.imageSlider.nextImage',
      this._handleBtnNextClick.bind(this),
    );

    $btnPrev.on(
      'click.imageSlider.prevImage',
      this._handleBtnPrevClick.bind(this),
    );

    $indicatorContainer.on(
      'click.imageSlider.select',
      this._handleIndicatorContainerClick.bind(this),
    );
  }

  private _handleIndicatorContainerClick(ev: JQuery.MouseEventBase): void {
    const $indicator = $(ev.target);
    if ($indicator.hasClass(IMAGE_SLIDER_SELECTORS.INDICATOR)) {
      const index = parseInt(String($indicator.data('index')), 10);
      this.selectedImage = index + 1;
      this._update();
    }
  }

  private _handleBtnNextClick(): void {
    this.selectedImage += 1;
    if (this.selectedImage > this.allImages) {
      this.selectedImage = 1;
    }

    this._update();
  }

  private _handleBtnPrevClick(): void {
    this.selectedImage -= 1;
    if (this.selectedImage < 1) {
      this.selectedImage = this.allImages;
    }

    this._update();
  }

  private _update(): void {
    this.domElements.$images.removeClass(IMAGE_SLIDER_SELECTORS.IMAGE_SELECTED);
    this.domElements.$images.each((index, element) => {
      if (index + 1 === this.selectedImage) {
        element.classList.add(IMAGE_SLIDER_SELECTORS.IMAGE_SELECTED);
      }
    });

    this.domElements.$indicators.removeClass(IMAGE_SLIDER_SELECTORS.INDICATOR_SELECTED);
    this.domElements.$indicators.each((index, element) => {
      if (index + 1 === this.selectedImage) {
        element.classList.add(IMAGE_SLIDER_SELECTORS.INDICATOR_SELECTED);
      }
    });

    this.domElements.$currentImageOut.text(this.selectedImage);
  }
}

$(`.${IMAGE_SLIDER_SELECTORS.SLIDER}`).each((index, element) => {
  new ImageSlider($(element));
});
