import $ from 'jquery';

$('.checkbox-list-expend').on('click', function(event) {
    const target = $(event.target);

    if (
        target.hasClass('checkbox-list-expend__title') ||
        target.hasClass('checkbox-list-expend__expend-button')
    ) {
        $(this).toggleClass('checkbox-list-expend_expend');
    }
});
