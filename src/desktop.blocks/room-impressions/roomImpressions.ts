const enum ROOM_IMPRESSION_CLASSES {
  DIAGRAM = 'js-room-impressions__diagram',
  SVG = 'js-room-impressions__diagram-image',
  VALUE_OUT = 'js-room-impressions__value',
}

$(`.${ROOM_IMPRESSION_CLASSES.DIAGRAM}`).each((index, element) => {
  const $diagram = $(element);
  const $out = $diagram.find(`.${ROOM_IMPRESSION_CLASSES.VALUE_OUT}`);
  const totalValue = $out.text();

  $diagram
    .find(`.${ROOM_IMPRESSION_CLASSES.SVG}`)
    .find('path[d]')
    .on('mouseover.roomImpression.selectPath', (ev: JQuery.MouseOverEvent) => {
      const $path = $(ev.target);
      $out.text($path.data('value'));

      const tmpPath = $path.attr('d');
      $path.attr('d', $path.data('path-expanded'));
      $path.data('path-expanded', tmpPath);

      const tmpStrokeWidth = $path.attr('stroke-width');
      $path.attr('stroke-width', $path.data('stroke-width-expanded'));
      $path.data('stroke-width-expanded', tmpStrokeWidth);

      $diagram.addClass(`room-impressions__diagram_theme_${$path.data('theme')}`);
    }).on('mouseout.roomImpression.unselectPath', (ev: JQuery.MouseOutEvent) => {
      $out.text(totalValue);

      const $path = $(ev.target);
      const tmpPath = $path.attr('d');
      $path.attr('d', $path.data('path-expanded'));
      $path.data('path-expanded', tmpPath);

      const tmpStrokeWidth = $path.attr('stroke-width');
      $path.attr('stroke-width', $path.data('stroke-width-expanded'));
      $path.data('stroke-width-expanded', tmpStrokeWidth);

      $diagram.removeClass(`room-impressions__diagram_theme_${$path.data('theme')}`);
    });
});
