!function(t){function e(e){for(var a,d,s=e[0],c=e[1],i=e[2],u=0,h=[];u<s.length;u++)d=s[u],r[d]&&h.push(r[d][0]),r[d]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);for(l&&l(e);h.length;)h.shift()();return o.push.apply(o,i||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,s=1;s<n.length;s++){var c=n[s];0!==r[c]&&(a=!1)}a&&(o.splice(e--,1),t=d(d.s=n[0]))}return t}var a={},r={0:0},o=[];function d(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,d),n.l=!0,n.exports}d.m=t,d.c=a,d.d=function(t,e,n){d.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},d.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},d.t=function(t,e){if(1&e&&(t=d(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(d.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)d.d(n,a,function(e){return t[e]}.bind(null,a));return n},d.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return d.d(e,"a",e),e},d.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},d.p="";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var i=0;i<s.length;i++)e(s[i]);var l=c;o.push([6,2]),n()}({6:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a);r()(".like-button").on("click",function(){const t=r()(this);t.toggleClass("like-button_active");const e=t.find(".like-button__icon");"favorite_border"===e.html()?e.html("favorite"):e.html("favorite_border")}),r()(".dropdown .dropdown-head").on("click",function(){r()(this).parent(".dropdown").toggleClass("dropdown_expend")});const o=r()(".range-slider"),d=r()(".range-slider__move-container"),s=r()(".range-slider__point-left"),c=r()(".range-slider__point-right"),i=r()(".range-slider__line"),l=o.attr("data-format")||"{min} - {max}",u=Number(o.attr("data-min")),h=Number(o.attr("data-max")),f=Number(o.attr("data-step")),_=(h-u)/f;function p(t){return t.offset().left-d.offset().left+s.outerWidth()/2}function g(){const t=p(s),e=p(c),n=d.width()/_,a=Math.round(t/n),r=Math.round(e/n);!function(t,e){let n=l;n=n.replace("{min}",t).replace("{max}",e),o.find(".range-slider__value").text(n)}(u+a*f,u+r*f)}function m(t){const e=function(t){return t.clientX-d.offset().left}(t),n=p(s),a=p(c),r=Math.abs(n-e),o=Math.abs(a-e),l=function(t){const e=d.width()/_;return Math.round(t/e)*e}(e);r<o?Math.round(l)!==Math.round(n)&&i.css("margin-left",l):Math.round(l)!==Math.round(a)&&i.css("margin-right",d.width()-l),g()}function b(){r()(this).off("mousemove",m)}function w(t){const e={all:0};return r()(t).find(".dropdown-item-counter").each(function(){const t=r()(this),n=Number(t.find(".dropdown-item-counter__counter-value").text()),a=t.attr("data-name");void 0===e[a]&&(e[a]=0),e[a]+=n,e.all+=n}),e}function y(t){const e=t%10,n=t%100;let a=0;return 1===e&&(n>20||1===t)&&(a=0),e>=2&&e<=4&&(a=1),(e>=5&&e<=9||0===e||n>=11&&n<=20)&&(a=2),a}function v(t,e=""){const n=r()(t);n.find(".dropdown-item-counter").each(function(){var t;t=this,(t=r()(t)).find(".dropdown-item-counter__counter-value").text("0"),t.find(".dropdown-item-counter__button-minus").addClass("button_disable")}),n.find(".dropdown-head__text").text(e)}function x(t,e,n=!0){const a={"%Y":t=>t.getFullYear(),"%m":t=>{let e=t.getMonth();return n&&e++,String(e).padStart(2,"0")},"%d":t=>String(t.getDate()).padStart(2,"0")};let r=e;for(const e in a)r=r.replace(e,a[e](t));return r}d.mousedown(t=>{if(0!==t.button)return!1;m(t),d.mousemove(m)}),d.mouseover(t=>{if(1!==t.buttons)return!1;m(t),d.mousemove(m)}),d.mouseup(b),d.mouseleave(b),r()(".dropdown-item-counter").click(function(t){const e=r()(t.target);if(!e.hasClass("button"))return;const n=r()(this),a=n.find(".dropdown-item-counter__counter-value"),o=n.find(".dropdown-item-counter__button-minus");let d=parseInt(a.html());e.hasClass("dropdown-item-counter__button-minus")?d--:e.hasClass("dropdown-item-counter__button-plus")&&d++,d<0&&(d=0),a.html(d),d?o.removeClass("button_disable"):o.addClass("button_disable")}),r()(".checkbox-list-expend").on("click",function(t){const e=r()(t.target);(e.hasClass("checkbox-list-expend__title")||e.hasClass("checkbox-list-expend__expend-button"))&&r()(this).toggleClass("checkbox-list-expend_expend")}),r()(".dropdown-guest").click(function(t){const e=r()(this),n=r()(t.target);if(n.hasClass("dropdown-guest__button-clear"))return v(".dropdown-guest","Сколько гостей"),!0;if(n.hasClass("dropdown-guest__button-inter")){const t=w(".dropdown-guest");return e.find(".dropdown-head__text").text(function(t){if(0===t.all)return"Сколько гостей";const e=[];if(t.grown){const n=y(t.grown);e.push(`${t.grown} гост${["ь","я","ей"][n]}`)}if(t.babies){const n=y(t.babies);e.push(`${t.babies} младен${["ец","ца","цев"][n]}`)}return e.join(", ")}(t)),!0}return n.hasClass("dropdown-item-counter__button-minus")||n.hasClass("dropdown-item-counter__button-plus")?(w(".dropdown-guest").all?e.find(".dropdown-guest__button-clear").removeClass("button_hide"):e.find(".dropdown-guest__button-clear").addClass("button_hide"),!0):void 0}),r()(".dropdown-rooms").click(function(t){const e=r()(this),n=r()(t.target);if(n.hasClass("dropdown-item-counter__button-minus")||n.hasClass("dropdown-item-counter__button-plus")){const t=w(".dropdown-rooms");if(0===t.all)return!1;let n=function(t){const e=[];if(t.bedrooms){const n=y(t.bedrooms),a=`${t.bedrooms} спал${["ьня","ьни","ен"][n]}`;e.push(a)}if(t.beds){const n=y(t.beds),a=`${t.beds} кроват${["ь","и","ей"][n]}`;e.push(a)}if(t.bathrooms){const n=y(t.bathrooms);let a=`${t.bathrooms} ванн${["ая","ые","ых"][n]} `;a+=`комнат${["а","ы",""][n]}`,e.push(a)}return e.join(", ")}(t);n=n.length>21?n.slice(0,20)+"...":n.split(", ").slice(0,2).join(", ")+"...",e.find(".dropdown-head__text").text(n)}}),r()(".date-range .dropdown-date").on("click",function(){const t=r()(this),e=t.parent(".date-range").find(".calendar");if(!e.length)return!1;const n=r()(e[0]),a=t.hasClass("start")?"start":"end",o=n.attr("data-select-mode"),d="none"===n.css("display");t.addClass("dropdown-date_focus"),d?(n.css("display","block"),n.attr("data-select-mode",a)):a!==o?(n.attr("data-select-mode",a),r()(`.date-range .dropdown-date.${"start"===a?"end":"start"}`).removeClass("dropdown-date_focus")):(n.css("display","none"),t.removeClass("dropdown-date_focus"))}),r()(".date-range").on("calendar-set-range",function(t,e,n){t.preventDefault();const a=r()(this),o=a.find(".dropdown-date.start .dropdown-head__text"),d=a.find(".dropdown-date.end .dropdown-head__text");e?o.html(x(e,"%d.%m.%Y")):o.html("ДД.ММ.ГГГГ"),n?d.html(x(n,"%d.%m.%Y")):d.html("ДД.ММ.ГГГГ")});const k=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];function C(t){const e=document.createElement("div");return e.classList.add("button","button_theme_form-element-text","calendar__weekday"),e.innerHTML=t,e}r()(".calendar").click(function(t){const e=r()(t.target);if(!e.hasClass("calendar__head-btn-arrow"))return!1;const n=r()(this),a=JSON.parse(n.attr("data-render-date")),o="arrow_back"===e.html()?a.month-1:a.month+1,d=new Date(a.year,o,1);!function(t){const e=r()(".calendar .calendar__body");e.html("");const n=t.getFullYear(),a=t.getMonth();let o=new Date(n,a,0).getDate();const d=[];for(let t=(new Date(n,a,1).getDay()||7)-1-1;t>=0;t--)d.push(o--);d.reverse().forEach(t=>{const n=C(t);n.classList.add("calendar__weekday_another-month"),e.append(n)});const s=new Date(n,a+1,0).getDate();for(let t=1;t<=s;t++)e.append(C(t));for(let t=(new Date(n,a,s).getDay()||7)-1+1,r=1;t<=6;t++,r++){const t=C(r);t.classList.add("calendar__weekday_another-month"),e.append(t)}}(d),n.attr("data-render-date",JSON.stringify({year:d.getFullYear(),month:d.getMonth()}));const s=`${k[d.getMonth()]} ${d.getFullYear()}`;n.find(".calendar__head .text.text_h2_m").text(s),n.trigger("calendar-update",[d])});function M(t){return JSON.stringify({year:t.getFullYear(),month:t.getMonth(),day:t.getDate()})}function D(t){t||(t=r()(".calendar"));const e=t.attr("data-range-day-start"),n=t.attr("data-range-day-end"),a={length:0};try{let t=JSON.parse(e);a.start=new Date(t.year,t.month,t.day),a.length++}catch(t){}try{let t=JSON.parse(n);a.end=new Date(t.year,t.month,t.day),a.length++}catch(t){}return a}function N(){r()(".calendar").find(".calendar__weekday").removeClass(["calendar__range-day-middle","calendar__range-day-start","calendar__range-day-end","calendar__range-day_only"])}function S(){const t=r()(".calendar"),e=JSON.parse(t.attr("data-render-date")),n=D(t);if(0===n.length)return;const a=t.find(".calendar__weekday:not(.calendar__weekday_another-month)"),o=n.start,d=n.end;if(o&&o.getMonth()===e.month&&a.each(function(){Number(this.innerHTML)===Number(o.getDate())&&(this.classList.add("calendar__range-day-start"),1===n.length&&this.classList.add("calendar__range-day_only"))}),d&&d.getMonth()===e.month&&a.each(function(){Number(this.innerHTML)===Number(d.getDate())&&(this.classList.add("calendar__range-day-end"),1===n.length&&this.classList.add("calendar__range-day_only"))}),2===n.length){const t=new Date(e.year,e.month);a.each(function(){t.setDate(Number(this.innerHTML)),t>o&&t<d&&this.classList.add("calendar__range-day-middle")})}}r()(".calendar .calendar__body").click(function(t){const e=r()(t.target);if(!e.hasClass("calendar__weekday")||e.hasClass("calendar__weekday_another-month"))return!1;N(),function(t){const e=r()(".calendar"),n=e.attr("data-select-mode");if("start"!==n&&"end"!==n)return!1;const a=JSON.parse(e.attr("data-render-date")),o=new Date(a.year,a.month,Number(t.text()));if(o<new Date((new Date).toDateString()))return!1;const d=D(e);if("start"===n){if(d.end&&o>=d.end)return!1;e.attr("data-range-day-start",M(o))}else{if(d.start&&o<new Date(d.start.getFullYear(),d.start.getMonth(),d.start.getDate()+1))return!1;e.attr("data-range-day-end",M(o))}}(e),S()});const O=r()(".calendar");O.on("calendar-update",function(t,e){N(),S();const n=new Date;if(n.getFullYear()!==e.getFullYear()||n.getMonth()!==e.getMonth())return!1;O.find(".calendar__weekday:not(.calendar__weekday_another-month)").each(function(){const t=r()(this);Number(t.html())===n.getDate()&&t.addClass("calendar__weekday_current-day")})}),O.find(".calendar__button-clear").click(()=>{N(),O.attr("data-range-day-start",""),O.attr("data-range-day-end",""),O.trigger("calendar-set-range")}),O.find(".calendar__button-enter").click(()=>{const t=D();0!==t.length&&O.trigger("calendar-set-range",[t.start,t.end])})}});
//# sourceMappingURL=landing_page.js.map