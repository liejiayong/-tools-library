const TYPE_CONFIG_COMMUNITY_DETAIL_TAB_PRAISE = '0'
const TYPE_CONFIG_COMMUNITY_DETAIL_TAB_REPLY = '1'
const TYPE_CONFIG_COMMUNITY_DETAIL_TAB_SHARE = '2'
const TYPE_CONFIG_COMMUNITY_DETAIL_TAB_MORE = '3'
const TYPE_CONFIG_COMMUNITY_DETAIL_TAB_DELETE = '4'
const TYPE_CONFIG_COMMUNITY_DETAIL_TAB_COLLECTION = '5'
const TYPE_CONFIG_COMMUNITY_DETAIL_TAB_PACKUP = '6'

// 论坛详情页 -- 评论菜单config
const forumTabConfig = [
    {
        type: TYPE_CONFIG_COMMUNITY_DETAIL_TAB_PRAISE,
        name: 'likeCount',
        text: '点赞',
        icon: 'icon-like-black',
        count: 0,
        isCount: true,
        like: 0,
        isLiked: false,
        isBorder: true
    },
    {
        type: TYPE_CONFIG_COMMUNITY_DETAIL_TAB_REPLY,
        name: 'replyCount',
        text: '评论',
        icon: 'icon-msg-black',
        count: 0,
        isCount: true,
        isBorder: true
    },
    {
        type: TYPE_CONFIG_COMMUNITY_DETAIL_TAB_SHARE,
        name: 'share',
        text: '分享',
        icon: 'icon-share-black',
        isBorder: true
    },
    {
        type: TYPE_CONFIG_COMMUNITY_DETAIL_TAB_MORE,
        name: 'more',
        text: '更多',
        icon: 'icon-more-black',
        isBorder: false,
        isMore: true // 展示更多
    },
    {
        type: TYPE_CONFIG_COMMUNITY_DETAIL_TAB_DELETE,
        name: 'delete',
        text: '删除',
        icon: 'icon-delete-black',
        isDel: false,
        isBorder: true
    },
    {
        type: TYPE_CONFIG_COMMUNITY_DETAIL_TAB_COLLECTION,
        name: 'collection',
        text: '收藏',
        icon: 'icon-collection-black',
        isCollect: false,
        isBorder: true
    }
    // {
    //     type: TYPE_CONFIG_COMMUNITY_DETAIL_TAB_PACKUP,
    //     name: 'packup',
    //     text: '收起',
    //     icon: 'icon-packup-black',
    //     isBorder: false
    // },
]

module.exports = {
    forumTabConfig,
    TYPE_CONFIG_COMMUNITY_DETAIL_TAB_PACKUP,
    TYPE_CONFIG_COMMUNITY_DETAIL_TAB_COLLECTION,
    TYPE_CONFIG_COMMUNITY_DETAIL_TAB_DELETE,
    TYPE_CONFIG_COMMUNITY_DETAIL_TAB_MORE,
    TYPE_CONFIG_COMMUNITY_DETAIL_TAB_SHARE,
    TYPE_CONFIG_COMMUNITY_DETAIL_TAB_REPLY,
    TYPE_CONFIG_COMMUNITY_DETAIL_TAB_PRAISE
}