Component({
  properties: {
    list: {
      type: Array,
      observer(newVal, oldVal, changedPath) {}
    },
    mode: {
      type: String,
      value: 'aspectFill',
      observer(newVal, oldVal, changedPath) {}
    },
    showApp: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal, changedPath) {}
    }
  },
  data: {},
  methods: {
    // 搜索话题
    handleSearch({
      currentTarget: {
        dataset: {
          search: { app_id, app_name }
        }
      }
    }) {
      const param = {
        app_id,
        app_name
      }
      this.triggerEvent('searchchange', param)
    }
  }
})
