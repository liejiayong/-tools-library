const { navigateTo } = require('../../../utils/util')

Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer(newVal, oldVal, changedPath) {}
    }
  },
  data: {
    list: []
  },
  lifetimes: {
    created() {},
    ready() {}
  },
  pageLifetimes: {
    show() {},
    hide() {}
  },
  methods: {
    // 选择社区
    handleSelect({
      currentTarget: {
        dataset: { id, name }
      }
    }) {
      this.triggerEvent('change', { id, name })
    },
    // 选择更多
    handleMore() {
      const url = `../community-tab-classify/community-tab-classify`
      navigateTo(url)
    }
  }
})
