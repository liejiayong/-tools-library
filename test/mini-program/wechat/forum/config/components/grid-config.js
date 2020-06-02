// grid flag
const TYPE_CONFIG_GRID_REPLY = '0'
const TYPE_CONFIG_GRID_GETPRARIS = '1'
const TYPE_CONFIG_GRID_FOCUS = '2'
const TYPE_CONFIG_GRID_FANS = '3'

// grid config
const gridConfig = [
    {
        type: TYPE_CONFIG_GRID_REPLY,
        text: '评论',
        name: 'comment',
        count: 0,
        icon: '',
        routeLink: 'user-comment/user-comment'
    },
    {
        type: TYPE_CONFIG_GRID_GETPRARIS,
        text: '获赞',
        name: 'praise',
        count: 0,
        icon: '',
        routeLink: 'user-get-praise/user-get-praise'
    },
    {
        type: TYPE_CONFIG_GRID_FOCUS,
        text: '关注',
        name: 'focus',
        count: 0,
        icon: '',
        routeLink: 'user-focus/user-focus'
    },
    {
        type: TYPE_CONFIG_GRID_FANS,
        text: '粉丝',
        name: 'fans',
        count: 0,
        icon: '',
        routeLink: 'user-fans/user-fans'
    }
]

module.exports = {
    gridConfig,
    TYPE_CONFIG_GRID_FANS,
    TYPE_CONFIG_GRID_FOCUS,
    TYPE_CONFIG_GRID_GETPRARIS,
    TYPE_CONFIG_GRID_REPLY
}
