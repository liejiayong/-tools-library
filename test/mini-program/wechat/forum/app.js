//app.js
const { versionChecker } = require('utils/util')
const { getParam } = require('api/utils')
const { loginUrl, authCode } = require('api/config')
const { homePageUrl, loginPageUrl } = require('config/config')
const {
  SESSION_ID,
  TYPE_TOKEN,
  TYPE_ENCRYPTEDDATA,
  TYPE_IV,
  TYPE_CODE,
  TYPE_USER_ID,
  TYPE_CONFIG_TW_APPID,
  TYPE_CONFIG_PAGE_PATH,
  TYPE_CONFIT_PLAT_SYS_INFO,
  TYPE_CONFIG_LOGIN_STATUS_AUTHORIZE,
  TYPE_CONFIG_HEADER_PAEAM_SESSIONID,
  TYPE_CONFIG_HEADER_PARAM_PLAT,
  TYPE_CONFIG_HEADER_PARAM_APP_CHANNEL,
  TYPE_CONFIG_HEADER_PARAM_APP_VERSION
} = require('config/constant-config')
const { checkSession, getRandomNum, sortByKey, getStorageSync, setStorageSync, navigateTo, switchTab, hideLoading, showToast, showModal, getSystemInfo } = require('utils/util')
const md5 = require('common/js/md5')

App({
  globalData: {
    isLogin: false, // 登录.true：登录
    // 请求header
    headerConfig: {
      version: TYPE_CONFIG_HEADER_PARAM_APP_VERSION,
      channel: TYPE_CONFIG_HEADER_PARAM_APP_CHANNEL,
      plat: TYPE_CONFIG_HEADER_PARAM_PLAT,
      imei: 1,
      nonce: '',
      time: 1
    },
    userInfo: { user_id: '' }, // 用户信息
    isMedalWear: false // 勋章佩戴状态
  },
  onLaunch(options) {
    this.initialHeader()
      .then(() => {
        console.log('=== initial header success ===')
      })
      .catch(() => {
        console.error('=== initial header fail ===')
      })

    this.initialParm(options)

    checkSession().catch(() => {
      this.toLoginPage()
    })

    versionChecker()

    getSystemInfo().then(sysInfo => {
      setStorageSync(TYPE_CONFIT_PLAT_SYS_INFO, sysInfo)
    })
  },
  onPageNotFound() {
    reLaunch(homePageUrl)
  },
  // 初始化页面参数
  initialParm(options) {
    const { path, query } = options
    // 判断授权情况
    if (!getStorageSync(TYPE_TOKEN) && !getStorageSync(TYPE_USER_ID)) {
      // 是否在登录页
      if (!(loginPageUrl.indexOf(path) > -1)) {
        this.toLoginPage()
        // console.log('app firest, checker',options, loginPageUrl.indexOf(path) > -1)
      }
    }

    // 记录当前路径
    setStorageSync(TYPE_CONFIG_PAGE_PATH, { path, query })
  },
  // 跳转到首页
  goHome() {
    switchTab(homePageUrl)
  },
  // 跳转到登录页
  toLoginPage(type) {
    const url = `/pages/login/login?type=${type}`
    this.globalData.isLogin = false
    navigateTo(url)
  },
  // 获取token
  getSession() {
    return new Promise((resolve, reject) => {
      if (getStorageSync(TYPE_TOKEN) && getStorageSync(TYPE_USER_ID)) {
        checkSession().then(() => {
          this.goHome()
          resolve()
          return
        })
      }
      const loginParm = {
        code: getStorageSync(TYPE_CODE),
        encryptedData: getStorageSync(TYPE_ENCRYPTEDDATA),
        iv: getStorageSync(TYPE_IV),
        app_id: TYPE_CONFIG_TW_APPID
      }

      if (getStorageSync(SESSION_ID)) {
        Object.assign(loginParm, {
          phpsessid: getStorageSync(SESSION_ID)
        })
      }

      const get = (url, params, options) => {
        return new Promise(this.requestNoTip('GET', url, params, options))
      }

      get(loginUrl, loginParm)
        .then(res => {
          const { phpsessid, token, ret, msg, user_id } = res.data
          if (ret === 'success') {
            setStorageSync(SESSION_ID, phpsessid)
            setStorageSync(TYPE_TOKEN, token)
            setStorageSync(TYPE_USER_ID, user_id)
            this.globalData.isLogin = true
            console.log('=== login success ===')

            resolve()
          } else {
            this.globalData.isLogin = false
            showModal({ title: res.data.msg, showCancel: false })

            console.log('=== login fail ===', res)
            reject()
          }
        })
        .catch(err => {
          this.globalData.isLogin = false
          console.log('=== login fail ===')
          showToast({ title: '网络超时，登录失败，请稍后重试...' })
          reject()
        })
      const timer = setTimeout(() => {
        clearTimeout(timer)
      })
    })
  },
  // 初始化 请求头部header参数
  initialHeader() {
    return new Promise((resolve, reject) => {
      const param = {
        plat: TYPE_CONFIG_HEADER_PARAM_PLAT,
        imei: getRandomNum(15),
        nonce: md5('nonce'),
        time: Date.now()
      }

      let headerConfig = this.globalData.headerConfig
      headerConfig = Object.assign(headerConfig, param)
      const signStr = getParam(sortByKey(headerConfig)) + TYPE_CONFIG_HEADER_PAEAM_SESSIONID

      const signMd5 = md5(signStr)
      Object.assign(headerConfig, { sign: signMd5 })

      resolve(headerConfig)
    })
  },
  get(url, params, options) {
    return new Promise(this.request('GET', url, params, options))
  },
  post(url, params, options) {
    return new Promise(this.request('POST', url, params, options))
  },
  // 无弹窗请求
  requestNoTip(method, url, params, options) {
    const isGet = method === 'GET'
    if (isGet) url += (url.indexOf('?') < 0 ? '?' : '&') + getParam(params)

    Object.assign(this.globalData.headerConfig, { 'Content-Type': 'application/x-www-form-urlencoded' }, options)

    wx.showNavigationBarLoading()

    return (resolve, reject) => {
      wx.request({
        url,
        data: isGet ? null : params,
        method,
        header: this.globalData.headerConfig,
        success: res => {
          resolve(res)
          wx.hideNavigationBarLoading()
        },
        fail: err => {
          reject(err)
          wx.hideNavigationBarLoading()
        }
      })
    }
  },
  request(method, url, params, options) {
    const isGet = method === 'GET'
    if (isGet) url += (url.indexOf('?') < 0 ? '?' : '&') + getParam(params)

    Object.assign(this.globalData.headerConfig, { 'Content-Type': 'application/x-www-form-urlencoded' }, options)

    wx.showNavigationBarLoading()

    return (resolve, reject) => {
      wx.request({
        url,
        data: isGet ? null : params,
        method,
        header: this.globalData.headerConfig,
        success: res => {
          if (!getStorageSync(TYPE_TOKEN) && !getStorageSync(TYPE_USER_ID)) {
            // 是否在登录页
            const currPage = getCurrentPages()
            const path = currPage[currPage.length - 1].route
            if (!(loginPageUrl.indexOf(path) > -1)) {
              // console.log('request checker', !getStorageSync(TYPE_TOKEN) && !getStorageSync(TYPE_USER_ID), path, (loginPageUrl.indexOf(path) > -1))
              this.toLoginPage(TYPE_CONFIG_LOGIN_STATUS_AUTHORIZE)
            }
          }
          const code = res.data.code
          // 102002 --- 加密失败
          // 103009 token失效
          // 103001 用户没登录
          if (authCode[code]) {
            this.toLoginPage()
          }

          wx.hideNavigationBarLoading()
          resolve(res)
        },
        fail: err => {
          showToast({ title: err, duration: 2000 })
          wx.hideNavigationBarLoading()
          hideLoading()
          reject(err)
        }
      })
    }
  }
})
