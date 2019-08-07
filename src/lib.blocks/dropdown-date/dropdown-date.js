import $ from 'jquery';

$('.dropdown-date .dropdown-head').on('click', function() {
    $(this).parent('.dropdown-date').toggleClass('dropdown-date_expend');
});