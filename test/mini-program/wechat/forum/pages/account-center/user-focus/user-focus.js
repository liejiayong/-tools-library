const app = getApp()
const { getMyFocus } = require('../../../api/account')
const { navigateTo, getRandom } = require('../../../utils/util')
const { shareTitle } = require('../../../config/config')
const { TYPE_CONFIG_FOCUS_IS_SUBSCRIBE } = require('../../../config/account-center-config')

Page({
  data: {
    userId: '', // 用户id
    nomoreTxt: {text: '还没有关注哦~'},
    isLoading: false,
    nomore: false, // 没有更多数据
    isEmpty: false, // 无内容
    isUnConnect: false, // 请求超时标识
    isPullDown: true, // 下拉刷新
    isPullUp: false, // 上拉刷新
    isActionSheet: false, // 帖子操作
    focusList: [], // 评论列表
    page: 1 // 页码
  },
  onLoad(options) {
    const { userid } = options
    this.data.userId = userid
  },
  onReady() {
    this.getComment()
  },
  onShow() {
  },
  onHide() {},
  onUnload() {},
  getComment(page = this.data.page) {
    if (this.data.isLoading) return
    this.data.isLoading = true

    getMyFocus({
      page,
      type: TYPE_CONFIG_FOCUS_IS_SUBSCRIBE,
      userId: this.data.userId
    }).then(({list: data, info }) => {
      this.data.isLoading = false
      // 上拉数据为空时
      if (data.length === 0) {
        this.setData({ isPullUp: false, nomore: true, isUnConnect: false, isPullDown: false })
        const { focusList } = this.data
        if (focusList.length === 0) {
          this.setData({ nomore: false, isEmpty: true })
        } else {
          this.setData({ nomore: true, isEmpty: false })
        }
        return
      }

      const focusList = this.data.focusList.concat(data)
      this.setData({ focusList, isPullUp: false, isPullDown: false, isUnConnect: false })
      this.data.page++
    }).catch(() => {
      this.data.isLoading = false
      this.setData({ isUnConnect: true, isEmpty: false, nomore: false, isPullUp: false, isPullDown: false })
    })
  },
  onPullDownRefresh() {},
  onReachBottom() {
    if (this.data.nomore) return
    this.setData({ isPullUp: true })
    this.getComment()
  },
  onShareAppMessage() {
    const currPage = getCurrentPages()
    const host = currPage[currPage.length - 1].route

    // 标题
    const titIndex = getRandom(0, 2)
    const title = shareTitle[titIndex]

    return {
      title,
      path: host,
      imageUrl: '../../../common/images/share-img.jpg'
    }    
  }
})
