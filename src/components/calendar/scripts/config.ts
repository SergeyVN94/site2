const enum CALENDAR_SELECTORS {
  CALENDAR = 'calendar',
  BUTTON_CHANGE_MONTH_HIDDEN = 'calendar__change-month_hidden',
  BUTTON_PREVIOUS_MONTH = 'button[data-action="previous-month"]',
  BUTTON_NEXT_MONTH = 'button[data-action="next-month"]',
  BUTTON_APPLY = 'button[data-action="apply"]',
  BUTTON_CLEAR = 'button[data-action="clear"]',
  BUTTON_CLEAR_HIDDEN = 'calendar__clear-button_hidden',
  DRAWN_DATE = 'calendar__drawn-date',
  DAYS_CONTAINER = 'calendar__days-container',
  DAY_WEEK = 'calendar__day-week',
  DAY_NUMBER = 'calendar__day-number',
  DAY_INNER = 'calendar__day-inner',
  DAY_THEME_ANOTHER_MONTH = 'calendar__day-week_theme_another-month',
  DAY_THEME_RANGE_DAY = 'calendar__day-week_theme_range-day',
  DAY_THEME_NOT_CLICKABLE = 'calendar__day-week_theme_not-clickable',
  DAY_THEME_TODAY = 'calendar__day-week_theme_today',
  DAY_THEME_RANGE_DAY_MIDDLE = 'calendar__day-week_theme_range-day-middle',
  RANGE_DAY_START = 'calendar__day-week_range-day_start',
  RANGE_DAY_END = 'calendar__day-week_range-day_end',
}

type SelectMode = 'range-start' | 'range-end' | 'auto';

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

interface IDomElements {
  readonly $calendar: JQuery;
  readonly $btnNextMonth: JQuery;
  readonly $btnPrevMonth: JQuery;
  readonly $drawnDate: JQuery;
  readonly $daysContainer: JQuery;
  readonly $btnApply: JQuery;
  readonly $btnClear: JQuery;
}

type DayInfo = {
  date: Date;
  labels: string[];
};

type ModelStatePackage = {
  currentDate: Date;
  days: DayInfo[];
  rangeDays: {
    start: Date;
    end: Date;
  };
};

type HandlerUpdateEvent = (state: ModelStatePackage) => void;

type RangeDays = {
  start: Date;
  end: Date;
};

type DayLabelGenerator = (
  date: Date,
  currentDate: Date,
  rangeDays: RangeDays,
) => string | string[] | null;

export default CALENDAR_SELECTORS;
export {
  SelectMode,
  MONTH_NAMES,
  IDomElements,
  DayInfo,
  ModelStatePackage,
  HandlerUpdateEvent,
  RangeDays,
  DayLabelGenerator,
};
