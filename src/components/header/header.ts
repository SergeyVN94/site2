const enum HEADER_CLASSES {
  MOBILE_BTN = 'js-button[data-action="expand-mobile-menu"]',
  HEADER = 'js-header',
  EXPANDED = 'header_extended',
}

class Header {
  private readonly $header: JQuery;

  constructor($header: JQuery) {
    this.$header = $header;
    this.init();
  }

  private init(): void {
    this.$header.find(`.${HEADER_CLASSES.MOBILE_BTN}`).on(
      'click.header.expanded-menu',
      this.handleClick.bind(this),
    );
  }

  private handleClick(): void {
    this.$header.toggleClass(HEADER_CLASSES.EXPANDED);
  }
}

$(`.${HEADER_CLASSES.HEADER}`).each((_, header) => {
  new Header($(header));
});
