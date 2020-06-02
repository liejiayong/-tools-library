// 等级类名配置
const levelConfig = {
  count: ['1', '10', 'MAX'],
  cls: ['', 'level-10', 'level-max']
}

// 圈子名称-id
const groupConfig = [
  {
    id: '13',
    name: '一品官老爷'
  },
  {
    id: '17',
    name: '贪玩蓝月页游'
  },
  {
    id: '18',
    name: '贪玩蓝月手游'
  },
  {
    id: '29',
    name: '传奇世界页游'
  },
  {
    id: '12',
    name: '	龙腾传世手游'
  },
  {
    id: '20',
    name: '玛法英雄H5'
  },
  {
    id: '24',
    name: '天下会 - 公会'
  },
  {
    id: '31',
    name: '義本無言 - 公会'
  },
  {
    id: '32',
    name: '杭州公馆 - 公会'
  }
]

// 分享文案
const shareTitle = ['你能想到的【贪玩】故事，都在这里~', '古天乐陈小春都加入了的小程序', '古天乐喊你来打boss，还在等什么']

// 回到顶部位置
const SCROLL_TOP = 300

// 资讯公众号排序
const gameOrder = [
  {
    name: '贪玩蓝月手游',
    rename: ''
  },
  {
    name: '贪玩蓝月传奇',
    rename: '贪玩蓝月页游'
  },
  {
    name: '贪玩龙腾传世',
    rename: '龙腾传世手游'
  },
  {
    name: '贪玩传奇世界',
    rename: '传奇世界页游'
  },
  {
    name: '蓝月传奇手游',
    rename: ''
  },
  {
    name: '热血连击',
    rename: ''
  }
]

// 热帖公众号排序
const communityOrder = [
  {
    name: '贪玩蓝月手游'
  },
  {
    name: '贪玩蓝月网页版'
  },
  {
    name: '龙腾传世手游'
  },
  {
    name: '传奇世界网页版'
  },
  {
    name: '玛法英雄H5'
  },
  {
    name: '魔域来了'
  },
  {
    name: '安全区'
  }
]

// 评论栏高度状态
const commentStatus = {
  focus: '750rpx',
  common: '460rpx'
}

// tabBar navigator 的路由路径
const tabBarConfig = [
  'pages/community-post/community-post',
  'pages/new-post/new-post',
  'pages/account-center/account-center'
]

// 首页url
const homePageUrl = '/pages/community-post/community-post'
// 登录url
const loginPageUrl = '/pages/login/login'

module.exports = {
  levelConfig,
  groupConfig,
  tabBarConfig,
  shareTitle,
  SCROLL_TOP,
  communityOrder,
  gameOrder,
  commentStatus,
  homePageUrl,
  loginPageUrl
}
