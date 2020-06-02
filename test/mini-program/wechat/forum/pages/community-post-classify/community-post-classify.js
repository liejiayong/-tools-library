const app = getApp()
const {
  getCommunityAllRecommend,
  getCommunityClassifyRecommend
} = require('../../api/community')
const { shareTitle, SCROLL_TOP } = require('../../config/config')
const {
  TYPE_COMMUNICATY_POST_DEDTE_FLAG
} = require('../../config/constant-config')
const {
  pageScrollTo,
  stopPullDownRefresh,
  setNavigationBarTitle,
  getRandom,
  navigateTo,
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
    nomore: false, // 上拉没有更多数据
    recommendList: [], // 推荐信息
    pageSize: 20, // 每页数量，默认为20
    keyword: '', // 关键词搜索
    page: 1, // 页码
    isShare: false, // 分享标志,share:分享类型
    type: '', // 类型，app：公众号搜索，search：检索搜索
    id: '', // 公众号app_id
    name: '', // 公众号名称
    isSendMsg: false // 进入发帖标识
  },
  onLoad({ type, search, id, name, pagetype }) {
    // console.log('=== start each 圈子热帖 ===', type, search, id, name, pagetype)
    this.data.id = id
    this.data.keyword = type === 'search' ? search : ''
    this.data.name = type === 'search' ? search : name
    if (pagetype == 'share') this.setData({ isShare: true })
    this.setData({ type })
    setNavigationBarTitle(`${this.data.name}`)
  },
  onReady() {
    this.initialPost()
  },
  onShow() {
    // 发帖刷新
    if (this.data.isSendMsg) {
      // console.log(this.data.isSendMsg, 'from post-msg')
      this.data.isSendMsg = false
      this.initialPost()
    }
    
    // 删除过帖子刷新
    if (getStorageSync(TYPE_COMMUNICATY_POST_DEDTE_FLAG)) {
      // console.log(TYPE_COMMUNICATY_POST_DEDTE_FLAG, 'TYPE_COMMUNICATY_POST_DEDTE_FLAG')
      setStorageSync(TYPE_COMMUNICATY_POST_DEDTE_FLAG, false)
      this.initialPost()
    }
  },
  // 初始化帖子
  initialPost() {
    this.data.isEmpty = false
    this.data.nomore = false
    this.data.isPullDown = false
    this.data.isLoading = false
    this.data.isPullUp = false
    this.data.page = 1
    this.data.recommendList = []
    this.switchType()
  },
  // 判断请求类型
  switchType() {
    const { type } = this.data
    this.data.isLoading = false
    switch (type) {
      case 'search':
        this.getHotInfo()
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

    const { id, keyword, page, pageSize } = this.data
    getCommunityClassifyRecommend({
      communityId: id,
      keyword,
      page,
      pageSize
    })
      .then(list => {
        this.data.isLoading = false
        // 上拉数据为空时
        if (list.length == 0) {
          this.setData({ isPullUp: false, nomore: true })
          return
        }

        const data = list.map((v, i) => {
          return {
            id: v.id,
            user_id: v.user_id,
            avatar: v.avatar,
            nickname: v.nickname,
            content: v.content,
            title: v.title,
            images: v.images,
            source_id: v.source_id,
            source_name: v.source_name,
            comments: v.comments,
            views: v.views,
            // level: v.level,
            medal_icon: v.medal_icon,
            is_liked: v.is_liked,
            likes: v.likes
          }
        })

        let recommendList = this.data.recommendList.concat(data)
        this.setData({ recommendList, isPullUp: false })
        this.data.page++
      })
      .catch(() => {
        this.data.isLoading = false
        this.setData({ nomore: false, isPullUp: false })
      })
  },
  // 拉取 圈子热帖 数据
  getHotInfo() {
    if (this.data.isLoading) return
    this.data.isLoading = true

    const { keyword, page, pageSize } = this.data
    getCommunityAllRecommend({
      keyword,
      page,
      pageSize
    })
      .then(list => {
        this.data.isLoading = false
        // 上拉数据为空时
        if (list.length == 0) {
          this.setData({ isPullUp: false, nomore: true })
          return
        }

        const data = list.map((v, i) => {
          return {
            id: v.id,
            avatar: v.avatar,
            nickname: v.nickname,
            content: v.content,
            title: v.title,
            images: v.images,
            source_id: v.source_id,
            source_name: v.source_name,
            comments: v.comments,
            views: v.views,
            is_liked: v.is_liked,
            likes: v.likes
          }
        })

        let recommendList = this.data.recommendList.concat(data)
        this.setData({ recommendList, isPullUp: false })
        this.data.page++
      })
      .catch(() => {
        this.data.isLoading = false
        this.setData({ isEmpty: true, nomore: false, isPullUp: false })
      })
  },
  // 跳转到发送推文
  handlePostMsg() {
    const { id, name, keyword, type } = this.data
    this.data.isSendMsg = true
    const url = `../community-post-msg/community-post-msg?id=${id}&type=${type}&name=${name}&search=${keyword}`
    navigateTo(url)
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
      path: `${host}?id=${id}&name=${name}&search=${keyword}&type=${type}&pagetype=share`,
      imageUrl: '../../common/images/share-img.jpg'
    }
  }
})
