const enum ROOM_IMPRESSION_CLASSES {
  DIAGRAM = 'js-room-impressions__diagram',
  SVG = 'js-room-impressions__diagram-image',
  VALUE_OUT = 'js-room-impressions__value',
  HELP_ITEM = 'js-room-impressions__help-item',
  ROOM_IMPRESSIONS = 'js-room-impressions',
}

const selectPath = function selectPath($path: JQuery, $diagram: JQuery, select = true): void {
  $path.attr('d', $path.data(select ? 'path-expanded' : 'path'));
  $path.attr('stroke-width', $path.data(select ? 'stroke-width-expanded' : 'stroke-width'));

  $diagram.removeClass((index, classes) => classes.split(' ').filter((className) => className.includes('diagram_theme_')).join(' '));

  if (select) $diagram.addClass(`room-impressions__diagram_theme_${$path.data('theme')}`);
};

$(`.${ROOM_IMPRESSION_CLASSES.ROOM_IMPRESSIONS}`).each((index, element) => {
  const $roomImpressions = $(element);
  const $diagram = $roomImpressions.find(`.${ROOM_IMPRESSION_CLASSES.DIAGRAM}`);
  const $out = $diagram.find(`.${ROOM_IMPRESSION_CLASSES.VALUE_OUT}`);
  const totalValue = $out.text();

  $roomImpressions
    .find(`.${ROOM_IMPRESSION_CLASSES.HELP_ITEM}`)
    .on('mouseover.roomImpression.selectPathWithHelp', (ev: JQuery.MouseOverEvent) => {
      const $path = $diagram.find(`svg path[data-theme='${ev.currentTarget.dataset.theme}']`);
      $out.text($(ev.currentTarget).data('value'));

      if ($path.length) selectPath($path, $diagram);
    }).on('mouseout.roomImpression.unselectPathWithHelp', (ev: JQuery.MouseOutEvent) => {
      const $path = $diagram.find(`svg path[data-theme='${ev.currentTarget.dataset.theme}']`);
      $out.text(totalValue);
      if ($path.length) selectPath($path, $diagram, false);
    });

  $diagram
    .find(`.${ROOM_IMPRESSION_CLASSES.SVG}`)
    .find('path[d]')
    .on('mouseover.roomImpression.selectPath', (ev: JQuery.MouseOverEvent) => {
      const $path = $(ev.target);
      $out.text($path.data('value'));
      selectPath($path, $diagram);
    }).on('mouseout.roomImpression.unselectPath', (ev: JQuery.MouseOutEvent) => {
      const $path = $(ev.target);
      $out.text(totalValue);
      selectPath($path, $diagram, false);
    });
});
