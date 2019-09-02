! function (n) {
    var t = {};

    function e(o) {
        if (t[o]) return t[o].exports;
        var i = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return n[o].call(i.exports, i, i.exports, e), i.l = !0, i.exports
    }
    e.m = n, e.c = t, e.d = function (n, t, o) {
        e.o(n, t) || Object.defineProperty(n, t, {
            enumerable: !0,
            get: o
        })
    }, e.r = function (n) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(n, "__esModule", {
            value: !0
        })
    }, e.t = function (n, t) {
        if (1 & t && (n = e(n)), 8 & t) return n;
        if (4 & t && "object" == typeof n && n && n.__esModule) return n;
        var o = Object.create(null);
        if (e.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: n
            }), 2 & t && "string" != typeof n)
            for (var i in n) e.d(o, i, function (t) {
                return n[t]
            }.bind(null, i));
        return o
    }, e.n = function (n) {
        var t = n && n.__esModule ? function () {
            return n.default
        } : function () {
            return n
        };
        return e.d(t, "a", t), t
    }, e.o = function (n, t) {
        return Object.prototype.hasOwnProperty.call(n, t)
    }, e.p = "", e(e.s = 2)
}([, , function (n, t, e) {
    var o = e(3);
    "string" == typeof o && (o = [
        [n.i, o, ""]
    ]);
    var i = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    e(5)(o, i);
    o.locals && (n.exports = o.locals)
}, function (n, t, e) {
    (n.exports = e(4)(!1)).push([n.i, ".page-container {\n  display: block;\n  margin: 0;\n  height: 100vh; }\n\n.page-container__container-content {\n  margin: 0 auto; }\n\n.container-content {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  width: 100%;\n  min-width: 320px;\n  max-width: 1160px; }\n\n.flex-container {\n  display: flex;\n  justify-content: flex-start;\n  flex-wrap: wrap;\n  flex: auto; }\n\n.flex-container_column {\n  flex-direction: column; }\n\n.flex-container_row {\n  flex-direction: row;\n  flex-wrap: nowrap; }\n\n.input {\n  height: 44px;\n  min-width: 0;\n  width: 100%;\n  background-color: #fff;\n  border: 1px solid #1f204140;\n  box-sizing: border-box;\n  border-radius: 4px;\n  padding: 13px 15px;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 18px;\n  color: #1f204140; }\n\ninput.input::-webkit-input-placeholder {\n  /* Edge */\n  color: #1f204140; }\n\ninput.input:-ms-input-placeholder {\n  /* Internet Explorer 10-11 */\n  color: #1f204140; }\n\ninput.input::placeholder {\n  color: #1f204140; }\n\n.input:hover,\n.input:focus {\n  border-color: #1f204180;\n  line-height: 24px;\n  color: #1f2041bf;\n  outline: none; }\n\n.text-field__input {\n  width: 100%; }\n\n.text-field_focus .text-field__input {\n  border-color: #1f204180;\n  line-height: 24px;\n  color: #1f2041bf;\n  outline: none; }\n\n.dropdown-head {\n  display: block;\n  clear: both;\n  width: 100%;\n  height: 44px;\n  background-color: #fff;\n  border: 1px solid #1f204140;\n  box-sizing: border-box;\n  border-radius: 4px;\n  color: #1f2041bf; }\n\n.dropdown-head__text {\n  float: left;\n  padding: 13px 0px 13px 15px;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 16px;\n  height: 44px;\n  box-sizing: border-box;\n  white-space: nowrap;\n  overflow: hidden; }\n\n.dropdown-head__button-expend {\n  float: right; }\n\n.dropdown {\n  display: block;\n  width: 320px;\n  min-width: 266px;\n  height: auto;\n  background-color: #fff;\n  min-height: 65px;\n  position: relative; }\n\n.dropdown__button-expend {\n  float: right; }\n\n.dropdown__body {\n  display: none;\n  position: absolute;\n  width: 100%;\n  background: #FFFFFF;\n  border: 1px solid #1f204180;\n  border-top: none;\n  box-sizing: border-box;\n  padding: 7px 7px 8px 15px;\n  z-index: 999; }\n\n.dropdown_expend .dropdown__body {\n  display: block; }\n\n.dropdown_expend .dropdown__head {\n  border-radius: 4px 4px 0px 0px;\n  border-color: #1f204180; }\n\n.dropdown__item:not(:last-child) {\n  margin-bottom: 7px; }\n\n.button {\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  box-sizing: border-box;\n  text-align: center;\n  padding: 0px 20px;\n  color: #1f2041bf;\n  user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  cursor: pointer; }\n\n.button_theme_form-element {\n  width: 44px;\n  height: 44px;\n  font-family: Material Icons;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 24px;\n  line-height: 24px;\n  color: #1f204180;\n  padding: 0; }\n\n.button_theme_default {\n  background: linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%);\n  border-radius: 22px;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 12px;\n  line-height: 15px;\n  text-transform: uppercase;\n  height: 44px;\n  color: white; }\n\n.button_disable {\n  opacity: 0.5; }\n\n.button_disable.button_theme_round-light {\n  border-color: #1f204140;\n  color: #1f204140; }\n\n.button_theme_default-light {\n  height: 44px;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 12px;\n  line-height: 15px;\n  border-radius: 22px;\n  border: 2px solid #bc9cff;\n  color: #bc9cff;\n  text-transform: uppercase; }\n\n.button_theme_text {\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 12px;\n  line-height: 15px;\n  text-transform: uppercase;\n  color: #bc9cff;\n  padding: 0; }\n\n.button_theme_text-dark {\n  color: #1f204180;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 12px;\n  line-height: 15px;\n  text-transform: uppercase;\n  padding: 0; }\n\n.button_theme_round {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  width: 40px;\n  height: 40px;\n  background: linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%);\n  border-radius: 22px;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 12px;\n  line-height: 15px;\n  color: white; }\n\n.button_theme_form-element-text {\n  width: 40px;\n  height: 40px;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 12px;\n  line-height: 15px;\n  color: #1f204180;\n  text-align: center;\n  padding: 12px 0px 13px 0px; }\n\n.button_theme_round-green {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  width: 40px;\n  height: 40px;\n  background: linear-gradient(180deg, #6FCF97 0%, #66D2EA 100%);\n  border-radius: 22px;\n  font-family: Material Icons;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 24px;\n  line-height: 20px;\n  color: white; }\n\n.button_theme_round-light {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  width: 30px;\n  height: 30px;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 18px;\n  line-height: 22px;\n  color: #1f204180;\n  border: 1px solid #1f204140;\n  border-radius: 50%; }\n\n.button_hide {\n  display: none; }\n\n.button_theme_round-green-text {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  width: 40px;\n  height: 40px;\n  background: linear-gradient(180deg, #6FCF97 0%, #66D2EA 100%);\n  border-radius: 22px;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 12px;\n  line-height: 15px;\n  color: white; }\n\n.button_height_smile {\n  height: 36px; }\n\n.button_theme_social-icon {\n  width: 24px;\n  height: 24px;\n  font-family: 'Font Awesome 5 Brands';\n  font-style: normal;\n  font-weight: normal;\n  font-size: 24px;\n  line-height: 23px;\n  background: linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  padding: 0; }\n\n.form-element-help {\n  float: right;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 12px;\n  line-height: 15px;\n  text-align: right;\n  text-transform: uppercase;\n  color: #1f204180;\n  margin-bottom: 5px; }\n\n.form-element-title {\n  float: left;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 12px;\n  line-height: 15px;\n  text-transform: uppercase;\n  color: #1F2041;\n  margin-bottom: 5px; }\n\n.text-field-subscription__container {\n  display: flex;\n  flex-wrap: nowrap;\n  flex-direction: row;\n  width: 100%;\n  height: 44px;\n  background-color: #fff;\n  border: 1px solid #1f204140;\n  box-sizing: border-box;\n  border-radius: 4px;\n  color: #1f2041bf; }\n\n.text-field-subscription__input {\n  border: none;\n  height: 100%;\n  width: 100%; }\n\n.text-field-subscription__input::-webkit-input-placeholder {\n  /* Edge */\n  color: #1f204140; }\n\n.text-field-subscription__input:-ms-input-placeholder {\n  /* Internet Explorer 10-11 */\n  color: #1f204140; }\n\n.text-field-subscription__input::placeholder {\n  color: #1f204140; }\n\n.text-field-subscription__input:hover,\n.text-field-subscription__input:focus {\n  border: none;\n  line-height: 24px;\n  color: #1f2041bf;\n  outline: none; }\n\n.text-field-subscription__button-subscription {\n  background: linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  min-width: 44px; }\n\n.checkbox-input__input {\n  display: none; }\n\n.checkbox-input__label {\n  display: block;\n  cursor: pointer; }\n\n.checkbox-input__new-input {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 20px;\n  height: 20px;\n  background: #fff;\n  border: 1px solid #1f204140;\n  box-sizing: border-box;\n  border-radius: 4px;\n  font-family: Material Icons;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  font-weight: bold;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  color: white; }\n\n.checkbox-input__input:checked + .checkbox-input__new-input {\n  border-color: #bc9cff;\n  background: linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent; }\n\n.checkbox-button__text {\n  display: inline-block;\n  vertical-align: middle; }\n\n.checkbox-button__checkbox-input {\n  display: inline-block;\n  vertical-align: middle; }\n\n.checkbox-button__text-container {\n  margin-left: 10px;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 18px;\n  color: #1f204180; }\n\n.checkbox-button {\n  display: flex; }\n\n.radio-input__input-indicator {\n  display: none;\n  width: 12px;\n  height: 12px;\n  background: linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%);\n  border-radius: 10px; }\n\n.radio-input__input {\n  display: none; }\n\n.radio-input__new-input {\n  display: flex;\n  width: 18px;\n  height: 18px;\n  background: #fff;\n  border: 1px solid #1f204140;\n  border-radius: 10px;\n  align-items: center;\n  justify-content: center; }\n\n.radio-input__input:checked + .radio-input__new-input {\n  border-color: #bc9cff; }\n\n.radio-input__input:checked + .radio-input__new-input > .radio-input__input-indicator {\n  display: block; }\n\n.radio-input__label {\n  display: block;\n  cursor: pointer; }\n\n.radio-button__text {\n  display: inline-block;\n  vertical-align: middle;\n  margin-left: 10px;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 24px;\n  color: #1f2041bf; }\n\n.radio-button__input {\n  display: inline-block;\n  vertical-align: middle; }\n\n.toggle-input__input {\n  display: none; }\n\n.toggle-input__label {\n  display: block;\n  cursor: pointer; }\n\n.toggle-input__switch {\n  width: 40px;\n  height: 20px;\n  background: white;\n  border: 1px solid #1f204140;\n  box-sizing: border-box;\n  border-radius: 10px;\n  padding: 3px; }\n\n.toggle-input__input:checked + .toggle-input__switch {\n  border-color: #bc9cff; }\n\n.toggle-input__input:checked + .toggle-input__switch .toggle-input__switch-indicator {\n  background: linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%);\n  float: right; }\n\n.toggle-input__switch-indicator {\n  display: block;\n  float: left;\n  width: 12px;\n  height: 12px;\n  background: #1f204140;\n  border-radius: 10px; }\n\n.toggle-input__text {\n  display: inline-block;\n  vertical-align: middle;\n  margin-left: 10px;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 24px;\n  color: #1f2041bf; }\n\n.toggle-button__input {\n  display: inline-block;\n  vertical-align: middle; }\n\n.like-button {\n  width: 40px;\n  height: 20px;\n  background: white;\n  border: 1px solid #1f204140;\n  box-sizing: border-box;\n  border-radius: 10px;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  cursor: pointer; }\n\n.like-button__icon {\n  width: 19px;\n  height: 19px;\n  font-family: Material Icons;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 10px;\n  line-height: 9px;\n  display: flex;\n  align-items: center;\n  text-align: center;\n  color: #1f204140;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none; }\n\n.like-button__counter {\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 10px;\n  line-height: 19px;\n  text-align: center;\n  color: #1f204140;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none; }\n\n.like-button_active {\n  border-color: #bc9cff; }\n\n.like-button_active .like-button__icon {\n  background: #bc9cff;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent; }\n\n.like-button_active .like-button__counter {\n  color: #bc9cff; }\n\n.dropdown-date {\n  width: 150px;\n  min-height: 65px; }\n\n.dropdown-date_expend .dropdown-date__head {\n  border-radius: 4px 4px 0px 0px;\n  border-color: #1f204180; }\n\n.rate-button__star {\n  display: inline-block;\n  vertical-align: middle;\n  width: 24px;\n  height: 24px;\n  font-family: Material Icons;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 24px;\n  line-height: 24px;\n  text-align: center;\n  background: linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  user-select: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  cursor: pointer; }\n\n.range-slider {\n  width: 266px; }\n\n.range-slider__slider {\n  display: block;\n  clear: both;\n  height: 6px;\n  background: #fff;\n  border: 1px solid #1f204140;\n  box-sizing: border-box;\n  border-radius: 3px; }\n\n.range-slider__line {\n  display: block;\n  position: relative;\n  width: auto;\n  min-width: 18px;\n  height: 6px;\n  background: linear-gradient(180deg, #6FCF97 0%, #66D2EA 100%);\n  border-radius: 3px;\n  top: -1px; }\n\n.range-slider__point-left {\n  display: block;\n  position: absolute;\n  top: -5px;\n  left: -6px;\n  width: 12px;\n  height: 12px;\n  background: linear-gradient(180deg, #6FCF97 0%, #66D2EA 100%);\n  border: 2px solid #FFFFFF;\n  border-radius: 10px; }\n\n.range-slider__point-right {\n  display: block;\n  position: absolute;\n  top: -5px;\n  right: -6px;\n  width: 12px;\n  height: 12px;\n  background: linear-gradient(180deg, #6FCF97 0%, #66D2EA 100%);\n  border: 2px solid #FFFFFF;\n  border-radius: 10px; }\n\n.range-slider__title {\n  margin-bottom: 20px; }\n\n.range-slider__value {\n  margin-bottom: 20px; }\n\n.radio-buttons__title {\n  margin-bottom: 16px; }\n\n.radio-buttons__container {\n  clear: both;\n  display: flex;\n  flex-direction: row; }\n\n.radio-buttons__radio-button {\n  margin-left: 20px; }\n\n.checkbox-buttons__title {\n  margin-bottom: 16px; }\n\n.checkbox-buttons__checkbox-button {\n  margin-bottom: 10px; }\n\n.checkbox-buttons__container {\n  clear: both; }\n\n.toggle-buttons__title {\n  margin-bottom: 16px; }\n\n.toggle-buttons__container {\n  clear: both; }\n\n.toggle-buttons__toggle-button {\n  margin-bottom: 14px; }\n\n.button-go-to {\n  position: relative;\n  min-width: 320px; }\n\n.button-go-to__button-form-element {\n  position: absolute;\n  right: 0;\n  top: 0;\n  text-transform: none;\n  color: white; }\n\n.pagination__title {\n  margin-bottom: 16px; }\n\n.pagination__bottom-text {\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 24px;\n  color: #1f2041bf;\n  margin-top: 10px; }\n\n.pagination__button-container {\n  width: auto;\n  clear: both;\n  display: flex; }\n\n.dropdown-item {\n  display: block;\n  width: 100%;\n  height: 30px; }\n\n.dropdown-item__text {\n  display: inline-block;\n  vertical-align: middle;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 12px;\n  line-height: 15px;\n  text-transform: uppercase;\n  color: #1F2041;\n  padding: 7px 0px 8px 0px; }\n\n.dropdown-item__counter {\n  display: block;\n  float: right;\n  height: 100%; }\n\n.dropdown-item__counter-value {\n  display: inline-flex;\n  width: 32px;\n  height: 30px;\n  justify-content: center;\n  align-items: center;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 12px;\n  line-height: 15px;\n  text-transform: uppercase; }\n\n.expandable-checkbox-list__title {\n  display: block;\n  float: left;\n  padding: 14px 0px 15px 0px;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 12px;\n  line-height: 15px;\n  text-transform: uppercase;\n  color: #1F2041; }\n\n.expandable-checkbox-list__expend-button {\n  float: right; }\n\n.expandable-checkbox-list__body {\n  clear: both;\n  display: none; }\n\n.expandable-checkbox-list__checkbox:not(:last-child) {\n  margin-bottom: 10px; }\n\n.expandable-checkbox-list_expend .expandable-checkbox-list__body {\n  display: block; }\n\n.advantage {\n  padding-bottom: 20px;\n  border-bottom: 1px solid #1f20411a; }\n\n.advantage__logo {\n  width: 48px;\n  height: 48px;\n  font-family: Material Icons;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 48px;\n  line-height: 41px;\n  display: flex;\n  align-items: center;\n  text-align: center;\n  background: linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  float: left; }\n\n.advantage__description {\n  display: inline-flex;\n  flex-direction: column;\n  margin-left: 10px; }\n\n.advantage__title {\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 14px;\n  line-height: 24px;\n  color: #1f2041bf; }\n\n.advantage__text {\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 24px;\n  color: #1f2041bf; }\n\n.dropdown-item-buttons {\n  padding: 9px 0px 5px 0px;\n  display: block;\n  width: 100%;\n  height: 15px; }\n\n.dropdown-item-buttons__button-right {\n  float: right; }\n\n.dropdown-item-buttons__button-clear {\n  float: left; }\n\n.rich-checkbox-button {\n  display: flex; }\n\n.rich-checkbox-button__text-container {\n  margin-left: 10px;\n  width: 230px; }\n\n.rich-checkbox-button__text {\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 14px;\n  line-height: 18px;\n  color: #1f2041bf; }\n\n.rich-checkbox-button__help {\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 12px;\n  line-height: 14px;\n  color: #1f204180; }\n\n.bullet-list__title {\n  margin-bottom: 16px; }\n\n.bullet-list__container {\n  clear: both;\n  list-style: none;\n  padding: 0; }\n\n.bullet-list__item {\n  width: 266px; }\n\n.bullet-list__item::before {\n  content: '';\n  display: inline-block;\n  margin-right: 10px;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: #1f204140; }\n\n.bullet-list__item-text {\n  display: inline-block;\n  vertical-align: top;\n  width: 240px;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 24px;\n  color: #1f2041bf; }\n\n.comment__head {\n  display: block;\n  width: 100%;\n  height: auto;\n  margin-bottom: 10px; }\n\n.comment__head-image {\n  display: inline-block;\n  vertical-align: middle;\n  border: 2px solid white;\n  width: 47.67px;\n  height: 48px;\n  box-sizing: border-box;\n  box-shadow: 0px 10px 20px #1f20411a;\n  border-radius: 32px; }\n\n.comment__head-text {\n  display: inline-block;\n  margin-left: 10px;\n  vertical-align: middle;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 14px;\n  line-height: 24px;\n  color: #1f2041bf;\n  height: 48px; }\n\n.comment__head-user {\n  display: block;\n  width: 100%;\n  line-height: 20px; }\n\n.comment__head-date {\n  display: block;\n  width: 100%;\n  font-weight: normal; }\n\n.comment__body {\n  display: flex;\n  width: 100%;\n  height: auto; }\n\n.comment__body-text {\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 20px;\n  color: #1f2041bf;\n  width: 639px;\n  margin-left: 15px; }\n\n.text {\n  font-family: Quicksand;\n  font-weight: bold;\n  font-style: normal;\n  color: #1F2041; }\n\n.text_h1 {\n  font-size: 24px;\n  line-height: 30px; }\n\n.text_h2 {\n  font-size: 19px;\n  line-height: 24px; }\n\n.text_h3 {\n  font-family: Montserrat;\n  font-size: 12px;\n  line-height: 15px;\n  text-transform: uppercase; }\n\n.text_body {\n  font-family: Montserrat;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 24px;\n  color: #1f2041bf; }\n\n.text_h1_m {\n  font-size: 24px;\n  line-height: 30px;\n  font-family: Montserrat; }\n\n.text_color_purple {\n  color: #bc9cff; }\n\n.text_h2_m {\n  font-size: 19px;\n  line-height: 24px;\n  font-family: Montserrat; }\n\n.date-range {\n  width: 320px;\n  height: 65px;\n  display: flex;\n  justify-content: space-between; }\n\n.images-slider {\n  display: block;\n  width: 270px;\n  height: 151px;\n  position: relative; }\n\n.images-slider__button-back {\n  color: #fff;\n  transform: rotate(90deg);\n  z-index: 999; }\n\n.images-slider__button-forward {\n  color: #fff;\n  transform: rotate(90deg);\n  z-index: 999; }\n\n.images-slider__button-left-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 44px;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 998;\n  background: linear-gradient(90deg, #00000080 0%, #00000000 99.99%, #ffffff00 100%); }\n\n.images-slider__button-right-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 44px;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 998;\n  background: linear-gradient(90deg, #00000080 0%, #00000000 99.99%, #ffffff00 100%);\n  transform: matrix(-1, 0, 0, 1, 0, 0); }\n\n.images-slider__slide-nav {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: flex-end;\n  position: absolute;\n  right: 15px;\n  bottom: 15px; }\n\n.images-slider__slide-nav-item {\n  width: 7.5px;\n  height: 7.5px;\n  margin-left: 3.75px;\n  border: 1px solid #fff;\n  border-radius: 50%;\n  box-sizing: border-box;\n  box-shadow: 0px 5px 5px #1f20414d; }\n\n.images-slider__slide-nav-item_current-image {\n  background: #fff; }\n\n.images-slider__image {\n  display: block;\n  max-width: 100%;\n  max-height: 100%; }\n\n.menu {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center;\n  justify-content: space-between; }\n\n.menu__item {\n  margin-right: 30px; }\n\n.menu__item-expend {\n  margin-right: 20px; }\n\n.menu_theme_vertical {\n  justify-content: flex-start;\n  flex-direction: column;\n  align-items: flex-start; }\n\n.menu-item {\n  color: #1f204180; }\n\n.menu-item__current {\n  font-weight: bold;\n  color: #1f2041bf; }\n\n.menu-item-expend {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center;\n  color: #1f204180; }\n\n.menu-item-expend__button-expend {\n  font-size: 24px;\n  width: 24px;\n  height: 21px;\n  display: inline-flex; }\n\n.colors-demo__item {\n  height: 70px; }\n\n.colors-demo__item:not(:last-child) {\n  margin-bottom: 20px; }\n\n.colors-demo__color-description {\n  display: inline-block;\n  vertical-align: middle;\n  font-family: Quicksand;\n  font-style: normal;\n  font-size: 19px;\n  line-height: 29px; }\n\n.colors-demo__color-block {\n  display: inline-block;\n  vertical-align: middle;\n  width: 70px;\n  height: 70px;\n  border-radius: 6px;\n  margin-right: 40px; }\n\n.colors-demo__color-name {\n  display: block;\n  font-weight: bold; }\n\n.colors-demo__color-value {\n  display: block;\n  font-weight: normal; }\n\n.text-demo__item {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  flex-direction: row;\n  align-items: flex-start;\n  flex-wrap: nowrap; }\n\n.text-demo__item:not(:last-child) {\n  margin-bottom: 50px; }\n\n.text-demo__item_h1 .text-demo__item-head {\n  font-size: 24px;\n  line-height: 29px; }\n\n.text-demo__item_h1 .text-demo__item-text {\n  font-size: 24px;\n  line-height: 30px; }\n\n.text-demo__item_h2 .text-demo__item-head {\n  font-size: 19px;\n  line-height: 23px; }\n\n.text-demo__item_h2 .text-demo__item-text {\n  font-size: 19px;\n  line-height: 24px; }\n\n.text-demo__item_h3 .text-demo__item-head {\n  font-size: 12px;\n  line-height: 15px; }\n\n.text-demo__item_h3 .text-demo__item-text {\n  font-family: Montserrat;\n  font-size: 12px;\n  line-height: 15px;\n  text-transform: uppercase; }\n\n.text-demo__item_body .text-demo__item-head {\n  font-size: 14px;\n  line-height: 24px;\n  color: #1f204140; }\n\n.text-demo__item_body .text-demo__item-text {\n  font-family: Montserrat;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 24px; }\n\n.text-demo__item-head {\n  display: block;\n  margin-right: 30px;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: normal;\n  text-align: right;\n  color: #1f204140;\n  min-width: 50px; }\n\n.text-demo__item-text {\n  display: block;\n  font-family: Quicksand;\n  font-size: 24px;\n  line-height: 30px;\n  font-weight: bold;\n  font-style: normal;\n  color: #1F2041;\n  max-width: 336px;\n  word-break: break-word; }\n\n.colors-and-type {\n  width: 100%;\n  background-color: #fff;\n  justify-content: space-around;\n  padding-top: 145px;\n  display: flex; }\n\n.colors-and-type__logo {\n  position: absolute;\n  top: 30px;\n  left: 30px; }\n\n.colors-and-type__colors-demo {\n  display: inline-block;\n  margin-left: 145px; }\n\n@media screen and (max-width: 320px) {\n  .colors-and-type__colors-demo {\n    margin: 145px 0px 0px 30px; } }\n\n.colors-and-type__text-demo {\n  display: inline-block;\n  vertical-align: top;\n  margin-left: 120px; }\n\n@media screen and (max-width: 320px) {\n  .colors-and-type__text-demo {\n    margin: 55px 0px 0px 30px; } }\n\n.colors-and-type__container-content {\n  margin: 0 auto;\n  justify-content: space-around; }\n\n.logo {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  align-items: center;\n  flex-wrap: nowrap; }\n\n.logo__icon {\n  width: 48px;\n  height: 48px; }\n\n.logo__icon-main {\n  width: 40px;\n  height: 40px; }\n\n.logo__text {\n  margin-left: 12.5px;\n  width: 53px;\n  height: 13px; }\n\n.form-elements {\n  position: relative;\n  width: 100%;\n  background-color: white;\n  justify-content: space-between;\n  padding-top: 143px; }\n\n.form-elements .flex-container {\n  max-width: 350px; }\n\n.form-elements__container {\n  display: flex;\n  justify-content: space-between;\n  flex: auto; }\n\n.form-elements__row {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start; }\n\n.form-elements__row_mb40 {\n  margin-bottom: 40px; }\n\n.form-elements__row_mb30 {\n  margin-bottom: 30px; }\n\n.form-elements__column {\n  width: 320px;\n  display: flex;\n  flex-direction: column; }\n\n.form-elements__column_w266 {\n  width: 266px; }\n\n.form-elements__column_mb40 {\n  margin-bottom: 40px; }\n\n.form-elements__column_mb30 {\n  margin-bottom: 30px; }\n\n.form-elements__column_wf {\n  width: 100%; }\n\n.form-elements__item_ml20 {\n  margin-left: 20px; }\n\n.form-elements__item_ml10 {\n  margin-left: 10px; }\n\n.form-elements__item_mb40 {\n  margin-bottom: 40px; }\n\n.form-elements__item_mb20 {\n  margin-bottom: 20px; }\n\n.form-elements__item_mb14 {\n  margin-bottom: 14px; }\n\n.form-elements__item_mb10 {\n  margin-bottom: 10px; }\n\n.form-elements__section-title {\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 12px;\n  line-height: 15px;\n  text-transform: uppercase;\n  margin-bottom: 16px;\n  color: #1F2041; }\n\n.form-elements_section-title_mb20 {\n  margin-bottom: 20px; }\n\n.form-elements__container_mb100 {\n  margin-bottom: 100px; }\n\n.form-elements__container-content {\n  margin: 0 auto; }\n\n.cards {\n  display: flex;\n  justify-content: space-around;\n  background: #F4F4F6;\n  height: auto;\n  width: 100%;\n  padding-top: 150px;\n  flex-wrap: wrap; }\n\n.form-pick-number {\n  display: block;\n  background: #ffffff;\n  border: 1px solid #0000001f;\n  box-sizing: border-box;\n  box-shadow: 0px 0px 25px #00000033;\n  border-radius: 4px;\n  padding: 40px 30px 30px 30px;\n  width: 380px;\n  height: 374px;\n  max-height: 374px; }\n\n.form-pick-number__title {\n  margin-bottom: 20px; }\n\n.form-pick-number__date-range {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 20px; }\n\n.form-pick-number__dropdown-guests {\n  margin-bottom: 31px; }\n\n.form-create-account {\n  display: block;\n  background: #ffffff;\n  border: 1px solid #0000001f;\n  box-sizing: border-box;\n  box-shadow: 0px 0px 25px #00000033;\n  border-radius: 4px;\n  padding: 40px 30px 30px 30px;\n  width: 380px;\n  height: 646px;\n  max-height: 646px; }\n\n.form-create-account__title {\n  margin-bottom: 20px; }\n\n.form-create-account__input-name {\n  margin-bottom: 10px; }\n\n.form-create-account__input-surname {\n  margin-bottom: 10px; }\n\n.form-create-account__select-gender {\n  margin-bottom: 20px; }\n\n.form-create-account__radio-btn-girl {\n  margin-left: 20px; }\n\n.form-create-account__date-of-birth {\n  margin-bottom: 20px; }\n\n.form-create-account__input-email {\n  margin-bottom: 10px; }\n\n.form-create-account__input-password {\n  margin-bottom: 10px; }\n\n.form-create-account__toggle-special-offers {\n  margin-bottom: 20px; }\n\n.form-create-account__btn-sign-in {\n  margin-bottom: 30px; }\n\n.form-create-account__row-sign-in {\n  align-items: center;\n  justify-content: space-between; }\n\n.room-reservation-form {\n  display: block;\n  background: #ffffff;\n  border: 1px solid #0000001f;\n  box-sizing: border-box;\n  box-shadow: 0px 0px 25px #00000033;\n  border-radius: 4px;\n  padding: 40px 30px 30px 30px;\n  width: 380px;\n  height: 511px;\n  max-height: 511px; }\n\n.room-reservation-form__head {\n  margin-bottom: 20px; }\n\n.room-reservation-form__date-range {\n  margin-bottom: 20px; }\n\n.room-reservation-form__guest {\n  margin-bottom: 20px; }\n\n.room-reservation__service-cost {\n  display: flex;\n  align-items: baseline;\n  flex-direction: row;\n  margin-bottom: 10px; }\n\n.room-reservation__service-cost-text {\n  width: 217px;\n  margin-right: 5px;\n  word-wrap: normal;\n  line-height: 18px; }\n\n.room-reservation__service-cost-icon {\n  display: inline-flex;\n  width: 20px;\n  height: 20px;\n  border: 1px solid #1f204140;\n  box-sizing: border-box;\n  color: #1f204140;\n  border-radius: 50%;\n  justify-content: center;\n  align-items: center; }\n\n.room-reservation__service-cost-value {\n  flex: auto;\n  text-align: right; }\n\n.room-reservation-form__total-cost {\n  display: flex;\n  align-items: baseline;\n  width: 320px;\n  margin-bottom: 20px; }\n\n.room-reservation-form__total-cost-line {\n  display: block;\n  flex: auto;\n  height: 100%;\n  border-bottom: 1px dotted #1f204140;\n  margin: 0px 5px; }\n\n.room-reservation__service-cost_additional-services {\n  margin-bottom: 30px;\n  height: 33px; }\n\n.form-log-in {\n  display: block;\n  background: #ffffff;\n  border: 1px solid #0000001f;\n  box-sizing: border-box;\n  box-shadow: 0px 0px 25px #00000033;\n  border-radius: 4px;\n  padding: 40px 30px 30px 30px;\n  width: 380px;\n  height: 358px;\n  max-height: 358px; }\n\n.form-log-in__title {\n  margin-bottom: 20px; }\n\n.form-log-in__email {\n  margin-bottom: 10px; }\n\n.form-log-in__password {\n  margin-bottom: 20px; }\n\n.form-log-in__btn-log-in {\n  margin-bottom: 30px; }\n\n.form-log-in__go-to-form-create-account {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center;\n  justify-content: space-between; }\n\n.calendar {\n  display: block;\n  background: #ffffff;\n  border: 1px solid #0000001f;\n  box-sizing: border-box;\n  box-shadow: 0px 0px 25px #00000033;\n  border-radius: 4px;\n  padding: 40px 30px 30px 30px;\n  width: 320px;\n  height: 369px;\n  max-height: 369px;\n  border-color: #1f204140;\n  box-shadow: 0px 10px 20px #1f20410d;\n  padding: 20px 20px; }\n\n.calendar__head {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px; }\n\n.calendar__head-btn-arrow {\n  height: 24px;\n  width: 24px;\n  color: #bc9cff; }\n\n.calendar__week {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: space-around; }\n\n.calendar__week-day-name {\n  color: #bc9cff;\n  font-weight: bold;\n  width: 100%; }\n\n.calendar__week-day {\n  width: 100%;\n  color: #1f204180; }\n\n.calendar__week-day-another-month {\n  color: #1f204140; }\n\n.calendar__current-day {\n  color: #fff; }\n\n.calendar__buttons {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: space-between;\n  margin-top: 20px; }\n\n.hotel-number__description {\n  padding: 20px; }\n\n.hotel-number__info {\n  padding-bottom: 10px;\n  border-bottom: 1px solid #1f20411a; }\n\n.hotel-number__description-any {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: space-between;\n  padding-top: 8px; }\n\n.hotel-number__comments-count {\n  color: #1f204180; }\n\n.hotel-number__comments-count-number {\n  font-weight: bold; }\n\n.hotel-room-info {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: space-between;\n  align-items: baseline;\n  height: 30px; }\n\n.hotel-room-info__room-number-icon {\n  font-size: 14px; }\n\n.hotel-room-info__number {\n  display: inline-block;\n  margin-right: 5px; }\n\n.hotel-room-info__price-num {\n  font-weight: bold;\n  margin-right: 5px; }\n\n.hotel-room-info__price {\n  color: #1f204180;\n  font-size: 13px; }\n\n.header-footer {\n  background: #f4f4f6;\n  padding: 150px 0px 130px 0px; }\n\n.header-footer__header {\n  margin-bottom: 40px; }\n\n.header-footer__copyright-bar {\n  margin: 1px 0px 40px 0px; }\n\n.header {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: flex-end;\n  width: 100%;\n  height: 70px;\n  background: #fff;\n  box-shadow: 0px 10px 20px #1f20410d; }\n\n.header__container-content {\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: nowrap;\n  height: 100%;\n  margin: 0 auto; }\n\n.header__logo {\n  flex: auto; }\n\n.header__button-login {\n  margin-right: 20px; }\n\n.header__user {\n  color: #1f204180;\n  padding-left: 30px;\n  border-left: #1f20411a;\n  height: 30px; }\n\n.footer {\n  background: #fff;\n  box-shadow: 0px 1px 0px #1f20411a;\n  height: 372px; }\n\n.footer__container-content {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: space-between;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n  margin: 0 auto;\n  align-items: flex-start;\n  padding-top: 100px; }\n\n.footer__site-info {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  flex-direction: column;\n  width: 260px; }\n\n.footer__site-info-logo {\n  margin-bottom: 20px; }\n\n.footer__nav-container__menu-item {\n  line-height: 17px;\n  margin-bottom: 20px; }\n\n.footer__subscribe {\n  width: 260px; }\n\n.footer__container-title {\n  margin-bottom: 21px; }\n\n.footer__subscribe-text {\n  margin-bottom: 20px; }\n\n.copyright-bar {\n  height: 70px;\n  background: #fff;\n  box-shadow: 0px 10px 20px #1f20410d; }\n\n.copyright-bar__container-content {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: space-between;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n  margin: 0 auto; }\n\n.copyright-bar__social-icon:not(:last-child) {\n  margin-right: 20px; }\n\n.footer-creative {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  flex-direction: column;\n  align-items: center;\n  height: 367px;\n  background: #fff;\n  box-shadow: 0px 10px 20px #1f20410d;\n  padding-top: 100px;\n  box-sizing: border-box; }\n\n.footer-creative__site-info-logo {\n  margin-bottom: 20px; }\n\n.footer-creative__text {\n  max-width: 560px;\n  min-width: 320px;\n  width: 100%;\n  margin-bottom: 25px;\n  text-align: center; }\n\n.footer-creative__social-icon:not(:last-child) {\n  margin-right: 20px; }\n\n.ui-kit__logo {\n  position: absolute;\n  top: 30px;\n  left: 30px;\n  z-index: 9999; }\n", ""])
}, function (n, t, e) {
    "use strict";
    n.exports = function (n) {
        var t = [];
        return t.toString = function () {
            return this.map(function (t) {
                var e = function (n, t) {
                    var e = n[1] || "",
                        o = n[3];
                    if (!o) return e;
                    if (t && "function" == typeof btoa) {
                        var i = (a = o, l = btoa(unescape(encodeURIComponent(JSON.stringify(a)))), p = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(l), "/*# ".concat(p, " */")),
                            r = o.sources.map(function (n) {
                                return "/*# sourceURL=".concat(o.sourceRoot).concat(n, " */")
                            });
                        return [e].concat(r).concat([i]).join("\n")
                    }
                    var a, l, p;
                    return [e].join("\n")
                }(t, n);
                return t[2] ? "@media ".concat(t[2], "{").concat(e, "}") : e
            }).join("")
        }, t.i = function (n, e) {
            "string" == typeof n && (n = [
                [null, n, ""]
            ]);
            for (var o = {}, i = 0; i < this.length; i++) {
                var r = this[i][0];
                null != r && (o[r] = !0)
            }
            for (var a = 0; a < n.length; a++) {
                var l = n[a];
                null != l[0] && o[l[0]] || (e && !l[2] ? l[2] = e : e && (l[2] = "(".concat(l[2], ") and (").concat(e, ")")), t.push(l))
            }
        }, t
    }
}, function (n, t, e) {
    var o, i, r = {},
        a = (o = function () {
            return window && document && document.all && !window.atob
        }, function () {
            return void 0 === i && (i = o.apply(this, arguments)), i
        }),
        l = function (n) {
            var t = {};
            return function (n, e) {
                if ("function" == typeof n) return n();
                if (void 0 === t[n]) {
                    var o = function (n, t) {
                        return t ? t.querySelector(n) : document.querySelector(n)
                    }.call(this, n, e);
                    if (window.HTMLIFrameElement && o instanceof window.HTMLIFrameElement) try {
                        o = o.contentDocument.head
                    } catch (n) {
                        o = null
                    }
                    t[n] = o
                }
                return t[n]
            }
        }(),
        p = null,
        f = 0,
        d = [],
        s = e(6);

    function x(n, t) {
        for (var e = 0; e < n.length; e++) {
            var o = n[e],
                i = r[o.id];
            if (i) {
                i.refs++;
                for (var a = 0; a < i.parts.length; a++) i.parts[a](o.parts[a]);
                for (; a < o.parts.length; a++) i.parts.push(u(o.parts[a], t))
            } else {
                var l = [];
                for (a = 0; a < o.parts.length; a++) l.push(u(o.parts[a], t));
                r[o.id] = {
                    id: o.id,
                    refs: 1,
                    parts: l
                }
            }
        }
    }

    function c(n, t) {
        for (var e = [], o = {}, i = 0; i < n.length; i++) {
            var r = n[i],
                a = t.base ? r[0] + t.base : r[0],
                l = {
                    css: r[1],
                    media: r[2],
                    sourceMap: r[3]
                };
            o[a] ? o[a].parts.push(l) : e.push(o[a] = {
                id: a,
                parts: [l]
            })
        }
        return e
    }

    function m(n, t) {
        var e = l(n.insertInto);
        if (!e) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        var o = d[d.length - 1];
        if ("top" === n.insertAt) o ? o.nextSibling ? e.insertBefore(t, o.nextSibling) : e.appendChild(t) : e.insertBefore(t, e.firstChild), d.push(t);
        else if ("bottom" === n.insertAt) e.appendChild(t);
        else {
            if ("object" != typeof n.insertAt || !n.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
            var i = l(n.insertAt.before, e);
            e.insertBefore(t, i)
        }
    }

    function h(n) {
        if (null === n.parentNode) return !1;
        n.parentNode.removeChild(n);
        var t = d.indexOf(n);
        t >= 0 && d.splice(t, 1)
    }

    function g(n) {
        var t = document.createElement("style");
        if (void 0 === n.attrs.type && (n.attrs.type = "text/css"), void 0 === n.attrs.nonce) {
            var o = function () {
                0;
                return e.nc
            }();
            o && (n.attrs.nonce = o)
        }
        return b(t, n.attrs), m(n, t), t
    }

    function b(n, t) {
        Object.keys(t).forEach(function (e) {
            n.setAttribute(e, t[e])
        })
    }

    function u(n, t) {
        var e, o, i, r;
        if (t.transform && n.css) {
            if (!(r = "function" == typeof t.transform ? t.transform(n.css) : t.transform.default(n.css))) return function () {};
            n.css = r
        }
        if (t.singleton) {
            var a = f++;
            e = p || (p = g(t)), o = y.bind(null, e, a, !1), i = y.bind(null, e, a, !0)
        } else n.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (e = function (n) {
            var t = document.createElement("link");
            return void 0 === n.attrs.type && (n.attrs.type = "text/css"), n.attrs.rel = "stylesheet", b(t, n.attrs), m(n, t), t
        }(t), o = function (n, t, e) {
            var o = e.css,
                i = e.sourceMap,
                r = void 0 === t.convertToAbsoluteUrls && i;
            (t.convertToAbsoluteUrls || r) && (o = s(o));
            i && (o += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */");
            var a = new Blob([o], {
                    type: "text/css"
                }),
                l = n.href;
            n.href = URL.createObjectURL(a), l && URL.revokeObjectURL(l)
        }.bind(null, e, t), i = function () {
            h(e), e.href && URL.revokeObjectURL(e.href)
        }) : (e = g(t), o = function (n, t) {
            var e = t.css,
                o = t.media;
            o && n.setAttribute("media", o);
            if (n.styleSheet) n.styleSheet.cssText = e;
            else {
                for (; n.firstChild;) n.removeChild(n.firstChild);
                n.appendChild(document.createTextNode(e))
            }
        }.bind(null, e), i = function () {
            h(e)
        });
        return o(n),
            function (t) {
                if (t) {
                    if (t.css === n.css && t.media === n.media && t.sourceMap === n.sourceMap) return;
                    o(n = t)
                } else i()
            }
    }
    n.exports = function (n, t) {
        if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
        (t = t || {}).attrs = "object" == typeof t.attrs ? t.attrs : {}, t.singleton || "boolean" == typeof t.singleton || (t.singleton = a()), t.insertInto || (t.insertInto = "head"), t.insertAt || (t.insertAt = "bottom");
        var e = c(n, t);
        return x(e, t),
            function (n) {
                for (var o = [], i = 0; i < e.length; i++) {
                    var a = e[i];
                    (l = r[a.id]).refs--, o.push(l)
                }
                n && x(c(n, t), t);
                for (i = 0; i < o.length; i++) {
                    var l;
                    if (0 === (l = o[i]).refs) {
                        for (var p = 0; p < l.parts.length; p++) l.parts[p]();
                        delete r[l.id]
                    }
                }
            }
    };
    var _, w = (_ = [], function (n, t) {
        return _[n] = t, _.filter(Boolean).join("\n")
    });

    function y(n, t, e, o) {
        var i = e ? "" : o.css;
        if (n.styleSheet) n.styleSheet.cssText = w(t, i);
        else {
            var r = document.createTextNode(i),
                a = n.childNodes;
            a[t] && n.removeChild(a[t]), a.length ? n.insertBefore(r, a[t]) : n.appendChild(r)
        }
    }
}, function (n, t) {
    n.exports = function (n) {
        var t = "undefined" != typeof window && window.location;
        if (!t) throw new Error("fixUrls requires window.location");
        if (!n || "string" != typeof n) return n;
        var e = t.protocol + "//" + t.host,
            o = e + t.pathname.replace(/\/[^\/]*$/, "/");
        return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (n, t) {
            var i, r = t.trim().replace(/^"(.*)"$/, function (n, t) {
                return t
            }).replace(/^'(.*)'$/, function (n, t) {
                return t
            });
            return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r) ? n : (i = 0 === r.indexOf("//") ? r : 0 === r.indexOf("/") ? e + r : o + r.replace(/^\.\//, ""), "url(" + JSON.stringify(i) + ")")
        })
    }
}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWlfa2l0X3N0eWxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcbiJdLCJtYXBwaW5ncyI6IkFBQ0EiLCJzb3VyY2VSb290IjoiIn0=