const app = getApp()
const { getMyPost } = require('../../../api/account')
const { getRandom, getStorageSync, setStorageSync } = require('../../../utils/util')
const { shareTitle } = require('../../../config/config')
const { TYPE_COMMUNICATY_POST_DEDTE_FLAG } = require('../../../config/constant-config')

Page({
  data: {
    nomoreTxt: { text: '当前没有帖子哦~快去发帖吧~' },
    isLoading: false,
    nomore: false, // 没有更多数据
    isEmpty: false, // 无内容
    isUnConnect: false, // 请求超时标识
    isPullDown: false, // 下拉刷新
    isPullUp: true, // 上拉刷新
    isActionSheet: false, // 帖子操作
    keyword: '',
    postList: [], // 用户帖子列表
    page: 1, // 页码
    userId: '', // 用户id
    delPostId: '' // 删除postid
  },
  onLoad(options) {
    const { userid } = options
    this.data.userId = userid
  },
  onReady() {
    this.getPost()
  },
  onShow() {
    // 删除过帖子刷新
    if (getStorageSync(TYPE_COMMUNICATY_POST_DEDTE_FLAG)) {
      // console.log(TYPE_COMMUNICATY_POST_DEDTE_FLAG, 'TYPE_COMMUNICATY_POST_DEDTE_FLAG')
      setStorageSync(TYPE_COMMUNICATY_POST_DEDTE_FLAG, false)
      this.initialPost()
    }
  },
  onHide() {},
  onUnload() {},
  // 删除帖子
  handleDel() {
    this.setData({ isActionSheet: false })
    this.initialPost()
  },
  initialPost(){
    this.data.isEmpty = false
    this.data.nomore = false
    this.data.isPullDown = false
    this.data.isLoading = false
    this.data.isPullUp = false
    this.data.page = 1
    this.data.postList = []
    this.getPost()
  },
  // 获取用户帖子
  getPost(page = this.data.page) {
    if (this.data.isLoading) return
    this.data.isLoading = true

    const { userId } = this.data
    this.setData({ isPullUp: true })
    getMyPost({ page, userId })
      .then(data => {
        this.data.isLoading = false
        // 上拉数据为空时
        if (data.length === 0) {
          this.setData({
            isPullUp: false,
            isUnConnect: false,
            isPullDown: false
          })
          const { postList } = this.data
          if (postList.length === 0) {
            this.setData({ nomore: false, isEmpty: true })
          } else {
            this.setData({ nomore: true, isEmpty: false })
          }
          return
        }

        const postList = this.data.postList.concat(data)
        this.setData({
          postList,
          isPullUp: false,
          isPullDown: false,
          isUnConnect: false
        })
        this.data.page++
      })
      .catch(() => {
        this.data.isLoading = false
        this.setData({
          isUnConnect: true,
          isEmpty: false,
          nomore: false,
          isPullUp: false,
          isPullDown: false
        })
      })
  },
  // 打开popup
  handleOporation({ detail }) {
    this.setData({ isActionSheet: true, delPostId: detail })
  },
  // 关闭popup
  handlePopup() {
    this.setData({ isActionSheet: false })
  },
  onPullDownRefresh() {},
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
