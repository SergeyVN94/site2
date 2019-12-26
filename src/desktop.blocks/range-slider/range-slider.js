import $ from 'jquery';

$('.range-slider').each(function() {
    const slider = $(this);
    const moveContainer = slider.find('.range-slider__move-container');
    const pointLeft = slider.find('.range-slider__point-left');
    const pointRight = slider.find('.range-slider__point-right');
    const sliderLine = slider.find('.range-slider__line');

    const defaultFormat = "{min} - {max}";
    const min = Number(slider.attr('data-min'));
    const max = Number(slider.attr('data-max'));
    const step = Number(slider.attr('data-step'));
    const steps = (max - min) / step;

    slider.attr('data-min-value', min);
    slider.attr('data-max-value', max);

    function splitValue(num) {
        const arr = String(num).split('');
        const value = [];
        let i = 0;
        while (arr.length) {
            if (i === 3) {
                value.push(' ');
                i = 0;
            }

            value.push(arr.pop());
            i++;
        }

        return value.reverse().join('');
    }

    function printRange(minValue, maxValue) {
        slider.attr('data-min-value', minValue);
        slider.attr('data-max-value', maxValue);
        let result = slider.attr('data-format') || defaultFormat;

        result = result.replace('{min}', splitValue(minValue)).replace('{max}', splitValue(maxValue));
        slider.find('.range-slider__value').text(result);
    }

    printRange(Number(slider.attr('data-min-value')) || min, Number(slider.attr('data-max-value')) || max);

    function getMousePosition(event) {
        return event.clientX - moveContainer.offset().left;
    }

    function getPointPosition(point) {
        return (point.offset().left - moveContainer.offset().left) +
            (pointLeft.outerWidth() / 2);
    }

    function offsetToNearestStep(mousePosition) {
        const pixelsInStep = moveContainer.width() / steps;
        const currentStep = Math.round(mousePosition / pixelsInStep);

        return currentStep * pixelsInStep;
    }

    function updateNewRangeValues() {
        const posPointLeft = getPointPosition(pointLeft);
        const posPointRight = getPointPosition(pointRight);
        const pixelsInStep = moveContainer.width() / steps;

        const stepLeft = Math.round(posPointLeft / pixelsInStep);
        const stepRight = Math.round(posPointRight / pixelsInStep);

        const minValue = min + (stepLeft * step);
        const maxValue = min + (stepRight * step);

        printRange(minValue, maxValue);
    }

    function handleMouseMove(event) {
        const mousePosition = getMousePosition(event);

        const posPointLeft = getPointPosition(pointLeft);
        const posPointRight = getPointPosition(pointRight);

        const distanceToLeft = Math.abs(posPointLeft - mousePosition);
        const distanceToRight = Math.abs(posPointRight - mousePosition);

        const offset = offsetToNearestStep(mousePosition);

        if (distanceToLeft < distanceToRight) {
            if (Math.round(offset) !== Math.round(posPointLeft)) {
                sliderLine.css('margin-left', offset);
            }
        } else if (Math.round(offset) !== Math.round(posPointRight)) {
                sliderLine.css('margin-right', moveContainer.width() - offset);
            }

        updateNewRangeValues();
    }

    moveContainer.mousedown((event) => {
        if (event.button !== 0) {
            return false;
        }

        handleMouseMove(event);
        moveContainer.mousemove(handleMouseMove);
    });

    moveContainer.mouseover((event) => {
        if (event.buttons !== 1) {
            return false;
        }

        handleMouseMove(event);
        moveContainer.mousemove(handleMouseMove);
    });

    function removeMouseMoveHandle() {
        $(this).off('mousemove', handleMouseMove);
    }

    moveContainer.mouseup(removeMouseMoveHandle);
    moveContainer.mouseleave(removeMouseMoveHandle);
});
