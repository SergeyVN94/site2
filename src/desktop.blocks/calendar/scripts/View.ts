import Model from './Model';

import CALENDAR_CLASSES from './classes';

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

interface ICalendarDomElements {
    $calendar: JQuery;
    $btnNextMonth: JQuery;
    $btnPrevMonth: JQuery;
    $drawnDate: JQuery;
    $daysContainer: JQuery;
    $btnApply: JQuery;
    $btnClear: JQuery;
}

class View {
    private readonly _domElements: ICalendarDomElements;
    private readonly _model: Model;

    constructor($calendar: JQuery) {
        this._domElements = this._createDomElements($calendar);
        this._model = new Model(this.update.bind(this));
        this._initListeners();
    }

    public update(): void {
        this._updateHead();
        const pageDays = this._model.getPageDays();
        const calendarBody = this._createCalendarBody(pageDays);

        if (this._isNeedRenderCurrentDay()) {
            this._drawCurrentDay(calendarBody);
        }

        this._drawRangeDays(calendarBody);
        this._domElements.$daysContainer.html('').append(calendarBody);
    }

    private _drawRangeDays(calendarBody: DocumentFragment): boolean {
        const renderDate = this._model.getRenderDate();
        const {
            start,
            end,
        } = this._model.getRangeDays();
        const startIsNull = start === null;
        const endIsNull = end === null;
        const days = calendarBody.querySelectorAll(`.${CALENDAR_CLASSES.DAY_WEEK}:not(.${CALENDAR_CLASSES.DAY_WEEK_ANOTHER_MONTH})`);

        if (startIsNull && endIsNull) {
            return false;
        }

        const tmpDate = new Date(
            renderDate.getFullYear(),
            renderDate.getMonth()
        );
        tmpDate.setHours(0, 0, 0, 0);
        days.forEach((day, index) => {
            tmpDate.setDate(index + 1);

            const isNeedDrawRangeStart = !startIsNull && tmpDate.getTime() === start.getTime();
            if (isNeedDrawRangeStart) {
                day.classList.add(CALENDAR_CLASSES.RANGE_DAY);

                if (!endIsNull) {
                    day.classList.add(CALENDAR_CLASSES.RANGE_DAY_START);
                }
            }

            const isNeedDrawRangeEnd = !endIsNull && tmpDate.getTime() === end.getTime();
            if (isNeedDrawRangeEnd) {
                day.classList.add(CALENDAR_CLASSES.RANGE_DAY);

                if (!startIsNull) {
                    day.classList.add(CALENDAR_CLASSES.RANGE_DAY_END);
                }
            }

            const isNeedDrawRangeMiddle = !startIsNull && !endIsNull;
            if (isNeedDrawRangeMiddle) {
                const isDayIsMiddleRange = tmpDate.getTime() > start.getTime() &&
                    tmpDate.getTime() < end.getTime();

                if (isDayIsMiddleRange) {
                    day.classList.add(CALENDAR_CLASSES.RANGE_DAY_MIDDLE);
                }
            }
        });

        return true;
    }

    private _isNeedRenderCurrentDay(): boolean {
        const renderDate = this._model.getRenderDate();
        const currentDate = new Date();

        return (currentDate.getFullYear() === renderDate.getFullYear()) &&
            (currentDate.getMonth() === renderDate.getMonth());
    }

    private _drawCurrentDay(calendarBody: DocumentFragment): void {
        const currentDayNumber = (new Date()).getDate();

        calendarBody
            .querySelectorAll('div:not(.calendar__day-week_theme_another-month)')
            .forEach((day, index) => {
                const dayIsToday = (index + 1) === currentDayNumber;
                if (dayIsToday) {
                    day.classList.add('calendar__day-week_theme_today');
                }
            });
    }

    private _createCalendarBody(pageDays: number[]): DocumentFragment {
        const calendarBody = document.createDocumentFragment();

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const renderDate = this._model.getRenderDate();
        const tmpDate = new Date(
            renderDate.getFullYear(),
            renderDate.getMonth(),
            1
        );
        tmpDate.setHours(0, 0, 0, 0);

        pageDays.forEach((dayNumber, index) => {
            const isFirstWeek = index < 7;
            const isLastWeek = index > pageDays.length - 7;
            const isDayFromPrevMonth = (dayNumber > 20 && isFirstWeek);
            const isDayFromNextMonth = (dayNumber < 8 && isLastWeek);
            const isDayAnotherMonth = isDayFromPrevMonth || isDayFromNextMonth;
            const day = this._createDayMonth(dayNumber, isDayAnotherMonth);

            if (!isDayAnotherMonth) {
                tmpDate.setDate(dayNumber);
                const isDayNotClickable = tmpDate.getTime() < currentDate.getTime();
                if (isDayNotClickable) {
                    day.classList.add(CALENDAR_CLASSES.NOT_CLICKABLE);
                }
            }

            calendarBody.appendChild(day);
        });

        return calendarBody;
    }

    private _updateHead(): void {
        const renderDate = this._model.getRenderDate();
        const monthName = MONTH_NAMES[renderDate.getMonth()];
        const year = renderDate.getFullYear();
        const headText = `${monthName} ${year}`;

        this._domElements.$drawnDate.text(headText);
    }

    private _createDayMonth(dayNumber: number, isAnotherMonth = false): HTMLDivElement {
        const day = document.createElement('div');
        day.classList.add(
            'calendar__day-week',
            'js-calendar__day-week',
        );

        if (isAnotherMonth) {
            day.classList.add(
                'calendar__day-week_theme_another-month',
                'js-calendar__day-week_theme_another-month',
            );
        }

        day.innerHTML = String(dayNumber);

        return day;
    }

    private _createDomElements($calendar: JQuery): ICalendarDomElements {
        const $btnNextMonth = $calendar.find(`.${CALENDAR_CLASSES.BTN_NEXT_MONTH}`);
        const $btnPrevMonth = $calendar.find(`.${CALENDAR_CLASSES.BTN_PREV_MONTH}`);
        const $drawnDate = $calendar.find(`.${CALENDAR_CLASSES.DRAWN_DATE}`);
        const $daysContainer = $calendar.find(`.${CALENDAR_CLASSES.DAYS_CONTAINER}`);
        const $btnApply = $calendar.find(`.${CALENDAR_CLASSES.BTN_APPLY}`);
        const $btnClear = $calendar.find(`.${CALENDAR_CLASSES.BTN_CLEAR}`);

        return {
            $calendar,
            $btnNextMonth,
            $btnPrevMonth,
            $drawnDate,
            $daysContainer,
            $btnApply,
            $btnClear,
        };
    }

    private _initListeners(): void {
        this._domElements.$btnNextMonth.on(
            'click.calendar.nextMonth',
            this._handleClickBtnNextMonth.bind(this)
        );
        this._domElements.$btnPrevMonth.on(
            'click.calendar.prevMonth',
            this._handleClickBtnPrevMonth.bind(this)
        );

        this._domElements.$daysContainer.on(
            'click.calendar.clickOnDay',
            `.${CALENDAR_CLASSES.DAY_WEEK}`,
            this._handleClickDaysContainer.bind(this)
        );

        this._domElements.$btnApply.on(
            'click.calendar.apply',
            this._handleClickBtnApply.bind(this)
        );

        this._domElements.$btnClear.on(
            'click.calendar.clear',
            this._handleClickBtnClear.bind(this)
        );
    }

    private _handleClickBtnClear(): void {
        this._model.resetRangeDays();
        this._domElements.$calendar.trigger('clear');
    }

    private _handleClickBtnApply(): void {
        const {
            start = null,
            end = null,
        } = this._model.getRangeDays();

        this._domElements.$calendar.trigger('apply', [start, end]);
    }

    private _handleClickBtnNextMonth(): void {
        this._model.nextMonth();
    }

    private _handleClickBtnPrevMonth(): void {
        this._model.previousMonth();
    }

    private _handleClickDaysContainer(ev: JQuery.MouseEventBase): void {
        const $day = $(ev.currentTarget);
        const dayNumber = parseInt($day.text(), 10);

        if ($day.hasClass(CALENDAR_CLASSES.DAY_WEEK_ANOTHER_MONTH)) {
            if (dayNumber > 20) {
                this._model.previousMonth();
            } else {
                this._model.nextMonth();
            }
        }

        const selectRange = this._domElements.$calendar.attr('data-select-date') || '';
        this._model.updateRangeDays(dayNumber, selectRange === 'start');
    }
}

export default View;
