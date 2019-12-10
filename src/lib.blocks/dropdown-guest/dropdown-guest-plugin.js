import jQuery from 'jquery';

(function($) {
    $.fn.dropdownGuest = function() {
        const dropdownGuest = this;
        const args = Array.from(arguments);

        if (args.length === 1) {
            switch (args[0]) {
                case 'guests':
                    const guests = {
                        all: 0,
                    };
                    dropdownGuest.find('.dropdown-item-counter').each(function() {
                        const counter = $(this);
                        const name = counter.dropdownItemCounter('name') || counter.dropdownItemCounter('text');
                        const value = counter.dropdownItemCounter('value');
                        if (!guests[name]) {
 guests[name] = 0;
}
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
                    return dropdownGuest.hasClass('dropdown-guest_expend');

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

                    if (expend) {
                        dropdownGuest.addClass('dropdown-guest_expend');
                    } else {
                        dropdownGuest.removeClass('dropdown-guest_expend');
                    }

                    return dropdownGuest;

                case 'init':
                    const init = args[1];
                    if (typeof init !== 'object') {
                        throw 'Wrong argument type! expected object.';
                    }

                    const keys = Object.keys(init);
                    const nInit = {};
                    for (let i = 0; i < keys.length; i++) {
                        const name = keys[i];
                        nInit[name.toLowerCase()] = init[name];
                    }

                    dropdownGuest.find('.dropdown-item-counter').each(function() {
                        const counter = $(this);
                        const name = counter.dropdownItemCounter('text').toLowerCase();

                        if (init[name]) {
                            counter.dropdownItemCounter('value', Number(init[name]));
                        }
                    });

                    return dropdownGuest;
                default:
                    throw `The command "${args[0]}" is unknown.`;
            }
        }
    }
}(jQuery))
