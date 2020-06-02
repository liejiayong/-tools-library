const { shareTitle } = require('../../config/config')
const { TYPE_GAMEPOST_SWIPER_FLAG, TYPE_VIDEOPOST_SWIPER_FLAG } = require('../../config/newpost-config')
const { getRandom, getSelectorClient } = require('../../utils/util')

Page({
  data: {
    currentTab: 0, // newtab菜单索引
    isPullDown: '0,false', // 下拉刷新
    isScrollTop: false, // scroll btn flag
    gameScrollTop: false, // gameScrollTop flag
    videoScrollTop: false, // gameScrollTop flag
    isNewtab: true, // newtab显示, 当前本v3.0.0本暂停使用
    newtabHeight: 0, // newtab 高度
    newtabAnimate: null, // newtab动画
    swiperAnimate: null, // swiper动画
    // 分享视频参数
    shareParam: {
      id: '',
      cover: '',
      title: ''
    },
    postSearch: '', // 资讯搜索词
    videoSearch: '', // 视频搜索词
    postPlaceholder: '搜索', // 资讯搜索占位符
    videoPlaceholder: '搜索', // 视频搜索占位符
    placeholder: '搜索' // 搜索占位符
  },
  onLoad(options) {},
  onReady() {
  },
  onShow() {
    this.initialNewtabHeight()
  },
  onHide() {},
  onUnload() {},
  // 资讯placeholder初始化
  handlePostPlaceholder({ detail }) {
    const { postPlaceholder, currentTab } = this.data
    if (postPlaceholder === '') {
      this.data.postPlaceholder = detail
      this.setData({ placeholder: detail })
    }
    if (currentTab === TYPE_GAMEPOST_SWIPER_FLAG) {
      this.setData({ placeholder: postPlaceholder })
    }
    // console.log(postPlaceholder, 0)
  },
  // 视频placeholder初始化
  handleVideoPlaceholder({ detail }) {
    const { videoPlaceholder, currentTab } = this.data
    if (videoPlaceholder === '') {
      this.data.videoPlaceholder = detail
      this.setData({ placeholder: detail })
    }
    if (currentTab === TYPE_VIDEOPOST_SWIPER_FLAG) {
      this.setData({ placeholder: videoPlaceholder })
    }
    // console.log(videoPlaceholder, 1)
  },
  // 搜索
  handleSearch({ detail: search }) {
    const { currentTab } = this.data
    switch (currentTab) {
      case TYPE_GAMEPOST_SWIPER_FLAG:
      this.setData({ postSearch: search })
      break
      case TYPE_VIDEOPOST_SWIPER_FLAG:
      this.setData({ videoSearch: search })
      break
    }
  },
  initialNewtabHeight() {
    getSelectorClient('#newtab').then(({ height }) => {
      this.setData({ newtabHeight: height })
    })
  },
  handleNewtabShow({ detail }) {
    const { isNewtab } = this.data
    if (detail === isNewtab) return
    this.setData({ isNewtab: detail })

    // swiper动画
    const swiperAnimation = wx.createAnimation({ duration: 150 })
    if (detail) {
      const { newtabHeight } = this.data
      const swiperAnimate = swiperAnimation
        .top(newtabHeight)
        .step()
        .export()
      this.setData({ swiperAnimate })
    } else {
      const swiperAnimate = swiperAnimation
        .top(0)
        .step()
        .export()
      this.setData({ swiperAnimate })
    }
  },
  // newtab菜单栏
  handleChoseTab({ detail }) {
    const currentTab = +detail
    this.setData({ currentTab: currentTab })
  },
  // tabSwiper
  handleTabSwiper({ detail: { current, source } }) {
    // console.log(current, source)
    const currentTab = +current
    this.setData({ currentTab: currentTab })
    switch (currentTab) {
      case TYPE_GAMEPOST_SWIPER_FLAG:
      const { postPlaceholder } = this.data
      this.handlePostPlaceholder({ postPlaceholder })
      break
      case TYPE_VIDEOPOST_SWIPER_FLAG:
      const { videoPlaceholder } = this.data
      this.handleVideoPlaceholder({ videoPlaceholder })
      break
    }
  },
  handleIsPullDown() {
    const flag = `${this.data.currentTab},false`
    this.setData({ isPullDown: flag })
  },
  onPullDownRefresh() {
    const flag = `${this.data.currentTab},true`
    this.setData({ isPullDown: flag })
  },
  // 分享信息
  handleShareChange({ detail }) {
    this.data.shareParam = detail
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
