import $ from "jquery";

$('.like-button').on('click', function() {
    const _this = $(this);
    _this.toggleClass('like-button_active');

    const icon = _this.find('.like-button__icon');
    if (icon.html() === 'favorite_border') {
        icon.html('favorite');
    } else {
        icon.html('favorite_border');
    }
});