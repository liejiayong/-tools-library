//组件定位：open-type
Component({
  externalClasses: ['tabs-cls'],
  properties: {
    // 值以微信小程序button组件的open-type为标准
    openType: {
      type: String,
      value: 'share'
    },
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
