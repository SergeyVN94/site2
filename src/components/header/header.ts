const enum HEADER_SELECTORS {
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
    this.$header.find(`.${HEADER_SELECTORS.MOBILE_BTN}`).on(
      'click.header.expanded-menu',
      this.handleClick.bind(this),
    );
  }

  private handleClick(): void {
    this.$header.toggleClass(HEADER_SELECTORS.EXPANDED);
  }
}

$(`.${HEADER_SELECTORS.HEADER}`).each((_, header) => {
  new Header($(header));
});
