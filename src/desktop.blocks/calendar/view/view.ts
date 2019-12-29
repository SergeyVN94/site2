import CLASSES from '../classes';

const MONTH_NAMES = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

const getRenderedDate = function getRenderedDateFromCalendar($calendar: JQuery): Date {
    const dateStr = $calendar.attr('data-date');
    const isValidDate = /\d{1,2}\.\d{1,2}\.\d{4}/.test(dateStr);

    if (isValidDate) {
        const [
            day,
            month,
            year,
        ] = dateStr.split('.').map<number>((itemDate): number => {
            return parseInt(itemDate, 10);
        });

        return new Date(year, month - 1, day);
    }

    return new Date();
};

const updateCalendarHead = function updateCalendarHead($calendar: JQuery, date: Date): void {
    const calendarHead = `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;

    $calendar.find(`.${CLASSES.DRAWN_DATE}`).text(calendarHead);
};

const dateToString = function dateToString(date: Date): string {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

const getDaysInMonth = function getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
};

const createCalendarDay = function createCalendarDay(
    dayNumber: number,
    isCurrentMonth = true
): HTMLElement {
    const day = document.createElement('div');
    day.innerHTML = String(dayNumber);

    day.classList.add('calendar__day-week');

    if (!isCurrentMonth) {
        day.classList.add('calendar__day-week_theme_another-month');
    }

    return day;
};

const getCalendarDays = function getCalendarDays(renderDate: Date): DocumentFragment {
    const calendarDays = document.createDocumentFragment();

    const daysInMonth = getDaysInMonth(renderDate.getMonth(), renderDate.getFullYear());
    const daysInPrevMonth = getDaysInMonth(renderDate.getMonth() - 1, renderDate.getFullYear());

    const tmpDate = new Date(renderDate.getFullYear(), renderDate.getMonth(), 1);
    const dayWeekFirstDay = (tmpDate.getDay() || 7) - 1; // Monday - 0, Sunday - 6

    tmpDate.setDate(daysInMonth);
    const dayWeekLastDay = (tmpDate.getDay() || 7) - 1;

    for (let i = daysInPrevMonth - dayWeekFirstDay + 1; i <= daysInPrevMonth; i += 1) {
        calendarDays.appendChild(createCalendarDay(i, false));
    }

    for (let i = 1; i <= daysInMonth; i += 1) {
        calendarDays.appendChild(createCalendarDay(i));
    }

    if (dayWeekLastDay < 6) {
        for (let i = dayWeekLastDay + 1, j = 1; i <= 6; i += 1, j += 1) {
            calendarDays.appendChild(createCalendarDay(j, false));
        }
    }

    return calendarDays;
};

const markCurrentDay = function markCurrentDay(days: DocumentFragment, renderDate: Date): void {
    const currentDate = new Date();

    if (
        currentDate.getMonth() === renderDate.getMonth() &&
        currentDate.getFullYear() === renderDate.getFullYear()
    ) {
        const index = currentDate.getDate() - 1;
        const selector = '.calendar__day-week:not(.calendar__day-week_theme_another-month)';
        const day = days.querySelectorAll(selector)[index];
        day.classList.add('calendar__day-week_theme_today');
    }
};

const updateCalendar = function updateCalendar($calendar: JQuery, renderDate: Date): void {
    $calendar.attr('data-date', dateToString(renderDate));

    updateCalendarHead($calendar, renderDate);

    const calendarDays = getCalendarDays(renderDate);
    markCurrentDay(calendarDays, renderDate);

    $calendar
        .find(`.${CLASSES.DAYS_CONTAINER}`)
        .html('')
        .append(calendarDays);
};

export {
    getRenderedDate,
    updateCalendar,
};
