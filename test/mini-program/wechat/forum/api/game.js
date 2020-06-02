var app = getApp()
const md5 = require('../common/js/md5')
const { baseUrl } = require('./config')
const {
  SESSION_ID,
  TYPE_TOKEN,
  TYPE_APPID,
  TYPE_ENCRYPTEDDATA,
  TYPE_IV,
  TYPE_CODE
} = require('../config/config')
const {
  getSystemInfo,
  getRandomNum,
  sortByKey,
  getParam,
  getStorageSync,
  setStorageSync,
  wxLogin,
  getUserInfo,
  navigateTo,
  hideLoading,
  showLoading,
  showToast,
  gotoLogin
} = require('../utils/util')

// 资讯banner
function getGameBanner() {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.pcvedio}/banner.php`)
      .then(({ data: { code, msg, list } }) => {
        // showToast({ title: msg })
        if (code === 0) resolve(list)
      })
      .catch(err => {
        const msg = `资讯banner错误: ${err}`
        console.log(msg)
        reject(msg)
      })
  })
}

// 获取公众号列表
function getOfficialTabList() {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.pcgame}/ugc.php?a=list`)
      .then(({ data: { list, msg, code } }) => {
        // showToast({ title: msg })
        if (code === 0) resolve(list)
      })
      .catch(err => {
        const msg = `获取公众号列表错误: ${err}`
        console.log(msg)
        reject(msg)
      })
  })
}

// 获取游戏资讯列表
function getGameList({ keyword = '', page = 1, pageSize = 10 }) {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.pcgame}/ugc.php`, {
        keyword,
        page,
        page_size: pageSize
      })
      .then(({ data }) => {
        resolve(data)
      })
      .catch(err => {
        const msg = `获取游戏资讯列表错误: ${err}`
        console.log(msg)
        reject(msg)
      })
  })
}

// 获取公众号资讯列表
function getOfficialMsgList({
  keyword = '',
  page = 1,
  pageSize = 10,
  appId: app_id
}) {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.pcgame}/ugc.php`, {
        a: 'index_app_id',
        keyword,
        page,
        page_size: pageSize,
        app_id
      })
      .then(({ data }) => {
        resolve(data)
      })
      .catch(err => {
        const msg = `获取公众号资讯列表错误: ${err}`
        console.log(msg)
        reject(msg)
      })
  })
}

// 获取资讯新闻详情信息
function getOfficialDetail({ id }) {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.pcgame}/ugc.php?a=detail`, { id })
      .then(({ data: { data: { info }, msg, code } }) => {
        // showToast({ title: msg })
        resolve(info)
      })
      .catch(err => {
        const msg = `获取资讯新闻详情信息错误: ${err}`
        console.log(msg)
        reject(msg)
      })
  })
}

module.exports = {
  getGameBanner,
  getOfficialTabList,
  getGameList,
  getOfficialMsgList,
  getOfficialDetail
}
