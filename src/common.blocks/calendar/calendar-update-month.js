import $ from 'jquery';

const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

function createDaysItem(dayNumber) {
    const day = document.createElement('div');
    day.classList.add('button', 'button_theme_form-element-text', 'calendar__weekday');
    day.innerHTML = dayNumber;

    return day;
}

function updateCalendar(date) {
    const calendarBody = $('.calendar .calendar__body');
    calendarBody.html('');

    const year = date.getFullYear();
    const month = date.getMonth();

    let daysInPreviousMonth = (new Date(year, month, 0)).getDate();
    const numberDayOfWeek = ((new Date(year, month, 1)).getDay() || 7) - 1; // 0 - Monday ... 6 - Sunday
    const tmpArr = [];
    for (let i = numberDayOfWeek - 1; i >= 0; i--) tmpArr.push(daysInPreviousMonth--);
    tmpArr.reverse().forEach(dayNumber => {
        const item = createDaysItem(dayNumber);
        item.classList.add('calendar__weekday_another-month');
        calendarBody.append(item);
    });

    const daysInMonth = (new Date(year, month + 1, 0)).getDate();
    for(let i = 1; i <= daysInMonth; i++) {
        calendarBody.append(createDaysItem(i));
    }
    
    const numberDayOfWeekLastDay = ((new Date(year, month, daysInMonth)).getDay() || 7) - 1; // 0 - Monday ... 6 - Sunday 
    for(let i = numberDayOfWeekLastDay + 1, d = 1; i <= 6; i++, d++) {
        const item = createDaysItem(d);
        item.classList.add('calendar__weekday_another-month');
        calendarBody.append(item);
    }     
}

$('.calendar').click(function (event) {
    const target = $(event.target);
    
    if (!target.hasClass('calendar__head-btn-arrow')) {        
        return false;
    }

    const calendar = $(this);

    const date = JSON.parse(calendar.attr('data-render-date'));
    const month = target.html() === 'arrow_back' ? date.month - 1 : date.month + 1;
    const newDate = new Date(date.year, month, 1);

    updateCalendar(newDate);

    calendar.attr('data-render-date', JSON.stringify({
        year: newDate.getFullYear(),
        month: newDate.getMonth()
    }));
    const calendarDateText = `${monthNames[newDate.getMonth()]} ${newDate.getFullYear()}`;
    calendar.find('.calendar__head .text.text_h2_m').text(calendarDateText);

    calendar.trigger('calendar-update', [
        newDate
    ]);
});