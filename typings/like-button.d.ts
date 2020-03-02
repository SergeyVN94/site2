type LikeButtonPlugin = (
    command: 'checked' | 'likes',
    args?: boolean | number,
) => void | boolean | number | JQuery;
