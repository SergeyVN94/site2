import $ from 'jquery';

$('.room-impressions .room-impressions__container-diagram').each(function() {
    const containerDiagram = $(this);

    containerDiagram.find('.room-impressions__diagram path').each(function() {
        const path = $(this);
        path.mouseover((event) => {
            const target = $(event.target);
            const d = target.attr('d');
        });

        path.mouseleave((event) => {
            const target = $(event.target);
            const d = target.attr('d');
        });
    });
});
