import $ from "jquery";
import './like-button-plugin';

$('.like-button').click(function() {
    const button = $(this);
    let likes = button.likeButton('likes');
    
    button.toggleClass('like-button_active');

    const icon = button.find('.like-button__icon');
    if (icon.html() === 'favorite_border') {
        likes++;
        icon.html('favorite');
    } else {
        likes--;
        icon.html('favorite_border');
    }

    if (likes < 0) {
        likes = 0;
    }

    button.likeButton('likes', likes);
});

