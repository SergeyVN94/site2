!function(t){function e(e){for(var a,o,r=e[0],d=e[1],l=e[2],u=0,h=[];u<r.length;u++)o=r[u],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&h.push(s[o][0]),s[o]=0;for(a in d)Object.prototype.hasOwnProperty.call(d,a)&&(t[a]=d[a]);for(c&&c(e);h.length;)h.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],a=!0,r=1;r<n.length;r++){var d=n[r];0!==s[d]&&(a=!1)}a&&(i.splice(e--,1),t=o(o.s=n[0]))}return t}var a={},s={0:0},i=[];function o(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=a,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(n,a,function(e){return t[e]}.bind(null,a));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var r=window.webpackJsonp=window.webpackJsonp||[],d=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var c=d;i.push([5,1]),n()}([,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(){this.handlerUpdateEvent=null,this.rangeDays={start:null,end:null},this.currentDate=new Date,this.currentDate.setHours(0,0,0,0),this.triggerUpdateEvent()}return t.prototype.onUpdate=function(t){this.handlerUpdateEvent=t,this.triggerUpdateEvent()},t.prototype.nextMonth=function(){var t=this.currentDate.getMonth();this.currentDate.setMonth(t+1),this.triggerUpdateEvent()},t.prototype.previousMonth=function(){var t=this.currentDate.getMonth();this.currentDate.setMonth(t-1),this.triggerUpdateEvent()},t.prototype.resetRangeDays=function(){this.rangeDays={start:null,end:null},this.triggerUpdateEvent()},t.prototype.addDayInRange=function(t,e){var n=new Date(this.currentDate);n.setDate(t),n.setHours(0,0,0,0);var a=n.getTime(),s=new Date;if(s.setHours(0,0,0,0),a<=s.getTime())return!1;if(void 0!==e)return this.updateRangeDays(n,e);var i=null===this.rangeDays.start,o=null===this.rangeDays.end;return i||o?i&&o?(this.rangeDays.start=n,this.triggerUpdateEvent(),!0):i?!o&&(this.rangeDays.end.getTime()>a?this.rangeDays.start=n:(this.rangeDays.start=this.rangeDays.end,this.rangeDays.end=n),this.triggerUpdateEvent(),!0):(this.rangeDays.start.getTime()<a?this.rangeDays.end=n:(this.rangeDays.end=this.rangeDays.start,this.rangeDays.start=n),this.triggerUpdateEvent(),!0):(this.rangeDays={start:n,end:null},this.triggerUpdateEvent(),!0)},t.addDayLabelGenerator=function(e){t.dayLabelGenerators.push(e)},t.prototype.updateRangeDays=function(t,e){void 0===e&&(e=!0);var n=t.getTime(),a=this.rangeDays,s=a.start,i=a.end,o=null===s,r=null===i,d=!r&&n<i.getTime(),l=!o&&n>s.getTime(),c=!d&&!r;return e?(this.rangeDays.start=t,c&&(this.rangeDays.end=null),this.triggerUpdateEvent(),!0):!(!o&&!l)&&(this.rangeDays.end=t,this.triggerUpdateEvent(),!0)},t.prototype.createModelStatePackage=function(){var e=[],n=new Date(this.currentDate);n.setMonth(this.currentDate.getMonth()-1);var a=t.getDaysInMonth(n);n.setDate(a);var s=n.getDay()||7;if(s<7)for(var i=a;s>0;s-=1,i-=1){(u=new Date(n)).setDate(i),e.unshift({date:u,labels:this.getDayLabels(u)})}for(var o=new Date(this.currentDate),r=t.getDaysInMonth(o),d=1;d<=r;d+=1){(u=new Date(o)).setDate(d),e.push({date:u,labels:this.getDayLabels(u)})}var l=new Date(this.currentDate);l.setMonth(this.currentDate.getMonth()+1),l.setDate(1);var c=l.getDay()||7;if(c>1)for(i=1;c<=7;c+=1,i+=1){var u;(u=new Date(l)).setDate(i),e.push({date:u,labels:this.getDayLabels(u)})}return{days:e,currentDate:new Date(this.currentDate),rangeDays:{start:this.rangeDays.start&&new Date(this.rangeDays.start),end:this.rangeDays.end&&new Date(this.rangeDays.end)}}},t.prototype.triggerUpdateEvent=function(){this.handlerUpdateEvent&&this.handlerUpdateEvent(this.createModelStatePackage())},t.prototype.getDayLabels=function(e){var n=this,a=[],s=this.rangeDays,i=s.start,o=s.end;return t.dayLabelGenerators.forEach((function(t){var s=new Date(n.currentDate),r={start:i?new Date(i):null,end:o?new Date(o):null},d=t(e,s,r);d&&("string"==typeof d?a.push(d):a.push.apply(a,d))})),a},t.getDaysInMonth=function(t){return new Date(t.getFullYear(),t.getMonth()+1,0).getDate()},t.dayLabelGenerators=[],t}();a.addDayLabelGenerator((function(t,e){return t.getMonth()!==e.getMonth()?t.getMonth()<e.getMonth()?"previous-month":"next-month":null})),a.addDayLabelGenerator((function(t){var e=new Date;return e.setHours(0,0,0,0),t.getTime()===e.getTime()?"today":null})),a.addDayLabelGenerator((function(t,e,n){var a=n.start,s=n.end,i=t.getTime(),o=[];return a&&i===a.getTime()&&(o.push("range"),s&&o.push("range-start")),s&&i===s.getTime()&&(o.push("range"),a&&o.push("range-end")),a&&s&&i>a.getTime()&&i<s.getTime()&&o.push("range-middle"),o})),a.addDayLabelGenerator((function(t,e,n){var a=n.start,s=[],i=new Date;return i.setHours(0,0,0,0),t.getTime()<=i.getTime()?s.push("not-selectable"):a&&t.getTime()<=a.getTime()&&s.push("not-selectable-as-range-end"),s})),e.default=a},function(t,e,n){"use strict";(function(t){var n=this&&this.__spreadArrays||function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var a=Array(t),s=0;for(e=0;e<n;e++)for(var i=arguments[e],o=0,r=i.length;o<r;o++,s++)a[s]=i[o];return a};Object.defineProperty(e,"__esModule",{value:!0});var a=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],s=function(){function e(t,n){this.domElements=e.createDomElements(t),this.model=n,this.selectMode="auto",this.initListeners()}return e.prototype.getRange=function(){return this.cacheModelState.rangeDays},e.prototype.setSelectMode=function(t){["range-start","range-end","auto"].includes(t)?this.selectMode=t:console.error(new Error("Invalid select mode: '"+t+"'")),this.update(this.cacheModelState)},e.prototype.update=function(t){this.cacheModelState=t;var e=t.days,n=t.rangeDays,a=n.start,s=n.end,i=t.currentDate;this.renderHead(i),this.renderBody(e),this.domElements.$btnClear.button("hidden",null===a&&null===s)},e.prototype.renderHead=function(t){var e=new Date,n=t.getMonth()===e.getMonth()&&t.getFullYear()===e.getFullYear();this.domElements.$btnPrevMonth.button("hidden",n);var s=a[t.getMonth()]+" "+t.getFullYear();this.domElements.$drawnDate.text(s)},e.prototype.renderBody=function(t){var e=this,n=document.createDocumentFragment();t.forEach((function(t){n.append(e.createDay(t))})),this.domElements.$daysContainer.html(n)},e.prototype.createDay=function(t){var e,a=document.createElement("div"),s=document.createElement("p"),i=document.createElement("span"),o=t.labels;return(e=a.classList).add.apply(e,n(["calendar__day-week","js-calendar__day-week"],this.parseLabels(o))),i.classList.add("calendar__day-number"),i.innerHTML=t.date.getDate().toString(),s.classList.add("calendar__day-inner"),s.append(i),a.append(s),a},e.prototype.parseLabels=function(t){var e=[];return(t.includes("next-month")||t.includes("previous-month"))&&e.push("calendar__day-week_theme_another-month","js-calendar__day-week_theme_another-month"),t.includes("today")&&e.push("calendar__day-week_theme_today"),t.includes("range")&&e.push("calendar__day-week_theme_range-day"),t.includes("range-start")&&e.push("calendar__day-week_range-day_start"),t.includes("range-end")&&e.push("calendar__day-week_range-day_end"),t.includes("range-middle")&&e.push("calendar__day-week_theme_range-day-middle"),t.includes("not-selectable")&&e.push("calendar__day-week_theme_not-clickable"),"range-end"===this.selectMode&&t.includes("not-selectable-as-range-end")&&e.push("calendar__day-week_theme_not-clickable"),e},e.createDomElements=function(t){var e=t.find('.js-button[data-action="next-month"]'),n=t.find('.js-button[data-action="previous-month"]'),a=t.find(".js-calendar__drawn-date"),s=t.find(".js-calendar__days-container"),i=t.find('.js-button[data-action="apply"]'),o=t.find('.js-button[data-action="clear"]');return{$calendar:t,$btnNextMonth:e,$btnPrevMonth:n,$drawnDate:a,$daysContainer:s,$btnApply:i,$btnClear:o}},e.prototype.initListeners=function(){this.domElements.$btnNextMonth.on("click.calendar.nextMonth",this.handleClickBtnNextMonth.bind(this)),this.domElements.$btnPrevMonth.on("click.calendar.prevMonth",this.handleClickBtnPrevMonth.bind(this)),this.domElements.$daysContainer.on("click.calendar.clickOnDay",".js-calendar__day-week",this.handleClickDaysContainer.bind(this)),this.domElements.$btnApply.on("click.calendar.apply",this.handleClickBtnApply.bind(this)),this.domElements.$btnClear.on("click.calendar.clear",this.handleClickBtnClear.bind(this))},e.prototype.handleClickBtnClear=function(){this.model.resetRangeDays(),this.domElements.$calendar.trigger("clear")},e.prototype.handleClickBtnApply=function(){var t=this.cacheModelState.rangeDays,e=t.start,n=void 0===e?null:e,a=t.end,s=void 0===a?null:a;this.domElements.$calendar.trigger("apply",[n,s])},e.prototype.handleClickBtnNextMonth=function(){this.model.nextMonth()},e.prototype.handleClickBtnPrevMonth=function(){this.model.previousMonth()},e.prototype.handleClickDaysContainer=function(e){var n=t(e.currentTarget),a=parseInt(n.find(".calendar__day-number").text(),10);n.hasClass("calendar__day-week_theme_another-month")&&(a>20?this.model.previousMonth():this.model.nextMonth()),this.model.addDayInRange(a,"auto"===this.selectMode?void 0:"range-start"===this.selectMode)},e}();e.default=s}).call(this,n(0))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t){var e=t.range,n=t.step;this.stepSize=n;var a=e[0],s=e[1];this.rangeMin=a,this.range=s-a,this.steps=Math.floor(this.range/n),this.callback=null,this.pointMinStep=0,this.pointMaxStep=this.steps}return t.prototype.update=function(t,e){null===e?this._updatePointSteps(t):this._updatePointStep(t,e),this._toggleUpdateEvent()},t.prototype.onUpdate=function(t){this.callback=t},t.prototype.initModel=function(t){var e=t[0],n=t[1];this.pointMinStep=this._valueToPointStep(e),this.pointMaxStep=this._valueToPointStep(n),this._toggleUpdateEvent()},t.prototype.getState=function(){return{positions:[this._stepToPointPosition(this.pointMinStep),this._stepToPointPosition(this.pointMaxStep)],values:this._getValuesStr()}},t.prototype._updatePointSteps=function(t){var e=this._positionToStep(t),n=this._stepToPointPosition(this.pointMinStep),a=this._stepToPointPosition(this.pointMaxStep),s=Math.abs(n-t),i=Math.abs(a-t);s<i?e<=this.pointMaxStep&&(this.pointMinStep=e):i<s?e>=this.pointMinStep&&(this.pointMaxStep=e):i===s&&(t<n?this.pointMinStep=e:t>a&&(this.pointMaxStep=e))},t.prototype._updatePointStep=function(t,e){var n=this._positionToStep(t);"min"===e&&n<=this.pointMaxStep&&(this.pointMinStep=n),"max"===e&&n>=this.pointMinStep&&(this.pointMaxStep=n)},t.prototype._toggleUpdateEvent=function(){if(null!==this.callback){var t=this.getState(),e=t.positions,n=t.values;this.callback(e,n)}},t.prototype._getValuesStr=function(){var e=this._stepToValue(this.pointMinStep),n=this._stepToValue(this.pointMaxStep);return t._divideNumberByDigits(e)+"₽ - "+t._divideNumberByDigits(n)+"₽"},t._divideNumberByDigits=function(t){var e=String(t);if(e.length<=3)return e;for(var n=e.split("").reverse(),a=0,s=[];a+3<=n.length;)s.push.apply(s,n.slice(a,a+3)),s.push(" "),a+=3;return s.push.apply(s,n.slice(a)),s.push(" "),s.reverse().join("")},t.prototype._valueToPointStep=function(t){return Math.round(t/this.stepSize)},t.prototype._stepToPointPosition=function(t){return t/this.steps},t.prototype._stepToValue=function(t){return t*this.stepSize+this.rangeMin},t.prototype._positionToStep=function(t){return Math.round(t*this.steps)},t}();e.default=a},function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function e(t,n){this.domElements=e._getDomElements(t),this.model=n,this.lineBorderWidth=parseInt(this.domElements.$line.css("border-left-width")||"0",10),this.pointSelectedType=null,n.onUpdate(this._update.bind(this)),this._initEventListeners(),this._initModel()}return e._getDomElements=function(e){var n=e.find(".js-range-slider__body"),a=e.find(".js-range-slider__bg-line"),s=e.find(".js-range-slider__out-range"),i=t(e.find(".js-range-slider__point").get()[0]),o=t(e.find(".js-range-slider__point").get()[1]),r=t(document);return i.css("z-index",5),o.css("z-index",6),{$slider:e,$line:n,$bgLine:a,$out:s,$point1:i,$point2:o,$document:r}},e.prototype._initModel=function(){var t=[parseInt(this.domElements.$slider.attr("data-start-min")||"0",10),parseInt(this.domElements.$slider.attr("data-start-max")||"1000",10)];this.model.initModel(t)},e.prototype._initEventListeners=function(){this.domElements.$line.on("mousedown.rangeSlider.update",this._handleSliderMousedown.bind(this)),t(window).on("resize.rangeSlider.updateWithResize",this._handleWindowResize.bind(this))},e.prototype._updateModel=function(t){this.model.update(this._getTargetPosition(t),this.pointSelectedType)},e.prototype._handleWindowResize=function(){var t=this.model.getState(),e=t.positions,n=t.values;this._update(e,n)},e.prototype._handleSliderMousedown=function(e){var n=t(e.target);n.hasClass("js-range-slider__point")?(this.pointSelectedType="min"===n.attr("data-type")?"min":"max","max"===this.pointSelectedType?this.domElements.$point2.css("z-index",6):this.domElements.$point2.css("z-index",4),this.domElements.$document.on("mousemove.rangeSlider.update",this._handleSliderMousemove.bind(this)).one("mouseup.rangeSlider.offUpdate",this._handleDocumentMouseup.bind(this))):(this.pointSelectedType=null,this._updateModel(e))},e.prototype._handleDocumentMouseup=function(){this.domElements.$document.off("mousemove.rangeSlider.update")},e.prototype._handleSliderMousemove=function(t){this._updateModel(t)},e.prototype._update=function(t,e){var n=t[0],a=t[1];this._setPointPosition(this.domElements.$point1,n),this._setPointPosition(this.domElements.$point2,a),this._updateBgLine(t),this.domElements.$out.text(e)},e.prototype._setPointPosition=function(t,e){var n=e*this.domElements.$line.innerWidth()-t.outerWidth(!1)/2;t.css("left",n+"px")},e.prototype._updateBgLine=function(t){var e=this.domElements.$line.innerWidth(),n=t[0]*e,a=e-e*t[1];this.domElements.$bgLine.css("left",n+"px").css("right",a+"px")},e.prototype._getTargetPosition=function(t){var e=this.domElements.$line.innerWidth(),n=this.domElements.$line.offset().left+this.lineBorderWidth,a=(t.pageX-n)/e;return a>1?1:a<0?0:a},e}();e.default=n}).call(this,n(0))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n(6);var a=function(t){t.keys().forEach(t)};a(n(7)),a(n(63)),a(n(73))},,function(t,e,n){var a={"./banner/banner.scss":8,"./block-head/block-head.scss":9,"./bullet-list/bullet-list.scss":10,"./button/button.scss":11,"./button/button.ts":12,"./calendar/calendar.scss":13,"./calendar/scripts/Model.ts":1,"./calendar/scripts/View.ts":2,"./calendar/scripts/calendar.ts":14,"./calendar/scripts/classes.ts":15,"./card-account-registration/card-account-registration.scss":16,"./card-authentication/card-authentication.scss":17,"./card-book-room/card-book-room.scss":18,"./card-room-information/card-room-information.scss":19,"./card-selection-room/card-selection-room.scss":20,"./checkbox-button/checkbox-button.scss":21,"./checkbox-list/checkbox-list.scss":22,"./comment/comment.scss":23,"./comments/comments.scss":24,"./date-range/DateRange.ts":25,"./date-range/date-range.scss":26,"./demo-colors/demo-colors.scss":27,"./demo-text/demo-text.scss":28,"./dropdown/Dropdown.ts":29,"./dropdown/dropdown.scss":30,"./expandable-checkbox-list/expandable-checkbox-list.scss":31,"./expandable-checkbox-list/expandableCheckboxList.ts":32,"./filter-date-dropdown/FilterDateDropdown.ts":33,"./filter-date-dropdown/filter-date-dropdown.scss":34,"./footer/footer.scss":35,"./header/header.scss":36,"./header/header.ts":37,"./image-slider/ImageSlider.ts":38,"./image-slider/image-slider.scss":39,"./like-button/LikeButton.ts":40,"./like-button/like-button.scss":41,"./logo/logo.scss":42,"./menu/menu.scss":43,"./menu/menu.ts":44,"./pagination/pagination.scss":45,"./radio-button/radio-button.scss":46,"./range-slider/range-slider.scss":47,"./range-slider/scripts/Model.ts":3,"./range-slider/scripts/View.ts":4,"./range-slider/scripts/classes.ts":48,"./range-slider/scripts/rangeSlider.ts":49,"./rating/rating.scss":50,"./receipt/receipt.scss":51,"./room-advantages/room-advantages.scss":52,"./room-details-banner/room-details-banner.scss":53,"./room-head/room-head.scss":54,"./room-impressions/room-impressions.scss":55,"./room-impressions/roomImpressions.ts":56,"./simple-header/simple-header.scss":57,"./social-icon/social-icon.scss":58,"./social-icons/social-icons.scss":59,"./text-field/MaskedTextField.ts":60,"./text-field/text-field.scss":61,"./toggle-button/toggle-button.scss":62};function s(t){var e=i(t);return n(e)}function i(t){if(!n.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}s.keys=function(){return Object.keys(a)},s.resolve=i,t.exports=s,s.id=7},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){(function(t){t.fn.button=function(t,e){switch(void 0===e&&(e=null),t){case"disable":return null===e?this.hasClass("button_disabled"):(this.toggleClass("button_disabled",Boolean(e)),this);case"hidden":return null===e?this.hasClass("button_hidden"):(this.toggleClass("button_hidden",Boolean(e)),this);case"text":return this.find(".js-button__text").text(String(e)),this;default:throw new Error("Unknown command '"+t+"'")}}}).call(this,n(0))},function(t,e,n){},function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),s=n(2);t.fn.calendar=function(t,e){var n=this.data("view");switch(t){case"select-date":return"start"===e?n.setSelectMode("range-start"):"end"===e?n.setSelectMode("range-end"):n.setSelectMode("auto"),this;case"get-range":return n.getRange();default:console.error(new Error("Unknown command '"+t+"'"))}return this},t(".calendar").each((function(e,n){var i=t(n),o=new a.default,r=new s.default(i,o);o.onUpdate(r.update.bind(r)),i.data("view",r)}))}).call(this,n(0))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0})},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){(function(t){var e=function(){function e(t){this.domElements=e._createDomElements(t),this.defaultText=this.domElements.$dropdownStartInput.val().toString(),this._initEventListeners()}return e._createDomElements=function(e){return{$dateRange:e,$dropdownStartInput:e.find(".js-date-range__dropdown[data-type='start'] input"),$dropdownEndInput:e.find(".js-date-range__dropdown[data-type='end'] input"),$dropdownStart:e.find(".js-date-range__dropdown[data-type='start']"),$dropdownEnd:e.find(".js-date-range__dropdown[data-type='end']"),$calendar:e.find(".js-calendar"),$document:t(document)}},e.prototype._initEventListeners=function(){var t=this.domElements,e=t.$calendar,n=t.$dropdownStart,a=t.$dropdownEnd;n.on("click.dateRange.selectStart",this._handleDropdownStartClick.bind(this)),a.on("click.dateRange.selectEnd",this._handleDropdownEndClick.bind(this)),e.on("clear.dateRange.clear",this._handleCalendarClear.bind(this)).on("apply.dateRange.updateDateRange",this._handleCalendarApply.bind(this))},e.prototype._handleDropdownStartClick=function(){var t=this.domElements,e=t.$dropdownStartInput,n=t.$dropdownEndInput,a=t.$dateRange,s=t.$calendar;e.hasClass("date-range__input_selected")?this._deselectDateRange():(this._initFocusout(),e.addClass("date-range__input_selected"),n.removeClass("date-range__input_selected"),a.addClass("date-range_range-select"),s.calendar("select-date","start"))},e.prototype._handleDropdownEndClick=function(){var t=this.domElements,e=t.$dropdownStartInput,n=t.$dropdownEndInput,a=t.$dateRange,s=t.$calendar;n.hasClass("date-range__input_selected")?this._deselectDateRange():(this._initFocusout(),n.addClass("date-range__input_selected"),e.removeClass("date-range__input_selected"),a.addClass("date-range_range-select"),s.calendar("select-date","end"))},e.prototype._handleDocumentClick=function(t){if(!t.originalEvent.path.some((function(t){return"classList"in t&&t.classList.contains("js-date-range")}))){var e=this.domElements.$calendar.calendar("get-range"),n=e.start,a=void 0===n?null:n,s=e.end,i=void 0===s?null:s;this.updateDropdowns(a,i),this.domElements.$document.off("click.document.dateRange.unexpended")}},e.prototype._initFocusout=function(){this.domElements.$document.off("click.document.dateRange.unexpended").on("click.document.dateRange.unexpended",this._handleDocumentClick.bind(this))},e.prototype._handleCalendarClear=function(){var t=this.domElements,e=t.$dropdownStartInput,n=t.$dropdownEndInput;e.val(this.defaultText),n.val(this.defaultText),this._deselectDateRange()},e.prototype._handleCalendarApply=function(t,e,n){this.updateDropdowns(e,n)},e.prototype.updateDropdowns=function(t,n){var a=this.domElements,s=a.$dropdownStartInput,i=a.$dropdownEndInput;s.val(null===t?this.defaultText:e._dateToString(t)),i.val(null===n?this.defaultText:e._dateToString(n)),this._deselectDateRange()},e._dateToString=function(t){return String(t.getDate()).padStart(2,"0")+"."+String(t.getMonth()+1).padStart(2,"0")+"."+t.getFullYear()},e.prototype._deselectDateRange=function(){var t=this.domElements,e=t.$dropdownStartInput,n=t.$dropdownEndInput,a=t.$dateRange;e.removeClass("date-range__input_selected"),n.removeClass("date-range__input_selected"),a.removeClass("date-range_range-select")},e}();t(".js-date-range").each((function(n,a){new e(t(a))}))}).call(this,n(0))},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){(function(t){var e=function(){function e(t){this.domElements=e._getDomElements(t),this.defaultHeadText=this.domElements.$headText.val().toString(),this.variationsTable=t.data("variations"),this.counterGroupsValues={},this._resetGroupsValues(),this._initEventListeners()}return e.prototype._resetGroupsValues=function(){var e=this;this.counterGroupsValues={},this.domElements.$countersOut.each((function(n,a){var s=t(a).data("group");e.counterGroupsValues[s]=0}))},e._getDomElements=function(e){return{$dropdown:e,$dropdownHead:e.find(".js-dropdown__head"),$dropdownBody:e.find(".js-dropdown__body"),$countersOut:e.find(".js-dropdown__counter-out"),$headText:e.find(".js-dropdown__input"),$btnApply:e.find('.js-button[data-action="apply"]'),$btnClear:e.find('.js-button[data-action="clear"]'),$document:t(document)}},e._getWordWithEnding=function(t,e){var n=t%10,a=1===Math.floor(t/10)%10,s=n>1&&n<5;return 1===n&&!a?e[0]:s&&!a?e[1]:e[2]},e._cropHeadText=function(t){var e=t.split(" ");if(e.length<5)return t;var n=e.slice(0,4),a=n[n.length-1];return a.endsWith(",")&&(n[n.length-1]=a.slice(0,-1)),n.join(" ")+"..."},e.prototype._initEventListeners=function(){var t=this.domElements,e=t.$dropdownHead,n=t.$dropdownBody;e.on("click.dropdown.expanded",this._handleDropdownHeadClick.bind(this)),n.on("click.dropdown.selectControl",".js-button",this._handleButtonClick.bind(this))},e.prototype._updateDropdownHeadText=function(){var t=this,n=this.domElements.$headText;if(0===this.countSumCounters())return n.val(this.defaultHeadText),!0;var a=[];if(Object.keys(this.counterGroupsValues).forEach((function(n){var s=t.counterGroupsValues[n],i=e._getWordWithEnding(s,t.variationsTable[n]);s>0&&a.push(s+" "+i)})),!a.length)return n.val(this.defaultHeadText),!0;var s=a.join(", ");return n.val(e._cropHeadText(s)),!0},e.prototype.countSumCounters=function(){var t=this;return Object.keys(this.counterGroupsValues).reduce((function(e,n){var a=t.counterGroupsValues[n];return e+("number"==typeof a?a:0)}),0)},e.prototype._resetDropdown=function(){this._resetGroupsValues();var e=this.domElements,n=e.$countersOut,a=e.$btnClear,s=e.$headText;n.each((function(e,n){t(n).text(0).parent().find('.js-button[data-action="minus"]').button("disable",!0)})),a.button("hidden",!0),s.val(this.defaultHeadText)},e.prototype._handleDocumentClick=function(e){var n=this.domElements,a=n.$document,s=n.$dropdown;0===t(e.target).parents(".js-dropdown").length&&(s.removeClass("dropdown_opened"),a.off("click.document.dropdown.unexpended"))},e.prototype._handleButtonClick=function(e){var n=t(e.currentTarget),a="plus"===n.data("action"),s="minus"===n.data("action"),i="apply"===n.data("action"),o="clear"===n.data("action");if(a||s){var r=n.parent(),d=r.find(".js-dropdown__counter-out"),l=d.data("group"),c=parseInt(d.text(),10);a&&(c+=1,this.counterGroupsValues[l]+=1),s&&c&&(c-=1,this.counterGroupsValues[l]-=1),r.find('.js-button[data-action="minus"]').button("disable",0===c),d.text(c),this._updateDropdownHeadText(),this.domElements.$btnClear.button("hidden",0===this.countSumCounters())}o&&this._resetDropdown(),i&&this.domElements.$dropdown.removeClass("dropdown_opened")},e.prototype._handleDropdownHeadClick=function(){var t=this.domElements,e=t.$dropdown,n=t.$document;e.toggleClass("dropdown_opened"),e.hasClass("dropdown_opened")&&n.on("click.document.dropdown.unexpended",this._handleDocumentClick.bind(this))},e}();t((function(){t(".js-dropdown").each((function(n,a){new e(t(a))}))}))}).call(this,n(0))},function(t,e,n){},function(t,e,n){},function(t,e,n){(function(t){t(".js-expandable-checkbox-list").on("click.expandable-checkbox-list.expand",".js-expandable-checkbox-list__head",(function(e){t(e.delegateTarget).toggleClass("expandable-checkbox-list_expanded")}))}).call(this,n(0))},function(t,e,n){(function(t){var e=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],n=function(){function n(t){this.domElements=n._getDomElements(t),this.domElements.$calendar.calendar("select-date","auto"),this.defaultText=this.domElements.$input.val().toString(),this._initEventListeners()}return n._getDomElements=function(e){return{$dropdown:e,$document:t(document),$calendar:e.find(".js-calendar"),$input:e.find(".js-filter-date-dropdown__input")}},n.prototype._initEventListeners=function(){var t=this.domElements,e=t.$dropdown,n=t.$calendar;e.on("click.filterDateDropdown.expanded",".js-filter-date-dropdown__head",this._handleHeadClick.bind(this)),n.on("apply.filterDate.setDate",this._handleCalendarApply.bind(this)).on("clear.filterDate.clearDate",this._handleCalendarClear.bind(this))},n.prototype._handleCalendarClear=function(){this.domElements.$input.val(this.defaultText)},n.prototype._handleCalendarApply=function(t,n,a){var s=[];n&&s.push(n.getDate()+" "+e[n.getMonth()].toLowerCase().slice(0,3)),a&&s.push(a.getDate()+" "+e[a.getMonth()].toLowerCase().slice(0,3));var i=this.domElements,o=i.$dropdown,r=i.$input;(n||a)&&r.val(s.join(" - ")),o.removeClass("filter-date-dropdown_opened")},n.prototype._handleDocumentClick=function(t){if(!t.originalEvent.path.some((function(t){return"classList"in t&&t.classList.contains("filter-date-dropdown_opened")}))){var e=this.domElements,n=e.$dropdown,a=e.$document;n.removeClass("filter-date-dropdown_opened"),a.off("click.filterDateDropdown.unexpanded")}},n.prototype._handleHeadClick=function(){var t=this.domElements,e=t.$dropdown,n=t.$document;e.toggleClass("filter-date-dropdown_opened"),e.hasClass("filter-date-dropdown_opened")&&n.on("click.filterDateDropdown.unexpanded",this._handleDocumentClick.bind(this))},n}();t(".js-filter-date-dropdown").each((function(e,a){new n(t(a))}))}).call(this,n(0))},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){(function(t){t(".js-header").on("click.header.expand-menu",'.js-button[data-action="expand-mobile-menu"]',(function(e){var n=t(e.delegateTarget);n.toggleClass("header_extended"),t(e.currentTarget).button("text",n.hasClass("header_extended")?"close":"view_headline")}))}).call(this,n(0))},function(t,e,n){(function(t){var e=function(){function e(t){this.domElements=e._getDomElements(t),this.allImages=this.domElements.$images.length,this.selectedImage=1,this.domElements.$currentImageOut.text(1),this._initEventListeners(),this._update()}return e._getDomElements=function(t){var e=t.find(".js-image-slider__change-img_direction_next"),n=t.find(".js-image-slider__change-img_direction_previous"),a=t.find(".image-slider__image"),s=t.find(".js-image-slider__indicator"),i=t.find(".js-image-slider__image_index-item");return{$slider:t,$btnNext:e,$btnPrev:n,$images:a,$indicators:s,$indicatorContainer:t.find(".js-image-slider__indicators"),$currentImageOut:i}},e.prototype._initEventListeners=function(){var t=this.domElements,e=t.$btnNext,n=t.$btnPrev,a=t.$indicatorContainer;e.on("click.imageSlider.nextImage",this._handleBtnNextClick.bind(this)),n.on("click.imageSlider.prevImage",this._handleBtnPrevClick.bind(this)),a.on("click.imageSlider.select",this._handleIndicatorContainerClick.bind(this))},e.prototype._handleIndicatorContainerClick=function(e){var n=t(e.target);if(n.hasClass("js-image-slider__indicator")){var a=parseInt(String(n.data("index")),10);this.selectedImage=a+1,this._update()}},e.prototype._handleBtnNextClick=function(){this.selectedImage+=1,this.selectedImage>this.allImages&&(this.selectedImage=1),this._update()},e.prototype._handleBtnPrevClick=function(){this.selectedImage-=1,this.selectedImage<1&&(this.selectedImage=this.allImages),this._update()},e.prototype._update=function(){var t=this;this.domElements.$images.removeClass("image-slider__image_selected"),this.domElements.$images.each((function(e,n){e+1===t.selectedImage&&n.classList.add("image-slider__image_selected")})),this.domElements.$indicators.removeClass("image-slider__indicator_theme_selected"),this.domElements.$indicators.each((function(e,n){e+1===t.selectedImage&&n.classList.add("image-slider__indicator_theme_selected")})),this.domElements.$currentImageOut.text(this.selectedImage)},e}();t(".js-image-slider").each((function(n,a){new e(t(a))}))}).call(this,n(0))},function(t,e,n){},function(t,e,n){(function(t){var e=function(){function t(e){this.domElements=t._getDomElements(e),this._initDomElements()}return t._getDomElements=function(t){var e=t.find(".js-like-button__icon"),n=t.find(".js-like-button__counter");return{$button:t,$icon:e,$counter:n}},t.prototype._initDomElements=function(){var t=this.domElements,e=t.$button,n=t.$counter;e.on("click.likeButton.checked",this._handleLikeButtonClick.bind(this));try{this.likes=parseInt(n.text(),10)}catch(t){console.error(t),this.likes=0}},t.prototype._handleLikeButtonClick=function(){var t=this.domElements,e=t.$button,n=t.$counter,a=t.$icon,s=e.hasClass("like-button_checked");e.toggleClass("like-button_checked",!s),a.text(s?"favorite_border":"favorite"),this.likes+=s?-1:1,this.likes<0&&(this.likes=0),n.text(this.likes)},t}();t(".js-like-button").each((function(n,a){new e(t(a))}))}).call(this,n(0))},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){(function(t){var e=function(e){e.originalEvent.path.some((function(t){return"classList"in t&&t.classList.contains("js-menu__item_expandable")}))||(this.removeClass("menu__item_expanded"),t(document).off("click.menu__item_expandable.focusout"))};t(".js-menu__item_expandable").on("click.menu__item_expandable.expand",".js-menu__item-text",(function(n){var a=t(n.delegateTarget).toggleClass("menu__item_expanded");a.hasClass("menu__item_expanded")&&t(document).on("click.menu__item_expandable.focusout",e.bind(a))}))}).call(this,n(0))},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0})},function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var a=n(3),s=n(4);t(".js-range-slider").each((function(e,n){t((function(){var e=t(n),i=[parseInt(e.attr("data-range-min")||"0",10),parseInt(e.attr("data-range-max")||"1000",10)],o=parseInt(e.attr("data-step")||"1",10);new s.default(e,new a.default({range:i,step:o}))}))}))}).call(this,n(0))},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){(function(t){var e=function(t,e,n){void 0===n&&(n=!0),t.attr("d",t.data(n?"path-expanded":"path")),t.attr("stroke-width",t.data(n?"stroke-width-expanded":"stroke-width")),e.removeClass((function(t,e){return e.split(" ").filter((function(t){return t.includes("diagram_theme_")})).join(" ")})),n&&e.addClass("room-impressions__diagram_theme_"+t.data("theme"))};t(".js-room-impressions").each((function(n,a){var s=t(a),i=s.find(".js-room-impressions__diagram"),o=i.find(".js-room-impressions__value"),r=o.text();s.find(".js-room-impressions__help-item").on("mouseover.roomImpression.selectPathWithHelp",(function(n){var a=i.find("svg path[data-theme='"+n.currentTarget.dataset.theme+"']");o.text(t(n.currentTarget).data("value")),a.length&&e(a,i)})).on("mouseout.roomImpression.unselectPathWithHelp",(function(t){var n=i.find("svg path[data-theme='"+t.currentTarget.dataset.theme+"']");o.text(r),n.length&&e(n,i,!1)})),i.find(".js-room-impressions__diagram-image").find("path[d]").on("mouseover.roomImpression.selectPath",(function(n){var a=t(n.target);o.text(a.data("value")),e(a,i)})).on("mouseout.roomImpression.unselectPath",(function(n){var a=t(n.target);o.text(r),e(a,i,!1)}))}))}).call(this,n(0))},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){(function(t){var e=function(){function t(t,e){this.$input=t,this.lastValue="",this.mask=e,t.on("input.maskedTextField.checkValue",this._handleInputInput.bind(this))}return t.prototype._handleInputInput=function(){var t=String(this.$input.val());this.lastValue=this._checkValue(t);var e=this.$input.get()[0],n=e.selectionStart;this.$input.val(this.lastValue),n!==t.length&&(e.selectionStart=n,e.selectionEnd=n)},t.prototype._checkValue=function(t){if(t.length>this.mask.length)return this.lastValue;var e=t.match(/\d/g)||[],n=this.mask.match(/[0]/g)||[];if(e.length>n.length&&n.length)return this.lastValue;for(var a=[],s=0,i=0;i<e.length;s+=1)"0"!==this.mask[s]?a.push(this.mask[s]):(a.push(e[i]),i+=1);return a.join("")},t}();t(".js-text-field__input").each((function(n,a){var s=t(a),i=String(s.data("mask")||"");i.length&&new e(s,i)}))}).call(this,n(0))},function(t,e,n){},function(t,e,n){},function(t,e,n){var a={"./cards/cards.scss":64,"./colors-and-type/colors-and-type.scss":65,"./form-elements/form-elements.scss":66,"./headers-and-footers/headers-and-footers.scss":67,"./landing-page/landing-page.scss":68,"./registration/registration.scss":69,"./room-details/room-details.scss":70,"./search-room/search-room.scss":71,"./sign-in/sign-in.scss":72};function s(t){var e=i(t);return n(e)}function i(t){if(!n.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}s.keys=function(){return Object.keys(a)},s.resolve=i,t.exports=s,s.id=63},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){var a={"./constants.scss":74,"./fonts.scss":75,"./main.scss":76,"./mixins.scss":77};function s(t){var e=i(t);return n(e)}function i(t){if(!n.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}s.keys=function(){return Object.keys(a)},s.resolve=i,t.exports=s,s.id=73},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){}]);
//# sourceMappingURL=main.bcc0fa63d1f0da610304.js.map