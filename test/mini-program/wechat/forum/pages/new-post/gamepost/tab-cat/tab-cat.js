const { getOfficialTabList } = require('../../../../api/game')
const { navigateTo } = require('../../../../utils/util')

Component({
  data: {
    list: []
  },
  lifetimes: {
    created() {},
    ready() {}
  },
  pageLifetimes: {
    show() {
      if (!this.data.list.length) this.getOfficialInfo()
    },
    hide() {}
  },
  methods: {
    // 获取公众号列表
    getOfficialInfo() {
      getOfficialTabList().then(officialList => {
        this.setData({ list: officialList })
      })
    },
    handleSelect({
      currentTarget: {
        dataset: { id, name }
      }
    }) {
      const url = `../game-post-classify/game-post-classify?type=app&id=${id}&name=${name}`
      navigateTo(url)
    }
  }
})
