const prefix = 'twg_'

// 首次进入网站
export const COOKIES_FIRST_ENTER = `${prefix}first_enter`
// 用户信息
export const COOKIES_TYPE_USERINFO = `${prefix}user`
// token
export const COOKIES_TYPE_TOKEN = `${prefix}token`
// 路由认证记录
export const COOKIES_TYPE_REQUIRE_AUTH = `${prefix}requires_auth`
// 微信授权标识
export const COOKIES_TYPE_AUTH_BIND_WECHAT_PATH = `${prefix}auth_bind_wechat_path`
// http header x-token
export const COOKIES_TYPE_HTTP_HEADER_XTOKEN = `x-token`
// 版本缓存
export const COOKIES_TYPE_WAP_VERSION = `${prefix}_wap_version`