const app = getApp()
const { getGameList } = require('../../../api/game')
const { gameOrder } = require('../../../config/config')
const { TYPE_GAMEPOST_SWIPER_FLAG } = require('../../../config/newpost-config')
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
      value: '0,false', // 0为页面swiper索引，false这边为是否下拉刷新
      observer(newVal, oldVal, changedPath) {
        const flagArr = newVal.split(',')
        if (flagArr[0] === TYPE_GAMEPOST_SWIPER_FLAG && flagArr[1] === 'true') {
          this.onPullDownRefresh()
          const flag = `0,false`
          this.triggerEvent('change', flag)
          // console.log(111, newVal, flagArr[0], TYPE_GAMEPOST_SWIPER_FLAG)
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
    pageSize: 10, // 每页数量，默认为20
    keyword: '', // 关键词搜索
    page: 1, // 页码
    searchPlaceholder: '', // 搜索占位符
    recommendList: [] // 推荐信息
  },
  lifetimes: {
    created() {},
    ready() {}
  },
  pageLifetimes: {
    show() {
      if (this.data.page === 1) {
        this.getGameInfo()
      }
    },
    hide() {}
  },
  methods: {
    // 下拉刷新
    onPullDownRefresh() {
      if (this.data.nomore) return
      this.getGameInfo()
      stopPullDownRefresh()
    },
    // 上拉刷新
    onReachBottom() {
      if (this.data.nomore) return
      this.setData({ isPullUp: true })
      this.getGameInfo()
    },
    // 拉取 游戏资讯 数据
    getGameInfo(page = this.data.page) {
      if (this.data.isLoading) return
      this.data.isLoading = true

      const { keyword, pageSize } = this.data

      getGameList({
        keyword,
        page,
        pageSize
      })
        .then(res => {
          this.data.isLoading = false
          const list = res.list
          // 为搜索且有数据则跳转页面
          if (this.data.isSearch && list.length > 0) {
            this.resetGameInfo()
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
          const search = res.search
          const data = list.map((v, i) => {
            const time = v.update_time.split(' ')[0]
            return {
              id: v.id,
              title: v.title,
              digest: v.digest,
              thumb_url: v.thumb_url,
              app_name: v.app_name,
              app_id: v.app_id,
              update_time: time
            }
          })
          gameOrder.forEach(val => {
            data.forEach(v => {
              if (val.name === v.app_name) {
                if (val.rename !== '') v.app_name = val.rename
              }
            })
          })
          // 搜索文字
          const searchPlaceholder = search.news_search
          if (this.data.searchPlaceholder === '') {
            this.triggerEvent('placeholder', searchPlaceholder)
            this.data.searchPlaceholder = searchPlaceholder
          }

          let recommendList = this.data.recommendList.concat(data)
          this.setData({ recommendList, isPullUp: false })
          this.data.isSearch = false
          this.data.page++
          // console.log("game page", )
        })
        .catch(err => {
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
      this.getGameInfo(1)
    },
    // 选择话题
    handleSearchChange(e) {
      const { app_id, app_name } = e.detail
      const url = `../game-post-classify/game-post-classify?type=app&id=${app_id}&name=${app_name}`
      navigateTo(url)
    },
    // 重置拉取 游戏资讯 数据
    resetGameInfo() {
      if (this.data.nomore) this.setData({ nomore: false })

      const url = `../game-post-classify/game-post-classify?type=search&search=${
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
      // console.log(scrollTop, '============')
      
      /**
       * 用于操作newtab动画显示-隐藏
       */
      // if (newtabHeight < scrollTop) {
      //   // this.setData({ isNewtab: false})
      //   this.triggerEvent('newtab', false)
      // } else {
      //   // this.setData({ isNewtab: true})
      //   this.triggerEvent('newtab', true)
      // }
    },
    handleScrollTop() {
      this.setData({ scrollTop: 0})
    }
  }
})
