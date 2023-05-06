<!--
 * @Author: machao
 * @Date: 2023-04-25 13:04:33
 * @LastEditors: machao
 * @LastEditTime: 2023-05-06 17:45:46
-->
# input-time

将用户输入的数字串迅速转换成标准的时间格式，为用户提供极为便捷的时间转换服务。

# Install

```Bash
npm install input-time --save
```

## vue

```JavaScript
// 全局
import InputTime from 'input-time'
Vue.use(InputTime)

// 组件内使用
import { inputTimeVue } from 'input-time'

new Vue({
  directives: { inputTimeVue }
})

```

## Usage


```HTML
<input v-model="value" v-input-time="'HH:mm:ss'" @change="onChange" date="2023-05-06"></input>
```

```JavaScript
var app = document.querySelector('.app')
new Vue({
  el: app,
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onChange(val) {
      console.log(val)
    }
  }
})
```

# License

MIT
