import $ from 'jquery';

function renderMonth(date, showDay=false) {

}

$('.calendar').on('click', function(event) {
    const calendar = $(this);
    const target = $(event.target);

    if (target.hasClass('calendar__head-btn-arrow')) {
        let cDate = calendar.attr('data-current-day');
        let rDate = calendar.attr('data-render-date');
        console.log(rDate);
        
        if (!cDate || !rDate) {
            return false;
        }

        const currentDate = new Date(cDate);
        const renderDate = new Date(rDate);
        let month = renderDate.getMonth() + 1;
        let year = renderDate.getFullYear();

        console.log(`m: ${month}, y: ${year}`);
        
        
        if (target.html() === 'arrow_back') {
            month -= 1;
            if (month < 1) {
                month = 12;
                year -= 1;
            }
        } else {
            month += 1;
            if (month > 12) {
                month = 1;
                year += 1;
            }
        }

        const newDate = `${year}-${month}-${currentDate.getDate()}`;

        console.log(newDate);
        

        // renderMonth(newDate, cDate === newDate);
        calendar.attr('data-render-date', newDate);
        return true;
    }
});