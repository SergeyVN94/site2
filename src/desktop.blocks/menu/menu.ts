const enum MENU_CLASSES {
  ITEM_EXPANDABLE = 'js-menu__item_expandable',
  ITEM_EXPANDED = 'menu__item_expanded',
  ITEM_TEXT = 'js-menu__item-text',
}

const handleDocumentClick = function handleDocumentClick(
  this: JQuery,
  _ev: { originalEvent: { path: Element[] } },
): void {
  const isClickInItem = _ev.originalEvent.path.some((element) => {
    if ('classList' in element) return element.classList.contains(MENU_CLASSES.ITEM_EXPANDABLE);
    return false;
  });

  if (!isClickInItem) {
    this.removeClass(MENU_CLASSES.ITEM_EXPANDED);
    $(document).off('click.menu__item_expandable.focusout');
  }
};

const handleMenuItemClick = function handleMenuItemClick(ev: JQuery.MouseEventBase): void {
  const $item = $(ev.delegateTarget).toggleClass(MENU_CLASSES.ITEM_EXPANDED);

  if ($item.hasClass(MENU_CLASSES.ITEM_EXPANDED)) {
    $(document).on('click.menu__item_expandable.focusout', handleDocumentClick.bind($item));
  }
};

$(`.${MENU_CLASSES.ITEM_EXPANDABLE}`).on(
  'click.menu__item_expandable.expand',
  `.${MENU_CLASSES.ITEM_TEXT}`,
  handleMenuItemClick,
);
