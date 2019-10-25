import StepperComponent from './index.vue'

const Stepper = {}

// 注册Dialog
Stepper.install = function (Vue) {
  Vue.component('jy-stepper', StepperComponent)
}

export default Stepper
