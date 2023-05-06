/**
 * 查找元素
 * @param parent
 * @param type
 */
export const findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
}

/**
 * 触发事件
 * @param {} el 
 * @param {} type 
 */
export const trigger = (el, type) => {
  const e = document.createEvent('htmlEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}

/**
 * 判断是否是标准日期格式
 * @param {} str 
 */
export const isTime = str => /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]?[0-9]))?$/.test(str)

/**
 * 时间格式化
 * @param {} date 
 */
export const formatDate = (date, pattern = 'HH:mm:ss') => {
  if (typeof date === 'string') {
    date = date.replace(/-/g, '/')
  }
  date = new Date(date)
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
      "h+": (date.getHours() % 12),
      "a": (date.getHours() / 12) <= 1 ? "AM" : "PM"
  }
  /*遍历正则式pattern类型对象构建returnValue对象*/
  for (var key in format) {
      var regExp = new RegExp("(" + key + ")");
      if (regExp.test(returnValue)) {
          var zero = "";
          for (var i = 0; i < RegExp.$1.length; i++) { zero += "0"; }
          var replacement = RegExp.$1.length == 1 ? format[key] : (zero + format[key]).substring((("" + format[key]).length));
          returnValue = returnValue.replace(RegExp.$1, replacement);
      }
  }
  return returnValue
}

/**
 * 向后补零
 * @param {} str 
 */
export const addZero = (str, len = 6) => {
  while (str.length < len) {
    str += '0'
  }
  return str
}

/**
 * 向后补零
 * @param {} el 
 */
export const isElement = (el) => {
  return el instanceof Element
}