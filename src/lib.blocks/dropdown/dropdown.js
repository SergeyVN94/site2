import $ from "jquery";
import './dropdown_guest';

$('.dropdown .dropdown-head').on('click', function() {
    $(this).parent('.dropdown').toggleClass('dropdown_expend');
});