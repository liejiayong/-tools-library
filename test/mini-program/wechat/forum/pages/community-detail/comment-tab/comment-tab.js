const { forumTabConfig, TYPE_CONFIG_COMMUNITY_DETAIL_TAB_REPLY, TYPE_CONFIG_COMMUNITY_DETAIL_TAB_MORE, TYPE_CONFIG_COMMUNITY_DETAIL_TAB_DELETE, TYPE_CONFIG_COMMUNITY_DETAIL_TAB_COLLECTION, TYPE_CONFIG_COMMUNITY_DETAIL_TAB_PACKUP } = require('../../../config/community-config')
const { TYPE_CONFIT_PLAT_SYS_INFO } = require("../../../config/constant-config")
const { praisePost, delPost, collectAdd, collectCancel } = require('../../../api/community')
const { showModal, navigateBack, getStorageSync } = require('../../../utils/util')

Component({
  externalClasses: ['tabs-cls'],
  properties: {
    postid: {
      type: [String, Number]
    },
    commentInfo: {
      type: Object,
      observer(newVal, oldVal, changePath) {
        this.initialCommentInfo(this.data.forumTabConfig, newVal)
        // console.log(this.data.forumTabConfig, newVal)
      }
    }
  },
  data: {
    screenXCls: '', // 是否iphone x 大屏
    forumTabConfig,
    tabsAnimate: null // tabs展示动画
  },
  lifetimes: {
    created() { },
    ready() {
      /**
       * 这里主要判断小程序在iphone x大屏中，
       * home键有个静态模块的情况，
       * 为了避免自定义组件兼容性。
       * 这里主要是
       * model: "iPhone X"
       */
      const sysInfo = getStorageSync(TYPE_CONFIT_PLAT_SYS_INFO)
      const isScreenX = sysInfo.model == 'iPhone X'
      const screenXCls = isScreenX ? 'screenXCls' : ''
      this.setData({ screenXCls })
    }
  },
  pageLifetimes: {
    show() { },
    hide() { }
  },
  methods: {
    // 点赞
    handleLike({ detail: { count, postid, isliked } }) {
      praisePost(postid)
    },
    // 收藏
    handleCollect() {
      const { postid, forumTabConfig } = this.data
      const { isCollect } = forumTabConfig[TYPE_CONFIG_COMMUNITY_DETAIL_TAB_COLLECTION]

      if (isCollect) {
        collectCancel(postid).then(() => {
          this.data.forumTabConfig[TYPE_CONFIG_COMMUNITY_DETAIL_TAB_COLLECTION].isCollect = false
          this.setData({ forumTabConfig: this.data.forumTabConfig })
        })
      } else {
        collectAdd(postid).then(() => {
          this.data.forumTabConfig[TYPE_CONFIG_COMMUNITY_DETAIL_TAB_COLLECTION].isCollect = true
          this.setData({ forumTabConfig: this.data.forumTabConfig })
        })
      }
    },
    // 分享
    handleShare() { },
    handleTab({ detail, currentTarget: { dataset: { type } } }) {
      const { postid } = this.data
      // console.log(type, postid, detail)
      switch (type) {
        // 评论
        case TYPE_CONFIG_COMMUNITY_DETAIL_TAB_REPLY:
          this.triggerEvent('comment')
          break
        // 更多
        case TYPE_CONFIG_COMMUNITY_DETAIL_TAB_MORE:
          this.data.forumTabConfig[TYPE_CONFIG_COMMUNITY_DETAIL_TAB_MORE].isMore = detail
          this.setData({ forumTabConfig: this.data.forumTabConfig })
          if (!detail) {
            this.showMore()
          } else {
            this.hideMore()
          }
          break
        // 删除
        case TYPE_CONFIG_COMMUNITY_DETAIL_TAB_DELETE:
          showModal({ title: '确定删除此内容吗？' }).then(({ confirm, cancel }) => { if (confirm) delPost(postid).then(() => { navigateBack(1, 3000) }) })
          break
        // 收起
        case TYPE_CONFIG_COMMUNITY_DETAIL_TAB_PACKUP:
          this.hideMore()
          break
        default:
      }
    },
    // 点击查看更多
    showMore() {
      const tabsAnimation = wx.createAnimation({ duration: 300 })
      const tabsAnimate = tabsAnimation
        .translateY('0')
        .step()
        .export()
      this.setData({ tabsAnimate })
    },
    // 点击收起
    hideMore() {
      const tabsAnimation = wx.createAnimation({ duration: 300 })
      const tabsAnimate = tabsAnimation
        .translateY('50%')
        .step()
        .export()
      this.setData({ tabsAnimate })
    },
    initialCommentInfo(target = [], src = {}) {
      if (target.length === 0) return
      target.forEach(t => {
        if (t.name === 'likeCount' && src[t.name]) t['isLiked'] = src['isLiked']
        if (t.name === 'likeCount' && src[t.name]) t['count'] = src['likeCount']
        if (t.name === 'replyCount' && src[t.name]) t['count'] = src['replyCount']
        if (t.name === 'delete' && src['isDel']) t['isDel'] = src['isDel']
        if (t.name === 'collection' && src['isCollect']) t['isCollect'] = src['isCollect']
      })
      // console.log(target, '=-=-=-=-=', src)
      this.setData({ forumTabConfig: target })
    }
  }
})
