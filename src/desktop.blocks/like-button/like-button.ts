import * as $ from 'jquery';

import './plugin/plugin';
import CLASSES from './classes';

const likeButtonClickHandler = function likeButtonClickHandler(e: JQuery.MouseEventBase): void {
    const $btn = $(e.delegateTarget);
    const checked = $btn.likeButton('checked');
    let likes = $btn.likeButton('likes') as number;

    likes = checked ? likes -= 1 : likes += 1;

    if (likes < 0) {
        likes = 0;
    }

    $btn.likeButton('likes', likes);
    $btn.likeButton('checked', !checked);
};

$(`.${CLASSES.LIKE_BTN}`).on('click.like-button.checked', likeButtonClickHandler);
