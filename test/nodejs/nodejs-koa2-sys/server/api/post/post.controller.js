exports.getPostList = async (ctx) => {
    let { page = 1, pageNum = 10 } = ctx.query
    // console.log(page, pageNum)
    console.log(JSON.stringify(ctx.query))
    ctx.body = {
        success: 1,
        message: '登录成功'
    }
}
