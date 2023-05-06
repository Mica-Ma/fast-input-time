/*
 * @Author: machao
 * @Date: 2023-05-06 15:36:26
 * @LastEditors: machao
 * @LastEditTime: 2023-05-06 16:56:54
 */
import { trigger, isTime, formatDate, addZero, isElement }  from './utils'

// 
const convertToTime = (val, date ,format ) => {
  let time = ''
  if (isTime(val)) {
    time = val
  } else {
    // 非时间格式处理
    let num = val.replace(/[^\d]/g, '')
    num = fixZero(num)

    time = strToTime(num)
  }
  // 时间格式处理
  time = formatDate(`${date} ${time}`, format)
  return time
}

const strToTime = str => {
  return str.replace(/([0-9]{2,2})([0-9]{2,2})([0-9]{2,2})/, (_, hour, minute, second) => {
    // 校验数据的是否正确
    hour = hour > 23 ? 23 : hour
    minute = minute > 59 ? 59 : minute
    second = second > 59 ? 59 : second
    return `${hour}:${minute}:${second}`
  })
}

const fixZero = num => {
  // 1或3位前补一个零，后补零到6位
  const len = num.length
  if (len === 1 || len === 3) return addZero(`0${num}`)
  // 大于6位取前6位
  if (len > 6) return num.slice(0, 6)
  // 默认后面补零
  return addZero(num)
}

const querySelector = el => {
  if (isElement(el)) return el
  if (typeof options.el === 'string') return document.querySelector(el)
}

export default class InputTime {
  constructor(options) {
    const { format = 'HH:mm:ss', date = new Date(), el } = options
    this.$inp = querySelector(el)
    this.format = format
    this.date = formatDate(date, 'YYYY-MM-DD')
    this.keyupHandle = this.keyupHandle.bind(this)
    this.blurHandle = this.blurHandle.bind(this)
    if (this.$inp) this.bindEvent()
    
  }

  bindEvent() {
    const { $inp } = this
    $inp.addEventListener('keyup', this.keyupHandle)
    $inp.addEventListener('blur', this.blurHandle)
  }

  removeEvent() {
    const { $inp } = this
    $inp.removeEventListener('keyup', this.keyupHandle)
    $inp.removeEventListener('blur', this.blurHandle)
  }

  inputTrigger($inp, val) {
    $inp.value = val
    trigger($inp, 'input')
  }

  keyupHandle(event) {
    const { $inp, date, format, inputTrigger } = this
    let val = $inp.value
    // 回车键
    if (event.keyCode === 13) {
      val = convertToTime(val, date, format)
      inputTrigger($inp, val)
    } else {
      const regInput = /[^0-9:]/g
      if (regInput.test(val)) {
        val = val.replace( /[^0-9:]/g, '')
        inputTrigger($inp, val)
      }
    }
    
  }

  blurHandle() {
    const { $inp, date, format, inputTrigger } = this
    let val = $inp.value
    val = convertToTime(val, date, format)
    inputTrigger($inp, val)
  }
}
