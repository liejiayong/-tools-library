const { tabBarConfig, loginPageUrl, homePageUrl } = require('../config/config')
const { TYPE_CONFIG_PAGE_PATH } = require('../config/constant-config')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 获取组件元素边距信息
const getElement = el => {
  const dom = wx.createSelectorQuery().in(el)
  return dom
}

// 获取组件元素边距信息
const getComponentSelectorClient = function(Component, el) {
  const dom = wx
    .createSelectorQuery()
    .in(Component)
    .select(el)
  return new Promise((resolve, reject) => {
    dom
      .boundingClientRect(rect => {
        resolve(rect)
      })
      .exec()
  })
}

// 获取页面元素边距信息
const getSelectorClient = el => {
  const dom = wx.createSelectorQuery().select(el)
  return new Promise((resolve, reject) => {
    dom
      .boundingClientRect(rect => {
        resolve(rect)
      })
      .exec()
  })
}

// 将页面滚动到目标位置
const pageScrollTo = ({ scrollTop, duration }) => {
  return new Promise((resolve, reject) => {
    wx.pageScrollTo({
      scrollTop,
      duration,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// 获取系统信息
const getSystemInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// 开始下拉刷新
const startPullDownRefresh = () => {
  return new Promise((resolve, reject) => {
    wx.startPullDownRefresh({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// 停止当前页面下拉刷新
const stopPullDownRefresh = () => {
  return new Promise((resolve, reject) => {
    wx.stopPullDownRefresh({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// 显示消息提示框
const showToast = ({ title = '', icon = 'none', image, duration = 1500, mask }) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title,
      icon,
      image,
      duration,
      mask,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

// 显示消息提示框
const showActionSheet = ({ itemList = [], itemColor = '#000000' }) => {
  return new Promise((resolve, reject) => {
    wx.showActionSheet({
      itemList,
      itemColor,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

// 请求失败显示toast
function showModal({ title = '', content = '', showCancel = true, cancelText = '取消', cancelColor = '#000000', confirmText = '确定', confirmColor = '#3cc51f' }) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      showCancel,
      cancelText,
      cancelColor,
      confirmText,
      confirmColor,
      success: res => resolve(res),
      fail: () => reject()
    })
  })
}

// 跳转 非 tabBar 页面
const navigateTo = url => {
  return new Promise((resolve, reject) => {
    wx.navigateTo({
      url,
      success: () => resolve(),
      fail: () => reject()
    })
  })
}

// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
const switchTab = url => {
  return new Promise((resolve, reject) => {
    wx.switchTab({
      url,
      success: () => resolve(),
      fail: () => reject()
    })
  })
}

// 关闭所有页面，打开到应用内的某个页面
const reLaunch = url => {
  return new Promise((resolve, reject) => {
    wx.reLaunch({
      url,
      success: () => resolve(),
      fail: () => reject()
    })
  })
}

// 动态设置当前页面的标题
const setNavigationBarTitle = title => {
  return new Promise((resolve, reject) => {
    wx.setNavigationBarTitle({
      title,
      success: () => resolve(),
      fail: () => reject()
    })
  })
}

// 设置同步缓存数据
const setStorageSync = (key, value) => {
  wx.setStorageSync(key, value)
}

// 获取同步缓存数据
const getStorageSync = key => {
  return wx.getStorageSync(key)
}

// 调用接口获取登录凭证（code）进而换取用户登录态信息
const wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

// 获取用户信息
const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      lang: 'zh_CN',
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

// 返回页面
const navigateBack = (delta = 1, duration = 0) => {
  const timer = setTimeout(() => {
    wx.navigateBack({
      delta
    })
    clearTimeout(timer)
  }, duration)
}

// 显示当前页面的转发按钮
const showShareMenu = flag => {
  return new Promise((resolve, reject) => {
    // 要求小程序返回分享目标信息
    wx.showShareMenu({
      withShareTicket: flag,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
// 显示 loading 提示框
const showLoading = ({ title, mask = false }) => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title,
      mask,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
// 隐藏 loading 提示框
const hideLoading = () => {
  return new Promise((resolve, reject) => {
    wx.hideLoading({
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
// 打开另一个小程序
const navigateToMiniProgram = ({ appId, path, extraData, envVersion }) => {
  return new Promise((resolve, reject) => {
    wx.navigateToMiniProgram({
      appId,
      path,
      extraData,
      envVersion,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
// 返回到上一个小程序。只有在当前小程序是被其他小程序打开时可以调用成功
const navigateBackMiniProgram = ({ extraData }) => {
  return new Promise((resolve, reject) => {
    wx.navigateBackMiniProgram({
      appId,
      path,
      extraData,
      envVersion,
      success: res => resolve(res),
      fail: err => {
        showToast({
          title: '微信客户端 iOS 6.5.9，Android 6.5.10 及以上版本支持返回到上个小程序'
        })
        reject(err)
      }
    })
  })
}
// 获取图片信息
const getImageInfo = src => {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
// 压缩图片接口，可选压缩质量
const compressImage = ({ src, quality = 80 }) => {
  return new Promise((resolve, reject) => {
    wx.compressImage({
      src,
      quality,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
// 从本地相册选择图片或使用相机拍照。
const chooseImage = ({ count = 9, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera'] }) => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count,
      sizeType,
      sourceType,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
// 在新页面中全屏预览图片
const previewImage = ({ urls = [], current }) => {
  return new Promise((resolve, reject) => {
    wx.previewImage({
      urls,
      current,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

// 设置系统剪贴板的内容
const setClipboardData = data => {
  return new Promise((resolve, reject) => {
    wx.setClipboardData({
      data,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

// 获取系统剪贴板的内容
const getClipboardData = () => {
  return new Promise((resolve, reject) => {
    wx.getClipboardData({
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

// 生成随机数
const getRandom = (min, max) => {
  return ((Math.random() * (max - min + 1)) | 0) + min
}

// 生成指定长度的数字
const getRandomNum = (len = 15) => {
  let ret = ''
  while (len > 0) {
    ret += getRandom(0, 9)
    len--
  }
  return +ret
}

// 根据ascii码对对象键值排序
const sortByKey = obj => {
  let keyList = []
  for (let k in obj) {
    keyList.push(k)
  }
  keyList.sort()
  const ret = {}
  keyList.forEach(item => {
    ret[item] = obj[item]
  })
  return ret
}

// query string
function getParam(params) {
  if (JSON.stringify(params) === '{}') return ''
  let url = ''
  for (var k in params) {
    if (params.hasOwnProperty(k)) {
      let value = params[k] !== undefined ? params[k] : ''
      url += `&${k}=${value}`
    }
  }
  return url ? url.substring(1) : ''
}

// 匹配<img />的data-src 转为src
const convertToSrc = str => {
  const reg = /data\-src=[\'\"]?([^\'\"]*)[\'\"]?/gi
  return str.replace(reg, 'src="$1"')
}

// 获取圈子名称
const getGroupName = (id, groupConfig) => {
  if (groupConfig.length === 0) return
  let ret = ''
  groupConfig.forEach(item => {
    if (id == item.id) {
      ret = item.name
    }
  })
  return ret
}

// 赋值
const forof = (dist, src) => {
  for (let key of Object.keys(dist)) {
    if (src[key]) {
      dist[key] = src[key]
    }
  }
}

// 轮询检查
const pollingFetch = callback => {
  callback()
  const timer = setTimeout(fn => {
    fn()
  }, 100)
  timer(timer)
  callback()
}

// 查找数组下标
const findIndex = (list, value) => {
  if (list && list.length === 0) return
  let ret = -1
  list.findIndex((val, i) => {
    if (val === value) {
      ret = i
    }
  })
  return ret
}

// 跳转登录
function gotoLogin() {
  const url = '../login/login?type=authorize'
  navigateTo(url)
}

// 请求失败显示toast
function failToast(msg, duration = 1500) {
  showToast({ title: msg })
  const timer = setTimeout(() => {
    navigateBack()
    clearTimeout(timer)
  }, duration)
}

// 创建微信小程序动画
function createAnimation({ duration = 400, timingFunction = 'linear', delay = 0, transformOrigin = '50% 50% 0' }) {
  return wx.createAnimation({
    duration,
    timingFunction,
    delay,
    transformOrigin
  })
}

/**
 * 返回跳转页面
 *
 * 用于处理使用tabBar页面或其他页面
 */
function redirectBack(pagePath = getStorageSync(TYPE_CONFIG_PAGE_PATH)) {
  // const curPageUrl = path + (path.indexOf('?') < 0 ? '?' : '&') + getParam(query)
  return new Promise((resolve, reject) => {
    const { path = [], query } = pagePath

    // 判断是否登录页进入
    if (loginPageUrl.indexOf(path) > -1) {
      console.log('login to: --')
      return reLaunch(homePageUrl)
    }

    try {
      let flag = false
      tabBarConfig.forEach(tabPath => {
        if (path.indexOf(tabPath) > -1) flag = true
      })

      // 判断是否从tabBar页面进入
      if (flag) {
        console.log('redirect to:', path)
        switchTab(`/${path}`)
      } else {
        console.log('navigateBack to---')
        navigateBack()
      }
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * 检查登录态是否过期。
 * @returns { Boolean } ret 过期则为true
 */
function checkSession() {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success() {
        resolve(false)
      },
      fail() {
        reject(true)
      }
    })
  })
}

function versionChecker() {
  if (wx.canIUse("getUpdateManager")) return

  const updateManager = wx.getUpdateManager()
  // 请求完新版本信息的回调
  updateManager.onCheckForUpdate((res) => {
    console.log('updateManager.onCheckForUpdate:', res)
  })
  // 准备更新
  updateManager.onUpdateReady(() => {
    wx.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: (res) => {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        } else if (res.cancel) {
          return false;
        }
      }
    })
  })
  // 新的版本下载失败
  updateManager.onUpdateFailed(() => {
    wx.hideLoading();
    wx.showModal({
      title: '升级失败',
      content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      showCancel: false
    })
  })
}

module.exports = {
  versionChecker,
  checkSession,
  redirectBack,
  formatTime,
  getClipboardData,
  setClipboardData,
  getElement,
  getComponentSelectorClient,
  getSelectorClient,
  pageScrollTo,
  startPullDownRefresh,
  stopPullDownRefresh,
  getSystemInfo,
  navigateTo,
  switchTab,
  reLaunch,
  showToast,
  showModal,
  showActionSheet,
  setNavigationBarTitle,
  setStorageSync,
  getStorageSync,
  wxLogin,
  getUserInfo,
  navigateBack,
  showShareMenu,
  showLoading,
  hideLoading,
  navigateBackMiniProgram,
  navigateToMiniProgram,
  previewImage,
  chooseImage,
  compressImage,
  getImageInfo,
  getRandom,
  getRandomNum,
  sortByKey,
  getParam,
  convertToSrc,
  getGroupName,
  forof,
  findIndex,
  gotoLogin,
  failToast,
  createAnimation
}
