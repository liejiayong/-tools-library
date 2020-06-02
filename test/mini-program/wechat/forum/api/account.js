var app = getApp()
const md5 = require('../common/js/md5')
const { baseUrl } = require('./config')
const {
  TYPE_ENCRYPTEDDATA,
  TYPE_APPID,
  TYPE_IV,
  TYPE_CODE,
  TYPE_TOKEN,
  SESSION_ID
} = require('../config/constant-config')
const {
  getRandomNum,
  sortByKey,
  getParam,
  getStorageSync,
  setStorageSync,
  navigateTo,
  navigateBack,
  hideLoading,
  showLoading,
  showToast,
  gotoLogin,
  failToast
} = require('../utils/util')
const { TYPE_CONFIG_FOCUS_IS_SUBSCRIBE } = require('../config/account-center-config')

// 个人中心
function getAccountInfo({ userId = '', target = '' }) {
  showLoading({ title: '加载中...', mask: true })

  const param = { token: getStorageSync(TYPE_TOKEN) }
  if (userId) Object.assign(param, { user_id: userId })
  if (target) Object.assign(param, { target })

  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appuserv129}/user/cards`, param)
      .then(({ data: { msg, code, data } }) => {
        // console.log(data, msg, code)
        hideLoading()
        if (code === 0) resolve(data)
        else showToast({ title: msg })
      })
      .catch(err => {
        console.log('个人中心错误:' + err)
        hideLoading()
        reject(err)
      })
  })
}

// 我的勋章
function getMyMedal({ page = 1, pageSize = 10 }) {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appuserv129}/medal/lists`, {
        token: getStorageSync(TYPE_TOKEN),
        page,
        page_size: pageSize
      })
      .then(({ data: { msg, code, data: { list } } }) => {
        // console.log(list, msg, code)
        if (code === 0) resolve(list)
        else showToast({ title: msg })
      })
      .catch(err => {
        console.log('我的勋章错误:' + err)
        reject(err)
      })
  })
}

// 我的勋章 - 佩戴勋章
function getWearMedal(medalId = '') {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appuserv129}/medal/wear`, {
        token: getStorageSync(TYPE_TOKEN),
        medal_id: medalId
      })
      .then(({ data: { msg, code, data } }) => {
        // console.log(list, msg, code)
        if (code === 0) resolve(data)
        else showToast({ title: msg })
      })
      .catch(err => {
        console.log('佩戴勋章错误:' + err)
        reject(err)
      })
  })
}

// 我的勋章 - 卸下勋章
function getDemountMedal(medalId = '') {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appuserv129}/medal/unload`, {
        token: getStorageSync(TYPE_TOKEN),
        medal_id: medalId
      })
      .then(({ data: { msg, code, data } }) => {
        // console.log(list, msg, code)
        if (code === 0) resolve(data)
        else showToast({ title: msg })
      })
      .catch(err => {
        console.log('卸下勋章错误:' + err)
        reject(err)
      })
  })
}

// 我的评论列表
function getMyComment({ page = 1, pageSize = 10 }) {
  showLoading({ title: '加载中...', mask: true })
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appfindv129}/comments/myReply`, {
        token: getStorageSync(TYPE_TOKEN),
        page,
        page_size: pageSize
      })
      .then(({ data: { msg, code, data } }) => {
        // console.log(data, msg, code)
        hideLoading()
        if (code === 0) resolve(data)
        else showToast({ title: msg })
      })
      .catch(err => {
        console.log('我的评论列表错误:' + err)
        hideLoading()
        reject(err)
      })
  })
}

// 我的帖子
function getMyPost({ userId = '', page = 1, pageSize = 10 }) {
  showLoading({ title: '加载中...', mask: true })
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appfindv129}/ugc/lists`, {
        token: getStorageSync(TYPE_TOKEN),
        business: 4,
        user_id: userId,
        page,
        page_size: pageSize
      })
      .then(({ data: { msg, code, data: { list } } }) => {
        // console.log(list, msg, code)
        hideLoading()
        if (code === 0) resolve(list)
        else showToast({ title: msg })
      })
      .catch(err => {
        console.log('我的帖子错误:' + err)
        hideLoading()
        reject(err)
      })
  })
}

// 关注用户
function setSubscribeUser(userId) {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appuserv129}/user/subscribe`, {
        token: getStorageSync(TYPE_TOKEN),
        user_id: +userId
      })
      .then(({ data: { msg, code, data: { list } } }) => {
        // console.log(list, msg, code)
        
        if (code === 0) {
          showToast({ title: '关注成功!' })
          resolve(list)
        }
        else showToast({ title: msg })
      })
      .catch(err => {
        console.log('关注用户错误:' + err)
        showToast({ title: '网络超时，关注用户失败！' })
        reject(err)
      })
  })
}

// 取消关注用户
function setSubscribeCancelUser(userId) {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appuserv129}/user/subscribeCancel`, {
        token: getStorageSync(TYPE_TOKEN),
        user_id: +userId
      })
      .then(({ data: { msg, code, data: { list } } }) => {
        // console.log(list, msg, code)
        if (code === 0) {
          showToast({ title: '取消关注!' })
          resolve(list)
        }
        else showToast({ title: msg })
      })
      .catch(err => {
        console.log('取消关注用户错误:' + err)
        showToast({ title: '网络超时，取消关注用户失败！' })
        reject(err)
      })
  })
}

// 用户中心 - 我的点赞列表
function getMyPraise({ page = 1, pageSize = 10 }) {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appfindv129}/like/lists`, {
        token: getStorageSync(TYPE_TOKEN),
        page,
        page_size: pageSize
      })
      .then(({ data: { msg, code, data } }) => {
        // console.log(data, msg, code)
        if (code === 0) resolve(data)
        else showToast({ title: msg })
      })
      .catch(err => {
        console.log('用户中心 - 我的点赞列表错误:' + err)
        reject(err)
      })
  })
}

// 用户中心 - 我的关注与粉丝
function getMyFocus({ userId = '', type = TYPE_CONFIG_FOCUS_IS_SUBSCRIBE, page = 1, pageSize = 10 }) {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appuserv129}/user/subList`, {
        token: getStorageSync(TYPE_TOKEN),
        user_id: userId,
        type,
        page,
        page_size: pageSize
      })
      .then(({ data: { msg, code, data } }) => {
        // console.log(data, msg, code)
        if (code === 0) resolve(data)
        else showToast({ title: msg })
      })
      .catch(err => {
        console.log('用户中心 - 我的关注与粉丝错误:' + err)
        reject(err)
      })
  })
}

/**
 * 我的收藏列表(新闻、玩拍、玩说、帖子)
 * type: 类型。1新闻、2视频、4帖子
 */
function getMyCollect({ page = 1, pageSize = 10 }) {
  showLoading({ title: '加载中...', mask: true })
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appuserv129}/collect/lists`, {
        token: getStorageSync(TYPE_TOKEN),
        type: 4,
        page,
        page_size: pageSize
      })
      .then(({ data: { msg, code, data } }) => {
        // console.log(data, msg, code)
        hideLoading()
        if (code === 0) resolve(data)
        else showToast({ title: msg })
      })
      .catch(err => {
        console.log('我的收藏错误:' + err)
        hideLoading()
        reject(err)
      })
  })
}


module.exports = {
  getAccountInfo,
  getMyMedal,
  getWearMedal,
  getDemountMedal,
  getMyComment,
  setSubscribeUser,
  setSubscribeCancelUser,
  getMyPraise,
  getMyFocus,
  getMyPost,
  getMyCollect
}
