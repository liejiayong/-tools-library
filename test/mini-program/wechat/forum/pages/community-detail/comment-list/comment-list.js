Component({
  externalClasses: ['comment-cls', 'comment-hover'],
  properties: {
    list: {
      type: Array,
      observer(newVal, oldVal, changedPath) {
      }
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
    },
    // icon comment to comment page
    handleCommentto({
      currentTarget: {
        dataset: { comment, bussinessid }
      }
    }) {
      const {
        id: postId, // 帖子id
        user_id: userId,
        reply_id: replyId,
        nickname,
        content,
        actions
      } = comment
      // console.log(comment)
      const param = {
        businessId: bussinessid,
        postId,
        userId,
        replyId,
        nickname,
        content,
        actions
      }
      this.triggerEvent('comment', param)      
    },
    // 选择评论
    handleComment({
      currentTarget: {
        dataset: { comment, bussinessid }
      }
    }) {
      const {
        id: postId, // 帖子id
        user_id: userId,
        reply_id: replyId,
        nickname,
        content,
        actions
      } = comment
      // console.log(comment)
      const param = {
        businessId: bussinessid,
        postId,
        userId,
        replyId,
        nickname,
        content,
        actions
      }
      this.triggerEvent('replychange', param)
    }
  }
})
