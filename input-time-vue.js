(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.inputTime = factory());
}(this, (function () { 'use strict';

/**
 * 查找元素
 * @param parent
 * @param type
 */
var findEle = function findEle(parent, type) {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type);
};

/**
 * 触发事件
 * @param {} el 
 * @param {} type 
 */
var trigger = function trigger(el, type) {
  var e = document.createEvent('htmlEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};

/**
 * 判断是否是标准日期格式
 * @param {} str 
 */
var isTime = function isTime(str) {
  return (/^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]?[0-9]))?$/.test(str)
  );
};

/**
 * 时间格式化
 * @param {} date 
 */
var formatDate = function formatDate(date) {
  var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'HH:mm:ss';

  if (typeof date === 'string') {
    date = date.replace(/-/g, '/');
  }
  date = new Date(date);
  /*初始化返回值字符串*/
  var returnValue = pattern;
  /*正则式pattern类型对象定义*/
  var format = {
    "Y+": date.getFullYear(),
    "M+": date.getMonth() + 1,
    "D+": date.getDate(),
    "H+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "S": date.getMilliseconds(),
    "h+": date.getHours() % 12,
    "a": date.getHours() / 12 <= 1 ? "AM" : "PM"
    /*遍历正则式pattern类型对象构建returnValue对象*/
  };for (var key in format) {
    var regExp = new RegExp("(" + key + ")");
    if (regExp.test(returnValue)) {
      var zero = "";
      for (var i = 0; i < RegExp.$1.length; i++) {
        zero += "0";
      }
      var replacement = RegExp.$1.length == 1 ? format[key] : (zero + format[key]).substring(("" + format[key]).length);
      returnValue = returnValue.replace(RegExp.$1, replacement);
    }
  }
  return returnValue;
};

/**
 * 向后补零
 * @param {} str 
 */
var addZero = function addZero(str) {
  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;

  while (str.length < len) {
    str += '0';
  }
  return str;
};

/**
 * 向后补零
 * @param {} el 
 */
var isElement = function isElement(el) {
  return el instanceof Element;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/*
 * @Author: machao
 * @Date: 2023-05-06 15:36:26
 * @LastEditors: machao
 * @LastEditTime: 2023-05-06 16:56:54
 */
// 
var convertToTime = function convertToTime(val, date, format) {
  var time = '';
  if (isTime(val)) {
    time = val;
  } else {
    // 非时间格式处理
    var num = val.replace(/[^\d]/g, '');
    num = fixZero(num);

    time = strToTime(num);
  }
  // 时间格式处理
  time = formatDate(date + ' ' + time, format);
  return time;
};

var strToTime = function strToTime(str) {
  return str.replace(/([0-9]{2,2})([0-9]{2,2})([0-9]{2,2})/, function (_, hour, minute, second) {
    // 校验数据的是否正确
    hour = hour > 23 ? 23 : hour;
    minute = minute > 59 ? 59 : minute;
    second = second > 59 ? 59 : second;
    return hour + ':' + minute + ':' + second;
  });
};

var fixZero = function fixZero(num) {
  // 1或3位前补一个零，后补零到6位
  var len = num.length;
  if (len === 1 || len === 3) return addZero('0' + num);
  // 大于6位取前6位
  if (len > 6) return num.slice(0, 6);
  // 默认后面补零
  return addZero(num);
};

var querySelector = function querySelector(el) {
  if (isElement(el)) return el;
  if (typeof options.el === 'string') return document.querySelector(el);
};

var InputTime$1 = function () {
  function InputTime(options) {
    classCallCheck(this, InputTime);
    var _options$format = options.format,
        format = _options$format === undefined ? 'HH:mm:ss' : _options$format,
        _options$date = options.date,
        date = _options$date === undefined ? new Date() : _options$date,
        el = options.el;

    this.$inp = querySelector(el);
    this.format = format;
    this.date = formatDate(date, 'YYYY-MM-DD');
    this.keyupHandle = this.keyupHandle.bind(this);
    this.blurHandle = this.blurHandle.bind(this);
    if (this.$inp) this.bindEvent();
  }

  createClass(InputTime, [{
    key: 'bindEvent',
    value: function bindEvent() {
      var $inp = this.$inp;

      $inp.addEventListener('keyup', this.keyupHandle);
      $inp.addEventListener('blur', this.blurHandle);
    }
  }, {
    key: 'removeEvent',
    value: function removeEvent() {
      var $inp = this.$inp;

      $inp.removeEventListener('keyup', this.keyupHandle);
      $inp.removeEventListener('blur', this.blurHandle);
    }
  }, {
    key: 'inputTrigger',
    value: function inputTrigger($inp, val) {
      $inp.value = val;
      trigger($inp, 'input');
    }
  }, {
    key: 'keyupHandle',
    value: function keyupHandle(event) {
      var $inp = this.$inp,
          date = this.date,
          format = this.format,
          inputTrigger = this.inputTrigger;

      var val = $inp.value;
      // 回车键
      if (event.keyCode === 13) {
        val = convertToTime(val, date, format);
        inputTrigger($inp, val);
      } else {
        var regInput = /[^0-9:]/g;
        if (regInput.test(val)) {
          val = val.replace(/[^0-9:]/g, '');
          inputTrigger($inp, val);
        }
      }
    }
  }, {
    key: 'blurHandle',
    value: function blurHandle() {
      var $inp = this.$inp,
          date = this.date,
          format = this.format,
          inputTrigger = this.inputTrigger;

      var val = $inp.value;
      val = convertToTime(val, date, format);
      inputTrigger($inp, val);
    }
  }]);
  return InputTime;
}();

/*
 * @Author: machao
 * @Date: 2023-04-23 16:01:30
 * @LastEditors: machao
 * @LastEditTime: 2023-05-06 16:27:27
 */

var InputTimeVue = {
  name: 'input-time',
  bind: function bind(el, binding) {
    var format = binding.value;


    var $inp = findEle(el, 'input');

    var dateExpr = el.getAttribute('date');

    el.$inputTime = new InputTime$1({
      el: $inp,
      format: format,
      date: dateExpr
    });
  },
  unbind: function unbind(el) {
    el.$inputTime.removeEvent();
  }
};

var install = function install(Vue) {
  Vue.directive('InputTime', InputTimeVue);
};

if (window.Vue) {
  Vue.use(install); // eslint-disable-line
}

InputTime$1.install = install;

return InputTime$1;

})));
