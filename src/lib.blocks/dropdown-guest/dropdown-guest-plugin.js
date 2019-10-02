import jQuery from 'jquery';

(function($){
    $.fn.dropdownGuest = function() {
        const dropdownGuest = this;
        const args = Array.from(arguments);

        if (args.length === 1) {
            switch (args[0]) {
                case 'guests':
                    let guests = {all: 0};
                    dropdownGuest.find('.dropdown-item-counter').each(function() {
                        const counter = $(this);
                        const name = counter.dropdownItemCounter('name') || counter.dropdownItemCounter('text');
                        const value = counter.dropdownItemCounter('value');
                        if(!guests[name]) guests[name] = 0;
                        guests[name] += value;
                        guests.all += value;
                    });
                    
                    return guests;

                case 'reset':
                    dropdownGuest.find('.dropdown-item-counter').each(function() {
                        const counter = $(this);
                        counter.dropdownItemCounter('value', 0);
                    });
                    
                    return dropdownGuest;

                case 'expend':                    
                    return dropdownGuest.find('.dropdown-guest__body-content').css('display') === 'block';
            
                default:
                    throw `The command "${args[0]}" is unknown.`;
            }
        }

        if (args.length === 2) {
            switch (args[0]) {
                case 'text':
                    const value = args[1];
                    if (typeof value !== 'string') {
                        throw 'Wrong argument type! expected string.';
                    }

                    dropdownGuest.find('.dropdown').dropdown('text', value);
                    return dropdownGuest;

            
                case 'expend':
                    const expend = args[1];
                    if (typeof expend !== 'boolean') {
                        throw 'Wrong argument type! expected string.';
                    }

                    const dropdown = dropdownGuest.find('.dropdown');
                    const body = dropdownGuest.find('.dropdown-guest__body-content');

                    if (expend) {
                        body.css('display', 'block');
                        dropdown.addClass('dropdown_theme_expend-body');
                    } else {
                        body.css('display', 'none');
                        dropdown.removeClass('dropdown_theme_expend-body');
                    }

                    return dropdownGuest;
                default:
                    throw `The command "${args[0]}" is unknown.`;
            }
        }
    }
})(jQuery)