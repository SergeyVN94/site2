import Model from './Model';

enum CLASSES {
  SLIDER = 'js-range-slider',
  LINE = 'js-range-slider__body',
  POINT = 'js-range-slider__point',
  BG_LINE = 'js-range-slider__bg-line',
  VALUES_OUT = 'js-range-slider__out-range',
}

interface IRangeSliderDomElements {
  readonly $slider: JQuery;
  readonly $line: JQuery;
  readonly $point1: JQuery;
  readonly $point2: JQuery;
  readonly $bgLine: JQuery;
  readonly $out: JQuery;
  readonly $document: JQuery<Document>;
}

class View {
  private readonly domElements: IRangeSliderDomElements;

  private readonly model: Model;

  private readonly lineBorderWidth: number;

  private pointSelectedType: 'min' | 'max' | null;

  constructor($slider: JQuery, model: Model) {
    this.domElements = View.getDomElements($slider);
    this.model = model;
    this.lineBorderWidth = parseInt(
      this.domElements.$line.css('border-left-width') || '0',
      10,
    );
    this.pointSelectedType = null;

    this.model.initModel([
      parseInt(this.domElements.$slider.attr('data-start-min') || '0', 10),
      parseInt(this.domElements.$slider.attr('data-start-max') || '1000', 10),
    ]);
    this.initEventListeners();
  }

  private static getDomElements($slider: JQuery): IRangeSliderDomElements {
    const $point1 = $($slider.find(`.${CLASSES.POINT}`).get()[0]);
    const $point2 = $($slider.find(`.${CLASSES.POINT}`).get()[1]);

    return {
      $slider,
      $point1: $point1.css('z-index', 5),
      $point2: $point2.css('z-index', 6),
      $line: $slider.find(`.${CLASSES.LINE}`),
      $bgLine: $slider.find(`.${CLASSES.BG_LINE}`),
      $out: $slider.find(`.${CLASSES.VALUES_OUT}`),
      $document: $(document),
    };
  }

  private initEventListeners(): void {
    this.domElements.$line.on(
      'mousedown.rangeSlider.update',
      this.handleSliderMousedown.bind(this),
    );

    $(window).on('resize.rangeSlider.updateWithResize', this.handleWindowResize.bind(this));

    this.model.onUpdate(this.update.bind(this));
  }

  private updateModel(ev: JQuery.MouseEventBase): void {
    this.model.update(this.getTargetPosition(ev), this.pointSelectedType);
  }

  private handleWindowResize(): void {
    const { positions, values } = this.model.getState();
    this.update(positions, values);
  }

  private handleSliderMousedown(ev: JQuery.MouseEventBase): void {
    console.log(ev);
    const $target = $(ev.target);

    if ($target.hasClass(CLASSES.POINT)) {
      this.pointSelectedType = $target.attr('data-type') === 'min' ? 'min' : 'max';

      if (this.pointSelectedType === 'max') {
        this.domElements.$point2.css('z-index', 6);
      } else {
        this.domElements.$point2.css('z-index', 4);
      }

      this.domElements.$document
        .on(
          'mousemove.rangeSlider.update',
          this.handleSliderMousemove.bind(this),
        )
        .one(
          'mouseup.rangeSlider.offUpdate',
          this.handleDocumentMouseup.bind(this),
        );
    } else {
      this.pointSelectedType = null;
      this.updateModel(ev);
    }
  }

  private handleDocumentMouseup(): void {
    this.domElements.$document.off('mousemove.rangeSlider.update');
  }

  private handleSliderMousemove(ev: JQuery.MouseEventBase): void {
    this.updateModel(ev);
  }

  private update(positions: [number, number], values: [number, number]): void {
    const [positionLeft, positionRight] = positions;
    const [min, max] = values;
    const { $point1, $point2, $out } = this.domElements;

    this.setPointPosition($point1, positionLeft);
    this.setPointPosition($point2, positionRight);
    this.updateBgLine(positions);
    $out.text(`${min.toLocaleString()}₽ - ${max.toLocaleString()}₽`);
  }

  private setPointPosition($point: JQuery, position: number): void {
    const widthLine = this.domElements.$line.innerWidth();
    const offset = $point.outerWidth(false) / 2;
    const margin = (position * widthLine) - offset;

    $point.css('left', `${margin}px`);
  }

  private updateBgLine(positions: [number, number]): void {
    const widthContainer = this.domElements.$line.innerWidth();
    const [
      positionLeft,
      positionRight,
    ] = positions;

    const left = positionLeft * widthContainer;
    const right = widthContainer - (widthContainer * positionRight);

    this.domElements.$bgLine
      .css('left', `${left}px`)
      .css('right', `${right}px`);
  }

  private getTargetPosition(ev: JQuery.MouseEventBase): number {
    const widthLine = this.domElements.$line.innerWidth();
    const offsetLine = this.domElements.$line.offset().left + this.lineBorderWidth;
    const mousePosition = ev.pageX;
    const targetPosition = (mousePosition - offsetLine) / widthLine;

    if (targetPosition > 1) {
      return 1;
    }

    if (targetPosition < 0) {
      return 0;
    }

    return targetPosition;
  }
}

export default View;
