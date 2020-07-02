const enum CALENDAR_CLASSES {
  CALENDAR = 'js-calendar',
  BUTTON_PREVIOUS_MONTH = 'js-calendar__change-month_direction_previous',
  BUTTON_NEXT_MONTH = 'js-calendar__change-month_direction_next',
  DRAWN_DATE = 'js-calendar__drawn-date',
  DAYS_CONTAINER = 'js-calendar__days-container',
  DAY_WEEK = 'js-calendar__day-week',
  DAY_WEEK_ANOTHER_MONTH = 'js-calendar__day-week_theme_another-month',
  RANGE_DAY = 'calendar__day-week_theme_range-day',
  RANGE_DAY_START = 'calendar__day-week_range-day_start',
  RANGE_DAY_END = 'calendar__day-week_range-day_end',
  RANGE_DAY_MIDDLE = 'calendar__day-week_theme_range-day-middle',
  BUTTON_APPLY = 'js-button[data-action="apply"]',
  BUTTON_CLEAR = 'js-button[data-action="clear"]',
  NOT_CLICKABLE = 'calendar__day-week_theme_not-clickable',
}

export default CALENDAR_CLASSES;
