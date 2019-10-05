import jQuery from 'jquery';

(function ($) {
    $.fn.dropdownRooms = function () {
        const dropdownRooms = this;
        const args = Array.from(arguments);

        if (args.length === 1) {
            switch (args[0]) {
                case 'rooms':
                    let rooms = {
                        all: 0
                    };
                    dropdownRooms.find('.dropdown-item-counter').each(function () {
                        const counter = $(this);
                        const name = counter.dropdownItemCounter('name') || counter.dropdownItemCounter('text');
                        const value = counter.dropdownItemCounter('value');
                        if (!rooms[name]) rooms[name] = 0;
                        rooms[name] += value;
                        rooms.all += value;
                    });

                    return rooms;

                case 'reset':
                    dropdownRooms.find('.dropdown-item-counter').each(function () {
                        const counter = $(this);
                        counter.dropdownItemCounter('value', 0);
                    });

                    return dropdownRooms;

                case 'expend':
                    return dropdownRooms.hasClass('dropdown-rooms_expend');

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

                    dropdownRooms.find('.dropdown').dropdown('text', value);
                    return dropdownRooms;


                case 'expend':
                    const expend = args[1];
                    if (typeof expend !== 'boolean') {
                        throw 'Wrong argument type! expected string.';
                    }

                    if (expend) {
                        dropdownRooms.addClass('dropdown-rooms_expend');
                    } else {
                        dropdownRooms.removeClass('dropdown-rooms_expend');
                    }

                    return dropdownRooms;

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
                    
                    dropdownRooms.find('.dropdown-item-counter').each(function () {
                        const counter = $(this);
                        const name = counter.dropdownItemCounter('text').toLowerCase();
                        
                        if (init[name]) {
                            counter.dropdownItemCounter('value', Number(init[name]));
                        }
                    });

                    return dropdownRooms;

                default:
                    throw `The command "${args[0]}" is unknown.`;
            }
        }
    }
})(jQuery)