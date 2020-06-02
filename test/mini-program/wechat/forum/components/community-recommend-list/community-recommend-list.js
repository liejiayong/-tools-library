const { groupConfig } = require('../../config/config')
const { getGroupName } = require('../../utils/util')

Component({
  properties: {
    list: {
      type: Array,
      observer(newVal) {
        this.checker(newVal)
      }
    },
    showApp: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal, changedPath) {}
    }
  },
  data: {
    lists: []
  },
  methods: {
    checker(list) {
      if (list.length == 0) return
      list.forEach(item => {
        if (item.source_name == '')
          item.source_name = getGroupName(item.source_id, groupConfig)
      })
      this.setData({ lists: list })
    }
  }
})
