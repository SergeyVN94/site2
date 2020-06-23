const enum MENU__ITEM_EXPANDABLE_CLASSES {
  MENU_ITEM = 'js-menu__item-expandable',
  BTN_EXPAND = 'js-menu__btn-expand',
  EXPANDED = 'menu__item-expandable_expanded',
}

const handleMenuItemClick = function handleMenuItemClick(ev: JQuery.MouseEventBase): void {
  $(ev.delegateTarget).toggleClass(MENU__ITEM_EXPANDABLE_CLASSES.EXPANDED);
};

$(`.${MENU__ITEM_EXPANDABLE_CLASSES.MENU_ITEM}`).on(
  'click.menu-item-expandable.expand',
  handleMenuItemClick,
);
