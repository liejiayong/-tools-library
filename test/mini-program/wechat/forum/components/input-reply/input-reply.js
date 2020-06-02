
const activeCls ='input_btn_send_active'
Component({
  properties: {
    placeholder: {
      type: String,
      observer(newVal, oldVal, changedPath) {}
    },
    autoFocus: {
      type: Boolean,
      observer(newVal, oldVal, changedPath) {
        this.initRepyStyle(newVal)
      }
    },
  },
  data: {
    btnActiveCls: '', // 发送active cls
    txt: '', // 回复文本
    repyStyle: ''
  },
  methods: {
    initBtnActiveCls({ detail: { value}}) {
      let btnActiveCls
      if (value.trim().length === 0) {
        btnActiveCls = ''
      } else {
        btnActiveCls = activeCls
        this.data.txt = value
      }
      this.setData({ btnActiveCls })
    },
    initRepyStyle(flag) {
      if (flag) {
        const repyStyle = ';z-index:2000;'
        this.setData({repyStyle})
      } else {
        const repyStyle = ''
        this.setData({repyStyle})
      }
    },
    handleFoucs() {},
    handleClose() {
      this.triggerEvent('close', false)
    },
    handleSend() {
      const { txt, autoFocus } = this.data
      if (txt.trim().length === 0) return
      const param = {
        txt,
        autoFocus: false
      }
      this.setData({ txt: '' })
      this.triggerEvent('change', param)
    }
  }
})
