import * as $ from 'jquery';

import './plugin/plugin';

$('.dropdown').on('click.dropdown.expand', '.dropdown-head', (e: JQuery.MouseEventBase) => {
    const $dropdown = $(e.delegateTarget);
    const isExpanded = $dropdown.dropdown('expand') as boolean;

    $dropdown.dropdown('expand', !isExpanded);
});
