const { replyPostMsg } = require('../../../api/community')
const { navigateBack } = require('../../../utils/util')

Page({
  data: {
    placeholder: '发表评论... ',
    autoFocus: true,
    content: '',
    replyId: -1,
    businessId: -1,
    images: null,
  },
  onLoad(options) {
    const { placeholder, businessid, replyid  } = options
    this.data.businessId = businessid
    this.data.replyId = replyid
    if (placeholder) this.setData({ placeholder })
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  handleinput({ detail: { value }}) {
    this.data.content = value.trim()
    // console.log( encodeURIComponent(value), this.data.content)
  },
  handleSend() {
    const { replyId, content, businessId } = this.data
    replyPostMsg({
      businessId,
      content,
      replyId
    }).then(() => {
      const timer = setTimeout(() => {
        navigateBack()
        clearTimeout(timer)
      }, 1500)
    })
  },
  handleClose() {
    navigateBack()
  }
})
