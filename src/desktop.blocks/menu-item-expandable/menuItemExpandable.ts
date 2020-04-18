const enum MENU_ITEM_EXPANDABLE_CLASSES {
  MENU_ITEM = 'js-menu-item-expandable',
  BTN_EXPAND = 'js-menu-item-expandable__btn-expand',
  EXPANDED = 'menu-item-expandable_expanded',
}

const handleMenuItemClick = function handleMenuItemClick(ev: JQuery.MouseEventBase): void {
  $(ev.delegateTarget).toggleClass(MENU_ITEM_EXPANDABLE_CLASSES.EXPANDED);
};

$(`.${MENU_ITEM_EXPANDABLE_CLASSES.MENU_ITEM}`).on(
  'click.menu-item-expandable.expand',
  handleMenuItemClick,
);
