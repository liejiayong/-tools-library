// // 测试版
// const baseUrl = {
//   // 游戏资讯模块
//   pcgame: 'https://hd.tanwan.com/api/wxapp', // 贪玩pc端 - 资讯
//   pcvedio: 'https://hd.tanwan.com/huodong/xcx/twyx', // 贪玩pc端 - 视频
//   hotPostTest: 'https://appfindtest.tanwan.com', // app圈子测试
//   appfind: 'https://appfindtest.tanwan.com/api_v1.2.7', // app圈子
//   appfindtest: 'https://appfindtest.tanwan.com/api_v1.2.7', // app圈子test
//   apphome: 'https://apphometest.tanwan.com/api_v1.2.7', // app首页
//   appuser: 'https://appusertest.tanwan.com/api_v1.2.9' // app用户
// }
// 正式版
const baseUrl = {
  // 游戏资讯模块
  pcgame: 'https://hd.tanwan.com/api/wxapp', // 贪玩pc端 - 资讯
  pcvedio: 'https://hd.tanwan.com/huodong/xcx/twyx', // 贪玩pc端 - 视频
  hotPostTest: 'https://appfindtest.tanwan.com', // app圈子测试
  appfind: 'https://appfind.tanwan.com/api_v1.2.7', // app圈子
  appfindtest: 'https://appfindtest.tanwan.com/api_v1.2.7', // app圈子test
  appfindv129: 'https://appfind.tanwan.com/api_v1.2.9', // app圈子
  appfindtestv129: 'https://appfindtest.tanwan.com/api_v1.2.9', // app圈子test
  apphomev127: 'https://apphome.tanwan.com/api_v1.2.7', // app首页
  apphomev129: 'https://apphome.tanwan.com/api_v1.2.9', // app首页
  appuserv127: 'https://appuser.tanwan.com/api_v1.2.7', // app用户v1.2.7
  appuserv129: 'https://appuser.tanwan.com/api_v1.2.9' // app用户v1.2.9
}

// 登录
const loginUrl = `${baseUrl.pcgame}/login.php`

// 验证返回code 信息
const authCode = {
  102002: {
    code: 102002,
    msg: '加密失败'
  },
  103001: {
    code: 103001,
    msg: '用户没登录'
  },
  103009: {
    code: 103009,
    msg: 'token失效'
  }
}

module.exports = {
  baseUrl,
  loginUrl,
  authCode
}
