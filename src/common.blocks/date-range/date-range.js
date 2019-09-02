import $ from 'jquery';

$('.date-range .dropdown-date').on('click', function() {
    const _this = $(this);
    _this.parent('.date-range').toggleClass('date-range_mode_select-dates');
});