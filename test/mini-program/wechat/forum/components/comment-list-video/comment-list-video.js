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
    // 选择评论
    handleComment(e) {
      const { id, reply_id, rolename } = e.currentTarget.dataset.comment
      const param = {
        id,
        reply_id,
        rolename
      }
      this.triggerEvent('replychange', param)
    }
  }
})
