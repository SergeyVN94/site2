import $ from 'jquery';
import {
    countValueOfCounters,
    getIndexGraduation,
    clearDropdown
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

$('.dropdown-guest').click(function(event) {
    const dropdown = $(this);
    const target = $(event.target);

    if (target.hasClass('dropdown-guest__button-clear')) {
        clearDropdown(dropdown, 'Сколько гостей');
        return true;
    }

    if (target.hasClass('dropdown-guest__button-inter')) {
        const guests = countValueOfCounters(dropdown);
        dropdown.find('.dropdown-head__text').text(getTextGuests(guests));
        return true;
    }

    if (
        target.hasClass('dropdown-item-counter__button-minus') ||
        target.hasClass('dropdown-item-counter__button-plus')
    ) {        
        if (countValueOfCounters(dropdown).all) {
            dropdown.find('.dropdown-guest__button-clear').removeClass('button_hide');
        } else {
            dropdown.find('.dropdown-guest__button-clear').addClass('button_hide');
        }

        return true;
    }
});