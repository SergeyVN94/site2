import CLASSES from '../classes';

const handler = function likeButtonPlugin(
    this: JQuery,
    command: 'checked' | 'likes',
    args: boolean | number = null
): void | boolean | number | JQuery {
    switch (command) {
        case 'checked':
            if (args === null) {
                return this.hasClass(CLASSES.CHECKED);
            }

            if (typeof args !== 'boolean') {
                throw new TypeError('Expected boolean type parameter.');
            }

            this.toggleClass(CLASSES.CHECKED, args);
            this
                .find(`.${CLASSES.ICON}`)
                .text(args ? 'favorite' : 'favorite_border');

            return this;

        case 'likes':
            if (args === null) {
                const likes = this.find(`.${CLASSES.COUNTER}`).text();
                return parseInt(likes, 10);
            }

            if (typeof args !== 'number') {
                throw new TypeError('Expected number parameter.');
            }

            this.find(`.${CLASSES.COUNTER}`).text(args);
            return this;

        default:
            throw new Error(`Unknown command '${command}'`);
    }
};

export default handler;
