import jQuery from 'jquery';

(function ($) {
    $.fn.dropdown = function () {
        const dropdown = this;
        const args = Array.from(arguments);

        if (args.length === 1) {
            switch (args[0]) {
                case 'click':
                    dropdown.click();
                    return dropdown;
                case 'text':
                    return dropdown.find('.dropdown__text').text();
                default:
                    throw `The command "${args[0]}" is unknown.`;
            }
        }

        if (args.length === 2) {
            switch (args[0]) {
                case 'click':
                    let clickHandler = args[1];
                    if (typeof clickHandler !== 'function') {
                        throw 'Wrong argument type! expected function.';
                    }

                    dropdown.click(clickHandler);
                    return dropdown;
                case 'text':
                    const value = args[1];
                    if (typeof value !== 'string') {
                        throw 'Wrong argument type! expected string.';
                    }

                    dropdown.text(value);
                    return dropdown;

                case 'theme':
                    const theme = args[1];
                    if (typeof theme !== 'string') {
                        throw 'Wrong argument type! expected string.';
                    }

                    dropdown.addClass(`dropdown_theme_${theme}`);
                    return dropdown;
                default:
                    throw `The command "${args[0]}" is unknown.`;
            }
        }
    };
})(jQuery);