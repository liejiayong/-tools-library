import axios from "axios"
import { isDev } from "./index"

// 代理的配置,如果有修改,需要在'/src/setupProxy.js'中同时配置
const DEFAULT_PROXY = "/proxy"
const CUSTORM_PROXY_PREFIX = new RegExp("^\\/api")
const HTTP_REGX = /^http(s*):\/\//

// 请求取消方法列表,用于取消所有的请求
const requestCancelList = []

const axiosIns = axios.create({
  baseURL: "",
  timeout: 10000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
})

// 修改请求路径的前缀,用于代理
const withPrefix = url => {
  // 如果以http或https协议开头,则不使用代理
  if (HTTP_REGX.test(url)) {
    return url
  }

  // 检查url是否匹配自定义代理规则
  const hasCustomPrefix = CUSTORM_PROXY_PREFIX.test(url)

  if (hasCustomPrefix) {
    if (isDev) {
      return url
    } else {
      // 生产模式下, 自动去除自定义proxy
      const urlArr = url.split("/")
      urlArr.splice(0, 2)
      const baseReqUrl = "/" + urlArr.join("/")

      return baseReqUrl
    }
  } else {
    return isDev ? DEFAULT_PROXY + url : url
  }
}

// 请求拦截器
axiosIns.interceptors.request.use(
  config => {
    // 统一修改请求体,例如添加token
    const { url, headers } = config

    // if(token){
    //     headers.authorize=token
    // }

    const cancelToken = new axios.CancelToken(fnCancel => {
      // 将取消当前请求的方法收集起来
      requestCancelList.push(fnCancel)
    })

    return { ...config, url: withPrefix(url), headers, cancelToken }
  },
  error => Promise.reject(error)
)

// 返回拦截器
axiosIns.interceptors.response.use(
  result => {
    // if (result.data.code === 20000) {
    //   // 在"then"中捕获
    //   return result.data
    // } else {
    //   // 这里虽然也返回"result.data",但是会在"catch"中捕获
    //   return Promise.reject(result.data)
    // }

    return result.data
  },
  error => {
    return Promise.reject(error)
  }
)

const get = (url, params = null, config = {}) => axiosIns.get(url, { ...config, params })
const post = axiosIns.post
const all = axiosIns.all

/**
 * @desc 用于取消当前所有的请求
 * @param {String} mseesage 取消信息提示
 * @param {Number} waiting 由于运行时"requestCancelList"可能还没有添加最新的"fnCancel",因此添加一个延时(毫秒)
 */
const cleanRequest = (mseesage = "取消请求", waiting = 200) => {
  let timer = setTimeout(() => {
    clearTimeout(timer)
    requestCancelList.forEach(cancel => {
      cancel(mseesage)
    })
    requestCancelList.splice(0)
  }, waiting)
}

export { get, post, all, cleanRequest }
