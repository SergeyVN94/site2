import $ from "jquery";

$('.like-button').on('click', function() {
    $(this).toggleClass('like-button_active');
});