const app = getApp()
const { getMyCollect } = require('../../../api/account')
const { navigateTo, getRandom } = require('../../../utils/util')
const { shareTitle } = require('../../../config/config')

Page({
  data: {
    nomoreTxt: {text: '当前还没有收藏哦~快去收藏精彩内容吧~'},
    isLoading: false,
    nomore: false, // 没有更多数据
    isEmpty: false, // 无内容
    isUnConnect: false, // 请求超时标识
    isPullDown: false, // 下拉刷新
    isPullUp: true, // 上拉刷新
    isActionSheet: false, // 帖子操作
    keyword: '',
    postList: [], // 用户帖子列表
    page: 1 // 页码
  },
  onLoad(options) {

  },
  onReady() {
  },
  onShow() {
    this.data.isEmpty = false
    this.data.isLoading = false
    this.data.isPullUp = false
    this.data.isPullDown = false
    this.data.isUnConnect = false
    this.data.nomore = false
    this.data.page = 1
    this.data.postList = []
    this.getPost()
  },
  onHide() {

  },
  onUnload() {

  },
  // 获取用户帖子
  getPost(page = this.data.page) {
    if (this.data.isLoading) return
    this.data.isLoading = true

    this.setData({ isPullUp: true })
    getMyCollect({ page })
      .then(({ list, info }) => {
        this.data.isLoading = false

        const data = list.filter(v => { 
          if (v.id) {
            return { ...v }
          }
        })
        // 上拉数据为空时
        if (data.length === 0) {
          this.setData({ isPullUp: false, isUnConnect: false, isPullDown: false })
          const { postList } = this.data
          if (postList.length === 0) {
            this.setData({ nomore: false, isEmpty: true })
          } else {
            this.setData({ nomore: true, isEmpty: false })
          }
          return
        }

        const postList = this.data.postList.concat(data)
        this.setData({ postList, isPullUp: false, isPullDown: false, isUnConnect: false })
        this.data.page++
        console.log(this.data)
        // console.log(this.data)
      })
      .catch(() => {
        this.data.isLoading = false
        this.setData({ isUnConnect: true, isEmpty: false, nomore: false, isPullUp: false, isPullDown: false })
      })
  },
  // 打开popup
  handleOporation() {
    this.setData({ isActionSheet: true })
  },
  // 关闭popup
  handlePopup() {
    this.setData({ isActionSheet: false })
  },
  onPullDownRefresh() {

  },
  onReachBottom() {
    if (this.data.nomore) return
    this.setData({ isPullUp: true })
    this.getPost()
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