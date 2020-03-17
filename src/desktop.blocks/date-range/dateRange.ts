const DATE_RANGE_CLASSES = {
    DATE_RANGE: 'js-date-range',
    DROPDOWN_HEAD: 'js-date-range__dropdown-head',
    DROPDOWN_HEAD_LEFT: 'js-date-range__dropdown-head-left',
    DROPDOWN_HEAD_RIGHT: 'js-date-range__dropdown-head-right',
    RANGE_SELECT: 'date-range_range-select',
    CALENDAR: 'js-calendar',
};
const DROPDOWN_HEAD_TEXT_DEFAULT = 'ДД.ММ.ГГГГ';

interface IDateRangeDomElements {
    $dateRange: JQuery;
    $dropdownHeads: JQuery;
    $dropdownHeadLeft: JQuery;
    $dropdownHeadRight: JQuery;
    $calendar: JQuery;
}

class DateRange {
    private readonly _domElements: IDateRangeDomElements;

    constructor($dateRange: JQuery) {
        this._domElements = this._createDomElements($dateRange);
        this._initEventListeners();
    }

    private _createDomElements($dateRange: JQuery): IDateRangeDomElements {
        const $dropdownHeads = $dateRange.find(`.${DATE_RANGE_CLASSES.DROPDOWN_HEAD}`);
        const $dropdownHeadLeft = $dateRange.find(`.${DATE_RANGE_CLASSES.DROPDOWN_HEAD_LEFT}`);
        const $dropdownHeadRight = $dateRange.find(`.${DATE_RANGE_CLASSES.DROPDOWN_HEAD_RIGHT}`);
        const $calendar = $dateRange.find(`.${DATE_RANGE_CLASSES.CALENDAR}`);

        return {
            $dateRange,
            $dropdownHeads,
            $dropdownHeadLeft,
            $dropdownHeadRight,
            $calendar,
        };
    }

    private _initEventListeners(): void {
        this._domElements.$dropdownHeads.on(
            'click.dateRange.setDateRange',
            this._handleDropdownHeadClick.bind(this)
        );

        this._domElements.$calendar.on(
            'clear.dateRange.clear',
            this._handleCalendarClear.bind(this)
        );
        this._domElements.$calendar.on(
            'apply.dateRange.updateDateRange',
            this._handleCalendarApply.bind(this)
        );
    }

    private _dateToString(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth()).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

    private _deselectDateRange(): void {
        this._domElements.$dropdownHeads.dropdownHead('remove-theme', 'select-date');
        this._domElements.$dateRange.removeClass(DATE_RANGE_CLASSES.RANGE_SELECT);
    }

    private _handleDropdownHeadClick(ev: JQuery.MouseEventBase): boolean {
        const $dropdownHead = $(ev.currentTarget);

        if ($dropdownHead.dropdownHead('has-theme', 'select-date')) {
            this._deselectDateRange();
            return true;
        }

        $dropdownHead.dropdownHead('set-theme', 'select-date');
        this._domElements.$dateRange.addClass(DATE_RANGE_CLASSES.RANGE_SELECT);

        if ($dropdownHead.hasClass(DATE_RANGE_CLASSES.DROPDOWN_HEAD_LEFT)) {
            this._domElements.$dropdownHeadRight.dropdownHead('remove-theme', 'select-date');
            this._domElements.$calendar.calendar('select-date', 'start');
            return true;
        }

        this._domElements.$dropdownHeadLeft.dropdownHead('remove-theme', 'select-date');
        this._domElements.$calendar.calendar('select-date', 'end');

        return true;
    }

    private _handleCalendarClear(): void {
        this._domElements.$dropdownHeads.dropdownHead('text', DROPDOWN_HEAD_TEXT_DEFAULT);
        this._deselectDateRange();
    }

    private _handleCalendarApply(ev: JQuery.EventBase, start: Date, end: Date): void {
        if (start !== null) {
            this._domElements.$dropdownHeadLeft.dropdownHead('text', this._dateToString(start));
        }

        if (end !== null) {
            this._domElements.$dropdownHeadRight.dropdownHead('text', this._dateToString(end));
        }

        this._deselectDateRange();
    }
}

$(`.${DATE_RANGE_CLASSES.DATE_RANGE}`).each(function() {
    new DateRange($(this));
});
