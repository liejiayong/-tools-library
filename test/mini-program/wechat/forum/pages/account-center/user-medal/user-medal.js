const app = getApp()
const { getMyMedal } = require('../../../api/account')
const { navigateTo, getRandom } = require('../../../utils/util')
const { shareTitle } = require('../../../config/config')
const {
  TYPE_CONFIG_MEDAL_NULL,
  TYPE_CONFIG_MEDAL_GET,
  TYPE_CONFIG_MEDAL_WEAR
} = require('../../../config/user-medal')

Page({
  data: {
    nomoreTxt: { text: '还没有粉丝哦~' },
    isLoading: false,
    nomore: false, // 没有更多数据
    isEmpty: false, // 无内容
    isUnConnect: false, // 请求超时标识
    isPullDown: true, // 下拉刷新
    isPullUp: false, // 上拉刷新
    isActionSheet: false, // 帖子操作
    page: 1, // 页码
    medalList: [], // 勋章列表
    isModalMedal: false, // 勋章显示
    MedalWear: false, // 勋章佩戴
    medalIcon: '', // 勋章icon
    medalName: '', // 勋章名称
    medalIntro: '', // 勋章详情
    medalTime: '', // 勋章时间
    medalId: -1, // 勋章id
    TYPE_CONFIG_MEDAL_NULL,
    TYPE_CONFIG_MEDAL_GET,
    TYPE_CONFIG_MEDAL_WEAR
  },
  onLoad(options) {},
  onReady() {
    this.getMedal()
  },
  onShow() {},
  onHide() {},
  onUnload() {},
  getMedal(page = this.data.page) {
    if (this.data.isLoading) return
    this.data.isLoading = true

    getMyMedal({ page })
      .then(data => {
        this.data.isLoading = false
        // 上拉数据为空时
        if (data.length === 0) {
          this.setData({
            isPullUp: false,
            nomore: true,
            isUnConnect: false,
            isPullDown: false
          })
          const { medalList } = this.data
          if (medalList.length === 0) {
            this.setData({ nomore: false, isEmpty: true })
          } else {
            this.setData({ nomore: true, isEmpty: false })
          }
          return
        }

        const medalList = this.data.medalList.concat(data)
        this.setData({
          medalList,
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
  // 选择勋章
  handleSelect({
    currentTarget: {
      dataset: { medalid, wear, name, intro, time, icon }
    }
  }) {

    this.setData({
      medalId: medalid,
      MedalWear: wear,
      medalName: name,
      medalIntro: intro,
      medalTime: time,
      medalIcon: icon,
      isModalMedal: true
    })
  },
  // 关闭勋章弹窗
  handleMedal() {
    this.setData({ isModalMedal: false, nomore: false })

    if (app.globalData.isMedalWear) {
      app.globalData.isMedalWear = false
      this.data.page = 1
      this.data.medalList = []
      this.getMedal()
    }
  },

  onPullDownRefresh() {},
  onReachBottom() {
    if (this.data.nomore) return
    this.setData({ isPullUp: true })
    this.getMedal()
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
