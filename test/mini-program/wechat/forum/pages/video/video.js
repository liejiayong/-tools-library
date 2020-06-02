const app = getApp()
const { getVideoAll } = require('../../api/video')
const { shareTitle, SCROLL_TOP } = require('../../config/config')
const {
  getStorageSync,
  pageScrollTo,
  stopPullDownRefresh,
  showToast,
  navigateTo,
  getRandom
} = require('../../utils/util')
Page({
  data: {
    scrollHeight: SCROLL_TOP, // 显示回到底部按钮 滚动最大高度
    isLoading: false,
    isScrollTop: false, // 返回顶部按钮
    isPullDown: false, // 下拉刷新
    isPullUp: false, // 上拉刷新
    isEmpty: false, // 无内容
    nomore: false, // 上拉没有更多数据
    isSearch: false, // 搜索状态
    isModalComment: false, // 评论弹窗
    selectVideoid: 0, // 选中评论的视频id
    videoList: [], // 视频列表
    pageSize: 10, // 每页数量，默认为20
    keyword: '', // 关键词搜索
    page: 1, // 页码
    searchPlaceholder: '', // 搜索占位符
    // scrollView 滚动
    scrollView: {
      scroll: false, // 滚动状态
      isFirst: true // 第一次滚动
    },
    currentShare: null, // 当前分享内容
    // 分享视频参数
    shareParam: {
      id: '',
      cover: '',
      title: ''
    }
  },
  onLoad(options) {
    // console.log('=== start 视频列表 ===', options)
    // showShareMenu(true)
  },
  onReady() {
    this.getVideoList()
  },
  // 搜索话题
  handledigestchange(e) {
    const { search } = e.detail
    const url = `../video-classify/video-classify?type=search&search=${search}`
    navigateTo(url)
  },
  // 选择评论
  handleChooseComment(e) {
    const selectVideoid = e.detail.id
    const url = `../video-detail/video-detail?id=${selectVideoid}&type=comment`
    navigateTo(url)
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
  getVideoList(page = this.data.page) {
    if (this.data.isLoading) return
    this.data.isLoading = true
    
    const { keyword, pageSize } = this.data
    getVideoAll({
      keyword,
      page,
      pageSize
    })
      .then(res => {
        this.data.isLoading = false
        const list = res.data.list
        // 为搜索且有数据则跳转页面
        if (this.data.isSearch && list.length > 0) {
          this.resetVideoList()
          return
        }

        // 上拉数据为空时
        if (list.length == 0) {
          this.setData({ isPullUp: false, nomore: true })
          // 搜索且数据为空
          if (this.data.isSearch) {
            showToast({
              title: '未找到您要搜索的内容，去看看大家都在看的内容吧！',
              icon: 'none'
            })
            this.data.isSearch = false
            this.data.keyword = ''
          }
          return
        }
        const searchPlaceholder = res.data.search.video_search

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
            digest,
            cover,
            praises,
            already_parise,
            views,
            comments,
            vid: '',
            isplay: false
          }
        })

        let videoList = this.data.videoList.concat(data)
        this.setData({ searchPlaceholder, videoList, isPullUp: false })
        this.data.isSearch = false
        this.data.page++
        // console.log('video page', searchPlaceholder)
      })
      .catch(() => {
        this.data.isLoading = false
        this.setData({ isEmpty: true, nomore: false, isPullUp: false })
      })
  },
  // 重置拉取 获取视频列表
  resetVideoList() {
    // this.data.videoList = []
    if (this.data.nomore) this.setData({ nomore: false })

    const url = `../video-classify/video-classify?type=search&search=${
      this.data.keyword
    }`
    navigateTo(url).then(() => {
      this.data.isSearch = false
      this.data.keyword = ''
    })
  },
  // 搜索
  handleSearch({ detail }) {
    this.data.keyword = detail
    // console.log('=== search keyword ====', detail)
    if (detail.length <= 0) this.data.isSearch = false
    else this.data.isSearch = true
    this.getVideoList(1)
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

    this.handleScroll()
  },
  // 滚动时 search组件失去焦点
  handleAutoBlur() {
    // console.log('=== search bulr ===')
    this.data.scrollView.isFirst = true
  },
  // 监听页面滚动 search组件效果
  handleScroll() {
    const scrollView = this.data.scrollView
    if (this.data.scrollView.isFirst) {
      scrollView.scroll = true
      scrollView.isFirst = false
      this.setData({ scrollView })
    } else {
      if (!scrollView.scroll) return
      scrollView.scroll = false
      this.setData({ scrollView })
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
