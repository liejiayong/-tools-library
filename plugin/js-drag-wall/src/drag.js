// import { preStyle, getPixelRatio } from './util'
import './simulateTouch.js'
  ; ('use strict')

/*
 * Description: 
 * version: 
 * Author: liejiayong(809206619@qq.com)
 * Date: 2020-04-10 16:29:08
 * LastEditors: liejiayong(809206619@qq.com)
 * LastEditTime: 2020-06-10 17:58:11
 */
/* control class */
function hasClass(el, cls) {
  let reg = new RegExp(`(^|\\s)${cls}(\\s|$)`)
  return reg.test(el.className)
}

function addClass(el, cls) {
  if (hasClass(el, cls)) {
    return
  }
  let newCls = el.className.split(' ')
  newCls.push(cls)
  el.className = newCls.join(' ')
}

function removeClass(el, cls) {
  if (!hasClass(el, cls)) {
    return
  }
  let reg = new RegExp(`(^|\\s)${cls}(\\s|$)`)
  el.className = el.className.replace(reg, '')
}

/* control cssText style */
function getStyle(ele, style) {
  let ret;
  if (window.getComputedStyle) {
    ret = window.getComputedStyle(ele, null).getPropertyValue(style);
  } else {
    if (style === 'opacity') {
      var filter = null;
      // 早期的 IE 中要设置透明度有两个方法：
      // 1、alpha(opacity=0)
      // 2、filter:progid:DXImageTransform.Microsoft.gradient( GradientType= 0 , startColorstr = ‘#ccccc’, endColorstr = ‘#ddddd’ );
      // 利用正则匹配
      filter = ele.style.filter.match(/progid:DXImageTransform.Microsoft.Alpha\(.?opacity=(.*).?\)/i) || ele.style.filter.match(/alpha\(opacity=(.*)\)/i);
      if (filter) {
        var value = parseFloat(filter);
        if (!isNaN(value)) {
          // 转化为标准结果
          ret = value ? value / 100 : 0;
        }
      }
      // 透明度的值默认返回 1
      ret = 1;
    } else if (style === 'float') {
      ret = ele.currentStyle.getAttribute('styleFloat');
    } else if ((style === 'width' || style === 'height') && (ele.currentStyle[style] === 'auto')) {
      // 取高宽使用 getBoundingClientRect
      let clientRect = ele.getBoundingClientRect();
      ret = (style === 'width' ? clientRect.right - clientRect.left : clientRect.bottom - clientRect.top) + 'px';
    }
    // 其他样式，无需特殊处理
    ret = ele.currentStyle.getAttribute(style);
  }
  return ret;
}

/**
 * 添加css前缀
 * @param {*} style 
 */
function preStyle(style) {
  var el = document.createElement('div');

  var vendor = (function () {
    var transformName = {
      webkit: 'webkitTransform',
      Moz: 'MozTransform',
      O: 'OTransform',
      ms: 'msTransform',
      standard: 'transform'
    };
    for (var key in transformName) {
      if (el[key] !== 'undefined') {
        return key;
      }
    }
    return false;
  })();

  if (vendor === false) {
    return false;
  }

  if (vendor === 'standard') {
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

function transofrmFn(t) {
  return ';-webkit-transform:' + t
    + ';-moz-transform:' + t
    + ';-o-transform:' + t
    + ';-ms-transform:' + t
    + ';transform:' + t
}

const DEFAULT_CONFIG = {
  parentsCls: '.jy-wall-drag',
  childCls: '.item',
  onReady: () => { },
  onMove: () => { },
  onSuccess: () => { }
}

class Drag {
  constructor(options) {
    this.DEFAULT_CONFIG = DEFAULT_CONFIG
    this.options = Object.assign({}, DEFAULT_CONFIG, options)

    this.istap = false // 按下
    this.isplay = false // 游戏状态。true:可拖拽；false：不可拖拽

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
  getOffset(clientX, clientY) {
    const { top, left, width, height } = this.childrenPos[this.current]
    // console.log(this.childrenPos[this.current])

    const x = clientX - left - width / 2
      , y = clientY - top - height / 2
    // top = clientY -  

    return {
      x: parseInt(x)
      , y: parseInt(y)
      // top: 
    }
  }
  _precisePos(child, index, siblings) {
    const { gutter } = this.options,
      { x, y, width, height, left, right, top, bottom } = child.getBoundingClientRect()
    return {
      x: parseInt(x),
      y: parseInt(y),
      xEnd: parseInt(x + width),
      yEnd: parseInt(y + height),
      width: parseInt(width),
      height: parseInt(height),
      left: parseInt(left),
      right: parseInt(right),
      top: parseInt(top),
      bottom: parseInt(bottom),
      gxEnd: parseInt(right - gutter),
      gyEnd: parseInt(bottom - gutter),
      gleft: parseInt(left + gutter),
      gright: parseInt(right - gutter),
      gtop: parseInt(top + gutter),
      gbottom: parseInt(bottom - gutter),
      el: child,
      index: index,
      siblings: siblings,
      isContain: false,
      containZone: null
    }
  }
  _getPosition(children) {
    if (!Array.isArray(children)) {
      return [this._precisePos(children, 0, [])]
    }

    const origins = children.map((child, index, siblings) => {
      return this._precisePos(child, index, siblings)
    })
    // console.log('bottle position: ')
    // console.table(origins)
    return origins
  }
  _evStart(e) {
    // console.log('start', this.isplay, e)
    if (!this.isplay) return;

    const touches = e.touches[0]
    let { clientX, clientY } = touches,
      childrenPos = this.childrenPos, current = -1

    childrenPos.forEach(({ top, left, xEnd, yEnd }, index) => {
      if (clientY > top && clientY < yEnd && clientX > left && clientX < xEnd) {
        current = index
      }
    })

    if (~current) {
      this.childrenPos[current]['el'].style.zIndex = 10
      this.childrenPos[current]['el'].style.cursor = 'grab'
      this.current = current
      this.istap = true
    } else {
      this.current = -1
      this.istap = false
    }

    console.log('111', this.current, this.istap)
  }
  _evMove(e) {
    console.log('2222222')
    if (!this.isplay) return
    if (!this.istap) return

    console.log('223333333333')
    const touches = e.touches[0]
    this.zoneContain(touches)
  }
  _evEnd(e) {
    if (!this.isplay) return;

    const curChild = this.childrenPos[this.current]

    if (curChild && curChild.isContain) {
      this.options.onSuccess(curChild.el, curChild.containZone, curChild)
    } else {
      // console.log(curChild)
      if (curChild && curChild.el) {
        const transform = preStyle('transform')
        curChild.el.style[transform] = 'translate(0, 0)'
        curChild.el.style.zIndex = null
        curChild.el.style.cursor = null
        curChild.isContain = false
        curChild.containZone = null
      }
    }
    // console.log('curChild', curChild)
    this.current = -1
    this.istap = false

    // console.log(e.type, 'end', this.istap, curChild)
  }
  _evDoc() {
    var doc = document.body || document
    document.addEventListener('touchstart', this._evStart.bind(this), true)
    document.addEventListener('touchmove', this._evMove.bind(this), true)
    document.addEventListener('touchend', this._evEnd.bind(this), true)
  }
  _event() {
    this._evDoc()
  }
  _initDOM() {
    const { parentsCls, childCls } = this.options
    const parent = document.querySelector(parentsCls)
    const children = document.querySelectorAll(childCls)
    this.parent = parent
    this.children = children
  }
  _initial() {
    this._initDOM()

    // 当前版本不开启默认注册事件
    // this._event()
  }

}

export default Drag
