const enum MENU_CLASSES {
  MENU_ITEM_EXPANDABLE = 'js-menu__item_expandable',
  BTN_EXPAND = 'js-menu__btn-expand',
  ITEM_EXPANDED = 'menu__item_expanded',
}

const handleMenuItemClick = function handleMenuItemClick(ev: JQuery.MouseEventBase): void {
  $(ev.delegateTarget).toggleClass(MENU_CLASSES.ITEM_EXPANDED);
};

$(`.${MENU_CLASSES.MENU_ITEM_EXPANDABLE}`).on(
  'click.menu__item_expandable.expand',
  handleMenuItemClick,
);
