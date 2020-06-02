const {
  navigateTo,
  switchTab,
  navigateToMiniProgram,
  navigateBackMiniProgram
} = require('../../../utils/util')

// banner type类型标识
const TYPE_MINIPROMGRAM = '1'
const TYPE_TABBAR_PAGE = '2'
const TYPE_GENERAL_PAGE = '3'

Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer(newVal, oldVal, changedPath) {}
    }
  },
  data: {
    interval: 3000,
    duration: 500,
    current: 0
  },
  methods: {
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
