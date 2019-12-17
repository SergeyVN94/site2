type ButtonPlugin = (
    command: 'disable' | 'hidden',
    args?: boolean,
) => void | boolean;
