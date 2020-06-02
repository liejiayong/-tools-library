// const app = getApp()
const TxvContext = requirePlugin('tencentvideo')
const { getVideoDetail, unpraiseVideo, praiseVideo } = require('../../api/video')
const { showToast } = require('../../utils/util')

Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer(newVal, oldVal, changedPath) { }
    }
  },
  data: {
    currentPlayerid: '' // 当前播放 视频id
  },
  lifetimes: {
    created() { },
    ready() { }
  },
  pageLifetimes: {
    hide() {
      if(!this.data.currentPlayerid) return
      this.pause(this.data.currentPlayerid)
    }
  },
  methods: {
    // 搜索话题
    handleSearch({
      currentTarget: {
        dataset: { search }
      }
    }) {
      this.triggerEvent('digestchange', { search })
    },
    // 选择评论
    hanlleComment({
      currentTarget: {
        dataset: { id }
      }
    }) {
      this.triggerEvent('commentchange', { id })
    },
    // 分享
    handleShare({
      currentTarget: {
        dataset: { video: param }
      }
    }) {
      this.triggerEvent('sharechange', { param })
    },
    // 点赞
    handleLike({ detail: { postid, isliked } }) {
      if (isliked) {
        praiseVideo(postid).then(() => {
          this.triggerEvent('likechange')
        })
      } else {
        unpraiseVideo(postid).then(() => {
          this.triggerEvent('likechange')
        })
      }
    },
    // 控制暂停
    handlePause({
      currentTarget: {
        dataset: { playerid }
      }
    }) {
      this.pause(playerid)
    },
    // 控制播放
    handlePlay({
      currentTarget: {
        dataset: { playerid }
      }
    }) {
      this.data.currentPlayerid = playerid
    },
    // 初始化播放
    handleinitPlay({
      currentTarget: {
        dataset: { id }
      }
    }) {
      getVideoDetail(id).then(({ vid }) => {
        this.data.list.forEach(item => {
          if (item.id == id) {
            item.vid = vid
            this.data.currentPlayerid = vid
          }
        })
        this.setData({ list: this.data.list })
      })
    },
    // 播放
    play(el) {
      TxvContext.getTxvContext(el).play()
    },
    // 暂停
    pause(el) {
      TxvContext.getTxvContext(el).pause()
    }
  }
})
