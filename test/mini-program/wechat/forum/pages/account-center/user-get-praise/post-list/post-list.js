Component({
  externalClasses: ['comment-cls', 'comment-hover'],
  properties: {
    list: {
      type: Array,
      observer(newVal, oldVal, changedPath) {}
    },
    nocomment: {
      type: String,
      value: '暂无评论，还不快抢沙发',
      observer(newVal, oldVal, changedPath) {}
    }
  },
  data: {},
  methods: {
    handleShowMore({ currentTarget: { dataset: { replyid } }}) {
      this.triggerEvent('showmore', replyid)
    }
  }
})
