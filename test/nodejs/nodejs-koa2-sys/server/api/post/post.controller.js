
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

exports.getPost = async ctx => {
    const { id = 0} = ctx.params
const sql = `SELECT * FROM jy_blog_articles 
LEFT JOIN jy_blog_category ON jy_blog_articles.id = jy_blog_category.id
WHERE jy_blog_articles.stat = 1 AND jy_blog_articles.id = ${id}`
try{
    let result = await ctx.exceSql(sql)
    if (result.length) {
result = result[0]

    }else {
result = []
    }

ctx.body = {
        success: 1,
        message: '文章获取成功',
        list: result
      }; 
    
}catch(error){
ctx.body = {
        success: 0,
        message: '文章查询是吧',
        list: []
      }; 
}
}
