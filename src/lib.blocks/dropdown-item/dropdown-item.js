import $ from 'jquery';

$('.dropdown-item').on('click', function(event) {
    const _this = $(this);
    const target = $(event.target);

    if (target.hasClass('dropdown-item__button-minus')) {
        const counter = _this.find('.dropdown-item__counter-value');
        let number = parseInt(counter.html());
        number--;
        if (number <= 0) {
            counter.html('0');
            target.addClass('button_disable');
        } else {
            counter.html(number);
        }
    } else if (target.hasClass('dropdown-item__button-plus')) {
        const counter = _this.find('.dropdown-item__counter-value');
        let number = parseInt(counter.html());
        number++;
        counter.html(number);
        _this.find('.dropdown-item__button-minus').removeClass('button_disable');
    }
});