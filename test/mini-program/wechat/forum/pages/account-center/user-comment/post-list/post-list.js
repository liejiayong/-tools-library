const { replyPostMsg } = require('../../../../api/community')
const { navigateTo } = require('../../../../utils/util')

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
    handleComment({ currentTarget: { dataset: { comment:{ nickname }, bussinessid }}}) {
      // console.log(comment, bussinessid)
      const url = `/pages/community-detail/input-reply-comment/input-reply-comment?placeholder=回复${nickname}&businessid=${bussinessid}&replyid=0`
      navigateTo(url)
    }
  }
})
