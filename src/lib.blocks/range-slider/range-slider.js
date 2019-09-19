import $ from 'jquery';

const slider = $('.range-slider');
const moveContainer = $('.range-slider__move-container');
const pointLeft = $('.range-slider__point-left');
const pointRight = $('.range-slider__point-right');
const sliderLine = $('.range-slider__line');

const format = slider.attr('data-format') || "{min} - {max}";
const min = Number(slider.attr('data-min'));
const max = Number(slider.attr('data-max'));
const step = Number(slider.attr('data-step'));
const steps = (max - min) / step;

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

function printRange(minValue, maxValue) {
    let result = format;
    result = result.replace('{min}', minValue).replace('{max}', maxValue);    
    slider.find('.range-slider__value').text(result);
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
    } else {
        if (Math.round(offset) !== Math.round(posPointRight)) {
            sliderLine.css('margin-right', moveContainer.width() - offset);
        }
    }

    updateNewRangeValues();
}


moveContainer.mousedown(event => {
    if (event.button !== 0) {
        return false;
    }

    handleMouseMove(event);
    moveContainer.mousemove(handleMouseMove);
});

moveContainer.mouseover(event => {
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