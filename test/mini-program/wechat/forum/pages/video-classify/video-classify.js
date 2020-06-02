const app = getApp()
const { getVideoAll } = require('../../api/video')
const { shareTitle, SCROLL_TOP } = require('../../config/config')
const {
  getStorageSync,
  pageScrollTo,
  stopPullDownRefresh,
  setNavigationBarTitle,
  showShareMenu,
  getRandom
} = require('../../utils/util')

Page({
  data: {
    scrollHeight: 300, // 显示回到底部按钮 滚动最大高度
    isLoading: true,
    isScrollTop: false, // 返回顶部按钮
    isPullDown: false, // 下拉刷新
    isPullUp: false, // 上拉刷新
    nomore: false, // 上拉没有更多数据
    isModalComment: false, // 评论弹窗
    selectVideoid: 0, // 选中评论的视频id
    recommendList: [], // 推荐信息
    pageSize: 10, // 每页数量，默认为10
    keyword: '', // 关键词搜索
    page: 1, // 页码
    type: '', // 类型，app：公众号搜索，search：检索搜索
    // 分享视频参数
    shareParam: {
      id: '',
      cover: '',
      title: ''
    }
  },
  onLoad(options) {
    // console.log('=== start each 视频 ===')
    // showShareMenu(true)
    const { type, search } = options

    this.data.type = type
    this.data.keyword = type === 'search' ? search : ''
    if (type === 'search') setNavigationBarTitle(`${search}`)
  },
  onReady() {
    this.getVideoList()
  },
  onShow() {
    if (!this.data.recommendList) this.getVideoList()
  },
  onHide() {},
  onUnload() {},
  // 选择评论
  handleChooseComment(e) {
    const selectVideoid = e.detail.id
    const isModalComment = true
    this.setData({ selectVideoid, isModalComment })
  },
  // 关闭评论弹窗
  handleCommentModalChange(e) {
    const isModalComment = e.detail
    this.setData({ isModalComment })
  },
  handleShareChange(e) {
    const { param } = e.detail
    this.data.shareParam = param
  },
  // 获取视频列表
  getVideoList() {
    if (this.data.isLoading) return
    this.data.isLoading = true

    const { keyword, page, pageSize } = this.data
    getVideoAll({
      keyword,
      page,
      pageSize
    })
      .then(res => {
        this.data.isLoading = false
        const list = res.data.list

        // 上拉数据为空时
        if (list.length == 0) {
          this.setData({ isPullUp: false, nomore: true })
          return
        }

        const data = list.map(item => {
          const {
            id,
            title,
            digest,
            cover,
            praises,
            already_parise,
            views,
            comments
          } = item
          return {
            id,
            title,
            digest: null,
            cover,
            praises,
            already_parise,
            views,
            comments,
            vid: '',
            isplay: false
          }
        })

        let recommendList = this.data.recommendList.concat(data)
        this.setData({ recommendList, isPullUp: false })
        this.data.page++
        // console.log('video page')
      })
      .catch(err => {
        this.data.isLoading = false
        this.setData({ nomore: false, isPullUp: false })
      })
  },
  stopPullDown() {
    stopPullDownRefresh().then(() => {
      this.setData({ isPullDown: false })
    })
  },
  handleScrollTop() {
    pageScrollTo({
      scrollTop: 0
    }).then(() => {
      this.setData({ isScrollTop: false })
    })
  },
  // 回到顶部
  onPageScroll({ scrollTop }) {
    const { scrollHeight, isScrollTop } = this.data

    if (scrollHeight < scrollTop) {
      if (!isScrollTop) this.setData({ isScrollTop: true })
    } else {
      if (isScrollTop) this.setData({ isScrollTop: false })
    }
  },
  onPullDownRefresh() {
    if (this.data.nomore) {
      this.stopPullDown()
      return
    }
    this.setData({ isPullDown: true })
    this.getVideoList()
    this.stopPullDown()
  },
  onReachBottom() {
    if (this.data.nomore) return
    this.setData({ isPullUp: true })
    this.getVideoList()
  },
  onShareAppMessage(opt) {
    // console.log('=== 开始分享', this.data)
    // 来自页面内转发按钮
    if (opt.from === 'button') {
      const host = 'pages/video-detail/video-detail'
      return {
        title: this.data.shareParam.title,
        path: `${host}?id=${this.data.shareParam.id}&type=share`,
        imageUrl: this.data.shareParam.cover
      }
    } else {
      // 菜单转发
      const currPage = getCurrentPages()
      const host = currPage[currPage.length - 1].route
      // 标题
      const titIndex = getRandom(0, 2)
      const title = shareTitle[titIndex]
      return {
        title,
        path: host,
        imageUrl: '../../common/images/share-img.jpg'
      }
    }
  }
})
