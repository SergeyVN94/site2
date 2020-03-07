import CLASSES from './classes';

const menuItemExpandHandler = function menuItemExpandHandler(e: JQuery.MouseEventBase): void {
    $(e.delegateTarget).toggleClass(CLASSES.EXPANDED);
};

$(`.${CLASSES.MENU_ITEM}`).on(
    'click.menu-item-expandable.expand',
    menuItemExpandHandler
);
