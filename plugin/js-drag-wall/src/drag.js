'use strict'

// import domUtil from './dom'
import './simulateTouch.js'

/*
 * name: 拖拽插件
 * Description: 兼容ie10及以上现代浏览器。支持监听、禁用、随机打乱等功能
 * version: 0.0.2
 * Author: liejiayong(809206619@qq.com)
 * Date: 2020-06-13 16:29:08
 * LastEditors: liejiayong(809206619@qq.com)
 * LastEditTime: 2020-06-13 16:02:50
 */
/**
 * 获取随机整数
 * @param {*} min 最小值
 * @param {*} max 最大值
 */
function getRandom(min, max) {
  return min + ~~(Math.random() * (max - min + 1))
}

/**
 * 将对象转化为cssText字符串
 * @param {*} params 
 */
function oToCssText(params = {}) {
  let ret = ''
  for (let key of params) {
    ret += `${key}:${params[key]};`
  }

  return ret
}

const DEFAULT_CONFIG = {
  parentsCls: '.jy-wall-drag',
  child: {
    cls: '.item',
    width: 0,
    height: 0
  },
  gutter: 20,
  onMoveBefore: () => { },
  onMove: () => { },
  onMoveEnd: () => { }
}

class Drag {
  constructor(options) {
    this.DEFAULT_CONFIG = DEFAULT_CONFIG
    this.options = Object.assign({}, DEFAULT_CONFIG, options)

    // 元素
    this.$parent = null // 父元素
    this.$children = null // 拖拽元素集合
    this.parent = null // 父元素position
    this.target = null // 当前拖拽元素position
    // this.diffGutter = null // 父元素与拖拽元素可活动空隙

    // 状态
    this.istap = false // 按下
    this.isplay = true // 游戏状态。true:可拖拽；false：不可拖拽

    this._initial()
  }
  /**
   * 更新DOM信息
   * 避免当作用DOM在实例化时，css被设置为display:none，因而无法获取DOM的坐标信息
   */
  update() {
    this._initDOM()
  }
  /**
   * 注册可拖拽事件监听
   */
  listen() {
    this._event()
  }
  /**
   * 设置可拖拽
   */
  activate() {
    this.isplay = true
    this.istap = false
  }
  /**
   * 设置不可拖拽
   */
  deactivate() {
    this.isplay = false
    this.istap = false
  }
  /**
   * 打乱布局
   * 预设想越靠近中央越定置显示
   */
  random() {
    const $parent = this.$parent, $children = this.$children, childLen = $children.length

    if ($children && childLen < 1) {
      return
    }

    const { gutter, child } = this.options
      , { width: pw, height: ph } = $parent.getBoundingClientRect()
      , childBounding = $children[0].getBoundingClientRect()
      , cw = child.width || childBounding.width
      , ch = child.height || childBounding.height

    // 预设5个中央显示postion:中央、左上、坐下、右上、右下
    const rulePos = []
    // 初步设想
    // let temWL = pw / 2 - cw,
    //   temWR = pw / 2,
    //   temHT = ph / 2 - ch,
    //   temHB = ph / 2
    // 二次设想
    let temWL = (pw - cw) / 2 - cw * 9 / 10 + getRandom(-20, 20)
      , temWR = (pw - cw) / 2 + cw * 1.2 + getRandom(-20, 20)
      , temHT = (ph - ch) / 2 - ch * 9 / 10 + getRandom(-20, 20)
      , temHB = (ph - ch) / 2 + ch * 1.3 + getRandom(-20, 20)
    if (temWL < 0) temWL = 0
    if (temWR > pw - cw) temWR = pw - cw
    if (temHT < 0) temHT = 0
    if (temHB > ph - ch) temHB = ph - ch
    rulePos.push({ left: temWL, top: temHT })
    rulePos.push({ left: temWL, top: temHB })
    rulePos.push({ left: temWR, top: temHT })
    rulePos.push({ left: temWR, top: temHB })
    rulePos.push({ left: (pw - cw) / 2, top: (ph - ch) / 2 }) // 中央

    // random position
    const saftPos = { top: 0, left: 0, bottom: ph - ch, right: pw - cw }

    // test position
    console.log($children, saftPos, rulePos)
    if (childLen == 1) {
      $children[0].style.top = `${rulePos[0].top}px`
      $children[0].style.left = `${rulePos[0].left}px`
    } else if (childLen <= 5) {
      $children.slice().forEach(function (child, index) {
        child.style.top = `${rulePos[index].top}px`
        child.style.left = `${rulePos[index].left}px`
      })
    } else {
      var diffLen = childLen - 5
      $children.slice().forEach(function (child, index) {
        if (index < diffLen) {
          child.style.top = `${getRandom(saftPos.top, saftPos.bottom)}px`
          child.style.left = `${getRandom(saftPos.left, saftPos.right)}px`
        } else {
          child.style.top = `${rulePos[index - diffLen].top}px`
          child.style.left = `${rulePos[index - diffLen].left}px`
        }
      })
    }


    console.log(pw, ph, gutter, cw, ch)
  }
  /**
   * 获取当前拖拽元素相对父元素的x、y轴定位
   * @param {*} position 手势坐标信息，包含clientX,clientY,pageX,pageY,screenX,screenY...
   * 
   */
  getOffset(position) {
    const { top: pt, left: pl, right: pr, bottom: pb, width: pw, height: ph } = this.parent || this.$parent.getBoundingClientRect(),
      { top: ct, left: cl, right: cr, bottom: cb, width: cw, height: ch } = this.$target.getBoundingClientRect(),
      { clientX, clientY, pageX, pageY } = position,
      curX = clientX || pageX,
      curY = clientY || pageY

    // 如果鼠标超出父元素范围则返回
    if (pt > curX || pb < curX || pl > curY || pr < curY) {
      return false;
    }

    let x = (curX - pl) - (cw / 2),
      y = (curY - pt) - (ch / 2)

    if (x < 0) {
      x = 0
    }
    if (x > pw - cw) {
      x = pw - cw
    }
    if (y < 0) {
      y = 0
    }
    if (y > ph - ch) {
      y = ph - ch
    }
    // console.log('test:', this.$target, x, y)
    return {
      x: parseInt(x)
      , y: parseInt(y)
    }
  }

  _evStart(e) {
    if (!this.isplay) {
      return
    }
    this.istap = true

    const { target } = e
    this.$target = target
    this.target = target.getBoundingClientRect()
    this.parent = this.$parent.getBoundingClientRect()

    this.$children.forEach(function (child) {
      if (target == child) {
        child.style.zIndex = 1
        child.style.cursor = 'move'
      } else {
        child.style.zIndex = 0
        child.style.cursor = ''
      }
    })

    this.options.onMoveBefore(this.$target, this)

    console.log('start target', this.$target.style.cssText)
  }
  _evMove(e) {
    e.preventDefault()
    if (!this.isplay) {
      return
    }
    if (!this.istap) {
      return
    }

    const { targetTouches } = e
    const curPos = this.getOffset(targetTouches[0])
    // 只有移动手势在父元素内移动才触发
    if (curPos) {
      const { x, y } = curPos
      this.$target.style.left = `${x}px`
      this.$target.style.top = `${y}px`
      this.options.onMove(this.$target, this)
    }

  }
  _evEnd(e) {
    if (!this.isplay) {
      return
    }
    console.log(this.target)
    this.$target.style.cursor = ''
    this.istap = false
    this.$target = null

    this.options.onMoveEnd(this)
  }
  _evDoc() {
    // var doc = document.body || document
    const doc = this.$parent
    doc.removeEventListener('touchstart', this._evStart.bind(this), true)
    doc.removeEventListener('touchmove', this._evMove.bind(this), true)
    doc.removeEventListener('touchend', this._evEnd.bind(this), true)
    doc.removeEventListener('touchcancel', this._evEnd.bind(this), true)
    doc.addEventListener('touchstart', this._evStart.bind(this), true)
    doc.addEventListener('touchmove', this._evMove.bind(this), true)
    doc.addEventListener('touchend', this._evEnd.bind(this), true)
    doc.addEventListener('touchcancel', this._evEnd.bind(this), true)
  }
  _event() {
    this._evDoc()
  }
  _initDOM() {
    const { parentsCls, child } = this.options
    const parent = document.querySelector(parentsCls)
    const children = Array.from(document.querySelectorAll(child.cls))
    this.$parent = parent
    this.$children = children

    parent.style.cssText = `
        position: relative;
        overflow: hide;
        z - index: 1;
        `
    children.forEach(function (child) {
      child.style.cssText = `
        position: absolute;
        `
    })


  }
  _initial() {
    this._initDOM()

    // 当前版本不开启默认注册事件
    // this._event()
  }

}

export default Drag
