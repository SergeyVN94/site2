type LikeButtonPlugin = (
    command: 'selected' | 'likes',
    args?: boolean | number,
) => void | boolean | number | JQuery;
