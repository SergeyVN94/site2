import Model from './Model';
import View from './View';
import CLASSES from './classes';

$(`.${CLASSES.SLIDER}`).each(function() {
    $(() => {
        const $slider = $(this);
        const range = [
            parseInt($slider.attr('data-range-min') || '0', 10),
            parseInt($slider.attr('data-range-max') || '1000', 10),
        ] as [number, number];
        const step = parseInt($slider.attr('data-step') || '1', 10);

        new View(
            $slider,
            new Model({
                range,
                step,
            })
        );
    });
});
