// const app = getApp()
const {
  getVideoDetail,
  commentVideo,
  replyVideo,
  getVideoCommentList
} = require('../../api/video')
const { stopPullDownRefresh } = require('../../utils/util')
const activeCls = 'input_btn_send_active'

Page({
  data: {
    videoid: '', // 视频id
    vid: '', // 视频vid
    selectionNum: 20,
    comment: '', // 评论文字
    commentPlaceholder: '', // 评论占位符
    btnActiveCls: '', // 发送active cls
    videoDetail: null, // 视频详情
    commentList: null, // 评论详情
    replyInfo: null, // 当前回复评论信息
    page: 1, // 页码
    isLoading: false,
    isPullUp: false, // 上拉刷新
    nomore: false, // 上拉没有更多数据
    autoFocus: false, // 自动弹出
    type: '' // 页面状态。share：分享；comment：评论
  },
  onLoad({ id, type }) {
    // console.log('=== initial 视频详情 === ')
    this.data.videoid = id
    this.setData({ type })
  },
  onReady() {},
  onShow() {
    this.getVideoInfo()
    this.getVideoComment()
    this.initPlaceholder()
  },
  onHide() {},
  onUnload() {},
  initBtnActiveCls({ detail: { value } }) {
    // console.log('=== 发送：', value)
    let btnActiveCls
    if (value.trim().length === 0) {
      btnActiveCls = ''
    } else {
      btnActiveCls = activeCls
      this.data.comment = value
    }
    this.setData({ btnActiveCls })
  },
  // 清除回复信息
  handleClearReply() {
    this.data.replyInfo = null
    this.setData({ autoFocus: false })
    this.initPlaceholder()
  },
  handleFoucs() {
    this.setData({ autoFocus: true })
  },
  // 初始化占位符
  initPlaceholder() {
    const no = '发表评论...'
    let commentPlaceholder = ''
    const replyInfo = this.data.replyInfo
    if (replyInfo) {
      commentPlaceholder = `回复${replyInfo.rolename}: `
    } else {
      commentPlaceholder = no
    }
    this.setData({ commentPlaceholder })
  },
  // 获取回复评论信息
  handleReplyComment(e) {
    this.data.replyInfo = e.detail

    this.setData({ autoFocus: true })
    this.initPlaceholder()
  },
  // 评论视频
  commentVideo() {
    const { videoid, comment } = this.data
    commentVideo({
      id: videoid,
      comment
    }).then(() => {
      this.data.page = 1
      this.data.commentList = []
      this.setData({ comment: '', autoFocus: false, nomore: false })
      this.getVideoComment()
    })
  },
  // 回复评论
  replyComment() {
    const { id, rolename } = this.data.replyInfo
    const { videoid, comment } = this.data
    replyVideo({
      id: videoid,
      replyId: id,
      comment,
      nickname: rolename
    }).then(() => {
      this.data.page = 1
      this.data.commentList = []
      this.setData({ comment: '', autoFocus: false, nomore: false })
      this.getVideoComment()
    })
  },
  // 发布评论
  handleSend(e) {
    this.data.isReply = true
    if (this.data.replyInfo) {
      this.replyComment()
    } else {
      this.commentVideo()
    }
  },
  // 控制停止
  handleEnded() {
    // console.log('=== 控制停止 ===')
  },
  // 控制暂停
  handlePause(e) {
    const { playerid } = e.currentTarget.dataset
    this.pause(playerid)
    // console.log('=== 控制暂停 ===', playerid)
  },
  // 控制播放
  handlePlay(e) {
    const { playerid } = e.currentTarget.dataset
    // console.log('=== 控制播放 ===', playerid)
    this.play(playerid)
  },
  // 初始化播放
  handleinitPlay(e) {
    const { playerid } = e.currentTarget.dataset
    const vid = this.data.videoDetail.vid

    // console.log('=== 初始化播放 ===', playerid)
    this.setData({ vid }, () => {
      this.play(playerid) // 归于setData的时差，延迟播放效果
      const timer = setTimeout(() => {
        this.play(playerid) // 实际播放
        clearTimeout(timer)
      }, 1800)
    })
  },
  // 播放
  play(el) {
    this.getElement(el).play()
  },
  // 暂停
  pause(el) {
    this.getElement(el).pause()
  },
  // 获取video元素
  getElement(el) {
    const TxvContext = requirePlugin('tencentvideo')
    return TxvContext.getTxvContext(el)
  },
  // 获取视频详情
  getVideoInfo() {
    const { videoid } = this.data
    getVideoDetail(videoid).then(videoDetail => {
      this.setData({ videoDetail })
    })
  },
  // 获取视频评论
  getVideoComment() {
    if (this.data.isLoading) return
    this.data.isLoading = true
    
    const { videoid, page } = this.data
    getVideoCommentList({
      id: videoid,
      page
    }).then(comment => {
      this.data.isLoading = false

      // 上拉数据为空时
      if (comment.length == 0) {
        this.setData({ isPullUp: false, nomore: true })
        return
      }
      const list = comment.map(v => {
        return {
          content: v.content,
          ext1: v.ext1,
          ext2: v.ext2,
          id: v.id,
          img: v.img,
          logtime: v.logtime.split(' ')[0],
          reply_id: +v.reply_id,
          rolename: v.rolename,
          uname: v.uname
        }
      })
      const commentList = list.concat(this.data.commentList)
      this.setData({ commentList, isPullUp: false })
      this.data.page++
      // console.log(commentList)
    }).catch(() => {this.data.isLoading = false})
  },
  onPullDownRefresh() {
    stopPullDownRefresh()
  },
  onReachBottom() {
    if (this.data.nomore) return
    this.setData({ isPullUp: true })
    this.getVideoComment()
  },
  onShareAppMessage() {
    const host = 'pages/video-detail/video-detail'
    const { videoDetail } = this.data
    return {
      title: videoDetail.title,
      path: `${host}?id=${videoDetail.id}&type=share`,
      imageUrl: videoDetail.cover
    }
  }
})
