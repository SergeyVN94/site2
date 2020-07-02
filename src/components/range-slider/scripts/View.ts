import { IModelInterface } from './Model';
import RANGE_SLIDER_CLASSES from './classes';

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

  private readonly model: IModelInterface;

  private readonly lineBorderWidth: number;

  private pointSelectedType: 'min' | 'max' | null;

  constructor($slider: JQuery, model: IModelInterface) {
    this.domElements = View._getDomElements($slider);
    this.model = model;
    this.lineBorderWidth = parseInt(
      this.domElements.$line.css('border-left-width') || '0',
      10,
    );
    this.pointSelectedType = null;

    model.onUpdate(this._update.bind(this));
    this._initEventListeners();
    this._initModel();
  }

  private static _getDomElements($slider: JQuery): IRangeSliderDomElements {
    const $line = $slider.find(`.${RANGE_SLIDER_CLASSES.LINE}`);
    const $bgLine = $slider.find(`.${RANGE_SLIDER_CLASSES.BG_LINE}`);
    const $out = $slider.find(`.${RANGE_SLIDER_CLASSES.VALUES_OUT}`);
    const $point1 = $($slider.find(`.${RANGE_SLIDER_CLASSES.POINT}`).get()[0]);
    const $point2 = $($slider.find(`.${RANGE_SLIDER_CLASSES.POINT}`).get()[1]);
    const $document = $(document);

    $point1.css('z-index', 5);
    $point2.css('z-index', 6);

    return {
      $slider,
      $line,
      $bgLine,
      $out,
      $point1,
      $point2,
      $document,
    };
  }

  private _initModel(): void {
    const start = [
      parseInt(this.domElements.$slider.attr('data-start-min') || '0', 10),
      parseInt(this.domElements.$slider.attr('data-start-max') || '1000', 10),
    ] as [number, number];

    this.model.initModel(start);
  }

  private _initEventListeners(): void {
    this.domElements.$line.on(
      'mousedown.rangeSlider.update',
      this._handleSliderMousedown.bind(this),
    );

    $(window).on('resize.rangeSlider.updateWithResize', this._handleWindowResize.bind(this));
  }

  private _updateModel(ev: JQuery.MouseEventBase): void {
    this.model.update(this._getTargetPosition(ev), this.pointSelectedType);
  }

  private _handleWindowResize(): void {
    const { positions, values } = this.model.getState();
    this._update(positions, values);
  }

  private _handleSliderMousedown(ev: JQuery.MouseEventBase): void {
    const $target = $(ev.target);

    if ($target.hasClass(RANGE_SLIDER_CLASSES.POINT)) {
      this.pointSelectedType = $target.attr('data-type') === 'min' ? 'min' : 'max';

      if (this.pointSelectedType === 'max') {
        this.domElements.$point2.css('z-index', 6);
      } else {
        this.domElements.$point2.css('z-index', 4);
      }

      this.domElements.$document
        .on(
          'mousemove.rangeSlider.update',
          this._handleSliderMousemove.bind(this),
        )
        .one(
          'mouseup.rangeSlider.offUpdate',
          this._handleDocumentMouseup.bind(this),
        );
    } else {
      this.pointSelectedType = null;
      this._updateModel(ev);
    }
  }

  private _handleDocumentMouseup(): void {
    this.domElements.$document.off('mousemove.rangeSlider.update');
  }

  private _handleSliderMousemove(ev: JQuery.MouseEventBase): void {
    this._updateModel(ev);
  }

  private _update(positions: [number, number], values: string): void {
    const [
      positionLeft,
      positionRight,
    ] = positions;

    this._setPointPosition(this.domElements.$point1, positionLeft);
    this._setPointPosition(this.domElements.$point2, positionRight);
    this._updateBgLine(positions);
    this.domElements.$out.text(values);
  }

  private _setPointPosition(_$point: JQuery, position: number): void {
    const widthLine = this.domElements.$line.innerWidth();
    const offset = _$point.outerWidth(false) / 2;
    const margin = (position * widthLine) - offset;

    _$point.css('left', `${margin}px`);
  }

  private _updateBgLine(positions: [number, number]): void {
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

  private _getTargetPosition(ev: JQuery.MouseEventBase): number {
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
