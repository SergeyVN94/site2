import $ from 'jquery';
import {
    getIndexGraduation
} from '../lib';
import './dropdown-rooms-plugin';

function getRoomsAsText(counter) {
    const result = [];

    if (counter.bedrooms) {
        const i = getIndexGraduation(counter.bedrooms);
        const str = `${counter.bedrooms} спал${['ьня', 'ьни', 'ен'][i]}`;
        result.push(str);
    }

    if (counter.beds) {
        const i = getIndexGraduation(counter.beds);
        const str = `${counter.beds} кроват${['ь', 'и', 'ей'][i]}`;
        result.push(str);
    }

    if (counter.bathrooms) {
        const i = getIndexGraduation(counter.bathrooms);
        let str = `${counter.bathrooms} ванн${['ая', 'ые', 'ых'][i]} `;
        str += `комнат${['а', 'ы', ''][i]}`;
        result.push(str);
    }

    if (result.length) {
        return result.join(', ');
    }

    return 'Сколько комнат';
}

function sliceText(text) {
    if (text.length > 21) {
        return text.slice(0, 20) + '...';
    } else {
        return text.split(', ').slice(0, 2).join(', ') + '...';
    }
}

$('.dropdown-rooms').each(function() {
    const dropdownRooms = $(this);
    const dropdown = dropdownRooms.find('.dropdown');

    dropdown.dropdown('click', function () {
        const isExpend = dropdownRooms.dropdownRooms('expend');
        dropdownRooms.dropdownRooms('expend', !isExpend);
    });

    dropdownRooms.click(function(event) {
        const target = $(event.target);
    
        if (
            target.hasClass('dropdown-item-counter__button-minus') ||
            target.hasClass('dropdown-item-counter__button-plus')
        ) {
            const rooms = dropdownRooms.dropdownRooms('rooms');    
            const text = sliceText(getRoomsAsText(rooms));                    
            dropdown.dropdown('text', text);
        }
    });

    const rooms = dropdownRooms.dropdownRooms('rooms');
    const text = sliceText(getRoomsAsText(rooms));                    
    dropdown.dropdown('text', text);
});