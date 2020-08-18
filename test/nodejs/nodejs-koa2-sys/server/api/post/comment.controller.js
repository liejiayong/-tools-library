const moment = require('moment')
const xss = require('xss')

/**
 * @description: 添加评论
 * @param {type} 
 * @return {type} 
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-08-17 10:13:45
 */
exports.add = async ctx => {
    let { userid, article_id, content, parentid } = ctx.request.body

    try {
        ctx.body = {
            success: 1,
            message: '评论成功'
        }
    } catch (error) {
        ctx.body = {
            success: 0,
            message: '评论出错啦'
        }
    }
}
