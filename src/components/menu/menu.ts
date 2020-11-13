const enum MENU_CLASSES {
  MENU = 'js-menu',
  ITEM_EXPANDABLE = 'js-menu__item_expandable',
  ITEM_EXPANDED = 'menu__item_expanded',
  ITEM_TEXT = 'js-menu__item-text',
}

class Menu {
  private readonly $menu: JQuery;

  private $itemsExpandable: JQuery;

  constructor($menu: JQuery) {
    this.$menu = $menu;
    this.init();
  }

  private init(): void {
    this.$itemsExpandable = this.$menu.find(`.${MENU_CLASSES.ITEM_EXPANDABLE}`);

    if (this.$itemsExpandable.length) {
      this.$itemsExpandable.find(`.${MENU_CLASSES.ITEM_TEXT}`).on(
        'click.menu.toggleExpandableItem',
        Menu.handleItemClick.bind(this),
      );

      $(document).on('click.menu.closeExpandableItem', this.handleDocumentClick.bind(this));
    }
  }

  private static handleItemClick(ev: JQuery.MouseEventBase): void {
    $(ev.currentTarget).parent().toggleClass(MENU_CLASSES.ITEM_EXPANDED);
  }

  private handleDocumentClick(ev: JQuery.MouseEventBase): void {
    const composed = ev.originalEvent.composedPath() as HTMLElement[];

    const isNeedClose = !composed.some((element) => {
      if ('classList' in element) return element.classList.contains(MENU_CLASSES.ITEM_EXPANDABLE);
      return false;
    });

    if (isNeedClose) this.$itemsExpandable.removeClass(MENU_CLASSES.ITEM_EXPANDED);
  }
}

$(`.${MENU_CLASSES.MENU}`).each((_, menu) => {
  new Menu($(menu));
});
