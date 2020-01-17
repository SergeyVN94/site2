import * as $ from 'jquery';

import { ModelInterface } from '../model/model';
import CLASSES from '../classes';

class View {
    private readonly $slider: JQuery;
    private readonly $line: JQuery;
    private readonly $point1: JQuery;
    private readonly $point2: JQuery;
    private readonly $bgLine: JQuery;
    private readonly $values: JQuery;
    private readonly model: ModelInterface;
    private readonly $document: JQuery<Document>;
    private readonly lineBorderWidth: number;
    private pointSelectedType: 'min' | 'max' | null;

    constructor($slider: JQuery, model: ModelInterface) {
        this.$slider = $slider;
        this.$line = $slider.find(`.${CLASSES.LINE}`);
        this.$bgLine = $slider.find(`.${CLASSES.BG_LINE}`);
        this.$values = $slider.find(`.${CLASSES.VALUES}`);
        this.$point1 = $($slider.find(`.${CLASSES.POINT}`).get()[0]);
        this.$point2 = $($slider.find(`.${CLASSES.POINT}`).get()[1]);
        this.$document = $(document);
        this.model = model;
        this.lineBorderWidth = parseInt(this.$line.css('border-left-width') || '0', 10);
        this.pointSelectedType = null;

        this.$point1.css('z-index', 5);
        this.$point2.css('z-index', 6);

        model.onUpdate(this.update.bind(this));
        this.setSliderEventHandlers();
        this.initModel();
    }

    private initModel(): void {
        const start = [
            parseInt(this.$slider.attr('data-start-min') || '0', 10),
            parseInt(this.$slider.attr('data-start-max') || '1000', 10),
        ] as [number, number];

        this.model.initModel(start);
    }

    private setSliderEventHandlers(): void {
        this.$line.on(
            'mousedown.rangeSlider.update',
            this.sliderMouseDownHandler.bind(this)
        );
    }

    private updateModel(ev: JQuery.MouseEventBase): void {
        this.model.update(this.getTargetPosition(ev), this.pointSelectedType);
    }

    private sliderMouseDownHandler(ev: JQuery.MouseEventBase): void {
        const $target = $(ev.target);

        if ($target.hasClass(CLASSES.POINT)) {
            this.pointSelectedType = $target.attr('data-type') === 'min' ? 'min' : 'max';

            if (this.pointSelectedType === 'max') {
                this.$point2.css('z-index', 6);
            } else {
                this.$point2.css('z-index', 4);
            }

            this.$document
                .on(
                    'mousemove.rangeSlider.update',
                    this.pointMouseMoveHandler.bind(this)
                )
                .one('mouseup.rangeSlider.offUpdate', () => {
                    this.$document.off('mousemove.rangeSlider.update');
                });
        } else {
            this.pointSelectedType = null;
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

        this.setPointPosition(this.$point1, positionLeft);
        this.setPointPosition(this.$point2, positionRight);
        this.updateBgLine(positions);
        this.$values.text(values);
    }

    private setPointPosition($point: JQuery, position: number): void {
        const widthLine = this.$line.innerWidth();
        const offset = $point.outerWidth(false) / 2;
        const margin = (position * widthLine) - offset;

        $point.css('left', `${margin}px`);
    }

    private getPointPosition($point: JQuery): number {
        const widthLine = this.$line.innerWidth();
        const offset = $point.outerWidth(false) / 2;
        const margin = parseInt($point.css('left') || '-8', 10);

        return (Math.abs(margin) + offset) / widthLine;
    }

    private updateBgLine(positions: [number, number]): void {
        const widthContainer = this.$line.innerWidth();
        const [
            positionLeft,
            positionRight,
        ] = positions;

        const left = positionLeft * widthContainer;
        const right = widthContainer - (widthContainer * positionRight);

        this.$bgLine
            .css('left', `${left}px`)
            .css('right', `${right}px`);
    }

    private getTargetPosition(ev: JQuery.MouseEventBase): number {
        const widthLine = this.$line.innerWidth();
        const offsetLine = this.$line.offset().left + this.lineBorderWidth;
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
