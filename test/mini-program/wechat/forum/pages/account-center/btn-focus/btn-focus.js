const { setSubscribeUser, setSubscribeCancelUser } = require('../../../api/account')
const TYPE_TEXT_FOCUS = '已关注'
const TYPE_TEXT_UNFOCUS = '关注'
const TYPE_CLASS_FOCUS = 'active'

Component({
  properties: {
    userid: {
      type: [String, Number],
      value: '',
      observer(newVal) {
        // console.log('关注userid',newVal)
      }
    },
    focus: {
      type: Boolean,
      value: false,
      observer(is) {
        this.data.isFocus = is
        this.initText(is)
      }
    }
  },
  lifetimes: {
    created() {
      this.initText()
    }
  },
  data: {
    text: TYPE_TEXT_UNFOCUS,
    focusCls: '',
    isFocus: false // 关注
  },
  methods: {
    // 关注
    setSubscri() {
      setSubscribeUser(this.data.userid).then(() => {
        this.data.isFocus = true
        this.initText()
        this.triggerEvent('change', true)
      })
    },
    // 取消关注
    setSubscriCancel() {
      setSubscribeCancelUser(this.data.userid).then(() => {
        this.data.isFocus = false
        this.initText()
        this.triggerEvent('change', false)
      })
    },
    handleFocus() {
      const { isFocus } = this.data
      const is = !isFocus
      this.data.isFocus = is

      if (is) {
        this.setSubscri()
      } else {
        this.setSubscriCancel()
      }
    },
    initText(is = this.data.isFocus) {
      is
        ? this.setData({ focusCls: TYPE_CLASS_FOCUS, text: TYPE_TEXT_FOCUS })
        : this.setData({ focusCls: '', text: TYPE_TEXT_UNFOCUS })
    }
  }
})
