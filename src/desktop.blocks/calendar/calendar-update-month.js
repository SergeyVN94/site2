import $ from 'jquery';

const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

const createDaysItem = function createDaysItem(dayNumber) {
    const day = document.createElement('div');
    day.classList.add('button', 'button_theme_form-element-text', 'calendar__weekday');
    day.innerHTML = dayNumber;

    return day;
}

const redrawCalendarHead = function redrawCalendarHead(calendar) {
    const date = calendar.calendar('drawn-date');

    const month = date.getMonth();
    const year = date.getFullYear();
    const headText = `${monthNames[month]} ${year}`;
    calendar.find('.calendar__head .text.text_h2_m').text(headText);
}

const drawCurrentDay = function drawCurrentDay(calendar) {
    const _drawnDate = calendar.calendar('drawn-date');
    const currentDate = new Date();

    if (
        currentDate.getMonth() !== Number(_drawnDate.getMonth()) ||
        currentDate.getFullYear() !== Number(_drawnDate.getFullYear())
    ) {
        return;
    }

    calendar.find('.calendar__weekday:not(.calendar__weekday_another-month)')
        .each(function() {
            const day = $(this);
            if (Number(day.html()) === currentDate.getDate()) {
                day.addClass('calendar__weekday_current-day');
            }
        });
}

const redrawCalendar = function redrawCalendar(calendar) {
    const calendarBody = calendar.find('.calendar__body');
    calendarBody.html('');

    const date = calendar.calendar('drawn-date');
    const year = date.getFullYear();
    const month = date.getMonth();

    const daysInPreviousMonth = (new Date(year, month, 0)).getDate();
    // 0 - Monday ... 6 - Sunday
    const numberDayOfWeek = ((new Date(year, month, 1)).getDay() || 7) - 1;
    const tmpArr = [];

    for (let i = numberDayOfWeek - 1; i >= 0; i -= 1) {
        tmpArr.push(daysInPreviousMonth - 1);
    }

    tmpArr.reverse().forEach((dayNumber) => {
        const item = createDaysItem(dayNumber);
        item.classList.add('calendar__weekday_another-month');
        calendarBody.append(item);
    });

    const daysInMonth = (new Date(year, month + 1, 0)).getDate();
    for (let i = 1; i <= daysInMonth; i += 1) {
        calendarBody.append(createDaysItem(i));
    }

    // 0 - Monday ... 6 - Sunday
    const numberDayOfWeekLastDay = ((new Date(year, month, daysInMonth)).getDay() || 7) - 1;
    for (let i = numberDayOfWeekLastDay + 1, d = 1; i <= 6; i += 1, d += 1) {
        const item = createDaysItem(d);
        item.classList.add('calendar__weekday_another-month');
        calendarBody.append(item);
    }

    redrawCalendarHead(calendar);
    drawCurrentDay(calendar);
}

const drawnDate = function drawnDate(calendar, date = null) {
    if (date) {
        try {
            calendar.attr('data-drawn-date', JSON.stringify({
                year: date.getFullYear(),
                month: date.getMonth(),
            }));
            redrawCalendar(calendar);
        } catch (error) {
            throw new Error(error);
        }
    }

    try {
        const opt = JSON.parse(calendar.attr('data-drawn-date'));
        return new Date(opt.year, opt.month);
    } catch (error) {
        throw new Error(error);
    }
}

export { drawnDate };
