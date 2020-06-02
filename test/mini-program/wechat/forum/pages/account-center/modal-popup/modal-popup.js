const { createAnimation, getComponentSelectorClient } = require('../../../utils/util')
const { delPost } = require('../../../api/community')

const CONFIG_OPORATION_OK = 0
const CONFIG_OPORATION_CANCEL = 1

const oporation = [
  {
    type: CONFIG_OPORATION_OK,
    text: '确认'
  },
  {
    type: CONFIG_OPORATION_CANCEL,
    text: '取消'
  }
]

Component({
  properties: {
    postid: {
      type: String,
      value: '',
      observer(newVal) {
        // console.log(newVal, 'new postid')
      }
    },
    isShow: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal, changedPath) {
        // console.log(newVal, 'showpop')
        this.showSwitch(newVal)
      }
    }
  },
  data: {
    oporation,
    popHeight: 0,
    popupAnimate: null, // 弹窗动画
    popcls: ''
  },
  lifetimes: {
    ready() {
      this.initialPopCls()
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
      if (type === undefined) return
      switch (type) {
        case CONFIG_OPORATION_OK:
        const { postid } = this.data
        delPost(postid).then(() => { this.triggerEvent('delete', false) })
        break
        case CONFIG_OPORATION_CANCEL:
        this.triggerEvent('change', false)
        break
      }
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
      this.setHeight(-popHeight)
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
