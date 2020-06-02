const { SCROLL_TOP } = require('../../config/config')

Component({
  properties: {
    // 预设滚动距离顶部的距离
    scrolltop: {
      type: String,
      observer(scrollTop) {
        this.data.scrollTop = scrollTop
      }
    },
    // 当前滚动距离顶部的距离
    currentScrollTop: {
      type: String,
      value: 0,
      observer(curScrolltop) {
        this.controller(curScrolltop)
      }
    }
  },
  data: {
    scrollTop: SCROLL_TOP,
    isShow: false
  },
  methods: {
    controller(curScrolltop = this.data.currentScrollTop, scrollTop = this.data.scrollTop) {
      if (curScrolltop > scrollTop) {
        if (!this.data.isShow) this.setData({ isShow: true })
      } else {
        if (this.data.isShow) this.setData({ isShow: false })
      }
    }
  }
})
