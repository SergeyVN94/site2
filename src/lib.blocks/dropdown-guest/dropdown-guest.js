import $ from 'jquery';

function getTextGuests(guests) {
    if (guests === 0) {
        return 'Сколько гостей';
    }

    let text = guests + ' гост';
    const ost10 = guests % 10;
    const ost100 = guests % 100;
    let end = '';

    if (ost10 === 1 && (ost100 > 20 || guests === 1)) {
        end = 'ь';
    }

    if (ost10 >= 2 && ost10 <= 4) {
        end = 'я';
    }

    if (ost10 >= 5 && ost10 <= 9 || ost10 === 0 || (ost100 >= 11 && ost100 <= 20)) {
        end = 'ей';
    }

    return text + end;
}

function resetCounter(counter) {
    counter = $(counter);
    counter.find('.dropdown-item-counter__counter-value').text('0');
    counter.find('.dropdown-item-counter__button-minus').addClass('button_disable');
}

function clearDropdown() {
    const dropdown = $('.dropdown_guest');
    
    dropdown.find('.dropdown-item-counter').each(function() {
        resetCounter(this);
    });

    dropdown.find('.dropdown-head__text').text('Сколько гостей');
}

function countGuests() {
    let counter = 0;
    $('.dropdown_guest').find('.dropdown-item-counter__counter-value').each(function() {
        counter += Number(this.innerHTML);
    });

    return counter;
}

$('.dropdown_guest').click(function(event) {
    const dropdown = $(this);
    const target = $(event.target);

    if (target.hasClass('dropdown-guest__button-clear')) {
        clearDropdown();
        return true;
    }

    if (target.hasClass('dropdown-guest__button-inter')) {
        const guests = countGuests();
        dropdown.find('.dropdown-head__text').text(getTextGuests(guests));
        return true;
    }

    if (
        target.hasClass('dropdown-item-counter__button-minus') ||
        target.hasClass('dropdown-item-counter__button-plus')
    ) {        
        if (countGuests()) {
            dropdown.find('.dropdown-guest__button-clear').removeClass('button_hide');
        } else {
            dropdown.find('.dropdown-guest__button-clear').addClass('button_hide');
        }

        return true;
    }
});