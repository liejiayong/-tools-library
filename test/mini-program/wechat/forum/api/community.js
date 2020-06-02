var app = getApp()
const md5 = require('../common/js/md5')
const { baseUrl } = require('./config')
const {
  TYPE_LOGIN_FIRST,
  TYPE_ENCRYPTEDDATA,
  TYPE_APPID,
  TYPE_IV,
  TYPE_CODE,
  TYPE_TOKEN,
  SESSION_ID,
  TYPE_COMMUNICATY_POST_DEDTE_FLAG
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
// const md5 = require('common/js/md5')

// 圈子列表
function getCommunityTab() {
  showLoading({ title: '加载中...', mask: true })
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appfindv129}/club/wxapp_lists`)
      .then(({ data: { data: { list }, code, msg } }) => {
        // showToast({ title: msg })
        hideLoading()
        if (code === 0) resolve(list)
      })
      .catch(err => {
        console.log('圈子列表错误:' + err)
        hideLoading()
        reject(err)
      })
  })
}

/**
 * 取消搜藏
 * type: 类型。1新闻、2视频、4帖子
 */
function collectCancel(sourceId = '') {
  showLoading({ title: '加载中...', mask: true })
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appuserv129}/collect/cancel`, {
        token: getStorageSync(TYPE_TOKEN),
        type: 4,
        source_id: sourceId
      })
      .then(({ data: { msg, code, data: { list } } }) => {
        // console.log(list, msg, code)
        hideLoading()
        
        if (code === 0) {
          resolve(list)
          showToast({ title: '取消收藏' })
        }
        else showToast({ title: msg })
      })
      .catch(err => {
        console.log('取消搜藏错误:' + err)
        hideLoading()
        showToast({ title: '网络超时，取消收藏失败，请稍后重试！！' })
        reject(err)
      })
  })
}

/**
 * 收藏帖子
 * type: 类型。1新闻、2视频、4帖子
 */
function collectAdd(sourceId = '') {
  showLoading({ title: '加载中...', mask: true })
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appuserv129}/collect/add`, {
        token: getStorageSync(TYPE_TOKEN),
        type: 4,
        source_id: sourceId
      })
      .then(({ data: { msg, code, data: { list } } }) => {
        // console.log(list, msg, code)
        hideLoading()
        showToast({ title: msg })
        if (code === 0) resolve(list)
      })
      .catch(err => {
        console.log('收藏帖子错误:' + err)
        hideLoading()
        showToast({ title: '网络超时，收藏帖子失败，请稍后重试！' })
        reject(err)
      })
  })
}

// 点赞帖子
function praisePost(business_id) {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appfindv129}/like/up`, {
        token: getStorageSync(TYPE_TOKEN),
        business: 1,
        business_id
      })
      .then(({ data: { code, data, msg } }) => {
        showToast({ title: msg })
        if (code === 0) resolve(data)
      })
      .catch(err => {
        console.log('点赞帖子失败', err)
        showToast({ title: '网络错误，点赞帖子失败，请稍后重试！' })
        reject(err)
      })
  })
}

/**
 * 删除帖子
 * status: 类型（2删除）这里固定死为2
 */
function delPost(postId = '') {
  showLoading({ title: '加载中...', mask: true })
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appfindv129}/ugc/status`, {
        token: getStorageSync(TYPE_TOKEN),
        status: 2,
        id: postId
      })
      .then(({ data: { msg, code, data } }) => {
        // console.log(data, msg, code)
        setStorageSync(TYPE_COMMUNICATY_POST_DEDTE_FLAG, true)
        hideLoading()
        showToast({ title: msg })
        if (code === 0) resolve(data)
      })
      .catch(err => {
        console.log('删除帖子错误:' + err)
        hideLoading()
        showToast({ title: '网络超时，删除帖子失败，请稍后重试！！' })
        reject(err)
      })
  })
}

/**
 * 删除评论
 * target: 是否返回评论详情，默认1（0否、1是）
 */
function delComment(postId = '') {
  showLoading({ title: '加载中...', mask: true })
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appfindv129}/comments/delete`, {
        token: getStorageSync(TYPE_TOKEN),
        target: 1,
        id: postId
      })
      .then(({ data: { msg, code, data } }) => {
        // console.log(data, msg, code)
        hideLoading()
        if (code === 0) {
          showToast({ title: '删除成功！' })
          resolve(data)
        }
        else showToast({ title: msg })
      })
      .catch(err => {
        console.log('删除帖子错误:' + err)
        hideLoading()
        showToast({ title: '网络超时，删除帖子失败，请稍后重试！！' })
        reject(err)
      })
  })
}

// 发布帖子
function sendPostMsg({ communityId, title, content, images, videos }) {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appfindv129}/club/postSend`, {
        token: getStorageSync(TYPE_TOKEN),
        community_id: communityId,
        title,
        content,
        images,
        videos
      })
      .then(({ data }) => {
        resolve(data)
      })
      .catch(err => {
        console.log('发布帖子失败', err)
        reject(err)
      })
  })
}

// 评论帖子
function replyPostMsg({
  businessId = '',
  content = '',
  images = [],
  replyId: reply_id
}) {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appfindv129}/comments/add`, {
        token: getStorageSync(TYPE_TOKEN),
        business: 2,
        business_id: businessId,
        images,
        content,
        reply_id
      })
      .then(({ data: { code, msg, data: { info } } }) => {
        showToast({ title: msg })
        if (code === 0) resolve(info)
      })
      .catch(err => {
        console.log('发布帖子失败', err)
        reject(err)
      })
  })
}

// 图片上传
function uploadImage({
  base64,
  file,
  base64_watermark,
  watermark_x,
  watermark_y
}) {
  const md5Key = 'a64af08f15dffbdda86ea1e5b024d4fd'
  const time = Date.now()
  const nonce = getRandomNum()
  const param = {
    caller: 'h5',
    time,
    nonce
  }
  const sign = md5(getParam(sortByKey(param)) + md5Key)

  param.sign = sign
  if (base64) param.base64 = base64
  if (file) param.file = file
  if (base64_watermark) param.base64_watermark = base64_watermark
  if (watermark_x) param.watermark_x = watermark_x
  if (watermark_y) param.watermark_y = watermark_y

  // console.log('file', file, param)
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: 'https://cdnapp.253923.com/tan_wan_app_upload.php',
      filePath: file,
      name: 'file',
      formData: param,
      // header: {
      //   'content-type': 'multipart/form-data'
      // },
      success: res => {
        // console.log(res)
        const { data } = res
        const datainfo = typeof data === 'string' ? JSON.parse(data) : data
        const { code, data: imgList } = datainfo
        resolve(imgList.info.url)
      },
      fail: err => reject(err)
    })
  })
}

// 获取圈子详情评论列表
function getCommunityDetailCommentList({
  businessId = '',
  page = 1,
  pageSize = 10
}) {
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appfindv129}/comments/lists`, {
        token: getStorageSync(TYPE_TOKEN),
        business: '2',
        business_id: businessId,
        page: page,
        page_size: pageSize
      })
      .then(({ data: { code, msg, data: { list } } }) => {
        resolve(list)
      })
      .catch(err => {
        console.log('获取圈子详情评论列表错误：', err)
        reject(err)
      })
  })
}

// 获取圈子详情评论列表
function getCommunityDetail(postId = '') {
  // showLoading({ title: '加载中', mask: true })
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appfindv129}/club/postDetail`, {
        token: getStorageSync(TYPE_TOKEN),
        post_id: postId
      })
      .then(({ data: { msg, code, data: { info }}}) => {
        if (code === 100004) {
          failToast(msg)
          return
        }
        // hideLoading()
        resolve(info)
      })
      .catch(err => {
        // hideLoading()
        console.log('获取圈子详情评论列表错误：', err)
        reject(err)
      })
  })
}

// 获取所有圈子推荐资讯列表
function getCommunityAllRecommend({ keyword = '', page = 1, pageSize = 10 }) {
  // showLoading({ title: '加载中...', mask: true })
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.apphomev129}/recommend/lists`, {
        keyword,
        page,
        pageSize
      })
      .then(({ data: { code, msg, data: { list } } }) => {
        // hideLoading()
        if (code === 0) {
          resolve(list)
        } else {
          failToast(msg)
        }
      })
      .catch(err => {
        console.log('获取所有圈子推荐资讯列表错误：', err)
        // hideLoading()
        reject(err)
      })
  })
}
// 获取单个圈子推荐资讯列表
function getCommunityClassifyRecommend({
  communityId = '',
  keyword = '',
  page = 1,
  pageSize = 10
}) {
  showLoading({ title: '加载中...', mask: true })
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appfindv129}/club/postList`, {
        type: 1,
        community_id: communityId,
        keyword,
        page,
        page_size: pageSize
      })
      .then(({ data: { code, msg, data: { list } } }) => {
        hideLoading()
        if (code === 0) {
          resolve(list)
        } else {
          failToast(msg)
        }
      })
      .catch(err => {
        console.log('获取单个圈子推荐资讯列表错误：', err)
        hideLoading()
        reject(err)
      })
  })
}

// 获取圈子详情的评论详情信息
function getCommunityCommentDetailInfo({ id = '', page = 1, pageSize = 10 }) {
  showLoading({ title: '加载中...', mask: true })
  return new Promise((resolve, reject) => {
    app
      .post(`${baseUrl.appfindv129}/comments/info`, {
        token: getStorageSync(TYPE_TOKEN),
        id,
        page,
        page_size: pageSize
      })
      .then(({ data: { code, msg, data } }) => {
        hideLoading()
        if (code === 0) resolve(data)
      })
      .catch(err => {
        console.log('获取圈子详情的评论详情信息错误：', err)
        hideLoading()
        reject(err)
      })
  })
}

module.exports = {
  sendPostMsg,
  getCommunityTab,
  uploadImage,
  praisePost,
  collectCancel,
  collectAdd,
  delPost,
  delComment,
  replyPostMsg,
  getCommunityDetailCommentList,
  getCommunityDetail,
  getCommunityAllRecommend,
  getCommunityClassifyRecommend,
  getCommunityCommentDetailInfo
}
