const app = getApp()
const { videoListUrl } = require('../../../api/config')
const { SESSION_ID, commentStatus } = require('../../../config/config')
const { getStorageSync, navigateTo, pageScrollTo, stopPullDownRefresh, showToast, showShareMenu, forof, getRandom } = require('../../../utils/util')

Component({
  properties: {
    ismodal: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal, changedPath) {}
    },
    videoid: {
      type: String,
      value: '',
      observer(newVal, oldVal, changedPath) {
        this.data.page = 1
        const commentList = []
        const replyInfo = null
        this.setData({ commentList, replyInfo }, () => {
          this.initPlaceholder()
        })
        this.getVideoComment()
      }
    }
  },
  data: {
    isLoading: false,
    isReply: false, // 回复状态.true:回复
    isPullUp: false, // 上拉刷新
    isEmpty: false, // 无内容
    nomore: false, // 上拉没有更多数据
    count: 0, // 评论说
    page: 1, // 页码
    commentList: [], // 评论列表
    replyInfo: null, // 当前回复评论信息
    selectionNum: 20,
    comment: '', // 评论文字
    commentPlaceholder: '', // 评论占位符
    animationData: null // 评论动画数据
  },
  // 组件所在页面的生命周期函数
  pageLifetimes: {
    show() {
      // console.log('=== ready comment modal:')
      this.data.page = 1
      const commentList = []
      const replyInfo = null
      this.setData({ commentList, replyInfo }, () => {
        this.initPlaceholder()
      })
      this.getVideoComment()
    }
  },
  methods: {
    createAnimation(top) {
      var animation = wx.createAnimation({
        duration: 0
      })
      
      this.animation = animation
      
      animation.top(top).step()
      
      this.setData({
        animationData:animation.export()
      })
    },
    // 评论框聚焦
    handleFoucs() {
      const top = commentStatus.focus
      this.createAnimation(top)
    },
    // 发布评论
    handleSend(e) {
      const comment = e.detail.value
      this.data.comment = comment
      // console.log('=== 发送：', comment, this.data.replyInfo)

      this.data.isReply = true
      if (this.data.replyInfo) {
        this.replyComment()
      } else {
        this.commentVideo()
      }
      const top = commentStatus.common
      this.createAnimation(top)
    },
    // 滚动到底部
    handleScrolltolower() {
      if (this.data.nomore) return
      this.setData({ isPullUp: true })
      this.data.isReply = false
      this.getVideoComment()
    },
    // 获取回复评论信息
    handleReplyComment(e) {
      this.data.replyInfo = e.detail
      this.initPlaceholder()
    },
    // 关闭弹窗
    handleClose() {
      this.data.replyInfo = null
      this.data.page = 1
      const commentList = []
      const top = commentStatus.common
      this.createAnimation(top)
      this.initPlaceholder()
      this.setData({ commentList })
      this.triggerEvent('change', false)
    },
    // 初始化占位符
    initPlaceholder() {
      const no = '发表评论...'
      let commentPlaceholder = ''
      const replyInfo = this.data.replyInfo
      if (replyInfo) {
        commentPlaceholder = `回复${replyInfo.rolename}`
      } else {
        commentPlaceholder = no
      }
      this.setData({ commentPlaceholder })
    },
    // 获取视频评论
    getVideoComment() {
      if (this.data.isLoading) return
      this.data.isLoading = true

      const { videoid, page } = this.data
      app
        .post(videoListUrl, {
          a: 'get_video_comment',
          id: videoid,
          page: page
        })
        .then(res => {
          this.data.isLoading = false
          if (res.data.code === 0) {
            const list = res.data.data.comment
            // 上拉数据为空时
            if (list.length == 0) {
              this.setData({ isPullUp: false, nomore: true })
              return
            }
            const count = list.length
            const commentList = this.data.commentList.concat(list)
            this.setData({ commentList, count, isPullUp: false })
            if (!this.data.isReply) this.data.page++
          }
        })
        .catch(err => {
          this.data.isLoading = false
          console.log('=== 获取视频评论失败: ' + err)
        })
    },
    // 评论视频
    commentVideo() {
      const { videoid, comment } = this.data

      app
        .post(videoListUrl, {
          a: 'comment_video',
          id: videoid,
          comment,
          phpsessid: getStorageSync(SESSION_ID)
        })
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            showToast({
              title: data.msg
            })
            this.setData({ comment: ''})
            this.getVideoComment()
          } else if (res.data.code === 3) {
            const url = '../../login/login'
            navigateTo(url)
          }
        })
        .catch(err => {
          console.log('=== 回复评论失败: ' + err)
        })
    },
    // 回复评论
    replyComment() {
      const { id, reply_id, rolename } = this.data.replyInfo
      const { videoid, comment } = this.data

      app
        .post(videoListUrl, {
          a: 're_comment',
          id: videoid,
          reply_id: id,
          o_nickname: rolename,
          comment,
          phpsessid: getStorageSync(SESSION_ID)
        })
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            showToast({
              title: data.msg
            })
            this.setData({ comment: ''})
            this.getVideoComment()
          } else if (res.data.code === 3) {
            const url = '../../login/login'
            navigateTo(url)
          }
        })
        .catch(err => {
          console.log('=== 回复评论失败: ' + err)
        })
    }
  }
})
