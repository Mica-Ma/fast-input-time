/*
 * @Author: machao
 * @Date: 2023-04-23 16:01:30
 * @LastEditors: machao
 * @LastEditTime: 2023-05-06 16:27:27
 */

import InputTime from "./input-time"
import { findEle } from './utils'

export default {
  name: 'input-time',
  bind(el, binding) {
    const { value: format } = binding

    const $inp = findEle(el, 'input')

    const dateExpr = el.getAttribute('date')

    el.$inputTime = new InputTime({
      el: $inp,
      format,
      date: dateExpr
    })
  },
  unbind(el) {
    el.$inputTime.removeEvent()
  }
}
