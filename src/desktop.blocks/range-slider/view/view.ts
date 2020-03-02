import * as $ from 'jquery';

import { ModelInterface } from '../model/model';
import CLASSES from '../classes';

class View {
    private readonly _$slider: JQuery;
    private readonly _$line: JQuery;
    private readonly _$point1: JQuery;
    private readonly _$point2: JQuery;
    private readonly _$bgLine: JQuery;
    private readonly _$values: JQuery;
    private readonly _model: ModelInterface;
    private readonly _$document: JQuery<Document>;
    private readonly _lineBorderWidth: number;
    private _pointSelectedType: 'min' | 'max' | null;

    constructor(_$slider: JQuery, model: ModelInterface) {
        this._$slider = _$slider;
        this._$line = _$slider.find(`.${CLASSES.LINE}`);
        this._$bgLine = _$slider.find(`.${CLASSES.BG_LINE}`);
        this._$values = _$slider.find(`.${CLASSES.VALUES}`);
        this._$point1 = $(_$slider.find(`.${CLASSES.POINT}`).get()[0]);
        this._$point2 = $(_$slider.find(`.${CLASSES.POINT}`).get()[1]);
        this._$document = $(document);
        this._model = model;
        this._lineBorderWidth = parseInt(this._$line.css('border-left-width') || '0', 10);
        this._pointSelectedType = null;

        this._$point1.css('z-index', 5);
        this._$point2.css('z-index', 6);

        model.onUpdate(this.update.bind(this));
        this.setSliderEventHandlers();
        this.initModel();
    }

    private initModel(): void {
        const start = [
            parseInt(this._$slider.attr('data-start-min') || '0', 10),
            parseInt(this._$slider.attr('data-start-max') || '1000', 10),
        ] as [number, number];

        this._model.initModel(start);
    }

    private setSliderEventHandlers(): void {
        this._$line.on(
            'mousedown.rangeSlider.update',
            this.sliderMouseDownHandler.bind(this)
        );
    }

    private updateModel(ev: JQuery.MouseEventBase): void {
        this._model.update(this.getTargetPosition(ev), this._pointSelectedType);
    }

    private sliderMouseDownHandler(ev: JQuery.MouseEventBase): void {
        const $target = $(ev.target);

        if ($target.hasClass(CLASSES.POINT)) {
            this._pointSelectedType = $target.attr('data-type') === 'min' ? 'min' : 'max';

            if (this._pointSelectedType === 'max') {
                this._$point2.css('z-index', 6);
            } else {
                this._$point2.css('z-index', 4);
            }

            this._$document
                .on(
                    'mousemove.rangeSlider.update',
                    this.pointMouseMoveHandler.bind(this)
                )
                .one('mouseup.rangeSlider.offUpdate', () => {
                    this._$document.off('mousemove.rangeSlider.update');
                });
        } else {
            this._pointSelectedType = null;
            this.updateModel(ev);
        }
    }

    private pointMouseMoveHandler(ev: JQuery.MouseEventBase): void {
        this.updateModel(ev);
    }

    private update(positions: [number, number], values: string): void {
        const [
            positionLeft,
            positionRight,
        ] = positions;

        this.setPointPosition(this._$point1, positionLeft);
        this.setPointPosition(this._$point2, positionRight);
        this.updateBgLine(positions);
        this._$values.text(values);
    }

    private setPointPosition(_$point: JQuery, position: number): void {
        const widthLine = this._$line.innerWidth();
        const offset = _$point.outerWidth(false) / 2;
        const margin = (position * widthLine) - offset;

        _$point.css('left', `${margin}px`);
    }

    private getPointPosition(_$point: JQuery): number {
        const widthLine = this._$line.innerWidth();
        const offset = _$point.outerWidth(false) / 2;
        const margin = parseInt(_$point.css('left') || '-8', 10);

        return (Math.abs(margin) + offset) / widthLine;
    }

    private updateBgLine(positions: [number, number]): void {
        const widthContainer = this._$line.innerWidth();
        const [
            positionLeft,
            positionRight,
        ] = positions;

        const left = positionLeft * widthContainer;
        const right = widthContainer - (widthContainer * positionRight);

        this._$bgLine
            .css('left', `${left}px`)
            .css('right', `${right}px`);
    }

    private getTargetPosition(ev: JQuery.MouseEventBase): number {
        const widthLine = this._$line.innerWidth();
        const offsetLine = this._$line.offset().left + this._lineBorderWidth;
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
