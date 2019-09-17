import $ from 'jquery';

function countValueOfCounters(selector) {
    const counter = {
        all: 0
    };

    $(selector).find('.dropdown-item-counter').each(function() {
        const itemCounter = $(this);
        const value = Number(itemCounter.find('.dropdown-item-counter__counter-value').text());
        const valueName = itemCounter.attr('data-name');

        if (counter[valueName] === undefined) {
            counter[valueName] = 0;
        }

        counter[valueName] += value;

        counter.all += value;
    });

    return counter;
}

function getIndexGraduation(number) {
    const ost10 = number % 10;
    const ost100 = number % 100;
    let grad = 0;

    if (ost10 === 1 && (ost100 > 20 || number === 1)) {
        grad = 0;
    }

    if (ost10 >= 2 && ost10 <= 4) {
        grad = 1;
    }

    if (ost10 >= 5 && ost10 <= 9 || ost10 === 0 || (ost100 >= 11 && ost100 <= 20)) {
        grad = 2;
    }

    return grad;
}

function resetCounter(counter) {
    counter = $(counter);
    counter.find('.dropdown-item-counter__counter-value').text('0');
    counter.find('.dropdown-item-counter__button-minus').addClass('button_disable');
}

function clearDropdown(selector, defaultText = '') {
    const dropdown = $(selector);
    
    dropdown.find('.dropdown-item-counter').each(function() {
        resetCounter(this);
    });

    dropdown.find('.dropdown-head__text').text(defaultText);
}

export {
    countValueOfCounters,
    getIndexGraduation,
    resetCounter,
    clearDropdown
}