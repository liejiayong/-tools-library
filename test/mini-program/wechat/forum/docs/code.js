/**************通用错误分组START*****************/
/***
 * 参数为空
 */
const CODE_COMMON_PARAM_EMPTY = 100001
/***
 * 无效请求
 */
const CODE_COMMON_INVALID_REQUEST = 100002
/***
 * 验证码输入错误
 */
const CODE_COMMON_PHONE_CHECK_CODE_ERROR = 100003
/**
 * 内容被删除
 */
const CODE_COMMON_DETAILS_DELETED = 100004
/**
 * 禁止回复
 */
const CODE_COMMON_NOT_REPLY = 100005
/**
 * 禁止删除评论
 */
const CODE_COMMON_REPLY_NOT_DELETE = 100006
/**
 * 不能重复关注圈子
 */
const CODE_COMMON_CLUB_NOT_SUBSCRIBE = 100007
/**
 * 不满足条件
 */
const CODE_COMMON_NOT_ACCESS = 100008
/**
 * 禁止重复操作
 */
const CODE_COMMON_NOT_RE_OPERATION = 100009
/**************通用错误分组END*****************/

/**************系统错误分组START*****************/
/***
 * 系统错误
 */
const CODE_SYSTEM_ERROR = 102001
/**
 * 加密失败
 */
const CODE_SIGN_ERROR = 102002
/**************系统错误分组END*****************/

/**************用户层错误分组START*************/
/***
 * 用户未登录
 */
const CODE_USER_NOT_LOGIN = 103001
/***
 * 帐号不存在
 */
const CODE_USER_ACCOUNT_NOT_EXISTS = 103002
/***
 * 帐号已经存在
 */
const CODE_USER_ACCOUNT_EXISTS = 103003
/***
 * 密码错误
 */
const CODE_USER_PASSWORD_ERROR = 103004
/***
 * 帐号格式错误
 */
const CODE_USER_ACCOUNT_FORMAT_ERROR = 103005
/***
 * 密码格式不对
 */
const CODE_USER_PASS_FORMAT_ERROR = 103006
/***
 * 无效的邀请码
 */
const CODE_USER_INVALID_INVITE_CODE = 103007
/***
 * 已经绑定手机
 */
const CODE_USER_ALREADY_BIND_PHONE = 103008
/***
 * token已经失效
 */
const CODE_USER_TOKEN_EXPIRE = 103009
/***
 * 用户未绑定手机
 */
const CODE_USER_NO_BIND_PHONE = 103010
/***
 * 不允许关注自己
 */
const CODE_USER_FOCUS_ME = 103011
/**
 * 已被别人操作，设置晚了
 */
const CODE_USER_SET_LATE = 103012

/**
 * 没有操作权限
 */
const CODE_USER_NOT_AUTH = 103013
