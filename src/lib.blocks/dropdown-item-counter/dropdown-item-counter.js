import $ from 'jquery';

$('.dropdown-item-counter').click(function(event) {
    const target = $(event.target);

    if (!target.hasClass('button')) {
        return;
    }

    const dropdownItemCounter = $(this);
    const counter = dropdownItemCounter.find('.dropdown-item-counter__counter-value');
    const btnMinus = dropdownItemCounter.find('.dropdown-item-counter__button-minus');
    let number = parseInt(counter.html());

    if (target.hasClass('dropdown-item-counter__button-minus')) {
        number--;
    } else if (target.hasClass('dropdown-item-counter__button-plus')) {
        number++;
    }

    if (number < 0) {
        number = 0;
    }

    counter.html(number);

    if (number) {
        btnMinus.removeClass('button_disable');
    } else {
        btnMinus.addClass('button_disable');
    } 
});