const { praisePost } = require('../../../api/community')

Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer(newVal, oldVal, changePath) {}
    },
    isOporate: {
      type: Boolean,
      value: true,
      observer(newVal, oldVal, changePath) {
      }
    }
  },
  data: {
  },
  methods: {
    // 操作帖子
    handleOporation({ currentTarget: { dataset: { postid }}}) {
      this.triggerEvent('oporation', postid)
    },
    // 点赞
    handleLike({ detail: { postid, isliked }}) {
      // console.log('dianzan', isliked, postid)
      if (isliked) {
        praisePost(postid)
      }
    }
  }
})
