/*
 * @Description: 登录登出等验证模块
 * @version:
 * @Author: liejiayong(809206619@qq.com)
 * @Date: 2020-08-10 11:12:38
 * @LastEditors: liejiayong(809206619@qq.com)
 * @LastEditTime: 2020-08-10 14:19:55
 * @FilePath: \tool-library\test\nodejs\nodejs-koa2-sys\server\api\user\auth.controller.js
 * @可以输入预定的版权声明、个性签名、空行等
 */

/**
 * @description: 登录 
 * @param {type} 
 * @return {type} 
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-08-10 11:14:08
 */
exports.login = async ctx => {
    let { username = '', password = '' } = ctx.request.body
    if (!username || !password) {
        ctx.body = {
            success: 0,
            message: '用户名或密码不能为空'
        }
        return
    }

    try {
        let result = await ctx.exceSql(`SELECT id,nickname,password,register_type,phone,email,avatar_url FROM jy_blog_users WHERE username = ?`, username)
        if (result.length) {
            result = result[0]
            console.log('result', username, password, result[0])
            if (password === result.password) {
                ctx.session.user = result;
                // 用户token
                // const userToken = {
                //     name: userName,
                //     id: results[0].id
                // };
                // 签发token
                // const token = jwt.sign(userToken, config.tokenSecret, { expiresIn: '2h' });
                ctx.body = {
                    success: 1,
                    // token: token,
                    user: result,
                    message: '登录成功'
                };
            } else {
                ctx.body = {
                    success: 0,
                    message: '用户名或密码错误'
                }
            }
        } else {
            ctx.body = {
                success: 0,
                message: '用户名不存在'
            }
        }
    }
    catch (e) {
        ctx.body = {
            success: 0,
            message: '查询数据出错'
        }
    }
}

exports.logout = async ctx => {
    ctx.session.user = null
    ctx.body = {
        success: 1,
        message: '登出成功'
    }
}
