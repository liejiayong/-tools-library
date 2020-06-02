Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer(newVal, oldVal, changPath) {
      }
    }
  },
  data: {},
  methods: {
    handleSelect({ currentTarget: { dataset: {type}}}) {
      this.triggerEvent('select', type)
    }
  }
})
