/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"ui_kit": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./index.js","vendors~ui_kit"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../lib.blocks/calendar/calendar-date-range.js":
/*!************************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/calendar/calendar-date-range.js ***!
  \************************************************************************************************/
/*! exports provided: clearRange, range, addDayInRange, mode, redrawRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearRange", function() { return clearRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "range", function() { return range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDayInRange", function() { return addDayInRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mode", function() { return mode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "redrawRange", function() { return redrawRange; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


function clearRangeButtons(calendar) {
  calendar.find(`.calendar__weekday`).removeClass(['calendar__range-day-middle', 'calendar__range-day-start', 'calendar__range-day-end', 'calendar__range-day_only']);
}

function clearRange(calendar) {
  clearRangeButtons(calendar);
  calendar.attr('data-range-start', '');
  calendar.attr('data-range-end', '');
}

function drawRange(calendar) {
  const drawnDate = calendar.calendar('drawn-date'),
        range = calendar.calendar('range');

  if (range.start === range.end === null) {
    return;
  }

  const days = calendar.find('.calendar__weekday:not(.calendar__weekday_another-month)');
  const start = range.start;
  const end = range.end;
  const isDrawStart = start && start.getMonth() === drawnDate.getMonth() && start.getFullYear() === drawnDate.getFullYear();
  const isDrawEnd = end && end.getMonth() === drawnDate.getMonth() && end.getFullYear() === drawnDate.getFullYear();
  days.each(function () {
    const num = Number(this.innerHTML);

    if (isDrawStart) {
      if (num === start.getDate()) {
        this.classList.add('calendar__range-day-start');

        if (end === null) {
          this.classList.add('calendar__range-day_only');
        }
      }
    }

    if (isDrawEnd) {
      if (num === end.getDate()) {
        this.classList.add('calendar__range-day-end');

        if (start === null) {
          this.classList.add('calendar__range-day_only');
        }
      }
    }
  });

  if (start && end) {
    const tmpDate = new Date(drawnDate.getFullYear(), drawnDate.getMonth());
    days.each(function () {
      tmpDate.setDate(Number(this.innerHTML));

      if (tmpDate > start && tmpDate < end) {
        this.classList.add('calendar__range-day-middle');
      }
    });
  }
}

function redrawRange(calendar) {
  clearRangeButtons(calendar);
  drawRange(calendar);
}

function mode(calendar, modeValue = null) {
  if (modeValue) {
    calendar.attr('data-select-mode', modeValue);
    return;
  }

  if (calendar.attr('data-select-mode')) {
    return calendar.attr('data-select-mode');
  } else {
    return null;
  }
}

function getRange(calendar) {
  const result = {
    start: null,
    end: null
  };

  try {
    const start = calendar.attr('data-range-start');
    const date = JSON.parse(start);
    result.start = new Date(date.year, date.month, date.day);
  } catch (error) {}

  try {
    const end = calendar.attr('data-range-end');
    const date = JSON.parse(end);
    result.end = new Date(date.year, date.month, date.day);
  } catch (error) {}

  return result;
}

function setRange(calendar, range) {
  const start = range.start;
  const end = range.end;

  if (start) {
    try {
      const date = JSON.stringify({
        year: start.getFullYear(),
        month: start.getMonth(),
        day: start.getDate()
      });
      calendar.attr('data-range-start', date);
    } catch (error) {
      throw 'Invalid date parameter passed. Date object expected.';
    }
  }

  if (end) {
    try {
      const date = JSON.stringify({
        year: end.getFullYear(),
        month: end.getMonth(),
        day: end.getDate()
      });
      calendar.attr('data-range-end', date);
    } catch (error) {
      throw 'Invalid date parameter passed. Date object expected.';
    }
  }

  clearRangeButtons(calendar);
  drawRange(calendar);
}

function range(calendar, range = null) {
  if (range) {
    setRange(calendar, range);
    redrawRange(calendar);
    return;
  }

  return getRange(calendar);
}

function addDayInRange(calendar, day) {
  const mode = calendar.calendar('mode');

  if (mode !== 'start' && mode !== 'end') {
    return false;
  }

  const drawnDate = calendar.calendar('drawn-date'),
        targetDate = new Date(drawnDate.getFullYear(), drawnDate.getMonth(), Number(day.text())),
        currentDate = new Date(new Date().toDateString()); // to reset the time

  if (targetDate < currentDate) {
    return false;
  }

  const range = getRange(calendar);
  const start = range.start;
  const end = range.end;

  if (mode === 'start') {
    if (end && targetDate > end) {
      return false;
    }

    range.start = targetDate;
  } else {
    if (start) {
      const tmpDate = new Date(start.toDateString());
      tmpDate.setDate(tmpDate.getDate() + 1);

      if (targetDate < tmpDate) {
        return false;
      }
    }

    range.end = targetDate;
  }

  setRange(calendar, range);
  redrawRange(calendar);
}



/***/ }),

/***/ "../../lib.blocks/calendar/calendar-plugin.js":
/*!********************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/calendar/calendar-plugin.js ***!
  \********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _calendar_date_range__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendar-date-range */ "../../lib.blocks/calendar/calendar-date-range.js");
/* harmony import */ var _calendar_update_month__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar-update-month */ "../../lib.blocks/calendar/calendar-update-month.js");




(function ($) {
  function init(_calendar) {
    _calendar.click(function (event) {
      const calendar = $(this);
      const target = $(event.target);
      const drawnDate = calendar.calendar('drawn-date');

      if (target.hasClass('calendar__head-btn-arrow')) {
        let month = drawnDate.getMonth();
        target.html() === 'arrow_back' ? month-- : month++;
        const newDate = new Date(drawnDate.getFullYear(), month);
        calendar.calendar('drawn-date', newDate);
        Object(_calendar_date_range__WEBPACK_IMPORTED_MODULE_1__["redrawRange"])(calendar);
        return true;
      }

      if (target.hasClass('calendar__weekday') && !target.hasClass('calendar__weekday_another-month')) {
        Object(_calendar_date_range__WEBPACK_IMPORTED_MODULE_1__["addDayInRange"])(calendar, target);
        return true;
      }

      if (target.hasClass('calendar__button-clear')) {
        Object(_calendar_date_range__WEBPACK_IMPORTED_MODULE_1__["clearRange"])(calendar);
        return true;
      }
    });
  }

  $.fn.calendar = function () {
    const args = Array.from(arguments);
    const calendar = this;

    if (args.length === 1) {
      switch (args[0]) {
        case 'clear-range':
          Object(_calendar_date_range__WEBPACK_IMPORTED_MODULE_1__["clearRange"])(calendar);
          break;

        case 'range':
          return Object(_calendar_date_range__WEBPACK_IMPORTED_MODULE_1__["range"])(calendar);

        case 'mode':
          return Object(_calendar_date_range__WEBPACK_IMPORTED_MODULE_1__["mode"])(calendar);

        case 'drawn-date':
          return Object(_calendar_update_month__WEBPACK_IMPORTED_MODULE_2__["drawnDate"])(calendar);

        case 'init':
          return init(calendar);

        default:
          throw `The command "${args[0]}" is unknown.`;
      }
    }

    if (args.length === 2) {
      switch (args[0]) {
        case 'range':
          Object(_calendar_date_range__WEBPACK_IMPORTED_MODULE_1__["range"])(calendar, args[1]);
          break;

        case 'mode':
          if (typeof args[0] !== 'string') {
            throw 'Wrong argument type! expected string.';
          }

          Object(_calendar_date_range__WEBPACK_IMPORTED_MODULE_1__["mode"])(calendar, args[1]);
          break;

        case 'drawn-date':
          if (typeof args[1] !== 'object') {
            throw 'Wrong argument type! expected object.';
          }

          return Object(_calendar_update_month__WEBPACK_IMPORTED_MODULE_2__["drawnDate"])(calendar, args[1]);

        case 'on-inter':
          if (typeof args[1] !== 'function') {
            throw 'Wrong argument type! expected function.';
          }

          calendar.find('.calendar__button-enter').click(args[1]);
          break;

        case 'on-clear':
          if (typeof args[1] !== 'function') {
            throw 'Wrong argument type! expected function.';
          }

          calendar.find('.calendar__button-clear').click(args[1]);
          break;

        default:
          throw `The command "${args[0]}" is unknown.`;
      }
    }

    return calendar;
  };
})(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "../../lib.blocks/calendar/calendar-update-month.js":
/*!**************************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/calendar/calendar-update-month.js ***!
  \**************************************************************************************************/
/*! exports provided: drawnDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawnDate", function() { return drawnDate; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

function createDaysItem(dayNumber) {
  const day = document.createElement('div');
  day.classList.add('button', 'button_theme_form-element-text', 'calendar__weekday');
  day.innerHTML = dayNumber;
  return day;
}

function redrawCalendarHead(calendar) {
  const date = calendar.calendar('drawn-date');
  const month = date.getMonth();
  const year = date.getFullYear();
  const headText = `${monthNames[month]} ${year}`;
  calendar.find('.calendar__head .text.text_h2_m').text(headText);
}

function drawCurrentDay(calendar) {
  const drawnDate = calendar.calendar('drawn-date');
  const currentDate = new Date();

  if (currentDate.getMonth() !== Number(drawnDate.getMonth()) || currentDate.getFullYear() !== Number(drawnDate.getFullYear())) {
    return;
  }

  calendar.find('.calendar__weekday:not(.calendar__weekday_another-month)').each(function () {
    const day = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);

    if (Number(day.html()) === currentDate.getDate()) {
      day.addClass('calendar__weekday_current-day');
    }
  });
}

function redrawCalendar(calendar) {
  const calendarBody = calendar.find('.calendar__body');
  calendarBody.html('');
  const date = calendar.calendar('drawn-date');
  const year = date.getFullYear();
  const month = date.getMonth();
  let daysInPreviousMonth = new Date(year, month, 0).getDate();
  const numberDayOfWeek = (new Date(year, month, 1).getDay() || 7) - 1; // 0 - Monday ... 6 - Sunday

  const tmpArr = [];

  for (let i = numberDayOfWeek - 1; i >= 0; i--) tmpArr.push(daysInPreviousMonth--);

  tmpArr.reverse().forEach(dayNumber => {
    const item = createDaysItem(dayNumber);
    item.classList.add('calendar__weekday_another-month');
    calendarBody.append(item);
  });
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    calendarBody.append(createDaysItem(i));
  }

  const numberDayOfWeekLastDay = (new Date(year, month, daysInMonth).getDay() || 7) - 1; // 0 - Monday ... 6 - Sunday 

  for (let i = numberDayOfWeekLastDay + 1, d = 1; i <= 6; i++, d++) {
    const item = createDaysItem(d);
    item.classList.add('calendar__weekday_another-month');
    calendarBody.append(item);
  }

  redrawCalendarHead(calendar);
  drawCurrentDay(calendar);
}

function drawnDate(calendar, date = null) {
  if (date) {
    try {
      calendar.attr('data-drawn-date', JSON.stringify({
        year: date.getFullYear(),
        month: date.getMonth()
      }));
      redrawCalendar(calendar);
    } catch (error) {
      throw error;
    }
  }

  try {
    const opt = JSON.parse(calendar.attr('data-drawn-date'));
    return new Date(opt.year, opt.month);
  } catch (error) {
    throw error;
  }
}



/***/ }),

/***/ "../../lib.blocks/calendar/calendar.js":
/*!*************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/calendar/calendar.js ***!
  \*************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _calendar_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendar-plugin */ "../../lib.blocks/calendar/calendar-plugin.js");


jquery__WEBPACK_IMPORTED_MODULE_0___default()('.calendar').each(function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).calendar('init');
});

/***/ }),

/***/ "../../lib.blocks/checkbox-list-expend/checkbox-list-expend.js":
/*!*************************************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/checkbox-list-expend/checkbox-list-expend.js ***!
  \*************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.checkbox-list-expend').on('click', function (event) {
  const target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target);

  if (target.hasClass('checkbox-list-expend__title') || target.hasClass('checkbox-list-expend__expend-button')) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).toggleClass('checkbox-list-expend_expend');
  }
});

/***/ }),

/***/ "../../lib.blocks/date-range/date-range.js":
/*!*****************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/date-range/date-range.js ***!
  \*****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


function dateToString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}.${month}.${year}`;
}

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.date-range').each(function () {
  const dateRange = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
  const calendar = dateRange.find('.calendar');
  const dateMask = 'ДД.ММ.ГГГГ';
  const dropdownDateStart = dateRange.find('.dropdown-date.start .dropdown__text');
  const dropdownDateEnd = dateRange.find('.dropdown-date.end .dropdown__text');
  dateRange.find('.dropdown-date').click(function () {
    const dropdown = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this); // hide or show calendar

    const dMode = dropdown.hasClass('start') ? 'start' : 'end';
    const selectMode = calendar.calendar('mode');
    const isCalendarHide = calendar.css('display') === 'none';

    if (isCalendarHide) {
      calendar.css('display', 'block');
      calendar.calendar('mode', dMode);
      dropdown.addClass('dropdown-date_focus');
    } else if (dMode !== selectMode) {
      calendar.calendar('mode', dMode);
      dateRange.find('.dropdown-date').removeClass('dropdown-date_focus');
      dropdown.addClass('dropdown-date_focus');
    } else {
      calendar.css('display', 'none');
      dropdown.removeClass('dropdown-date_focus');
    }
  });
  calendar.calendar('on-inter', function () {
    const range = calendar.calendar('range');
    dropdownDateStart.text(dateMask);
    dropdownDateEnd.text(dateMask);

    if (range.start) {
      dropdownDateStart.text(dateToString(range.start));
    }

    if (range.end) {
      dropdownDateEnd.text(dateToString(range.end));
    }

    dateRange.find('.dropdown-date').removeClass('dropdown-date_focus');
    calendar.css('display', 'none');
  });
  calendar.calendar('on-clear', function () {
    dropdownDateStart.text(dateMask);
    dropdownDateEnd.text(dateMask);
    dateRange.find('.dropdown-date').removeClass('dropdown-date_focus');
    calendar.css('display', 'none');
  });
});

/***/ }),

/***/ "../../lib.blocks/dropdown-guest/dropdown-guest-plugin.js":
/*!********************************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/dropdown-guest/dropdown-guest-plugin.js ***!
  \********************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


(function ($) {
  $.fn.dropdownGuest = function () {
    const dropdownGuest = this;
    const args = Array.from(arguments);

    if (args.length === 1) {
      switch (args[0]) {
        case 'guests':
          let guests = {
            all: 0
          };
          dropdownGuest.find('.dropdown-item-counter').each(function () {
            const counter = $(this);
            const name = counter.dropdownItemCounter('name') || counter.dropdownItemCounter('text');
            const value = counter.dropdownItemCounter('value');
            if (!guests[name]) guests[name] = 0;
            guests[name] += value;
            guests.all += value;
          });
          return guests;

        case 'reset':
          dropdownGuest.find('.dropdown-item-counter').each(function () {
            const counter = $(this);
            counter.dropdownItemCounter('value', 0);
          });
          return dropdownGuest;

        case 'expend':
          return dropdownGuest.hasClass('dropdown-guest_expend');

        default:
          throw `The command "${args[0]}" is unknown.`;
      }
    }

    if (args.length === 2) {
      switch (args[0]) {
        case 'text':
          const value = args[1];

          if (typeof value !== 'string') {
            throw 'Wrong argument type! expected string.';
          }

          dropdownGuest.find('.dropdown').dropdown('text', value);
          return dropdownGuest;

        case 'expend':
          const expend = args[1];

          if (typeof expend !== 'boolean') {
            throw 'Wrong argument type! expected string.';
          }

          if (expend) {
            dropdownGuest.addClass('dropdown-guest_expend');
          } else {
            dropdownGuest.removeClass('dropdown-guest_expend');
          }

          return dropdownGuest;

        case 'init':
          const init = args[1];

          if (typeof init !== 'object') {
            throw 'Wrong argument type! expected object.';
          }

          const keys = Object.keys(init);
          const nInit = {};

          for (let i = 0; i < keys.length; i++) {
            const name = keys[i];
            nInit[name.toLowerCase()] = init[name];
          }

          dropdownGuest.find('.dropdown-item-counter').each(function () {
            const counter = $(this);
            const name = counter.dropdownItemCounter('text').toLowerCase();

            if (init[name]) {
              counter.dropdownItemCounter('value', Number(init[name]));
            }
          });
          return dropdownGuest;

        default:
          throw `The command "${args[0]}" is unknown.`;
      }
    }
  };
})(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "../../lib.blocks/dropdown-guest/dropdown-guest.js":
/*!*************************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/dropdown-guest/dropdown-guest.js ***!
  \*************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib */ "../../lib.blocks/lib.js");
/* harmony import */ var _dropdown_guest_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dropdown-guest-plugin */ "../../lib.blocks/dropdown-guest/dropdown-guest-plugin.js");




function getTextGuests(guests) {
  if (guests.all === 0) {
    return 'Сколько гостей';
  }

  const result = [];

  if (guests.grown) {
    const gradNum = Object(_lib__WEBPACK_IMPORTED_MODULE_1__["getIndexGraduation"])(guests.grown);
    result.push(`${guests.grown} гост${['ь', 'я', 'ей'][gradNum]}`);
  }

  if (guests.babies) {
    const gradNum = Object(_lib__WEBPACK_IMPORTED_MODULE_1__["getIndexGraduation"])(guests.babies);
    result.push(`${guests.babies} младен${['ец', 'ца', 'цев'][gradNum]}`);
  }

  return result.join(', ');
}

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.dropdown-guest').each(function () {
  const dropdownGuest = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
  const dropdown = dropdownGuest.find('.dropdown');
  dropdown.dropdown('click', function () {
    const isExpend = dropdownGuest.dropdownGuest('expend');
    dropdownGuest.dropdownGuest('expend', !isExpend);
  });
  dropdownGuest.click(function (event) {
    const target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target);

    if (target.hasClass('dropdown-guest__button-clear')) {
      dropdown.dropdown('text', 'Сколько гостей');
      dropdownGuest.dropdownGuest('reset');
      dropdownGuest.dropdownGuest('expend', false);
      return true;
    }

    if (target.hasClass('dropdown-guest__button-inter')) {
      const guests = dropdownGuest.dropdownGuest('guests');
      dropdown.dropdown('text', getTextGuests(guests));
      dropdownGuest.dropdownGuest('expend', false);
      return true;
    }

    if (target.hasClass('dropdown-item-counter__button-minus') || target.hasClass('dropdown-item-counter__button-plus')) {
      if (dropdownGuest.dropdownGuest('guests').all) {
        dropdownGuest.find('.dropdown-guest__button-clear').removeClass('button_hide');
      } else {
        dropdownGuest.find('.dropdown-guest__button-clear').addClass('button_hide');
      }

      return true;
    }
  }); // init

  const init = dropdownGuest.attr('data-init');

  if (typeof init === 'string' && init.length > 2) {
    try {
      dropdownGuest.dropdownGuest('init', JSON.parse(init));
      const guests = dropdownGuest.dropdownGuest('guests');
      dropdown.dropdown('text', getTextGuests(guests));

      if (guests.all) {
        dropdownGuest.find('.dropdown-guest__button-clear').removeClass('button_hide');
      }
    } catch (error) {
      throw "Invalid 'init' format attribute! JSON format expected.";
    }
  }
});

/***/ }),

/***/ "../../lib.blocks/dropdown-item-counter/dropdown-item-counter-plugin.js":
/*!**********************************************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/dropdown-item-counter/dropdown-item-counter-plugin.js ***!
  \**********************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


(function ($) {
  $.fn.dropdownItemCounter = function () {
    const counter = this;
    const args = Array.from(arguments);

    if (args.length === 1) {
      switch (args[0]) {
        case 'value':
          return Number(counter.find('.dropdown-item-counter__counter-value').text());

        case 'text':
          return counter.find('.dropdown-item-counter__text').text();

        case 'name':
          return counter.attr('data-name');

        default:
          throw `The command "${args[0]}" is unknown.`;
      }
    }

    if (args.length === 2) {
      switch (args[0]) {
        case 'value':
          let value = args[1];

          if (isNaN(value)) {
            throw 'Wrong argument type! expected number.';
          }

          if (value <= 0) {
            value = 0;
            counter.find('.dropdown-item-counter__button-minus').addClass('button_disable');
          } else {
            counter.find('.dropdown-item-counter__button-minus').removeClass('button_disable');
          }

          Number(counter.find('.dropdown-item-counter__counter-value').text(value));
          return counter;

        case 'text':
          const text = args[1];

          if (typeof text !== 'string') {
            throw 'Wrong argument type! expected string.';
          }

          return counter.find('.dropdown-item-counter__text').text(text);

        case 'name':
          const name = args[1];

          if (typeof name !== 'string') {
            throw 'Wrong argument type! expected string.';
          }

          return counter.attr('data-name', name);

        default:
          throw `The command "${args[0]}" is unknown.`;
      }
    }
  };
})(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "../../lib.blocks/dropdown-item-counter/dropdown-item-counter.js":
/*!***************************************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/dropdown-item-counter/dropdown-item-counter.js ***!
  \***************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dropdown_item_counter_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dropdown-item-counter-plugin */ "../../lib.blocks/dropdown-item-counter/dropdown-item-counter-plugin.js");


jquery__WEBPACK_IMPORTED_MODULE_0___default()('.dropdown-item-counter').click(function (event) {
  const target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target);
  const counter = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);

  if (!target.hasClass('button')) {
    return;
  }

  let number = counter.dropdownItemCounter('value');

  if (target.hasClass('dropdown-item-counter__button-minus')) {
    number--;
  } else if (target.hasClass('dropdown-item-counter__button-plus')) {
    number++;
  }

  counter.dropdownItemCounter('value', number);
});

/***/ }),

/***/ "../../lib.blocks/dropdown-rooms/dropdown-rooms-plugin.js":
/*!********************************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/dropdown-rooms/dropdown-rooms-plugin.js ***!
  \********************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


(function ($) {
  $.fn.dropdownRooms = function () {
    const dropdownRooms = this;
    const args = Array.from(arguments);

    if (args.length === 1) {
      switch (args[0]) {
        case 'rooms':
          let rooms = {
            all: 0
          };
          dropdownRooms.find('.dropdown-item-counter').each(function () {
            const counter = $(this);
            const name = counter.dropdownItemCounter('name') || counter.dropdownItemCounter('text');
            const value = counter.dropdownItemCounter('value');
            if (!rooms[name]) rooms[name] = 0;
            rooms[name] += value;
            rooms.all += value;
          });
          return rooms;

        case 'reset':
          dropdownRooms.find('.dropdown-item-counter').each(function () {
            const counter = $(this);
            counter.dropdownItemCounter('value', 0);
          });
          return dropdownRooms;

        case 'expend':
          return dropdownRooms.hasClass('dropdown-rooms_expend');

        default:
          throw `The command "${args[0]}" is unknown.`;
      }
    }

    if (args.length === 2) {
      switch (args[0]) {
        case 'text':
          const value = args[1];

          if (typeof value !== 'string') {
            throw 'Wrong argument type! expected string.';
          }

          dropdownRooms.find('.dropdown').dropdown('text', value);
          return dropdownRooms;

        case 'expend':
          const expend = args[1];

          if (typeof expend !== 'boolean') {
            throw 'Wrong argument type! expected string.';
          }

          if (expend) {
            dropdownRooms.addClass('dropdown-rooms_expend');
          } else {
            dropdownRooms.removeClass('dropdown-rooms_expend');
          }

          return dropdownRooms;

        case 'init':
          const init = args[1];

          if (typeof init !== 'object') {
            throw 'Wrong argument type! expected object.';
          }

          const keys = Object.keys(init);
          const nInit = {};

          for (let i = 0; i < keys.length; i++) {
            const name = keys[i];
            nInit[name.toLowerCase()] = init[name];
          }

          dropdownRooms.find('.dropdown-item-counter').each(function () {
            const counter = $(this);
            const name = counter.dropdownItemCounter('text').toLowerCase();

            if (init[name]) {
              counter.dropdownItemCounter('value', Number(init[name]));
            }
          });
          return dropdownRooms;

        default:
          throw `The command "${args[0]}" is unknown.`;
      }
    }
  };
})(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "../../lib.blocks/dropdown-rooms/dropdown-rooms.js":
/*!*************************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/dropdown-rooms/dropdown-rooms.js ***!
  \*************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib */ "../../lib.blocks/lib.js");
/* harmony import */ var _dropdown_rooms_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dropdown-rooms-plugin */ "../../lib.blocks/dropdown-rooms/dropdown-rooms-plugin.js");




function getRoomsAsText(counter) {
  const result = [];

  if (counter.bedrooms) {
    const i = Object(_lib__WEBPACK_IMPORTED_MODULE_1__["getIndexGraduation"])(counter.bedrooms);
    const str = `${counter.bedrooms} спал${['ьня', 'ьни', 'ен'][i]}`;
    result.push(str);
  }

  if (counter.beds) {
    const i = Object(_lib__WEBPACK_IMPORTED_MODULE_1__["getIndexGraduation"])(counter.beds);
    const str = `${counter.beds} кроват${['ь', 'и', 'ей'][i]}`;
    result.push(str);
  }

  if (counter.bathrooms) {
    const i = Object(_lib__WEBPACK_IMPORTED_MODULE_1__["getIndexGraduation"])(counter.bathrooms);
    let str = `${counter.bathrooms} ванн${['ая', 'ые', 'ых'][i]} `;
    str += `комнат${['а', 'ы', ''][i]}`;
    result.push(str);
  }

  if (result.length) {
    return result.join(', ');
  }

  return 'Сколько комнат';
}

function sliceText(text) {
  if (text.length > 21) {
    return text.slice(0, 20) + '...';
  } else {
    return text.split(', ').slice(0, 2).join(', ') + '...';
  }
}

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.dropdown-rooms').each(function () {
  const dropdownRooms = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
  const dropdown = dropdownRooms.find('.dropdown');
  dropdown.dropdown('click', function () {
    const isExpend = dropdownRooms.dropdownRooms('expend');
    dropdownRooms.dropdownRooms('expend', !isExpend);
  });
  dropdownRooms.click(function (event) {
    const target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target);

    if (target.hasClass('dropdown-item-counter__button-minus') || target.hasClass('dropdown-item-counter__button-plus')) {
      const rooms = dropdownRooms.dropdownRooms('rooms');
      const text = sliceText(getRoomsAsText(rooms));
      dropdown.dropdown('text', text);
    }
  });
  const rooms = dropdownRooms.dropdownRooms('rooms');
  const text = sliceText(getRoomsAsText(rooms));
  dropdown.dropdown('text', text); // init

  const init = dropdownRooms.attr('data-init');

  if (typeof init === 'string' && init.length > 2) {
    try {
      dropdownRooms.dropdownRooms('init', JSON.parse(init));
      const rooms = dropdownRooms.dropdownRooms('rooms');
      const text = sliceText(getRoomsAsText(rooms));
      dropdown.dropdown('text', text);
    } catch (error) {
      throw "Invalid 'init' format attribute! JSON format expected.";
    }
  }
});

/***/ }),

/***/ "../../lib.blocks/dropdown/dropdown.js":
/*!*************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/dropdown/dropdown.js ***!
  \*************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


(function ($) {
  $.fn.dropdown = function () {
    const dropdown = this;
    const args = Array.from(arguments);

    if (args.length === 1) {
      switch (args[0]) {
        case 'click':
          dropdown.click();
          return dropdown;

        case 'text':
          return dropdown.find('.dropdown__text').text();

        default:
          throw `The command "${args[0]}" is unknown.`;
      }
    }

    if (args.length === 2) {
      switch (args[0]) {
        case 'click':
          let clickHandler = args[1];

          if (typeof clickHandler !== 'function') {
            throw 'Wrong argument type! expected function.';
          }

          dropdown.click(clickHandler);
          return dropdown;

        case 'text':
          const value = args[1];

          if (typeof value !== 'string') {
            throw 'Wrong argument type! expected string.';
          }

          dropdown.find('.dropdown__text').text(value);
          return dropdown;

        case 'theme':
          const theme = args[1];

          if (typeof theme !== 'string') {
            throw 'Wrong argument type! expected string.';
          }

          dropdown.addClass(`dropdown_theme_${theme}`);
          return dropdown;

        default:
          throw `The command "${args[0]}" is unknown.`;
      }
    }
  };
})(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "../../lib.blocks/index.js":
/*!*************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/index.js ***!
  \*************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _like_button_like_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./like-button/like-button */ "../../lib.blocks/like-button/like-button.js");
/* harmony import */ var _dropdown_dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dropdown/dropdown */ "../../lib.blocks/dropdown/dropdown.js");
/* harmony import */ var _range_slider_range_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./range-slider/range-slider */ "../../lib.blocks/range-slider/range-slider.js");
/* harmony import */ var _dropdown_item_counter_dropdown_item_counter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dropdown-item-counter/dropdown-item-counter */ "../../lib.blocks/dropdown-item-counter/dropdown-item-counter.js");
/* harmony import */ var _checkbox_list_expend_checkbox_list_expend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./checkbox-list-expend/checkbox-list-expend */ "../../lib.blocks/checkbox-list-expend/checkbox-list-expend.js");
/* harmony import */ var _dropdown_guest_dropdown_guest__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dropdown-guest/dropdown-guest */ "../../lib.blocks/dropdown-guest/dropdown-guest.js");
/* harmony import */ var _dropdown_rooms_dropdown_rooms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dropdown-rooms/dropdown-rooms */ "../../lib.blocks/dropdown-rooms/dropdown-rooms.js");
/* harmony import */ var _pagination_pagination__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pagination/pagination */ "../../lib.blocks/pagination/pagination.js");
/* harmony import */ var _room_impressions_room_impressions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./room-impressions/room-impressions */ "../../lib.blocks/room-impressions/room-impressions.js");
/* harmony import */ var _calendar_calendar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./calendar/calendar */ "../../lib.blocks/calendar/calendar.js");
/* harmony import */ var _date_range_date_range__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./date-range/date-range */ "../../lib.blocks/date-range/date-range.js");
/* harmony import */ var _text_field_text_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./text-field/text-field */ "../../lib.blocks/text-field/text-field.js");













/***/ }),

/***/ "../../lib.blocks/lib.js":
/*!***********************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/lib.js ***!
  \***********************************************************************/
/*! exports provided: getIndexGraduation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIndexGraduation", function() { return getIndexGraduation; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


function getIndexGraduation(number) {
  const ost10 = number % 10;
  const ost100 = number % 100;
  let grad = 0;

  if (ost10 === 1 && (ost100 > 20 || number === 1)) {
    grad = 0;
  }

  if (ost10 >= 2 && ost10 <= 4) {
    grad = 1;
  }

  if (ost10 >= 5 && ost10 <= 9 || ost10 === 0 || ost100 >= 11 && ost100 <= 20) {
    grad = 2;
  }

  return grad;
}



/***/ }),

/***/ "../../lib.blocks/like-button/like-button-plugin.js":
/*!**************************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/like-button/like-button-plugin.js ***!
  \**************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


(function ($) {
  $.fn.likeButton = function () {
    const args = Array.from(arguments);
    const button = this; // Одиночная команда

    if (args.length === 1) {
      switch (args[0]) {
        case 'likes':
          return Number(button.find('.like-button__counter').text());

        default:
          return;
      }
    } // Команда с параметрами


    if (args.length > 1) {
      switch (args[0]) {
        case 'likes':
          const likes = args[1];

          if (isNaN(likes)) {
            throw 'Wrong argument type! expected number.';
          }

          if (likes < 0) {
            throw 'The number of likes must be positive.';
          }

          button.find('.like-button__counter').text(likes);

        default:
          return;
      }
    }
  };
})(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "../../lib.blocks/like-button/like-button.js":
/*!*******************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/like-button/like-button.js ***!
  \*******************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _like_button_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./like-button-plugin */ "../../lib.blocks/like-button/like-button-plugin.js");


jquery__WEBPACK_IMPORTED_MODULE_0___default()('.like-button').click(function () {
  const button = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
  let likes = button.likeButton('likes');
  button.toggleClass('like-button_active');
  const icon = button.find('.like-button__icon');

  if (icon.html() === 'favorite_border') {
    likes++;
    icon.html('favorite');
  } else {
    likes--;
    icon.html('favorite_border');
  }

  if (likes < 0) {
    likes = 0;
  }

  button.likeButton('likes', likes);
});

/***/ }),

/***/ "../../lib.blocks/pagination/pagination.js":
/*!*****************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/pagination/pagination.js ***!
  \*****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "../../lib.blocks/range-slider/range-slider.js":
/*!*********************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/range-slider/range-slider.js ***!
  \*********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.range-slider').each(function () {
  const slider = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
  const moveContainer = slider.find('.range-slider__move-container');
  const pointLeft = slider.find('.range-slider__point-left');
  const pointRight = slider.find('.range-slider__point-right');
  const sliderLine = slider.find('.range-slider__line');
  const defaultFormat = "{min} - {max}";
  const min = Number(slider.attr('data-min'));
  const max = Number(slider.attr('data-max'));
  const step = Number(slider.attr('data-step'));
  const steps = (max - min) / step;
  slider.attr('data-min-value', min);
  slider.attr('data-max-value', max);

  function splitValue(num) {
    let arr = String(num).split('');
    let value = [];
    let i = 0;

    while (arr.length) {
      if (i === 3) {
        value.push(' ');
        i = 0;
      }

      value.push(arr.pop());
      i++;
    }

    return value.reverse().join('');
  }

  function printRange(minValue, maxValue) {
    slider.attr('data-min-value', minValue);
    slider.attr('data-max-value', maxValue);
    let result = slider.attr('data-format') || defaultFormat;
    result = result.replace('{min}', splitValue(minValue)).replace('{max}', splitValue(maxValue));
    slider.find('.range-slider__value').text(result);
  }

  printRange(Number(slider.attr('data-min-value')) || min, Number(slider.attr('data-max-value')) || max);

  function getMousePosition(event) {
    return event.clientX - moveContainer.offset().left;
  }

  function getPointPosition(point) {
    return point.offset().left - moveContainer.offset().left + pointLeft.outerWidth() / 2;
  }

  function offsetToNearestStep(mousePosition) {
    const pixelsInStep = moveContainer.width() / steps;
    const currentStep = Math.round(mousePosition / pixelsInStep);
    return currentStep * pixelsInStep;
  }

  function updateNewRangeValues() {
    const posPointLeft = getPointPosition(pointLeft);
    const posPointRight = getPointPosition(pointRight);
    const pixelsInStep = moveContainer.width() / steps;
    const stepLeft = Math.round(posPointLeft / pixelsInStep);
    const stepRight = Math.round(posPointRight / pixelsInStep);
    const minValue = min + stepLeft * step;
    const maxValue = min + stepRight * step;
    printRange(minValue, maxValue);
  }

  function handleMouseMove(event) {
    const mousePosition = getMousePosition(event);
    const posPointLeft = getPointPosition(pointLeft);
    const posPointRight = getPointPosition(pointRight);
    const distanceToLeft = Math.abs(posPointLeft - mousePosition);
    const distanceToRight = Math.abs(posPointRight - mousePosition);
    const offset = offsetToNearestStep(mousePosition);

    if (distanceToLeft < distanceToRight) {
      if (Math.round(offset) !== Math.round(posPointLeft)) {
        sliderLine.css('margin-left', offset);
      }
    } else {
      if (Math.round(offset) !== Math.round(posPointRight)) {
        sliderLine.css('margin-right', moveContainer.width() - offset);
      }
    }

    updateNewRangeValues();
  }

  moveContainer.mousedown(event => {
    if (event.button !== 0) {
      return false;
    }

    handleMouseMove(event);
    moveContainer.mousemove(handleMouseMove);
  });
  moveContainer.mouseover(event => {
    if (event.buttons !== 1) {
      return false;
    }

    handleMouseMove(event);
    moveContainer.mousemove(handleMouseMove);
  });

  function removeMouseMoveHandle() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).off('mousemove', handleMouseMove);
  }

  moveContainer.mouseup(removeMouseMoveHandle);
  moveContainer.mouseleave(removeMouseMoveHandle);
});

/***/ }),

/***/ "../../lib.blocks/room-impressions/room-impressions.js":
/*!*****************************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/room-impressions/room-impressions.js ***!
  \*****************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.room-impressions .room-impressions__container-diagram').each(function () {
  const containerDiagram = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
  containerDiagram.find('.room-impressions__diagram path').each(function () {
    const path = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    path.mouseover(function (event) {
      const target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target);
      const d = target.attr('d');
    });
    path.mouseleave(function (event) {
      const target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target);
      const d = target.attr('d');
    });
  });
});

/***/ }),

/***/ "../../lib.blocks/text-field/text-field-plugin.js":
/*!************************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/text-field/text-field-plugin.js ***!
  \************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


(function ($) {
  $.fn.textField = function () {
    const textField = this;
    const args = Array.from(arguments);

    if (args.length === 1) {
      switch (args[0]) {
        case 'value':
          return textField.find('input').val();

        default:
          throw `The command "${args[0]}" is unknown.`;
      }
    }

    if (args.length === 2) {
      switch (args[0]) {
        case 'value':
          const text = args[1];

          if (typeof text !== 'string') {
            throw 'Wrong argument type! expected string.';
          }

          textField.find('input').val(text);
          return textField;

        default:
          throw `The command "${args[0]}" is unknown.`;
      }
    }
  };
})(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "../../lib.blocks/text-field/text-field.js":
/*!*****************************************************************************************!*\
  !*** /home/sergey/Документы/projects/web/site2/src/lib.blocks/text-field/text-field.js ***!
  \*****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _text_field_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text-field-plugin */ "../../lib.blocks/text-field/text-field-plugin.js");


jquery__WEBPACK_IMPORTED_MODULE_0___default()('.text-field').each(function () {
  const textField = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
  const mask = textField.attr('data-template');
});

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_blocks_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib.blocks/index */ "../../lib.blocks/index.js");


/***/ })

/******/ });
//# sourceMappingURL=ui_kit.js.map