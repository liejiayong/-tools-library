const app = getApp()
const { getVideoAll } = require('../../../api/video')
const { TYPE_VIDEOPOST_SWIPER_FLAG } = require('../../../config/newpost-config')
const {
  navigateTo,
  showToast,
  stopPullDownRefresh
} = require('../../../utils/util')

Component({
  properties: {
    searchs: {
      type: String,
      value: '搜索',
      observer(newVal, oldVal, changedPath) {
        this.handleSearch(newVal)
      }
    },
    newtabHeight: {
      type: Number,
      value: 0,
      observer(newVal, oldVal, changedPath) {}
    },
    isPullDown: {
      type: String,
      value: '1,false', // 0为页面swiper索引，false这边为是否下拉刷新
      observer(newVal, oldVal, changedPath) {
        const flagArr = newVal.split(',')
        if (
          flagArr[0] === TYPE_VIDEOPOST_SWIPER_FLAG &&
          flagArr[1] === 'true'
        ) {
          this.onPullDownRefresh()
          const flag = `1,false`
          this.triggerEvent('change', flag)
        }
      }
    }
  },
  data: {
    scrollTop: 0, // 设置竖向滚动条位置
    isLoading: false,
    isScrollTop: false, // 返回顶部按钮
    isPullUp: false, // 上拉刷新
    isEmpty: false, // 无内容
    nomore: false, // 上拉没有更多数据
    isSearch: false, // 搜索状态
    isNewtab: true, // newtab显示
    selectVideoid: 0, // 选中评论的视频id
    pageSize: 10, // 每页数量，默认为20
    keyword: '', // 关键词搜索
    page: 1, // 页码
    searchPlaceholder: '', // 搜索占位符
    videoList: [], // 推荐信息
  },
  lifetimes: {
    created() {},
    ready() {}
  },
  pageLifetimes: {
    show() {
      if (this.data.page === 1) {
        this.getVideoList()
      }
    },
    hide() {}
  },
  methods: {
    // 下拉刷新
    onPullDownRefresh() {
      if (this.data.nomore) return
      this.getVideoList()
      stopPullDownRefresh()
    },
    // 上拉刷新
    onReachBottom() {
      if (this.data.nomore) return
      this.setData({ isPullUp: true })
      this.getVideoList()
    },
    // 拉取 游戏资讯 数据
    getVideoList(page = this.data.page) {
      if (this.data.isLoading) return
      this.data.isLoading = true
      
      const { keyword, pageSize } = this.data

      getVideoAll({
        keyword,
        page,
        pageSize
      })
        .then(res => {
          this.data.isLoading = false
          const list = res.data.list
          // 为搜索且有数据则跳转页面
          if (this.data.isSearch && list.length > 0) {
            this.resetVideoList()
            return
          }

          // 上拉数据为空时
          if (list.length == 0) {
            this.setData({ isPullUp: false, nomore: true })
            // 搜索且数据为空
            if (this.data.isSearch) {
              showToast({
                title: '未找到您要搜索的内容，去看看大家都在看的内容吧！',
                icon: 'none'
              })
              this.data.isSearch = false
              this.data.keyword = ''
            }
            return
          }
          // 搜索文字
          const searchPlaceholder = res.data.search.video_search
          if (this.data.searchPlaceholder === '') {
            this.triggerEvent('placeholder', searchPlaceholder)
            this.data.searchPlaceholder = searchPlaceholder
          }

          const data = list.map(item => {
            const {
              id,
              title,
              digest,
              cover,
              praises,
              already_parise,
              views,
              comments
            } = item
            return {
              id,
              title,
              digest,
              cover,
              praises,
              already_parise,
              views,
              comments,
              vid: '',
              isplay: false
            }
          })

          let videoList = this.data.videoList.concat(data)
          this.setData({ videoList, isPullUp: false })
          this.data.isSearch = false
          this.data.page++
          // console.log('video page', searchPlaceholder)
        })
        .catch(() => {
          this.data.isLoading = false
          this.setData({ isEmpty: true, nomore: false, isPullUp: false })
        })
    },
    // 搜索
    handleSearch(detail) {
      this.data.keyword = detail
      // console.log('=== search keyword ====', detail)
      if (detail === '') this.data.isSearch = false
      else this.data.isSearch = true
      this.getVideoList(1)
    },
    // 搜索话题
    handledigestchange(e) {
      const { search } = e.detail
      const url = `../video-classify/video-classify?type=search&search=${search}`
      navigateTo(url)
    },
    // 选择评论
    handleChooseComment(e) {
      const selectVideoid = e.detail.id
      this.data.selectVideoid = selectVideoid
      const url = `../video-detail/video-detail?id=${selectVideoid}&type=comment`
      navigateTo(url)
    },
    // 重置拉取 获取视频列表
    resetVideoList() {
      // this.data.videoList = []
      if (this.data.nomore) this.setData({ nomore: false })

      const url = `../video-classify/video-classify?type=search&search=${
        this.data.keyword
      }`
      navigateTo(url).then(() => {
        this.data.isSearch = false
        this.data.keyword = ''
      })
    },
    handlePageScroll({ detail: { scrollTop } }) {
      const { isScrollTop, newtabHeight } = this.data
      if (newtabHeight < scrollTop) {
        if (!isScrollTop) this.setData({ isScrollTop: true })
      } else {
        if (isScrollTop) this.setData({ isScrollTop: false })
      }

      // newtab
      if (newtabHeight < scrollTop) {
        // this.setData({ isNewtab: false})
        this.triggerEvent('newtab', false)
      } else {
        // this.setData({ isNewtab: true})
        this.triggerEvent('newtab', true)
      }
    },
    handleScrollTop() {
      this.setData({ scrollTop: 0 })
    },
    // 分享信息
    handleShareChange({ detail: { param } }) {
      this.triggerEvent('sharechange', param)
    }
  }
})
