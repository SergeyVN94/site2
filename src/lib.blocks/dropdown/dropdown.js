import $ from "jquery";

$('.dropdown .dropdown-head').on('click', function() {
    $(this).parent('.dropdown').toggleClass('dropdown_expend');
});