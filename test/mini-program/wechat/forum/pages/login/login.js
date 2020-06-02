const app = getApp()
const {
  TYPE_ENCRYPTEDDATA,
  TYPE_APPID,
  TYPE_IV,
  TYPE_CODE,
  TYPE_TOKEN,
  SESSION_ID,
  TYPE_CONFIG_LOGIN_STATUS_LOGIN,
  TYPE_CONFIG_LOGIN_STATUS_AUTHORIZE
} = require('../../config/constant-config')
const {
  getStorageSync,
  setStorageSync,
  navigateBack,
  switchTab,
  getUserInfo,
  wxLogin,
  showLoading,
  hideLoading,
  showToast,
  redirectBack
} = require('../../utils/util')

Page({
  data: {
    isBtn: false, // 登录按钮状态。true：显示
    type: TYPE_CONFIG_LOGIN_STATUS_LOGIN // 授权登录标识
  },
  onLoad(options) {
    const { type } = options
    this.initial(type)
  },
  onShow() {},
  // 初始化
  initial(type) {
    if (type) {
      this.initialRedirect(type)
    }
    this.initialLogin().then(() => {
      redirectBack()
      // app.goHome()
    })
  },
  initialLogin() {
    console.log('initial login')
    showLoading({ title: '正在登陆...', mask: true })
    return new Promise((resolve, reject) => {
      wxLogin().then(({ code }) => {
        // set login code
        // console.log('wxlogin', loginCode)
        setStorageSync(TYPE_CODE, code)

        getUserInfo()
          .then(({ encryptedData, iv, signature, userInfo }) => {
            app.globalData.userInfo = userInfo

            // set user encryptedData
            setStorageSync(TYPE_ENCRYPTEDDATA, encryptedData)
            // set user iv
            setStorageSync(TYPE_IV, iv)

            // test
            // console.log(`${user_id}+++++${token}++++${phpsessid}++++success`)

            app
              .getSession()
              .then(() => {
                hideLoading()
                resolve()
              })
              .catch(() => {
                hideLoading()
              })
          })
          .catch(err => {
            if (!this.data.isBtn) this.setData({ isBtn: true })
            hideLoading()
            showToast({ title: '授权已过期，请重新授权！' })
            console.log('=== getUserInfo fail ===', err)
          })
      })
    })
  },
  // 判断跳转授权
  initialRedirect(type) {
    switch (type) {
      case TYPE_CONFIG_LOGIN_STATUS_AUTHORIZE:
        this.data.type = TYPE_CONFIG_LOGIN_STATUS_AUTHORIZE
        if (!this.data.isBtn) this.setData({ isBtn: true })
        break
      case TYPE_CONFIG_LOGIN_STATUS_LOGIN:
        this.data.type = TYPE_CONFIG_LOGIN_STATUS_LOGIN
        if (this.data.isBtn) this.setData({ isBtn: false })
        break
    }
  },
  handleLogin({ detail: { userInfo, errMsg, encryptedData, iv } }) {
    console.log('btn login')
    switch (errMsg) {
      case 'getUserInfo:ok':
        console.log('btn login suc')
        // set globalData user encryptedData
        app.globalData.userInfo = userInfo
        // set user encryptedData
        setStorageSync(TYPE_ENCRYPTEDDATA, encryptedData)
        // set user iv
        setStorageSync(TYPE_IV, iv)

        showLoading({ title: '正在登陆...', mask: true })

        // 登录微信，获取token
        app
          .getSession()
          .then(() => {
            hideLoading()
            redirectBack()
            // switchTab('/pages/community-post/community-post')
            resolve()
          })
          .catch(() => {
            hideLoading()
          })
        break
      case 'getUserInfo:fail auth deny':
        console.log('btn login fail')
        showToast({ title: '授权失败，请重新授权！' })
        break
    }
  },
  onHide() {},
  onUnload() {}
})
