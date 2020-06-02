const {
  navigateTo,
  switchTab,
  navigateToMiniProgram,
  navigateBackMiniProgram
} = require('../../../../utils/util')
const { getGameBanner } = require('../../../../api/game')

// banner type类型标识
const TYPE_MINIPROMGRAM = '1'
const TYPE_TABBAR_PAGE = '2'
const TYPE_GENERAL_PAGE = '3'

Component({
  data: {
    interval: 3000,
    duration: 500,
    current: 0,
    list: [] // banner列表
  },
  lifetimes: {
    created() {},
    ready() {}
  },
  pageLifetimes: {
    show() {
      if (!this.data.list.length) this.gameBanner()
    },
    hide() {}
  },
  methods: {
    // banner图
    gameBanner() {
      getGameBanner().then(bannerList => {
        this.setData({ list: bannerList })
      })
    },
    // 选择banner
    handleChoose({
      currentTarget: {
        dataset: { type, path, appid: appId, version }
      }
    }) {
      const url = `../${path}`
      switch (type) {
        case TYPE_GENERAL_PAGE:
          navigateTo(url)
          break
        case TYPE_TABBAR_PAGE:
          switchTab(url)
          break
        case TYPE_MINIPROMGRAM:
          navigateToMiniProgram({
            appId
          })
          break
      }
    }
  }
})
