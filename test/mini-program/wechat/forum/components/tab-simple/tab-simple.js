//组件定位：普通展示型tab,允许修改图标宽高，选中状态
Component({
  externalClasses: ['tabs-cls'],
  properties: {
    // 图标名字
    icon: {
      type: String,
      observer(newVal, oldVal, changedPath) {
        this.initImageUrl()
        this.initStyle()
      }
    },
    // 文字
    text: {
      type: String
    },
    // 计数
    count: {
      type: [Number, String],
      value: ''
    },
    isCount: {
      type: Boolean,
      value: false
    },
    // 选中状态
    active: {
      type: Boolean,
      value: false
    },
    // 排列结构：vertical(垂直)、horizontal(水平)
    mode: {
      type: String,
      value: 'horizontal'
    },
    // 图标宽
    imageWidth: {
      type: String
    },
    // 图标高
    imageHeigth: {
      type: String
    }
  },
  data: {
    iconUrl: '',
    style: ''
  },
  methods: {
    handletab() {
      this.triggerEvent('change')
    },
    initStyle() {
      const { imageWidth, imageHeigth } = this.data
      let style = ''
      style += imageWidth.length !== 0 ? `;width:${imageWidth}px;` : ''
      style += imageHeigth.length !== 0 ? `;width:${imageHeigth}px;` : ''
      this.setData({ style })
    },
    initImageUrl() {
      const { active, icon } = this.data
      let url = `../../common/images/${icon}`
      url += active ? '-active.png' : '.png'
      this.setData({ iconUrl: url })
    }
  }
})
