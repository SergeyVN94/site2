import $ from 'jquery';
import {
    getIndexGraduation
} from '../lib';
import './dropdown-guest-plugin';

function getTextGuests(guests) {
    if (guests.all === 0) {
        return 'Сколько гостей';
    }


    const result = [];

    if (guests.grown) {
        const gradNum = getIndexGraduation(guests.grown);
        result.push(`${guests.grown} гост${['ь', 'я', 'ей'][gradNum]}`);
    }

    if (guests.babies) {
        const gradNum = getIndexGraduation(guests.babies);
        result.push(`${guests.babies} младен${['ец', 'ца', 'цев'][gradNum]}`);
    }

    return result.join(', ');
}

$('.dropdown-guest').each(function () {
    const dropdownGuest = $(this);
    const dropdown = dropdownGuest.find('.dropdown');

    dropdown.dropdown('click', function () {
        const isExpend = dropdownGuest.dropdownGuest('expend');
        dropdownGuest.dropdownGuest('expend', !isExpend);
    });

    dropdownGuest.click(function (event) {
        const target = $(event.target);

        if (target.hasClass('dropdown-guest__button-clear')) {
            dropdown.dropdown('text', 'Сколько гостей');
            dropdownGuest.dropdownGuest('reset');
            dropdownGuest.dropdownGuest('expend', false);
            return true;
        }

        if (target.hasClass('dropdown-guest__button-inter')) {
            const guests = dropdownGuest.dropdownGuest('guests');
            dropdown.dropdown('text', getTextGuests(guests));
            dropdownGuest.dropdownGuest('expend', false);
            return true;
        }

        if (
            target.hasClass('dropdown-item-counter__button-minus') ||
            target.hasClass('dropdown-item-counter__button-plus')
        ) {
            if (dropdownGuest.dropdownGuest('guests').all) {
                dropdownGuest.find('.dropdown-guest__button-clear').removeClass('button_hide');
            } else {
                dropdownGuest.find('.dropdown-guest__button-clear').addClass('button_hide');
            }

            return true;
        }
    });
});