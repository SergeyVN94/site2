import * as $ from 'jquery';

import CLASSES from '../classes';

const clickHandler = function sliderClickEventHandler(e: JQuery.MouseEventBase): boolean {
    const $slider = $(e.delegateTarget);
    const $btn = $(e.target);
    const selectedImage = $slider.attr('data-selected-image');

    if (selectedImage.length === 0) {
        return false;
    }

    let indexImage = 0;

    try {
        indexImage = parseInt(selectedImage, 10);
    } catch (error) {
        console.error(error);
        return false;
    }

    const $images = $slider.find(`.${CLASSES.IMAGE}`);
    const $items = $slider.find(`.${CLASSES.ITEM}`);

    $images
        .eq(indexImage)
        .removeClass(CLASSES.IMAGE_SELECTED);

    $items
        .eq(indexImage)
        .removeClass(CLASSES.ITEM_SELECTED);

    if ($btn.hasClass(CLASSES.BTN_PREV)) {
        indexImage -= 1;

        if (indexImage < 0) {
            indexImage = $images.length - 1;
        }
    } else {
        indexImage += 1;

        if (indexImage > $images.length - 1) {
            indexImage = 0;
        }
    }

    $slider.attr('data-selected-image', indexImage);

    $images
        .eq(indexImage)
        .addClass(CLASSES.IMAGE_SELECTED);

    $items
        .eq(indexImage)
        .addClass(CLASSES.ITEM_SELECTED);

    return true;
};

$(`.${CLASSES.SLIDER}`).on(
    'click.image-slider.change-image',
    `.${CLASSES.NAV_BTN}`,
    clickHandler
);
