const app = getApp()
const { getCommunityTab, sendPostMsg } = require('../../api/community')
const { shareTitle } = require('../../config/config')
const {
  navigateBack,
  pageScrollTo,
  stopPullDownRefresh,
  navigateTo,
  showToast,
  switchTab,
  getRandom,
  findIndex,
  showLoading,
  hideLoading
} = require('../../utils/util')

Page({
  data: {
    officialNameList: [], // 圈子名称列表
    officialIdList: [], // 圈子id列表
    currentOfficialIndex: -1, // 当前圈子下标
    currentOfficialId: -1, // 当前圈子id
    urlList: [], // 上传图片url <Array>
    type: '',
    search: '',
    name: '',
    pagetype: ''
  },
  onLoad({ id, type, search, name, pagetype }) {
    // console.log('=== 圈子发帖', type, search, id, name, pagetype)
    if (id) this.data.currentOfficialId = +id
    if (type) this.data.type = type
    if (search) this.data.search = search
    if (name) this.data.name = name
    if (pagetype) this.data.pagetype = pagetype
  },
  onReady() {
    this.initialCommunityTab()
  },
  onShow() {},
  onHide() {},
  onUnload() {},
  // 获取热帖推荐-圈子列表
  initialCommunityTab() {
    getCommunityTab()
      .then(list => {
        const officialIdList = []
        const officialNameList = []
        list.forEach(v => {
          officialNameList.push(v.community_name)
          officialIdList.push(+v.community_id)
        })
        this.setData({ officialNameList, officialIdList }, () => {
          if (this.data.currentOfficialId > -1) this.initialCurrentOfficialIndex()
        })
      })
      .catch(err => {
        console.log('获取热帖推荐-圈子列表错误:' + err)
      })
  },
  initialCurrentOfficialIndex() {
    const { officialIdList, currentOfficialId } = this.data
    const currentOfficialIndex = findIndex(officialIdList, currentOfficialId)
    this.setData({ currentOfficialIndex })
  },
  // 获取上传图片
  handleGetUploadImg({ detail }) {
    if (detail.length === 0) return
    this.data.urlList = detail.map(v => {
      return {
        url: v
      }
    })
  },
  // 社区名
  handlePickerChange({ detail: { value } }) {
    const currentOfficialIndex = +value
    this.data.currentOfficialId = this.data.officialIdList[currentOfficialIndex]
    this.setData({ currentOfficialIndex })
  },
  // 提交帖子
  handleFormSubmit({
    detail: {
      value: { title, content }
    }
  }) {
    if (!title) return showToast({title: '标题不能为空！'})
    if (!content) return showToast({title: '帖子内容不能为空！'})
    const { currentOfficialId: communityId, urlList: images } = this.data
    if (communityId < 0) {
      return showToast({
        title: '请选择圈子'
      })
    }
    if (content.length < 4) {
      return showToast({
        title: '帖子内容不能少于4个字'
      })
    }
    const param = {
      communityId,
      title,
      content
    }
    console.log('send info', communityId, title, content)
    if (images.length) param.images = JSON.stringify(images)
    sendPostMsg(param).then(res => {
      const { code, msg } = res
      if (code === 0) {
        showToast({
          title: msg
        }).then(() => {
          const { currentOfficialIndex, officialNameList, type } = this.data
          const community = officialNameList[currentOfficialIndex]
          // console.log(community)
          if (type !== 'app') showToast({title: `发帖成功，请到${community}圈子下查看您的帖子吧~`, mask: true, duration: 1500})
          const timer = setTimeout(() => {
            clearTimeout(timer)
            this.goback()
          }, 2000)
        })
      }
    })
  },
  goback() {
    navigateBack()
  }
})
