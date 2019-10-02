import $ from 'jquery';
import {
    countValueOfCounters,
    getIndexGraduation
} from '../lib';

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
    const body = dropdownGuest.find('.dropdown-guest__body-content');

    dropdown.dropdown('click', function () {
        if (body.css('display') === 'none') {
            body.css('display', 'block');
            dropdown.addClass('dropdown_theme_expend-body');
        } else {
            body.css('display', 'none');
            dropdown.removeClass('dropdown_theme_expend-body');
        }
    });

    dropdownGuest.click(function (event) {
        const target = $(event.target);

        if (target.hasClass('dropdown-guest__button-clear')) {
            dropdown.dropdown('text', 'Сколько гостей');
            return true;
        }

        if (target.hasClass('dropdown-guest__button-inter')) {
            const guests = countValueOfCounters();
            dropdown.dropdown('text', getTextGuests(guests));
            return true;
        }

        if (
            target.hasClass('dropdown-item-counter__button-minus') ||
            target.hasClass('dropdown-item-counter__button-plus')
        ) {
            if (countValueOfCounters(dropdown).all) {
                dropdownGuest.find('.dropdown-guest__button-clear').removeClass('button_hide');
            } else {
                dropdownGuest.find('.dropdown-guest__button-clear').addClass('button_hide');
            }

            return true;
        }
    });
});