const { popupOporation, TYPE_POPUP_OPORATION_DELETE } = require('../../config/modal-popup-config')
const { getNormalizeList } = require('../../utils/modal-popup')
const { createAnimation, getComponentSelectorClient } = require('../../utils/util')

Component({
  properties: {
    postid: {
      type: String,
      value: ''
    },
    isDel: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal, changedPath) {
        const { oporation } = this.data
        if (newVal) {
          oporation[TYPE_POPUP_OPORATION_DELETE].status = true
        } else {
          oporation[TYPE_POPUP_OPORATION_DELETE].status = false
        }
        this.setData({ oporation })
      }
    },
    isShow: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal, changedPath) {
        this.showSwitch(newVal)
      }
    }
  },
  data: {
    oporation: getNormalizeList(popupOporation),
    popHeight: 0,
    popupAnimate: null, // 弹窗动画
    popcls: ''
  },
  lifetimes: {
    ready() {
      this.showSwitch()
      // 注释掉的code，动画情况要用
      this.initialHeight().then(() => {
        const popupAnimate = createAnimation({ duration: 0 }).translateY(-this.data.popHeight).step().export()
        this.setData({ popupAnimate })
      })
    }
  },
  methods: {
    // 关闭
    handleclose() {
      this.triggerEvent('change', false)
    },
    // choose
    handleOporate({ target: { dataset: { type }}}) {
      const { postid } = this.data
      this.triggerEvent('select', {type, postid})
    },
    showSwitch(is = this.data.isShow) {
      this.initialPopCls(is)

      const timer = setTimeout(() => {
        is ? this.show() : this.hide()
        clearTimeout(timer)
      }, 100)
    },
    show() {
      const SET_HEIGHT_ZERO = 0
      this.setHeight(SET_HEIGHT_ZERO)
    },
    hide() {
      const { popHeight } = this.data
      this.setHeight(popHeight)
    },
    setHeight(height) {
      const animate = createAnimation({ duration: 100 })
      const popupAnimate = animate.translateY(height).step().export()
      this.setData({ popupAnimate })
    },
    initialPopCls(is = this.data.isShow) {
      const popcls = is ? 'active' : ''
      this.setData({ popcls })
    },
    initialHeight() {
      return new Promise(resolve => {
        getComponentSelectorClient(this, '#popup').then(({height}) => {
          this.setData({ popHeight: height }, () => {
            resolve(height)
          })
        })
      })
    }
  }
})
