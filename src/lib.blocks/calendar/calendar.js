import $ from 'jquery';
import './calendar-plugin';

$('.calendar').each(function() {
    $(this).calendar('init');
});