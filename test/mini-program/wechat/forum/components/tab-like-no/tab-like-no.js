//组件定位：支持面向点赞tab
Component({
  externalClasses: ['tabs-cls'],
  properties: {
    // 视频id
    postid: {
      type: [String, Number]
    },
    // 图标名字
    icon: {
      type: String,
      observer(newVal, oldVal, changedPath) {
        this.initImageUrl()
      }
    },
    // 文字
    text: {
      type: String
    },
    // 计数
    count: {
      type: [Number, String],
      value: '',
      observer(newVal, oldVal, changedPath) {
        const countStatus = +newVal
        this.setData({ countStatus })
      }
    },
    // 计数
    isCount: {
      type: Boolean,
      value: true
    },
    isliked: {
      type: Boolean,
      value: false,
      observer(status, oldVal, changedPath) {
        this.setData({ status}, () => {
          // console.log('tab-like-no status', status)
          this.initTextCls()
          this.initImageUrl()
        })
      }
    },
    // 排列结构：vertical(垂直)、horizontal(水平)
    mode: {
      type: String,
      value: 'horizontal'
    },
    imageWidth: {
      type: String
    },
    imageHeigth: {
      type: String
    }
  },
  data: {
    iconUrl: '', // 图标url
    style: '', // 图标宽高样式
    txtActiveCls: '', // 文本样式
    status: false, // 局部点击状态
    countStatus: 0 // 局部点赞数
  },
  
  ready() {
    this.initStyle()
  },
  methods: {
    handletab({
      currentTarget: {
        dataset: { postid }
      }
    }) {
      const { isliked, count, countStatus, status } = this.data

      if (!status) {
        this.data.status = !status
        this.setData({ countStatus: +countStatus + 1 })
        this.initImageUrl()
        this.initStyle()
        this.initTextCls()
      }
      const param = {
        postid,
        count,
        isliked: this.data.status
      }

      this.triggerEvent('change', param)
    },
    // 文本样式
    initTextCls() {
      const { status } = this.data
      let activeCls = status ? 'active' : ''
      this.setData({ txtActiveCls: activeCls })
    },
    // 初始化图标宽高
    initStyle() {
      const { imageWidth, imageHeigth } = this.data
      let style = ''
      style += imageWidth.length !== 0 ? `;width:${imageWidth}px;` : ''
      style += imageHeigth.length !== 0 ? `;width:${imageHeigth}px;` : ''
      this.setData({ style })
    },
    // 初始化 图标
    initImageUrl() {
      const { status, icon } = this.data
      let url = `../../common/images/${icon}`
      url += status ? '-active.png' : '.png'

      this.setData({ iconUrl: url })
    }
  }
})
