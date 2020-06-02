const { newtabConfig } = require('../../../config/newpost-config')

Component({
  properties: {
    placeholder: {
      type: String,
      value: '', // 搜索占位符
      observer(newVal, oldVal, changedPath) {}
    },
    newtabHeight: {
      type: Number,
      value: 0,
      observer(newVal, oldVal, changedPath) {}
    },
    isShow: {
      type: Boolean,
      value: true,
      observer(newVal, oldVal, changedPath) {
        this.handleNewtabShow(newVal)
      }
    },
    currentTab: {
      type: Number,
      value: 0,
      observer(newVal, oldVal, changedPath) {}
    }
  },
  data: {
    newtab: newtabConfig,
    isNewtab: true, // newtab显示
    newtabAnimate: null // newtab动画
  },
  lifetimes: {
    created() {},
    ready() {}
  },
  pageLifetimes: {
    show() {},
    hide() {}
  },
  methods: {
    // 搜索
    handleSearch({ detail }) {
      this.triggerEvent('search',  detail)
    },
    // newtab动画
    handleNewtabShow(detail) {
      const { isNewtab } = this.data
      if (detail === isNewtab) return
      this.data.isNewtab = detail

      const newtabAnimation = wx.createAnimation({ duration: 150 })
      if (detail) {
        const newtabAnimate = newtabAnimation
          .translateY(0)
          .step()
          .export()
        this.setData({ newtabAnimate })
      } else {
        const { newtabHeight } = this.data
        const newtabAnimate = newtabAnimation
          .translateY(-newtabHeight)
          .step()
          .export()
        this.setData({ newtabAnimate })
      }
    },
    handleChoseTab({
      currentTarget: {
        dataset: { index }
      }
    }) {
      this.triggerEvent('tabchange', index)
    }
  }
})
