import InputTimeVue from './directive'
import InputTime from './input-time'

const install = function(Vue) {
  Vue.directive('InputTime', InputTimeVue)
};

if (window.Vue) {
  Vue.use(install); // eslint-disable-line
}

InputTime.install = install

export { InputTimeVue }
// export const InputTimeVue
export default InputTime
