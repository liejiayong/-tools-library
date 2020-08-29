/*
 * @Description: 登录登出等验证模块
 * @version:
 * @Author: liejiayong(809206619@qq.com)
 * @Date: 2020-08-10 11:12:38
 * @LastEditors: liejiayong(809206619@qq.com)
 * @LastEditTime: 2020-08-29 16:56:06
 * @FilePath: \tool-library\test\nodejs\nodejs-koa2-sys\server\api\user\auth.controller.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
const jwt = require('jsonwebtoken')
const config = require('../../config/environment')

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
        let result = await ctx.exceSql(`SELECT id,nickname,username,password,register_type,phone,email,avatar_url FROM jy_blog_users WHERE username = ?`, username)
        if (result.length) {
            result = result[0]
            if (password == result.password) {
                ctx.session.user = result.username;
                // 签发token
                const token = jwt.sign({
                    name: result.username,
                    id: result.id
                }, config.tokenSecret, { expiresIn: '2h' })
                ctx.body = {
                    success: 1,
                    token: token,
                    user: result,
                    message: '登录成功'
                }
                // console.log('result:', result)
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

/**
 * @description: 注册账号
 * @param {type} 
 * @return {type} 
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-08-24 16:49:33
 */
exports.registry = async ctx => {
    let { username = '', password = '', repassword = '', code = '' } = ctx.request.body
    console.log('12313')
    if (!username || !password) {
        ctx.body = {
            success: 0,
            message: '用户名或密码不能为空'
        }
        return
    }
    if (password !== repassword) {
        ctx.body = {
            success: 0,
            message: '两次输入密码不一致'
        }
        return
    }
    // if (!code) {
    //     ctx.body = {
    //         success: 0,
    //         message: '手机验证码不正确'
    //     }
    //     return
    // }

    try {
        let isLogin = await ctx.exceSql(`SELECT username FROM jy_blog_users WHERE username = ?`, username)
        if (isLogin.length) {
            ctx.body = {
                success: 0,
                message: '该用户已存在'
            }
            return
        }

        await ctx.exceSql(`INSERT INTO jy_blog_users (username, password) VALUES(?, ?)`, [username, password])
        ctx.body = {
            success: 1,
            data: {
                username,
            },
            message: '注册成功'
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
