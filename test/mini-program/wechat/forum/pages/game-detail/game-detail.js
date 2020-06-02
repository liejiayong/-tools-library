// const app = getApp()
const { getOfficialDetail } = require('../../api/game')
const { shareTitle } = require('../../config/config')
const { switchTab } = require('../../utils/util')

Page({
  data: {
    postId: -1,
    postInfo: null,
    type: '' // 页面类型。type=share为分享页面， type=‘’为正常页面
  },
  onLoad({ id, type }) {
    // console.log('=== 资讯详情 ===')
    this.data.postId = +id
    this.data.type = type === 'undefined' ? '' : 'share'
    this.setData({ type: this.data.type })
  },
  onReady() {
    this.getDetail()
  },

  getDetail() {
    const { postId: id } = this.data
    getOfficialDetail({ id }).then((postInfo) => {
      this.setData({ postInfo })
    })
  },
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage(opt) {
    const currPage = getCurrentPages()
    const host = currPage[currPage.length - 1].route

    // 标题
    const titIndex = (Math.random() * 3) | 0
    const title = shareTitle[titIndex]

    return {
      title,
      path: `${host}?id=${this.data.postInfo.id}&type=share`,
      imageUrl: '../../common/images/share-img.jpg'
    }
  }
})
