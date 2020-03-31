'use strict';

function getPixelRatio(context) {
  var backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1
  return (window.devicePixelRatio || 1) / backingStore
}

class Scratchers {
  constructor($el = null, config) {
    const DEFAULT_CONFIG = {
      width: 300, // canvas 宽
      height: 150, // canvas 高
      awardImg: '', // 奖品图片
      coverImg: '', // 覆盖层图片
      coverColor: '#ccc', // 纯色覆盖层
      radius: 20, // 擦除手势半径
      pixelRatio: 1, // 屏幕倍数
      duration: 2000, // 展现全部的淡出效果时间（ms）
      percent: 60, // 刮开面积 占 整张刮卡的百分比
      onReady: function () { console.log('ready') },
      doneCallback: () => { console.log('done') }, // 全部刮开回调
      awardCssText: '', // 奖品图片样式
      unit: 'px', // 宽高css单位
      containerClass: 'jy-scraping-container', // 装载刮卡的父元素类名
      mode: 'default' // 刮刮卡刮开卡片模式。default:默认模式，一个个像素点刮开；sector:快速模式，以鼠标按下点开始到结束点形成扇形消除像素
    }

    this.config = Object.assign(DEFAULT_CONFIG, config)
    this.el = $el // 父挂载点
    this.parent = null // canvas挂载点
    this.cCover = null // canvas涂层
    this.cDisplayer = null // canvas奖品
    this.width = 0 // canvas width
    this.height = 0 // canvas height
    this.offsetTop = 0
    this.offsetLeft = 0
    this.pixelRatio = 1

    // this.version = pkg.version
    this.isDown = false // 手指按下
    this.done = false // 是否清除刮刮卡图层
    this.lock = true // 锁住不能刮
    this.first = true

    this._init();
  }
  setAward(params) {
    const { ctx } = this.cDisplayer,
      { width, height } = this,
      { url = "", msg = "" } = params
    // 图片
    if (url) {
      this.loadImg(url, function ({ image, width: cw, height: ch }) {
        let left = (cw - width) / 2,
          top = (ch - height) / 2
        console.log(image, top, left)
        ctx.save()
        ctx.globalCompositeOperation = 'source-over'
        ctx.drawImage(image, left, top, width, height)
        ctx.restore()
      },
        function () {
          console.log('the award image load error.')
        })
    }
    // 文字
    if (msg) {

    }
  }
  loadImg(url = '', success = () => { }, fail = () => { }) {
    const img = new Image()
    img.setAttribute('crossOrigin', 'anonymous')

    img.src = url
    img.onload = () => {
      success({
        image: img,
        width: img.width,
        height: img.height
      })
    }
    img.onerror = () => {
      fail()
      console.error('Image loading fail.')
    }
  }
  _createCanvas() {
    const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'),
      { width, height } = this,
      pixelRatio = getPixelRatio(ctx),
      widthReal = width * pixelRatio, heightReal = height * pixelRatio;

    ctx.scale(pixelRatio, pixelRatio)
    canvas.setAttribute('width', widthReal);
    canvas.setAttribute('height', heightReal);
    canvas.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%`;

    this.pixelRatio = pixelRatio

    return {
      canvas,
      ctx,
      width,
      height,
      pixelRatio,
      widthReal,
      heightReal
    }
  }
  _createDOM() {
    const { width, height, unit, containerClass } = this.config,
      el = this.el, parent = document.createElement('div')
    let cCover = null, cDisplayer = null

    parent.style.cssText = `;margin:0 auto;text-align:center;width:${width}${unit};height:${height}${unit};overflow:hidden;`
    parent.className = containerClass
    cCover = this._createCanvas()
    cDisplayer = this._createCanvas()

    parent.appendChild(cDisplayer.canvas)
    parent.appendChild(cCover.canvas)
    el.appendChild(parent)

    this.parent = parent
    this.cCover = cCover
    this.cDisplayer = cDisplayer
  }
  _init() {
    this._createDOM()
  }
}
