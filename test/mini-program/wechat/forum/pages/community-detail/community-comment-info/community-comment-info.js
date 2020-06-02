// const app = getApp()
const { levelConfig, tabConfig, shareTitle } = require('../../../config/config')
const { TYPE_POPUP_OPORATION_COPY, TYPE_POPUP_OPORATION_REPLY, TYPE_POPUP_OPORATION_DELETE } = require('../../../config/modal-popup-config')
const {
  switchTab,
  navigateBack,
  showShareMenu,
  navigateTo,
  setClipboardData,
  showToast
} = require('../../../utils/util')
const {
  getCommunityCommentDetailInfo,
  replyPostMsg,
  delComment,
} = require('../../../api/community')

Page({
  data: {
    postId: -1,
    commentId: -1,
    postInfo: null, // 帖子信息
    commentList: [],
    page: 1, // 页码
    pageSize: 10, // 每页数量，默认为20
    commentNomore: false, // 上拉没有更多数据
    commentLoading: false, // 上拉loading
    isEmpty: false,
    scrollIntoView: '',
    type: '', // 页面类型。type=share为分享页面， type=‘’为正常页面
    replyInfo: {
      isLevelReply: false // 一级评论
    }, // 当前回复评论信息
    commentTxt: '', // 评论文字
    commentPlaceholder: '', // 评论占位符
    isSendMsg: false, // 进入发帖标识
    isPopupShow: false, // popup flag
    isPopupDelAction: false // 可删除
  },
  onLoad({ id, type, postid }) {
    this.data.postId = +postid
    this.data.commentId = +id
    const _typeshare = type === 'share' ? 'share' : ''
    this.setData({ type: _typeshare })
    showShareMenu()
    
    // test
    // test
    // this.data.commentId = 317594
  },
  onReady() {
    this.getCommentList()
    this.initPlaceholder()
  },
  onShow() {
    if (!this.data.isSendMsg) return
    this.data.isSendMsg = false
    this.data.commentNomore = false
    this.data.page = 1
    this.data.commentList = []
    this.getCommentList()
  },
  onHide() {},
  onUnload() {},
  // 获取热帖推荐 评论列表信息
  getCommentList() {
    const { commentId, page, pageSize } = this.data
    getCommunityCommentDetailInfo({
      id: commentId,
      page,
      pageSize
    })
      .then(({ info: postInfo, list }) => {
        // 帖子信息
        if (!this.data.postInfo) {
          this.data.replyInfo.id = postInfo.id
          this.setData({ postInfo })
        }
        // 评论列表
        if (list.length == 0) {
          this.setData({
            isEmpty: true,
            commentNomore: true,
            commentLoading: false
          })
          return
        }

        let commentList = this.data.commentList.concat(list)
        this.setData({ commentList })
      })
      .catch(() => {
        this.setData({
          isEmpty: true,
          commentNomore: true,
          commentLoading: false
        })
      })
  },
  // 关闭弹窗
  handleClosePopup() {
    this.setData({ isPopupShow: false })
  },
  // 选择弹窗操作
  handleSelectPopup({ detail: { type } }) {
    const { replyInfo, commentPlaceholder } = this.data
    const { business_id: businessId, id: postId } = replyInfo
    switch(type) {
      case TYPE_POPUP_OPORATION_COPY:
        setClipboardData(replyInfo.content).then(res => {
          this.setData({ isPopupShow: false })
          const msg = `已复制${replyInfo.nickname}成功`
          showToast({ title: msg })
        }).catch(err => {
          showToast({ title: '您的微信版本不兼容，请更新到最新版本吧！' })
        })
        break
        case TYPE_POPUP_OPORATION_REPLY:
        this.data.isSendMsg = true
        const url = `../../community-detail/input-reply-comment/input-reply-comment?placeholder=${commentPlaceholder}&businessid=${businessId}&replyid=${postId}`
        navigateTo(url).then(() => {
          this.setData({ isPopupShow: false })
        })
        break
        case TYPE_POPUP_OPORATION_DELETE:
        delComment(postId).then(() => {
          this.setData({ isPopupShow: false })
          this.data.isSendMsg = true
          this.getCommentList()
        })
        break
    }
  },
  // 获取回复评论信息
  handleReplyComment({
    currentTarget: {
      dataset: { reply }
    }
  }) {
    // console.log(reply)
    this.data.replyInfo = reply
    this.data.replyInfo.isLevelReply = true

    this.initPlaceholder()

    // 判断能否删除评论
    const isPopupDelAction = reply.actions === 1

    this.setData({ isPopupShow: true, isPopupDelAction })
  },
  // 清除回复信息
  handleClearReply() {
    const { id } = this.data.postInfo
    this.data.replyInfo = {
      isLevelReply: false,
      id
    }
    this.initPlaceholder()
  },
  // 初始化占位符
  initPlaceholder() {
    const no = '发表评论...'
    let commentPlaceholder = ''
    const { replyInfo } = this.data
    if (replyInfo.isLevelReply) {
      commentPlaceholder = `回复${replyInfo.nickname}: `
    } else {
      commentPlaceholder = no
    }
    this.setData({ commentPlaceholder })
  },
  // 底部下拉
  handleLower() {
    const { commentNomore } = this.data
    if (commentNomore) return
    this.setData({ commentLoading: true })
    ++this.data.page
    this.getCommentList()
  },
  // 返回帖子
  handleGoback() {
    const { postId, commentId } = this.data
    const url = `../../community-detail/community-detail?id=${postId}&type=share`
    navigateTo(url)
  },
  // 回到首页
  handleGoHome() {
    const url = '../../game-post/game-post'
    switchTab(url)
  },
  // 上拉
  onReachBottom() {
    this.handleLower()
  },
  onShareAppMessage() {
    const currPage = getCurrentPages()
    const host = currPage[currPage.length - 1].route

    // 标题
    const titIndex = (Math.random() * 3) | 0
    const title = shareTitle[titIndex]
    const { postId, commentId } = this.data

    return {
      title,
      path: `${host}?id=${commentId}&postid=${postId}&type=share`
      // imageUrl: '../../../common/images/share-img.jpg'
    }
  }
})
