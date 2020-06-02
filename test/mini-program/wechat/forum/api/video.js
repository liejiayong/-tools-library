var app = getApp()
// const md5 = require('../common/js/md5')
const { baseUrl } = require('./config')
const {
  SESSION_ID,
  TYPE_TOKEN,
  TYPE_APPID,
  TYPE_ENCRYPTEDDATA,
  TYPE_IV,
  TYPE_CODE
} = require('../config/constant-config')
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

// 获取所有视频列表
function getVideoAll({ keyword = '', page = 1, pageSize = 10 }) {
  showLoading({ title: '加载中...', mask: true })
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.pcvedio}/video.php`, {
        phpsessid: getStorageSync(SESSION_ID),
        keyword,
        page,
        page_size: pageSize
      })
      .then(res => {
        const { code, msg } = res.data
        hideLoading()
        // console.log(code, msg, res)
        if (code === 0) resolve(res)
        else if (code === 3) navigateTo('../login/login')
        else showToast({ title: msg })
      })
      .catch(err => {
        console.log('获取所有视频列表错误：', err)
        hideLoading()
        reject(err)
      })
  })
}

// 获取视频详情
function getVideoDetail(id) {
  // showLoading({ title: '加载中...', mask: true })
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.pcvedio}/video.php`, {
        phpsessid: getStorageSync(SESSION_ID),
        a: 'get_video_detail',
        id
      })
      .then(({ data: { code, msg, data: { info } } }) => {
        // hideLoading()
        // showToast({ title: msg })
        if (code === 0) resolve(info)
        else if (code === 3) navigateTo('../login/login')
      })
      .catch(err => {
        console.log('获取视频详情错误：', err)
        // hideLoading()
        reject(err)
      })
  })
}

// 获取视频评论
function getVideoCommentList({ id, page }) {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.pcvedio}/video.php`, {
        a: 'get_video_comment',
        id,
        page
      })
      .then(({ data: { code, msg, data: { comment } } }) => {
        if (code === 0) resolve(comment)
        else if (code === 3) navigateTo('../login/login')
      })
      .catch(err => {
        console.log('获取视频评论错误：', err)
        reject(err)
      })
  })
}

// 评论视频
function commentVideo({ id, comment }) {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.pcvedio}/video.php`, {
        a: 'comment_video',
        phpsessid: getStorageSync(SESSION_ID),
        id,
        comment
      })
      .then(({ data: { code, msg } }) => {
        showToast({ title: msg })
        if (code === 0) resolve()
        else if (code === 3) navigateTo('../login/login')
      })
      .catch(err => {
        console.log('评论视频错误：', err)
        reject(err)
      })
  })
}

// 回复评论
function replyVideo({ id, replyId, comment, nickname }) {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.pcvedio}/video.php`, {
        a: 're_comment',
        phpsessid: getStorageSync(SESSION_ID),
        id,
        reply_id: replyId,
        comment,
        o_nickname: nickname
      })
      .then(({ data: { code, msg } }) => {
        showToast({ title: msg })
        if (code === 0) resolve()
        else if (code === 3) navigateTo('../login/login')
      })
      .catch(err => {
        console.log('回复评论错误：', err)
        reject(err)
      })
  })
}

// 取消点赞视频
function unpraiseVideo(id) {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.pcvedio}/video.php`, {
        phpsessid: getStorageSync(SESSION_ID),
        a: 'unpraise_video',
        id
      })
      .then(({ data: { code, msg } }) => {
        showToast({ title: msg })
        resolve()
      })
      .catch(err => {
        showToast({ title: '网络出错啦，点赞失败，请稍后重试！' })
        reject(err)
      })
  })
}

// fetch - 点赞视频
function praiseVideo(id) {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.pcvedio}/video.php`, {
        phpsessid: getStorageSync(SESSION_ID),
        a: 'praise_video',
        id
      })
      .then(({ data: { code, msg } }) => {
        showToast({ title: msg })
        resolve()
      })
      .catch(err => {
        showToast({ title: '网络出错啦，点赞失败，请稍后重试！' })
        reject()
      })
  })
}

module.exports = {
  getVideoCommentList,
  getVideoDetail,
  commentVideo,
  replyVideo,
  getVideoAll,
  unpraiseVideo,
  praiseVideo
}
