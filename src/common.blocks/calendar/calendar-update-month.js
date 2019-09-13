import $ from 'jquery';

const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

/**
 * 
 * @param {string|Date} date format string 'yyyy-mm-dd'
 * @param {boolean} previousMonth if 'true' will reduce the month by 1,
 * otherwise increase 
 * @returns {string} new date string
 */
function changeMonthInDate(date, previousMonth = false) {
    if (typeof date === 'string') {
        date = new Date(date);
    }

    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    if (previousMonth) {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
    } else {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
    }

    return `${year}-${month + 1}-${day}`;
}

/**
 * 
 * @param {Number} year 
 * @param {Number} month 
 * @returns {Number} days in month
 */
function getNumberDaysInMonth(year, month) {
    return 33 - (new Date(year, month, 33)).getDate();
}

/**
 * 
 * @param {string|Date} date format string 'yyyy-mm-dd' (countdown of months from 1),
 * or Date object
 * @returns {Array} array weeks of month 
 */
function getWeekArray(date) {
    const weekArray = [];

    if (typeof date === 'string') {
        date = new Date(date);
    }

    let year = date.getFullYear();
    let month = date.getMonth();
    const daysInMonth = getNumberDaysInMonth(year, month);

    const pYear = month - 1 < 0 ? year - 1 : year;
    const pMonth = month - 1 < 0 ? 11 : month - 1;
    const daysInPreviousMonth = getNumberDaysInMonth(pYear, pMonth);

    const dayOfWeek = ((new Date(year, month, 1)).getDay() || 7) - 1; // monday - 0, sunday - 6 

    const firsWeek = [];
    for (let i = dayOfWeek, d = 1; i < 7; i++, d++) {
        firsWeek[i] = d;
    }

    if (dayOfWeek > 0) {
        let i = dayOfWeek - 1;
        let d = daysInPreviousMonth;
        while (i >= 0) {
            firsWeek[i--] = d--;
        }
    }

    weekArray.push(firsWeek);

    let dayCount = firsWeek[firsWeek.length - 1] + 1;
    for (let w = 1; dayCount <= daysInMonth; w++) {
        const next = dayCount + 6;
        weekArray[w] = [];
        while (dayCount <= next && dayCount <= daysInMonth) {
            weekArray[w].push(dayCount++);
        }
    }

    if (weekArray[weekArray.length - 1].length < 7) {
        let i = 1;
        while (weekArray[weekArray.length - 1].length < 7) {
            weekArray[weekArray.length - 1].push(i++);
        }
    }

    return weekArray;
}

function createItem(day, fromAnotherMonth = false) {
    const item = document.createElement('div');
    item.classList.add('button', 'button_theme_form-element-text', 'calendar__week-day');

    if (fromAnotherMonth) {
        item.classList.add('calendar__week-day-another-month');
    }

    item.innerHTML = day;
    return item;
}

function createCalendarFragment(weekArray) {
    const fragment = document.createDocumentFragment();

    for (let w = 0; w < weekArray.length; w++) {
        const weekContainer = document.createElement('div');
        weekContainer.classList.add('calendar__week');

        for (let d = 0; d < 7; d++) {
            const day = weekArray[w][d];
            if (w === 0) {
                weekContainer.appendChild(createItem(day, day > 7));
            } else if (w === weekArray.length - 1) {
                weekContainer.appendChild(createItem(day, day < 7));
            } else {
                weekContainer.appendChild(createItem(day));
            }
        }

        fragment.appendChild(weekContainer);
    }

    return fragment;
}

function clearCalendar(calendar) {
    calendar.find('.calendar__week').each(function (index) {
        if (index) {
            this.parentElement.removeChild(this);
        }
    });
}

function updateCalendar(previousMonth = false) {
    const calendar = $('.calendar');

    const renderDate = calendar.attr('data-render-date');
    let currentDate = calendar.attr('data-current-date');

    if (!currentDate) {
        const cDate = new Date();
        currentDate = `${cDate.getFullYear()}-${cDate.getMonth() + 1}-${cDate.getDate()}`;
    }

    if (!renderDate) {
        return false;
    }

    clearCalendar(calendar);

    const newDate = changeMonthInDate(renderDate, previousMonth);
    const weekArray = getWeekArray(newDate);
    const fragment = createCalendarFragment(weekArray);
    
    if (currentDate === newDate) {
        const day = newDate.split('-').pop();
        $(fragment).find('.calendar__week-day:not(.calendar__week-day-another-month)').each(function() {
            if (this.innerHTML === day) {
                this.classList.remove('button_theme_form-element-text');
                this.classList.add('button_theme_round-green-text', 'calendar__current-day');
            }
        });
    }

    calendar.find('.calendar__week')[0].after(fragment);

    calendar.attr('data-render-date', newDate);

    const dateArr = newDate.split('-');
    const indexMonth = Number(dateArr[1]) - 1;
    calendar.find('.calendar__head .text.text_h2_m').html(`${monthNames[indexMonth]} ${dateArr[0]}`);

    calendar.trigger('calendar-update', [
        newDate
    ]);

    return true;
}

$('.calendar').click(function (event) {
    const target = $(event.target);

    if (!target.hasClass('calendar__head-btn-arrow')) {        
        return false;
    }

    return updateCalendar(target.html() === 'arrow_back');
});