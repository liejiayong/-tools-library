const app = getApp()
const { gridNavigateTo, listviewNavigateTo } = require('../../utils/account-center')
const { getAccountInfo } = require('../../api/account')
const { navigateTo } = require('../../utils/util')
const { listviewConfig, TYPE_CONFIG_LISTVIEW_MEDAL } = require('../../config/components/listview-config')
const { gridConfig, TYPE_CONFIG_GRID_FANS, TYPE_CONFIG_GRID_FOCUS, TYPE_CONFIG_GRID_GETPRARIS, TYPE_CONFIG_GRID_REPLY } = require('../../config/components/grid-config')

Page({
  data: {
    accountList: null, // 账号信息
    listviewList: [],
    gridList: []
  },
  onLoad(options) {

  },
  onReady() {
  },
  onShow() {
    // if (app.globalData.isMedalWear) this.getAccount()
    this.getAccount()
  },
  onHide() {

  },
  onUnload() {

  },
  // 用户信息
  getAccount() {
    getAccountInfo({}).then(({ info: accountList }) => {
      // listview
      listviewConfig[TYPE_CONFIG_LISTVIEW_MEDAL].count = accountList.madel_count

      // grid
      gridConfig[TYPE_CONFIG_GRID_REPLY].count = accountList.comment_count
      gridConfig[TYPE_CONFIG_GRID_FANS].count = accountList.by_subscribe
      gridConfig[TYPE_CONFIG_GRID_FOCUS].count = accountList.subscribe
      gridConfig[TYPE_CONFIG_GRID_GETPRARIS].count = accountList.likes

      this.setData({ accountList, listviewList: listviewConfig, gridList: gridConfig })
    })
  },
  // 选择grid 项
  handleSelectGrid({ detail }) {
    // console.log('grid', detail)
    const { id } = this.data.accountList
    gridNavigateTo(detail, id)
  },
  // 选择listview 项
  handleSelectListview({ detail }) {
    // console.log('listview', detail)
    const { id } = this.data.accountList
    listviewNavigateTo(detail, id)
  },
  onPullDownRefresh() {

  },
  onReachBottom() {

  }
  // onShareAppMessage() {

  // }
})