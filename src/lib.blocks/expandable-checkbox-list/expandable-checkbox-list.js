import $ from 'jquery';

$('.expandable-checkbox-list').on('click', function() {
    $(this).toggleClass('expandable-checkbox-list_expend');
});