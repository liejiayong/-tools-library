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
  ready() {},
  methods: {
    handleSelect({
      currentTarget: {
        dataset: { id, name }
      }
    }) {
      this.triggerEvent('change', { id, name })
    }
  }
})
