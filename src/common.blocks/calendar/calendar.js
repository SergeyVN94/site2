import $ from 'jquery';

const monthNames = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

function renderMonth(date, showDay = false) {

}

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
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (previousMonth) {
        month--;
        if (month < 1) {
            month = 12;
            year--;
        }
    } else {
        month++;
        if (month > 12) {
            month = 1;
            year++;
        }
    }

    return `${year}-${month}-${day}`;
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
function getMonthDays(date) {
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
    for (let i = daysInPreviousMonth - dayOfWeek + 1; i <= daysInPreviousMonth; i++) {
        firsWeek.push(i);
    }
    for (let i = 1; firsWeek.length < 7; i++) {
        firsWeek.push(i);
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
        while(weekArray[weekArray.length - 1].length < 7) {
            weekArray[weekArray.length - 1].push(i++);
        }
    }

    return weekArray;
}

function createItem(day, fromAnotherMonth = false) {
    const item = document.createElement('div');
    item.classList.add('button','button_theme_form-element-text','calendar__week-day');

    if (fromAnotherMonth) {
        item.classList.add('calendar__week-day-another-month');
    }

    item.innerHTML = day;
    return item;
}

$('.calendar').on('click', function (event) {
    const calendar = $(this);
    const target = $(event.target);

    if (target.hasClass('calendar__head-btn-arrow')) {
        let renderDate = calendar.attr('data-render-date');

        if (!renderDate) {
            return false;
        }

        const newDate = changeMonthInDate(renderDate, target.html() === 'arrow_back');
        const newMonth = getMonthDays(newDate);

        const fragment = document.createDocumentFragment();

        for (let w = 0; w < newMonth.length; w++) {
            const week = newMonth[w];

            const weekContainer = document.createElement('div');
            weekContainer.classList.add('calendar__week');

            for (let d = 0; d < week.length; d++) {
                const day = newMonth[w][d];
                if (w === 0) {
                    weekContainer.appendChild(createItem(day, day > 7));
                } else if(w === newMonth.length - 1) {
                    weekContainer.appendChild(createItem(day, day < 7));
                } else {
                    weekContainer.appendChild(createItem(day));
                }
            }

            fragment.appendChild(weekContainer);
        }

        calendar.find('.calendar__week').each(function(index) {
            if (index) {
                this.parentElement.removeChild(this);
            }
        });

        calendar.find('.calendar__week')[0].after(fragment);

        // renderMonth(newDate, cDate === newDate);
        calendar.attr('data-render-date', newDate);
        
        const newDateArr = newDate.split('-');
        const indexMonth = Number(newDateArr[1]) - 1;
        calendar.find('.calendar__head .text.text_h2_m').html(`${monthNames[indexMonth]} ${newDateArr[0]}`);

        return true;
    }
});