// 组件定位：普通展示型tab,专注于展示（更多-收起）,允许修改图标宽高，选中状态
const iconMore = '../../common/images/icon-more-black.png'
const iconPackup = '../../common/images/icon-packup-black.png'

Component({
  externalClasses: ['tabs-cls'],
  properties: {
    // 图标more
    imore: {
      type: Array,
      observer(newVal, oldVal, changedPath) {
        this.data.iconMore = newVal
      }
    },
    // 图标packup
    ipackup: {
      type: Array,
      observer(newVal, oldVal, changedPath) {
        this.data.iconPackup = newVal
      }
    },
    moretxt: {
      type: String,
      value: '更多'
    },
    packuptxt: {
      type: String,
      value: '收起'
    },
    // 选中状态
    active: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal, changedPath) {
        this.initImageUrl()
      }
    },
    mode: {
      type: String,
      value: 'vertical'
    },
    // 图标宽
    imageWidth: {
      type: String,
      observer(newVal, oldVal, changedPath) {
        this.initStyle()
      }
    },
    // 图标高
    imageHeigth: {
      type: String,
      observer(newVal, oldVal, changedPath) {
        this.initStyle()
      }
    }
  },
  data: {
    iconMore,
    iconPackup,
    iconUrl: '',
    style: ''
  },
  methods: {
    handletab() {
      this.triggerEvent('change', !this.data.active)
    },
    // 图片样式
    initStyle() {
      const { imageWidth, imageHeigth } = this.data
      let style = ''
      style += imageWidth.length !== 0 ? `;width:${imageWidth}px;` : ''
      style += imageHeigth.length !== 0 ? `;width:${imageHeigth}px;` : ''
      this.setData({ style })
    },
    // 图片组
    initImageUrl() {
      const { active, iconMore, iconPackup  } = this.data
      
      let url = ''
      if (active) url = iconMore
      else url = iconPackup
      this.setData({ iconUrl: url })
      // console.log(active, this.data)
    }
  }
})
