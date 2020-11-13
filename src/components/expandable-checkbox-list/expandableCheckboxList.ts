const enum CHECKBOX_LIST_CLASSES {
  CHECKBOX_LIST = 'js-expandable-checkbox-list',
  HEAD = 'js-expandable-checkbox-list__head',
  EXPANDED = 'expandable-checkbox-list_expanded',
}

class ExpandableCheckboxList {
  private readonly $list: JQuery;

  constructor($list: JQuery) {
    this.$list = $list;
    this.init();
  }

  private init(): void {
    this.$list.find(`.${CHECKBOX_LIST_CLASSES.HEAD}`).on(
      'click.expandable-checkbox-list.toggleOpened',
      this.handleClick.bind(this),
    );
  }

  private handleClick(): void {
    this.$list.toggleClass(CHECKBOX_LIST_CLASSES.EXPANDED);
  }
}

$(`.${CHECKBOX_LIST_CLASSES.CHECKBOX_LIST}`).each((_, list) => {
  new ExpandableCheckboxList($(list));
});
