const app = getApp()
const { getCommunityTab } = require('../../api/community')
const { shareTitle } = require('../../config/config')
const {
  pageScrollTo,
  stopPullDownRefresh,
  navigateTo,
  showToast,
  getRandom,
  hideLoading,
  showLoading
} = require('../../utils/util')

Page({
  data: {
    officialList: []
  },
  onLoad(options) {},
  onReady() {
    this.getOfficialInfo()
  },
  onShow() {},
  onHide() {},
  onUnload() {},
  // 热帖推荐-圈子列表
  getOfficialInfo() {
    getCommunityTab().then(officialList => {
      this.setData({ officialList })
    })
  },
  // 跳转到发送推文
  handlePostMsg() {
    const url = '../community-post-msg/community-post-msg'
    navigateTo(url)
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {
    const currPage = getCurrentPages()
    const host = currPage[currPage.length - 1].route

    // 标题
    const titIndex = getRandom(0, 2)
    const title = shareTitle[titIndex]

    return {
      title,
      path: `${host}?type=share`,
      imageUrl: '../../common/images/share-img.jpg'
    }
  }
})
