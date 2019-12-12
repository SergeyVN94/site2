import $ from 'jquery';
import './text-field-plugin';

$('.text-field').each(function() {
    const textField = $(this);
    const mask = textField.attr('data-template');
});
