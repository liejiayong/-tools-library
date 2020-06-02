const app = getApp()
const {
  getCommunityAllRecommend,
  getCommunityTab
} = require('../../api/community')
const { TYPE_COMMUNICATY_POST_DEDTE_FLAG } = require('../../config/constant-config')
const { shareTitle, SCROLL_TOP, groupConfig } = require('../../config/config')
const {
  pageScrollTo,
  stopPullDownRefresh,
  navigateTo,
  showToast,
  hideLoading,
  showLoading,
  getRandom,
  getGroupName,
  getStorageSync,
  setStorageSync
} = require('../../utils/util')

Page({
  data: {
    scrollHeight: SCROLL_TOP, // 显示回到底部按钮 滚动最大高度
    isLoading: false,
    isScrollTop: false, // 返回顶部按钮
    isPullDown: false, // 下拉刷新
    isPullUp: false, // 上拉刷新
    isEmpty: false, // 无内容，请求超时标识
    nomore: false, // 没有更多数据
    isSearch: false, // 搜索状态
    officialList: [], // 公众号信息
    recommendList: [], // 推荐信息
    pageSize: 20, // 每页数量，默认为20
    keyword: '', // 关键词搜索
    page: 1, // 页码
    searchPlaceholder: '搜索', // 搜索占位符
    // scrollView 滚动
    scrollView: {
      scroll: false, // 滚动状态
      isFirst: true // 第一次滚动
    }
  },
  onLoad(options) {
    // console.log('=== start 圈子 ===')
  },
  onReady() {
    this.getOfficialInfo()
  },
  onShow() {
    this.twiceInitial()
  },
  onHide() {},
  onUnload() {},
  // 判断二次重载数据
  twiceInitial() {
    // 加载数据
    if (this.data.page === 1) {
      this.initialPost()
    }
    // 删除过帖子的情况
    if (getStorageSync(TYPE_COMMUNICATY_POST_DEDTE_FLAG)) {
      setStorageSync(TYPE_COMMUNICATY_POST_DEDTE_FLAG, false)
      this.initialPost()
    }
  },
  // 初始化帖子
  initialPost() {
    this.data.isEmpty = false
    this.data.nomore = false
    this.data.isPullDown = false
    this.data.isPullUp = false
    this.data.page = 1
    this.data.recommendList = []
    this.getHotInfo()
  },
  handleSelectOfficial(e) {
    const { id, name } = e.detail

    const url = `../community-post-classify/community-post-classify?type=app&id=${id}&name=${name}`
    navigateTo(url)
  },
  // 热帖推荐-圈子列表
  getOfficialInfo() {
    getCommunityTab().then(officialList => {
      this.setData({ officialList })
    })
  },
  // 拉取 圈子热帖 数据
  getHotInfo(page = this.data.page) {
    const { keyword, pageSize, isLoading } = this.data
    if (isLoading) return
    this.data.isLoading = true

    getCommunityAllRecommend({
      keyword,
      page,
      pageSize
    })
      .then(list => {
        this.data.isLoading = false

        // 为搜索则跳转页面
        if (this.data.isSearch && list.length > 0) {
          this.resetGameInfo()
          return
        }

        // 上拉数据为空时
        if (list.length == 0) {
          this.setData({ isPullUp: false, nomore: true })
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

        const data = list.map((v, i) => {
          let source_name = ''
          if (v.source_name === '')
            source_name = getGroupName(v.source_id, groupConfig)
          else source_name = v.source_name
          return {
            id: v.id,
            user_id: v.user_id,
            create_time: v.create_time,
            medal_icon: v.medal_icon,
            avatar: v.avatar,
            nickname: v.nickname,
            content: v.content,
            title: v.title,
            images: v.images,
            source_id: v.source_id,
            source_name: source_name,
            comments: v.comments,
            views: v.views,
            is_liked: v.is_liked,
            likes: v.likes
            // level: v.level
          }
        })

        let recommendList = this.data.recommendList.concat(data)
        this.setData({ recommendList, isPullUp: false })
        this.data.isSearch = false
        this.data.page++
      })
      .catch(() => {
        this.data.isLoading = false
        this.setData({ isEmpty: true, nomore: false, isPullUp: false })
      })
  },
  // 重置拉取 圈子热帖 数据
  resetGameInfo() {
    // this.data.recommendList = []
    if (this.data.nomore) this.setData({ nomore: false })

    const url = `../community-post-classify/community-post-classify?type=search&search=${
      this.data.keyword
    }`
    navigateTo(url).then(() => {
      this.data.isSearch = false
      this.data.keyword = ''
    })
  },
  // 跳转到发送推文
  handlePostMsg() {
    const url = '../community-post-msg/community-post-msg'
    navigateTo(url)
  },
  // 搜索
  handleSearch({ detail }) {
    this.data.keyword = detail
    // console.log('=== search keyword ====', detail)
    if (detail.length <= 0) this.data.isSearch = false
    else this.data.isSearch = true
    this.getHotInfo(1)
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
    this.getHotInfo()
    this.stopPullDown()
  },
  onReachBottom() {
    if (this.data.nomore) return
    this.setData({ isPullUp: true })
    this.getHotInfo()
  },
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
