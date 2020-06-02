const { TYPE_LOGIN_FIRST } = require('../../../config/constant-config')
const { getStorageSync, setStorageSync } = require('../../../utils/util')
Component({
  properties: {},
  data: {
    isMask: false // 显示弹窗
  },
  pageLifetimes: {
    show() {
      this.initialMask()
    },
    hide() {
      this.hideMask()
    }
  },
  methods: {
    hideMask() {
      if (this.data.isMask) this.setData({ isMask: false })
    },
    initialMask() {
      let type = getStorageSync(TYPE_LOGIN_FIRST)
      if (!type.length) {
        this.setData({ isMask: true })
        type += Date.now()
        setStorageSync(TYPE_LOGIN_FIRST, type)
      }
    },
    // 阻止事件
    handleTouch() {
      if (this.data.isMask) this.setData({ isMask: false })
      return false
    }
  }
})
