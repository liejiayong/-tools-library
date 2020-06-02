/**
 * 初始化community-detail --- comment-tab配置
 * @param {*} target 
 * @param {*} src 
 */
export const initialCommentInfo = (target = [], src = {}) => {
    if (target.length === 0) return
    target.forEach(t => {
        if (t.name === 'isLiked' && src[t.name]) t['isLiked'] = src['isLiked']
        if (t.name === 'likeCount' && src[t.name]) t['count'] = src['likeCount']
        if (t.name === 'replyCount' && src[t.name]) t['count'] = src['replyCount']
    })
}