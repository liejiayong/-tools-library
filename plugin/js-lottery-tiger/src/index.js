export default class LotteryTiger {
  constructor() {
    this.mode = 'background' // 拥有模式：background(图片背景移动)、transform(元素移动)
    this.stat = false // 中奖状态，不中奖（false)，中奖则设置中奖下标
  }
}
