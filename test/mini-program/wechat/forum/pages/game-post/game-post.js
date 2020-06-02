const app = getApp()
const { TYPE_LOGIN_FIRST } = require('../../config/constant-config')
const {
  getGameBanner,
  getOfficialTabList,
  getGameList
} = require('../../api/game')
const { shareTitle, SCROLL_TOP, gameOrder } = require('../../config/config')
const {
  pageScrollTo,
  stopPullDownRefresh,
  navigateTo,
  showToast,
  getRandom,
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
    isEmpty: false, // 无内容
    nomore: false, // 上拉没有更多数据
    isSearch: false, // 搜索状态
    officialList: [], // 公众号信息
    recommendList: [], // 推荐信息
    bannerList: [], // banner列表
    pageSize: 10, // 每页数量，默认为20
    keyword: '', // 关键词搜索
    page: 1, // 页码
    searchPlaceholder: '', // 搜索占位符
    // scrollView 滚动
    scrollView: {
      scroll: false, // 滚动状态
      isFirst: true // 第一次滚动
    }
  },
  onLoad(options) {
    // console.log('=== start 资讯 ===')
  },
  onReady() {
    this.getOfficialInfo()
    this.gameBanner()
    this.getGameInfo()
  },
  // 选择话题
  handleSearchChange(e) {
    const { app_id, app_name } = e.detail
    const url = `../game-post-classify/game-post-classify?type=app&id=${app_id}&name=${app_name}`
    navigateTo(url)
  },
  // 选择游戏类型
  handleSelectOfficial(e) {
    const { id, name } = e.detail

    const url = `../game-post-classify/game-post-classify?type=app&id=${id}&name=${name}`
    navigateTo(url)
  },
  // banner图
  gameBanner() {
    getGameBanner().then(bannerList => {
      this.setData({ bannerList })
    })
  },
  // 获取公众号列表
  getOfficialInfo() {
    getOfficialTabList().then(officialList => {
      this.setData({ officialList })
    })
  },
  // 拉取 游戏资讯 数据
  getGameInfo(page = this.data.page) {
    if (this.data.isLoading) return
    this.data.isLoading = true
    
    const { keyword, pageSize } = this.data

    getGameList({
      keyword,
      page,
      pageSize
    })
      .then(res => {
        this.data.isLoading = false

        const list = res.list
        // 为搜索且有数据则跳转页面
        if (this.data.isSearch && list.length > 0) {
          this.resetGameInfo()
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
        const search = res.search
        const data = list.map((v, i) => {
          const time = v.update_time.split(' ')[0]
          return {
            id: v.id,
            title: v.title,
            digest: v.digest,
            thumb_url: v.thumb_url,
            app_name: v.app_name,
            app_id: v.app_id,
            update_time: time
          }
        })
        gameOrder.forEach(val => {
          data.forEach(v => {
            if (val.name === v.app_name) {
              if (val.rename !== '') v.app_name = val.rename
            }
          })
        })
        // 搜索文字
        app.globalData.searchKeyword.news_search = search.news_search
        app.globalData.searchKeyword.ugc_search = search.ugc_search
        const searchPlaceholder = search.news_search
        let recommendList = this.data.recommendList.concat(data)
        this.setData({ searchPlaceholder, recommendList, isPullUp: false })
        this.data.isSearch = false
        this.data.page++
        // console.log("game page", )
      })
      .catch(err => {
        this.data.isLoading = false
        this.setData({ isEmpty: true, nomore: false, isPullUp: false })
      })
  },
  // 重置拉取 游戏资讯 数据
  resetGameInfo() {
    if (this.data.nomore) this.setData({ nomore: false })

    const url = `../game-post-classify/game-post-classify?type=search&search=${
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
    this.getGameInfo(1)
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
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {
    if (this.data.nomore) {
      this.stopPullDown()
      return
    }
    this.setData({ isPullDown: true })
    this.getGameInfo()
    this.stopPullDown()
  },
  onReachBottom() {
    if (this.data.nomore) return
    this.setData({ isPullUp: true })
    this.getGameInfo()
  },
  onShareAppMessage() {
    const currPage = getCurrentPages()
    const host =  `${currPage[currPage.length - 1].route}?type=share`

    // 标题
    const titIndex = getRandom(0, 2)
    const title = shareTitle[titIndex]

    return {
      title,
      path: host,
      imageUrl: '../../common/images/share-img.jpg'
    }
  }
})
