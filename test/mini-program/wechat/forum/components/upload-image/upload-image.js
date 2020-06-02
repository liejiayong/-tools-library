const {
  getImageInfo,
  compressImage,
  chooseImage,
  previewImage,
  showToast,
  showLoading,
  hideLoading
} = require('../../utils/util')
const { uploadImage } = require('../../api/community')

Component({
  properties: {},
  data: {
    tempUrlList: [], // 临时url
    urlList: [], // 最终url
    tempCount: 0, // 临时计数
    count: 0 // 当前张图，最大9张
  },
  methods: {
    // 删除图片
    handleDel({
      currentTarget: {
        dataset: { order }
      }
    }) {
      const { urlList } = this.data
      const index = +order
      urlList.splice(index, 1)
      this.setData({ urlList })
      this.data.count = urlList.length
    },
    // 预览图片
    handlePreview({
      currentTarget: {
        dataset: { order }
      }
    }) {
      const { urlList: urls } = this.data
      const current = urls[+order]
      previewImage({
        urls,
        current
      })
    },
    // 选择图片
    handleChooseImage() {
      const count = this.data.count < 0 ? 0 : 9 - this.data.count
      chooseImage({ count })
      .then(res => {
        // console.log('选择')
          const { tempFilePaths } = res
          this.data.tempUrlList = tempFilePaths
          this.data.tempCount = 0
          showLoading({
            title: '图片上传中...',
            mask: true
          })
          this.initialUpload()
        })
        .catch(err => {
          this.emitImgList()
          hideLoading()
          console.log('选择图片失败', err)
        })
    },
    // 初始化上传
    initialUpload() {
      let { count, tempCount } = this.data
      const { urlList, tempUrlList } = this.data
      // console.log('上传')
      if (count > 8) {
        this.emitImgList()
        hideLoading()
        showToast({
          title: '最多上传9张图片'
        })
        return
      } else if (tempCount > tempUrlList.length - 1) {
        this.data.tempCount = 0
        this.data.tempUrlList = []
        this.emitImgList()
        hideLoading()
        return
      }
      const file = tempUrlList[tempCount]
      uploadImage({ file })
        .then(url => {
          ++this.data.count
          ++this.data.tempCount
          this.data.urlList.push(url)
          // console.log('chenggong', url)
          this.setData({ urlList: this.data.urlList })
          this.initialUpload()
        })
        .catch(err => {
          this.emitImgList()
          hideLoading()
        })
    },
    // 发送url
    emitImgList() {
      const { urlList } = this.data
      this.triggerEvent('change', urlList)
    }
  }
})
