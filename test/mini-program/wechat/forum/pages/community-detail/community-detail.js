const app = getApp()
const { levelConfig, shareTitle } = require('../../config/config')
const { TYPE_USER_ID } = require('../../config/constant-config')
const { TYPE_POPUP_OPORATION_COPY, TYPE_POPUP_OPORATION_REPLY, TYPE_POPUP_OPORATION_DELETE } = require('../../config/modal-popup-config')
const {
  navigateTo,
  hideLoading,
  showLoading,
  showShareMenu,
  setClipboardData,
  showToast,
  getStorageSync
} = require('../../utils/util')
const {
  delComment,
  replyPostMsg,
  getCommunityDetailCommentList,
  getCommunityDetail
} = require('../../api/community')

Page({
  data: {
    levelCls: '',
    levelImg: '',
    postId: -1,
    postInfo: null, // 帖子信息
    commentList: [], // 评论列表
    page: 1, // 页码
    pageSize: 10, // 每页数量，默认为20
    nomore: false, // 上拉没有更多数据
    commentLoading: true, // 上拉loading
    isEmpty: false,
    // commentTab组件参数
    commentTabInfo: {
      isCollect: false,
      isLiked: false,
      isDel: false,
      likeCount: 0,
      replyCount: 0
    },
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
  onLoad(options) {
    const { id, type } = options
    // console.log('=== 热帖详情 ===', )
    const postId = (this.data.postId = +id)
    const _typeshare = type === 'share' ? 'share' : ''
    this.setData({ postId, type: _typeshare })
    showShareMenu()
  },
  onReady() {
    const { postId } = this.data
    this.getDetail(postId)
    this.getCommentList(postId)
  },
  // 清除回复信息
  handleClearReply() {
    this.data.replyInfo = {
      isLevelReply: false
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
  // 关闭弹窗
  handleClosePopup() {
    this.setData({ isPopupShow: false })
  },
  // 选择弹窗操作
  handleSelectPopup({ detail: { type } }) {
    const { replyInfo, commentPlaceholder } = this.data
    const { businessId, postId } = replyInfo
    // console.log(replyInfo, postId)
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
        const url = `../community-detail/input-reply-comment/input-reply-comment?placeholder=${commentPlaceholder}&businessid=${businessId}&replyid=${postId}`
        navigateTo(url).then(() => {
          this.setData({ isPopupShow: false })
        })
        break
      case TYPE_POPUP_OPORATION_DELETE:
        delComment(postId).then(() => {
          this.setData({ isPopupShow: false })
          this.data.page = 1
          this.data.commentList = []
          this.getCommentList()
        })
        break
    }
  },
  // 获取回复评论信息
  handleReplyComment({ detail }) {
    this.data.replyInfo = detail
    this.data.replyInfo.isLevelReply = true
    this.initPlaceholder()

    // 判断能否删除评论
    const isPopupDelAction = detail.actions === 1
    this.setData({ isPopupShow: true, isPopupDelAction })
  },
  // 跳转到更多评论页面
  handleshowmore({ detail }) {
    const { postId } = this.data
    const url = `../community-detail/community-comment-info/community-comment-info?id=${detail}&postid=${postId}`
    navigateTo(url)
  },
  // 回复评论
  replyComment() {
    const { commentTxt: content, replyInfo } = this.data
    // console.log(replyInfo)
    const { userId, businessId, postId } = replyInfo
    replyPostMsg({
      businessId,
      content,
      replyId: postId
    }).then(() => {
      const { postId } = this.data
      this.data.page = 1
      this.data.commentList = []
      this.getCommentList(postId)
      // this.getDetail(postId)
      this.handleClearReply()
    })
  },
  // 发布评论
  handleSend({ detail: { txt } }) {
    this.data.commentTxt = txt
    // console.log('=== 发送：', txt)

    this.replyComment()
  },
  // 获取热帖推荐 评论列表信息
  getCommentList(businessId = this.data.postId) {
    const { page, pageSize } = this.data
    getCommunityDetailCommentList({
      businessId,
      page,
      pageSize
    })
      .then(list => {
        const data = list.map((v, i) => {
          return {
            id: v.id,
            business_id: v.business_id,
            user_id: v.user_id,
            nickname: v.nickname,
            avatar: v.avatar,
            nickname: v.nickname,
            is_liked: v.is_liked,
            likes: v.likes,
            content: v.content,
            images: v.images,
            // level: v.level,
            reply_id: v.reply_id,
            replys: v.replys,
            child_reply: v.child_reply,
            reply_limit: +v.reply_limit,
            actions: v.actions,
            medal_icon:v.medal_icon,
            time: v.time.split(' ')[0]
          }
        })

        if (data.length == 0) {
          this.setData({ commentLoading: false })

          const { commentList } = this.data
          if (commentList.length) {
            this.setData({ isEmpty: false, nomore: true })
          } else {
            this.setData({ isEmpty: true, nomore: false })
          }
          return
        }
        let commentList = this.data.commentList.concat(data)
        this.setData({ commentList })
        // console.log(commentList)
      })
      .catch(() => {
        this.setData({
          isEmpty: true,
          nomore: false,
          commentLoading: false
        })
      })
  },
  // 获取热帖推荐详情信息
  getDetail(postId) {
    showLoading({ title: '加载中', mask: true })
    getCommunityDetail(postId).then(data => {
      const commentTabInfo = {}
      commentTabInfo.isLiked = data.is_liked == 1
      commentTabInfo.isCollect = data.is_collected == 1
      commentTabInfo.isDel = data.user_id == getStorageSync(TYPE_USER_ID)
      commentTabInfo.likeCount = data.likes
      commentTabInfo.replyCount = data.comments
      // console.log('page uid', getStorageSync(TYPE_USER_ID), data.user_id == getStorageSync(TYPE_USER_ID))
      this.setData({ postInfo: data, commentTabInfo }, () => { hideLoading() })
    }).catch(() => {
      hideLoading()
    })
  },
  // 底部下拉
  handleLower() {
    const { nomore, postId } = this.data
    if (nomore) return
    this.setData({ commentLoading: true })
    ++this.data.page
    this.getCommentList(postId)
  },
  // 移动到评论区
  scrollToComment() {
    const scrollIntoView = 'JyComment'
    this.setData({ scrollIntoView })
  },
  // 评论列表 触发的评论
  handleCommentTo({ detail: { businessId, nickname, postId }}) {
    this.data.isSendMsg = true
    const url = `../community-detail/input-reply-comment/input-reply-comment?placeholder=回复${nickname}&businessid=${businessId}&replyid=${postId}`
    navigateTo(url)
  },
  // 评论
  handleComment() {
    this.scrollToComment()

    const { postId } = this.data
    const replyInfo = this.data.replyInfo = {
      isLevelReply: false,
      businessId: postId,
      userId: 0
    }

    this.initPlaceholder()

    const { commentPlaceholder } = this.data
    const {  businessId } = replyInfo
    this.data.isSendMsg = true
    const url = `../community-detail/input-reply-comment/input-reply-comment?placeholder=${commentPlaceholder}&businessid=${businessId}&replyid=0`
    navigateTo(url)
  },
  initLevel(level) {
    // 超过10级为MAX
    if (level > 10) level = 'MAX'
    const currCls = this.getLevelCls(level)
    this.setData({ levelCls: currCls })
    const currImg = this.getLevelImg(level)
    this.setData({ levelImg: currImg })
  },
  getLevelImg(level) {
    return `../../common/images/LV${level}@2x.png`
  },
  // 获取 等级图标 类
  getLevelCls(level) {
    const count = levelConfig.count
    const cls = levelConfig.cls
    let index = count.findIndex(cur => {
      return level === cur
    })
    index = index < 0 ? 0 : index
    return cls[index]
  },
  onShow() {
    if (!this.data.isSendMsg) return
    // console.log(this.data.isSendMsg, 'from post-msg')
    this.data.isSendMsg = false
    this.data.nomore = false
    this.data.page = 1
    this.data.commentList = []
    const { postId } = this.data
    this.getCommentList(postId)
  },
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage(opt) {
    const currPage = getCurrentPages()
    const host = currPage[currPage.length - 1].route

    // 标题
    const titIndex = (Math.random() * 3) | 0
    const title = shareTitle[titIndex]

    return {
      title,
      path: `${host}?id=${this.data.postInfo.id}&type=share`
      // imageUrl: '../../common/images/share-img.jpg'
    }
  }
})
