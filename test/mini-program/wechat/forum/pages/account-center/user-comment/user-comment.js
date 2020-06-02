const app = getApp()
const { getMyComment } = require('../../../api/account')
const { navigateTo, getRandom } = require('../../../utils/util')
const { shareTitle } = require('../../../config/config')

Page({
  data: {
    nomoreTxt: {text: '当前没有评论哦~'},
    isLoading: false,
    nomore: false, // 没有更多数据
    isEmpty: false, // 无内容
    isUnConnect: false, // 请求超时标识
    isPullDown: true, // 下拉刷新
    isPullUp: false, // 上拉刷新
    isActionSheet: false, // 帖子操作
    commentList: [], // 评论列表
    page: 1 // 页码
  },
  onLoad(options) {
  },
  onReady() {},
  onShow() {
    this.data.isEmpty = false
    this.data.isLoading = false
    this.data.isPullUp = false
    this.data.isPullDown = false
    this.data.isUnConnect = false
    this.data.nomore = false
    this.data.page = 1
    this.data.commentList = []
    this.getComment()
  },
  onHide() {},
  onUnload() {},
  getComment(page = this.data.page) {
    if (this.data.isLoading) return
    this.data.isLoading = true

    getMyComment({ page }).then(({ list: data, info}) => {
      this.data.isLoading = false
      
      // 上拉数据为空时
      if (data.length === 0) {
        this.setData({ isPullUp: false, nomore: true, isUnConnect: false, isPullDown: false })
        const { commentList } = this.data
        if (commentList.length === 0) {
          this.setData({ nomore: false, isEmpty: true })
        } else {
          this.setData({ nomore: true, isEmpty: false })
        }
        return
      }
      // jump_value 帖子id
      // let commentList = data.map( v => { return { ...v, id: v.jump_value }})
      const commentList = this.data.commentList.concat(data)
      this.setData({ commentList, isPullUp: false, isPullDown: false, isUnConnect: false })
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
