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

// init all dropdown_guest
$('.dropdown_guest').each(function () {
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

$('.dropdown_guest .dropdown__body')
    .filter(function () {
        return $(this).find('.dropdown-item-buttons').length > 0;
    })
    .on('click', function (event) {
        const _this = $(this);
        const target = $(event.target);

        if (target.hasClass('dropdown-item-buttons__button-clear')) {
            _this.find('.dropdown-item__counter-value')
                .each(function () {
                    this.innerHTML = 0;
                });

            _this.parent('.dropdown')
                .find('.dropdown-head__text')
                .html('Сколько гостей');

            _this.parent('.dropdown')
                .find('.dropdown-item__button-minus')
                .each(function () {
                    this.classList.add('button_disable');
                });

            target.addClass('button_hide');

            return true;
        }

        if (!target.hasClass('dropdown-item__button-minus') &&
            !target.hasClass('dropdown-item__button-plus')) {
            return true;
        }

        let guests = 0;
        _this.find('.dropdown-item__counter-value')
            .each(function () {
                guests += parseInt(this.innerHTML);
            });

        if (guests === 0) {
            _this.find('.dropdown-item-buttons__button-clear')
                .addClass('button_hide');
        } else {
            _this.find('.dropdown-item-buttons__button-clear')
                .removeClass('button_hide');
        }

        _this.parent('.dropdown')
            .find('.dropdown-head__text')
            .html(getTextGuests(guests));
    });