import $ from 'jquery';
import './dropdown-item-counter-plugin';

$('.dropdown-item-counter').click(function(event) {
    const target = $(event.target);
    const counter = $(this);

    if (!target.hasClass('button')) {
        return;
    }

    let number = counter.dropdownItemCounter('value');

    if (target.hasClass('dropdown-item-counter__button-minus')) {
        number--;
    } else if (target.hasClass('dropdown-item-counter__button-plus')) {
        number++;
    }

    counter.dropdownItemCounter('value', number);
});