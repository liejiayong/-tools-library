const moment = require('moment')
const xss = require('xss')

/**
 * @description: 获取文章列表
 * @param {type} 
 * @return {type} 
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-08-14 17:54:45
 */
exports.getPostList = async (ctx) => {
    let { page = 1, total = 10 } = ctx.query
    const pageIndex = page - 1 < 0 ? 0 : (page - 1) * total
    // let sql = ` SELECT post.id, post.title, post.content, 
    // post.poster, post.createTime, post.categoryId, category.name AS categoryName 
    // FROM post LEFT JOIN category ON post.categoryId = category.id WHERE post.status = 'PUBLISHED'
    // ORDER BY post.createTime DESC LIMIT ${pageIndex}, ${pageNum}`;
    const sql = `SELECT * FROM jy_blog_articles 
            LEFT JOIN jy_blog_category ON jy_blog_articles.id = jy_blog_category.id WHERE jy_blog_articles.stat = 1 
            ORDER BY jy_blog_articles.create_date DESC LIMIT ${pageIndex}, ${total};`
    try {
        let result = await ctx.exceSql(sql)
        result = result.map(element => {
            return {
                ...element,
                content: element.content.split('\n').slice(0, 10).join('\n')
            }
        })
        console.log('post list', result)
        ctx.body = {
            success: 1,
            message: '文章获取成功',
            list: result,
            ctx
        }
    } catch (error) {
        ctx.body = {
            success: 0,
            message: '查询数据出错',
            list: [],
            ctx
        }
    }
}

/**
 * @description: 根据文章ID获取文章内容
 * @param {type} 
 * @return {type} 
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-08-14 17:55:08
 */
exports.getPost = async ctx => {
    const { id = 0 } = ctx.params
    const sql = `SELECT * FROM jy_blog_articles 
LEFT JOIN jy_blog_category ON jy_blog_articles.id = jy_blog_category.id
WHERE jy_blog_articles.stat = 1 AND jy_blog_articles.id = ${id}`
    try {
        let result = await ctx.exceSql(sql)
        if (result.length) {
            result = result[0]

        } else {
            result = []
        }

        ctx.body = {
            success: 1,
            message: '文章获取成功',
            list: result
        };

    } catch (error) {
        ctx.body = {
            success: 0,
            message: '文章查询失败',
            list: []
        };
    }
}

/**
 * @description: 添加文章
 * @param {type} 
 * @return {type} 
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-08-15 22:50:25
 */
exports.addPost = async ctx => {
    let { title, content, category, tags, userid } = ctx.request.body,
        // let { title, content, category, tags, userid } = ctx.query,
        date = moment().format('YYYY-MM-DD HH:mm:ss')
    // date = Date.now()
    try {
        const user = await ctx.exceSql(`SELECT id FROM jy_blog_users WHERE id=${userid};`)
        if (!user.length) {
            ctx.body = {
                success: 0,
                message: '检测用户id异常'
            }
            return
        }
        if (!title || !content) {
            ctx.body = {
                success: 0,
                message: '请检查参数是否正确'
            }
            return
        }

        title = xss(title)
        content = xss(content)

        const sql = `INSERT INTO jy_blog_articles (user_id, title, content, stat, create_date, update_date) VALUES ('${userid}', '${title}', '${content}', 1, '${date}', '${date}');`

        // console.log(ctx.query, sql)

        let result = await ctx.exceSql(sql)
        ctx.body = {
            success: 1,
            message: '文章添加成功',
            result
        }
    } catch (error) {
        ctx.body = {
            success: 0,
            message: '文章添加出错'
        }
    }
}

/**
 * @description: 删除文字
 * @param {type} 
 * @return {type} 
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-08-15 22:50:19
 */
exports.delPost = async ctx => {
    const { id, userid } = ctx.request.body

    try {
        const post = await ctx.exceSql(`SELECT id,user_id FROM jy_blog_articles WHERE id=${id} AND user_id=${userid};`)
        if (!post.length) {
            ctx.body = {
                success: 0,
                message: '文章不存在'
            }
            return
        }

        const del = await ctx.exceSql(`UPDATE jy_blog_articles SET stat=0 WHERE id=${id};`)
        ctx.body = {
            success: 1,
            message: '文章删除成功'
        }
    } catch (error) {
        ctx.body = {
            success: 0,
            message: '文章删除出错'
        } 
    }
}
