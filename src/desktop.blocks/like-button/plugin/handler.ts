import CLASSES from '../classes';

const handler = function likeButtonPlugin(
    this: JQuery,
    command: 'selected' | 'likes',
    args: boolean | number = null,
): void | boolean | number | JQuery {
    switch (command) {
        case 'selected':
            if (args === null) {
                return this.hasClass(CLASSES.SELECTED);
            }

            if (typeof args !== 'boolean') {
                throw new TypeError('Expected boolean type parameter.');
            }

            this.toggleClass(CLASSES.SELECTED, args);

            if (args) {
                this.find(`.${CLASSES.ICON}`).text('favorite');
            } else {
                this.find(`.${CLASSES.ICON}`).text('favorite_border');
            }

            return this;

        case 'likes':
            if (args === null) {
                const likes = this.find(`.${CLASSES.COUNTER}`).text();
                return parseInt(likes, 10);
            }

            this.find(`.${CLASSES.COUNTER}`).text(args);
            return this;
    
        default:
            throw new Error(`Unknown command '${command}'`);
    }
};

export default handler;
