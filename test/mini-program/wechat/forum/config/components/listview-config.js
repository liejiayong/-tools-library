// listview flag
const TYPE_CONFIG_LISTVIEW_POST = '0'
const TYPE_CONFIG_LISTVIEW_COLLECTION = '1'
const TYPE_CONFIG_LISTVIEW_MEDAL = '2'
const TYPE_CONFIG_LISTVIEW_ABOUTTW = '3'

// listview config
const listviewConfig = [
  {
    type: TYPE_CONFIG_LISTVIEW_POST,
    text: '我的帖子',
    name: 'mypost',
    count: 0,
    isCount: false,
    avatorIcon: 'icon-mypost.png',
    routeLink: 'user-post/user-post'
  },
  {
    type: TYPE_CONFIG_LISTVIEW_COLLECTION,
    text: '我的收藏',
    name: 'mycollection',
    count: 0,
    isCount: false,
    avatorIcon: 'icon-mycollection.png',
    routeLink: 'user-collection/user-collection'
  },
  {
    type: TYPE_CONFIG_LISTVIEW_MEDAL,
    text: '我的勋章',
    name: 'mymedal',
    count: 0,
    isCount: true,
    avatorIcon: 'icon-mymedal.png',
    routeLink: 'user-medal/user-medal'
  },
  {
    type: TYPE_CONFIG_LISTVIEW_ABOUTTW,
    text: '关于贪玩游戏',
    name: 'aboutTW',
    count: 0,
    isCount: false,
    avatorIcon: 'icon-setting.png',
    routeLink: '../about-tw/about-tw'
  }
]

module.exports = {
  TYPE_CONFIG_LISTVIEW_POST,
  TYPE_CONFIG_LISTVIEW_COLLECTION,
  TYPE_CONFIG_LISTVIEW_MEDAL,
  TYPE_CONFIG_LISTVIEW_ABOUTTW,
  listviewConfig
}
