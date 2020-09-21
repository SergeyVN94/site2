const enum CLASSES {
  CALENDAR = 'calendar',
  BUTTON_PREVIOUS_MONTH = 'button[data-action="previous-month"]',
  BUTTON_NEXT_MONTH = 'button[data-action="next-month"]',
  BUTTON_APPLY = 'button[data-action="apply"]',
  BUTTON_CLEAR = 'button[data-action="clear"]',
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

export default CLASSES;
