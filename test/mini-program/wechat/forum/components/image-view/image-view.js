// const app = getApp()
const { previewImage } = require('../../utils/util')

Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer(newVal, oldVal, changedPath) {
        this.initDisplayNum(newVal)
      }
    }
  },
  data: {
    displayNum: 1 // 显示数量
  },
  methods: {
    initDisplayNum(list) {
      if (list.length > 1) {
        const displayNum = 3
        this.setData({ displayNum })
      }
    },
    // 以下为使用wx.previewImage
    handleImgWX({currentTarget: { dataset: { index, url }}}) {
      const urls =  [url]
      previewImage({
        current: urls[index], // 当前显示图片的http链接
        urls: urls // 需要预览的图片http链接列表
      })
    },
    handleImgsWX({currentTarget: { dataset: { index }}}) {
      const { list } = this.data

      const urls = []
      // 获取当前预览url
      list.forEach(item => {
        if (item.url) urls.push(item.url)
      })
      // console.log(list, urls)
      previewImage({
        current: urls[index],
        urls: urls
      })
    }
  }
})
