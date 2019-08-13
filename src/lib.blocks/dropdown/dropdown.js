import $ from "jquery";
import './dropdown_guest-counter';

$('.dropdown .dropdown-head').on('click', function() {
    $(this).parent('.dropdown').toggleClass('dropdown_expend');
});