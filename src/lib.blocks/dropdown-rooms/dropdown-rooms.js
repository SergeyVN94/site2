import $ from 'jquery';
import {
    getIndexGraduation
} from '../lib';

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

    return result.join(', ');
}

$('.dropdown-rooms').click(function(event) {
    const dropdown = $(this);
    const target = $(event.target);

    if (
        target.hasClass('dropdown-item-counter__button-minus') ||
        target.hasClass('dropdown-item-counter__button-plus')
    ) {
        const rooms = countValueOfCounters(dropdown);
        
        if (rooms.all === 0) {
            return false;
        }

        let text = getRoomsAsText(rooms);        

        if (text.length > 21) {
            text = text.slice(0, 20) + '...';
        } else {
            text = text.split(', ').slice(0, 2).join(', ') + '...';
        }
        
        dropdown.find('.dropdown-head__text').text(text);
    }
});