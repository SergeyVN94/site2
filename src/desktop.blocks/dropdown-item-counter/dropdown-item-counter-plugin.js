import jQuery from 'jquery';

(function($) {
    $.fn.dropdownItemCounter = function() {
        const counter = this;
        const args = Array.from(arguments);

        if (args.length === 1) {
            switch (args[0]) {
                case 'value':
                    return Number(counter.find('.dropdown-item-counter__counter-value').text());
                case 'text':
                    return counter.find('.dropdown-item-counter__text').text();
                case 'name':
                    return counter.attr('data-name');
                default:
                    throw `The command "${args[0]}" is unknown.`;
            }
        }

        if (args.length === 2) {
            switch (args[0]) {
                case 'value':
                    let value = args[1];
                    if (isNaN(value)) {
                        throw 'Wrong argument type! expected number.';
                    }

                    if (value <= 0) {
                        value = 0;
                        counter.find('.dropdown-item-counter__button-minus').addClass('button_disable');
                    } else {
                        counter.find('.dropdown-item-counter__button-minus').removeClass('button_disable');
                    }

                    Number(counter.find('.dropdown-item-counter__counter-value').text(value));

                    return counter;

                case 'text':
                    const text = args[1];
                    if (typeof text !== 'string') {
                        throw 'Wrong argument type! expected string.';
                    }

                    return counter.find('.dropdown-item-counter__text').text(text);

                case 'name':
                    const name = args[1];
                    if (typeof name !== 'string') {
                        throw 'Wrong argument type! expected string.';
                    }

                    return counter.attr('data-name', name);

                default:
                    throw `The command "${args[0]}" is unknown.`;
            }
        }
    }
}(jQuery));
