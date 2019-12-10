import jQuery from 'jquery';

(function($) {
    $.fn.textField = function() {
        const textField = this;
        const args = Array.from(arguments);

        if (args.length === 1) {
            switch (args[0]) {
                case 'value':
                    return textField.find('input').val();
                default:
                    throw `The command "${args[0]}" is unknown.`;
            }
        }

        if (args.length === 2) {
            switch (args[0]) {
                case 'value':
                    const text = args[1];
                    if (typeof text !== 'string') {
                        throw 'Wrong argument type! expected string.';
                    }

                    textField.find('input').val(text);
                    return textField;
                default:
                    throw `The command "${args[0]}" is unknown.`;
            }
        }
    }
}(jQuery));
