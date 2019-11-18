import axios from 'axios'
import qs from "qs"
import { Message } from 'element-ui'
import router from '@/router/index'
import util from '@/utils/index'
import { COOKIES_TYPE_TOKEN, COOKIES_TYPE_USERINFO, COOKIES_TYPE_REQUIRE_AUTH, COOKIES_TYPE_HTTP_HEADER_XTOKEN } from '@/config/cookies'
import vueInstall from '@/main'

// 取消ajax
const cancelToken = {
  Construct: axios.CancelToken, // 构造器
  record: [], //声明一个数组用于存储每个ajax请求的取消函数和ajax标识的记录
  remove(req) { //在一个ajax发送前执行一下取消操作,移除记录
    const record = this.record
    for (let p in record) {
      let curr = req.url + '&' + req.method
      let last = record[p].u
      if (curr.includes(last)) {
        //当当前请求在数组中存在时执行函数体
        record[p].cancel() // 执行取消操作
        record.splice(p, 1) //把这条记录从数组中移除
      }
    }
  },
  set(req) { // 设置记录
    this.remove()
    req.cancelToken = new axios.CancelToken(cancel => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      this.record.push({ u: config.url + '&' + config.method, cancel })
    })
  }
}

const baseURL = process.env.NODE_ENV === 'production' ? '/' : '/api'
const baseURLMap = {
  production: {
    '/api': 'https://www.ysdwat.com',
    '/ws': 'https://chat.ysdwat.com'
  },
  development: {
    '/api': '/api',
    '/ws': '/ws'
  }
}

export const setBaseURL = (config, baseUrlMap = baseURLMap) => {
  const env = process.env.NODE_ENV
  const baseURL = config.baseURL
  config.baseURL = baseUrlMap[env][baseURL]
}

var http = axios.create({
  baseURL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } //'multipart/form-data';//表单上传file
});

// 添加请求拦截器
http.interceptors.request.use(
  config => {
    setBaseURL(config)
    //是否存在token
    var token = vueInstall.$store.state.token || util.getItem(COOKIES_TYPE_TOKEN)
    //是否需要登陆权限
    var requiresAuth = util.getItem(COOKIES_TYPE_REQUIRE_AUTH)
    // 设置cancelToken
    cancelToken.set(config)
    // 在发送请求之前做某件事
    if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
      //过滤掉对象参数值为""、null、undefined
      config.data = util.dealObjectValue(config.data)
      // 序列化
      config.data = qs.stringify(config.data)
    }
    if (requiresAuth && token) {
      //如果存在token的话，则每个http header都加上token
      // console.log('token', token)
      config.headers[COOKIES_TYPE_HTTP_HEADER_XTOKEN] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error)
  })

// 添加响应拦截器
http.interceptors.response.use(
  response => {
    let code = response.data.code;
    // console.log(response, 'response')
    //code如果为50001返回到登录页面
    if (code == 50001 || code == 50002 || code == 50003 || code == 50004) {
      // 通过状态码判断token是否失效或者token是否错误，若是，直接返回登录页面
      util.removeItem(COOKIES_TYPE_TOKEN)
      util.removeItem(COOKIES_TYPE_USERINFO)
      router.push({
        name: 'auth_index',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    } else if (code != 0) {
      Message({
        // message: error.message,
        message: '服务器繁忙，请稍后重试！',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return response.data;
  },
  error => {
    return Promise.reject(error)
  })

export default http
