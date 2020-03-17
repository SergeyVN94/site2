import { ModelInterface } from './Model';
import CLASSES from './classes';

interface IRangeSliderDomElements {
    $slider: JQuery;
    $line: JQuery;
    $point1: JQuery;
    $point2: JQuery;
    $bgLine: JQuery;
    $out: JQuery;
    $document: JQuery<Document>;
}

class View {
    private readonly _domElements: IRangeSliderDomElements;
    private readonly _model: ModelInterface;
    private readonly _lineBorderWidth: number;
    private _pointSelectedType: 'min' | 'max' | null;

    constructor($slider: JQuery, model: ModelInterface) {
        this._domElements = this._getDomElements($slider);
        this._model = model;
        this._lineBorderWidth = parseInt(
            this._domElements.$line.css('border-left-width') || '0',
            10
        );
        this._pointSelectedType = null;

        model.onUpdate(this._update.bind(this));
        this._initEventListeners();
        this._initModel();
    }

    private _getDomElements($slider: JQuery): IRangeSliderDomElements {
        const $line = $slider.find(`.${CLASSES.LINE}`);
        const $bgLine = $slider.find(`.${CLASSES.BG_LINE}`);
        const $out = $slider.find(`.${CLASSES.VALUES_OUT}`);
        const $point1 = $($slider.find(`.${CLASSES.POINT}`).get()[0]);
        const $point2 = $($slider.find(`.${CLASSES.POINT}`).get()[1]);
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
            parseInt(this._domElements.$slider.attr('data-start-min') || '0', 10),
            parseInt(this._domElements.$slider.attr('data-start-max') || '1000', 10),
        ] as [number, number];

        this._model.initModel(start);
    }

    private _initEventListeners(): void {
        this._domElements.$line.on(
            'mousedown.rangeSlider.update',
            this._handleSliderMousedown.bind(this)
        );
    }

    private _updateModel(ev: JQuery.MouseEventBase): void {
        this._model.update(this._getTargetPosition(ev), this._pointSelectedType);
    }

    private _handleSliderMousedown(ev: JQuery.MouseEventBase): void {
        const $target = $(ev.target);

        if ($target.hasClass(CLASSES.POINT)) {
            this._pointSelectedType = $target.attr('data-type') === 'min' ? 'min' : 'max';

            if (this._pointSelectedType === 'max') {
                this._domElements.$point2.css('z-index', 6);
            } else {
                this._domElements.$point2.css('z-index', 4);
            }

            this._domElements.$document
                .on(
                    'mousemove.rangeSlider.update',
                    this._handleSliderMousemove.bind(this)
                )
                .one('mouseup.rangeSlider.offUpdate', () => {
                    this._domElements.$document.off('mousemove.rangeSlider.update');
                });
        } else {
            this._pointSelectedType = null;
            this._updateModel(ev);
        }
    }

    private _handleSliderMousemove(ev: JQuery.MouseEventBase): void {
        this._updateModel(ev);
    }

    private _update(positions: [number, number], values: string): void {
        const [
            positionLeft,
            positionRight,
        ] = positions;

        this._setPointPosition(this._domElements.$point1, positionLeft);
        this._setPointPosition(this._domElements.$point2, positionRight);
        this._updateBgLine(positions);
        this._domElements.$out.text(values);
    }

    private _setPointPosition(_$point: JQuery, position: number): void {
        const widthLine = this._domElements.$line.innerWidth();
        const offset = _$point.outerWidth(false) / 2;
        const margin = (position * widthLine) - offset;

        _$point.css('left', `${margin}px`);
    }

    private _updateBgLine(positions: [number, number]): void {
        const widthContainer = this._domElements.$line.innerWidth();
        const [
            positionLeft,
            positionRight,
        ] = positions;

        const left = positionLeft * widthContainer;
        const right = widthContainer - (widthContainer * positionRight);

        this._domElements.$bgLine
            .css('left', `${left}px`)
            .css('right', `${right}px`);
    }

    private _getTargetPosition(ev: JQuery.MouseEventBase): number {
        const widthLine = this._domElements.$line.innerWidth();
        const offsetLine = this._domElements.$line.offset().left + this._lineBorderWidth;
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
