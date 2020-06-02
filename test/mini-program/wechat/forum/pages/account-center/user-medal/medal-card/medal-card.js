const app =  getApp()
const { createAnimation } = require('../../../../utils/util')
const { getWearMedal, getDemountMedal } = require('../../../../api/account')
const {
  TYPE_CONFIG_MEDAL_NULL,
  TYPE_CONFIG_MEDAL_GET,
  TYPE_CONFIG_MEDAL_WEAR
} = require('../../../../config/user-medal')

// 动画参数
const SET_OPACITY_SHOW = 1
const SET_OPACITY_HIDE = 0

Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer(newVal) {
        this.showSwitch(newVal)
      }
    },
    medalid: {
      type: Number,
      observer() {}
    },
    wear: {
      type: Number,
      value: TYPE_CONFIG_MEDAL_NULL,
      observer(wearStatus) {
        this.setData({ wearStatus })
      }
    },
    name: {
      type: String,
      value: '',
      observer() {}
    },
    intro: {
      type: String,
      value: '',
      observer() {}
    },
    time: {
      type: String,
      value: '',
      observer() {}
    },
    icon: {
      type: String,
      value: '',
      observer() {}
    }
  },
  data: {
    popupAnimate: null, // 弹窗动画
    popcls: '',
    wearStatus: TYPE_CONFIG_MEDAL_NULL,
    TYPE_CONFIG_MEDAL_NULL,
    TYPE_CONFIG_MEDAL_GET,
    TYPE_CONFIG_MEDAL_WEAR
  },
  lifetimes: {
    created() {
      this.showSwitch()
    }
  },
  methods: {
    // 佩戴
    handleWear() {
      const { medalid } = this.data
      getWearMedal(medalid).then(() => {
        this.setData({ wearStatus: TYPE_CONFIG_MEDAL_WEAR})
        app.globalData.isMedalWear = true
      })
    },
    // 卸下
    handleDemount() {
      const { medalid } = this.data
      getDemountMedal(medalid).then(res => {
        this.setData({ wearStatus: TYPE_CONFIG_MEDAL_GET})
        app.globalData.isMedalWear = true
      })
    },
    // 关闭
    handleClose() {
      this.triggerEvent('close', false)
    },
    showSwitch(is = this.data.isShow) {
      this.initialPopCls(is)

      const timer = setTimeout(() => {
        is ? this.show() : this.hide()
        clearTimeout(timer)
      }, 100)
    },
    show() {
      this.setAnimation(SET_OPACITY_SHOW)
    },
    hide() {
      this.setAnimation(SET_OPACITY_HIDE)
    },
    setAnimation(opacity) {
      const animate = createAnimation({ duration: 200 })
      const popupAnimate = animate
        .opacity(opacity)
        .step()
        .export()
      this.setData({ popupAnimate })
    },
    initialPopCls(is = this.data.isShow) {
      const popcls = is ? 'active' : ''
      this.setData({ popcls })
    }
  }
})
