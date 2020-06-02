Component({
  properties: {
    placeholder: {
      type: String,
      observer(newVal, oldVal, changedPath) {}
    },
    scroll: {
      type: Boolean,
      value: false,
      observer(newVal) {
        // console.log('--scroll')
        this.handleAutoBlur()
      }
    }
  },
  data: {
    isModal: true,
    isBlur: true,
    value: '',
    firstFocus: true,
    placeholderStyle: ''
  },
  methods: {
    handleFocus() {},
    handleInput({ detail: { value } }) {
      let val = value
      if (this.data.firstFocus) {
        if (val.length === 1) this.data.firstFocus = false
        return
      }
      if (val.length === 0) {
        val = ''
        this.data.firstFocus = true
        this.setData({ value: val, isModal: true })
        this.triggerEvent('search', val)
      }
    },
    handleSubmit({ detail: { value } }) {
      let val = value
      if (val.length === 0) {
        val = this.data.placeholder
        this.setData({ isModal: true, value: val })
      }
      this.data.value = val
      this.triggerEvent('search', val)
    },
    handleAutoBlur() {
      if (this.data.isBlur) {
        this.data.isBlur = false
        const placeholderStyle =
          'display:none;position:absolute;opacity: 0;z-index:0'
        this.setData({ placeholderStyle })
        this.triggerEvent('autoblur', false)
      } else {
        const placeholderStyle = ''
        this.data.isBlur = true
        this.setData({ placeholderStyle })
      }
    },
    handleBlur() {
      // this.triggerEvent('blur');
    },
    // 处理覆盖层
    handleModal() {
      const isModal = !this.data.isModal
      this.setData({ isModal })
    }
  }
})
