import * as $ from 'jquery';

import './plugin/plugin';
import CLASSES from './classes';

const likeButtonClickHandler = function likeButtonClickHandler(e: JQuery.MouseEventBase): void {
    const $btn = $(e.delegateTarget);
    const selected = $btn.likeButton('selected');
    let likes = $btn.likeButton('likes') as number;

    if (!selected) {
        likes += 1;
    } else {
        likes -= 1;
        if (likes < 0) {
            likes = 0;
        }
    }

    $btn.likeButton('likes', likes);
    $btn.likeButton('selected', !selected);
};

$(`.${CLASSES.LIKE_BTN}`).on('click.like-button.checked', likeButtonClickHandler);
