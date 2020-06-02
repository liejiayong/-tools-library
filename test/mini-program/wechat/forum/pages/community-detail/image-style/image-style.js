const app = getApp()
Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer(newVal, oldVal, changedPath) {}
    }
  },
  data: {},
  methods: {
    // 以下为使用scale-image组件时
    handleImg(e) {
      const dataset = e.currentTarget.dataset
      const index = app.globalData.scaleIndex = +dataset.index
      const scaleList = app.globalData.scaleList = [{url: dataset.src}]
      const isScaleImg = app.globalData.isScaleImg =  true

      // 跳转页面时有效
      wx.navigateTo({
        url: '../../scale-image/scale-image'
      })
      // 发送事件
      // const param = {index, scaleList, isScaleImg}
      // this.triggerEvent('scaleChange', param)
    },
    handleImgs(e) {
      const dataset = e.currentTarget.dataset
      const index = app.globalData.scaleIndex = +dataset.index
      const scaleList = app.globalData.scaleList = this.data.list
      const isScaleImg = app.globalData.isScaleImg = true

      // 跳转页面时有效
      wx.navigateTo({
        url: '../../scale-image/scale-image'
      })
      // 发送事件
      // const param = {index, scaleList, isScaleImg}
      // this.triggerEvent('scaleChange', param)
    },
    // 以下为使用wx.previewImage
    handleImgWX(e) {
      const dataset = e.currentTarget.dataset
      const index  = dataset.index
      const urls =  [dataset.src]

      wx.previewImage({
        current: urls[index], // 当前显示图片的http链接
        urls: urls // 需要预览的图片http链接列表
      })
    },
    handleImgsWX(e) {
      const dataset = e.currentTarget.dataset
      const index  = dataset.index
      const scaleList = this.data.list

      const urls = []
      scaleList.forEach(item => {
        if (item.url) urls.push(item.url)
      })
      wx.previewImage({
        current: urls[index],
        urls: urls
      })
    }
  }
})
