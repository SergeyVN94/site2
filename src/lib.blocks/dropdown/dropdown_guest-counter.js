import $ from 'jquery';

function getTextGuests(guests) {
    if (guests === 0) {
        return 'Сколько гостей';
    }

    let text = guests + ' гост';
    const ost = guests % 10;
    let end = '';

    if (ost === 1 && (guests > 20 || guests === 1)) {
        end = 'ь';
    }

    if (ost >= 2 && ost <= 4) {
        end = 'я';
    }

    if (ost >= 5 && ost <= 9 || ost === 0 || (guests >= 11 && guests <= 20)) {
        end = 'ей';
    }

    return text + end;
}

// init all dropdown_guest-counter
$('.dropdown.dropdown_guest-counter').each(function () {
    const _this = $(this);

    let guests = 0;
    _this.find('.dropdown-item__counter-value').each(function () {
        guests += parseInt(this.innerHTML);
    });

    if (guests) {
        _this.find('.dropdown-head__text').html(getTextGuests(guests));
        _this.find('.dropdown-item-buttons__button-clear').removeClass('button_hide');
    }
});



$('.dropdown.dropdown_guest-counter .dropdown__body').filter(function () {
    return $(this).find('.dropdown-item-buttons').length > 0;
}).on('click', function (event) {
    const _this = $(this);
    const target = $(event.target);

    if (target.hasClass('dropdown-item-buttons__button-clear')) {
        _this.find('.dropdown-item__counter-value').each(function () {
            this.innerHTML = 0;
        });

        _this.parent('.dropdown').find('.dropdown-head__text').html('Сколько гостей');

        target.addClass('button_hide');

        return true;
    }

    if (!target.hasClass('dropdown-item__button-minus') && !target.hasClass('dropdown-item__button-plus')) {
        return true;
    }

    let guests = 0;
    _this.find('.dropdown-item__counter-value').each(function () {
        guests += parseInt(this.innerHTML);
    });

    if (guests === 0) {
        _this.find('.dropdown-item-buttons__button-clear').addClass('button_hide');
    } else {
        _this.find('.dropdown-item-buttons__button-clear').removeClass('button_hide');
    }

    _this.parent('.dropdown').find('.dropdown-head__text').html(getTextGuests(guests));
});