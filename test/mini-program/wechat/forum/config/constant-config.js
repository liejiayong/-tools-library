// 全局常量
// storage name 
const SESSION_ID = 'phpsessid'
// storage name 
const TYPE_TOKEN = 'token'
// storage name 
const TYPE_CODE = 'code'
// storage name 
const TYPE_IV = 'iv'
// storage name 
const TYPE_APPID = 'app_id'
// storage name 
const TYPE_ENCRYPTEDDATA = 'encryptedData'
// storage user_id
const TYPE_USER_ID = 'tw_miniprogrammer_user_id'
// storage name 进入小程序的页面路径
const TYPE_CONFIG_PAGE_PATH = 'tw_config_page_path'
// storage name 首次登陆标识
const TYPE_LOGIN_FIRST = 'twzx_miniprogram_first_signin'
// storage 系统参数
const TYPE_CONFIT_PLAT_SYS_INFO = 'tw_config_plation_system_info'
// storage 帖子被删除标志
const TYPE_COMMUNICATY_POST_DEDTE_FLAG = 'tw_type_community_post_delete_flag'

/**
 * storage 小程序登录状态
 * 
 * login 登录态
 * authorize 授权态
 */
// 登录态
const TYPE_CONFIG_LOGIN_STATUS_LOGIN = 'type_config_login_status_login'
// 授权态
const TYPE_CONFIG_LOGIN_STATUS_AUTHORIZE = 'type_config_login_status_authorize'
// 贪玩资讯小程序appid
const TYPE_CONFIG_TW_APPID = 'wxbb29a8131c5d1457'

// 请求header param 的 token
const TYPE_CONFIG_HEADER_PAEAM_SESSIONID = '8c2e01c833023237c9cbfbe4d350944d'

// 请求header的param参数plat，微信小程序定死为3，用于统计数据
const TYPE_CONFIG_HEADER_PARAM_PLAT = 3

// 请求header的param参数channel APP渠道，默认为wxapp
const TYPE_CONFIG_HEADER_PARAM_APP_CHANNEL = 'wxapp'

// 请求header的param参数version APP版本，默认为v1.2.7
const TYPE_CONFIG_HEADER_PARAM_APP_VERSION = 'v1.2.7'

module.exports = {
    TYPE_ENCRYPTEDDATA,
    TYPE_APPID,
    TYPE_IV,
    TYPE_CODE,
    TYPE_TOKEN,
    SESSION_ID,
    TYPE_USER_ID,
    TYPE_CONFIG_TW_APPID,
    TYPE_CONFIT_PLAT_SYS_INFO,
    TYPE_CONFIG_PAGE_PATH,
    TYPE_COMMUNICATY_POST_DEDTE_FLAG,
    TYPE_CONFIG_LOGIN_STATUS_LOGIN,
    TYPE_CONFIG_LOGIN_STATUS_AUTHORIZE,
    TYPE_CONFIG_HEADER_PAEAM_SESSIONID,
    TYPE_CONFIG_HEADER_PARAM_PLAT,
    TYPE_CONFIG_HEADER_PARAM_APP_CHANNEL,
    TYPE_CONFIG_HEADER_PARAM_APP_VERSION
}
