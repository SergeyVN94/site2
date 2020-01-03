const handler = function handler(
    this: JQuery,
    command: 'select-date',
    args: 'start' | 'end' = null
): void | JQuery {
    switch (command) {
        case 'select-date':
            if (args === null) {
                throw new Error("expected parameter of type 'start' | 'end'");
            }

            this.attr('data-select-date', args);

            return this;

        default:
            throw new Error(`Unknown command '${command}'`);
    }
};

export default handler;
