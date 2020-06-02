const app = getApp()
const { getGameList, getOfficialMsgList } = require('../../api/game')
const { shareTitle } = require('../../config/config')
const {
  pageScrollTo,
  stopPullDownRefresh,
  showToast,
  setNavigationBarTitle,
  getRandom,
  showLoading,
  hideLoading
} = require('../../utils/util')

Page({
  data: {
    scrollHeight: 300, // 显示回到底部按钮 滚动最大高度
    isLoading: false,
    isScrollTop: false, // 返回顶部按钮
    isPullDown: false, // 下拉刷新
    isPullUp: false, // 上拉刷新
    nomore: false, // 上拉没有更多数据
    recommendList: [], // 推荐信息
    pageSize: 10, // 每页数量，默认为20
    keyword: '', // 关键词搜索
    page: 1, // 页码
    type: '', // 类型，app：公众号搜索，search：检索搜索
    id: '', // 公众号app_id
    name: '' // 公众号名称,
  },
  onLoad({ type, search, id, name }) {
    // console.log('=== start each 资讯 ===')
    this.data.type = type
    this.data.id = id
    this.data.keyword = type === 'search' ? search : ''
    this.data.name = type === 'search' ? search : name
    setNavigationBarTitle(`${this.data.name}`)
  },
  onReady() {
    this.switchType()
  },
  // 判断请求类型
  switchType() {
    const { type } = this.data
    this.data.isLoading = false
    switch (type) {
      case 'search':
        this.getGameInfo()
        break
      case 'app':
        this.getOfficialInfo()
        break
    }
  },
  // 拉取公众号 数据
  getOfficialInfo() {
    if (this.data.isLoading) return
    this.data.isLoading = true

    const { keyword, page, id: appId, pageSize } = this.data
    getOfficialMsgList({
      keyword,
      page,
      appId,
      pageSize
    })
      .then(res => {
        this.data.isLoading = false
        const list = res.list
        // 上拉数据为空时
        if (list.length == 0) {
          this.setData({ isPullUp: false, nomore: true })
          return
        }
        const data = list.map((v, i) => {
          const time = v.update_time.split(' ')[0]
          return {
            id: v.id,
            title: v.title,
            digest: v.digest,
            thumb_url: v.thumb_url,
            update_time: time
            // app_name: v.app_name
          }
        })

        let recommendList = this.data.recommendList.concat(data)
        this.data.page++
        this.setData({ recommendList, isPullUp: false })
      })
      .catch(err => {
        this.data.isLoading = false
        this.setData({ nomore: false, isPullUp: false })
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
        // 上拉数据为空时
        if (list.length == 0) {
          this.setData({ isPullUp: false, nomore: true })
          return
        }

        const data = list.map((v, i) => {
          const time = v.update_time.split(' ')[0]
          return {
            id: v.id,
            title: v.title,
            digest: v.digest,
            thumb_url: v.thumb_url,
            update_time: time
            // app_name: v.app_name
          }
        })

        let recommendList = this.data.recommendList.concat(data)
        this.setData({ recommendList, isPullUp: false })
        this.data.page++
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
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {
    if (this.data.nomore) {
      this.stopPullDown()
      return
    }
    this.setData({ isPullDown: true })
    this.switchType()
    this.stopPullDown()
  },
  onReachBottom() {
    if (this.data.nomore) return
    this.setData({ isPullUp: true })
    this.switchType()
  },
  onShareAppMessage() {
    const currPage = getCurrentPages()
    const host = currPage[currPage.length - 1].route

    // 标题
    const titIndex = getRandom(0, 2)
    const title = shareTitle[titIndex]
    const { id, name, keyword, type } = this.data

    return {
      title,
      path: `${host}?id=${id}&name=${name}&search=${keyword}&type=${type}`,
      imageUrl: '../../common/images/share-img.jpg'
    }
  }
})
