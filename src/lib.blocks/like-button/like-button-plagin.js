import jQuery from 'jquery';

(function ($) {
    $.fn.likeButton = function () {
        const args = Array.from(arguments);
        const button = this;

        // Одиночная команда
        if (args.length === 1) {
            switch (args[0]) {
                case 'likes':
                    return Number(button.find('.like-button__counter').text());
                default:
                    return;
            }
        }


        // Команда с параметрами
        if (args.length > 1) {
            switch (args[0]) {
                case 'likes':
                    const likes = args[1]
                    if (isNaN(likes)) {
                        throw 'Wrong argument type! expected number.';
                    }

                    if (likes < 0) {
                        throw 'The number of likes must be positive.';
                    }

                    button.find('.like-button__counter').text(likes);
                default:
                    return;
            }
        }
    };
})(jQuery);