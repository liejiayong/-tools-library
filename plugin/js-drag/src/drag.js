// import { preStyle, getPixelRatio } from './util'
import './simulateTouch.js'
  ; ('use strict')

/*
 * Description: 
 * version: 
 * Author: liejiayong(809206619@qq.com)
 * Date: 2020-04-10 16:29:08
 * LastEditors: liejiayong(809206619@qq.com)
 * LastEditTime: 2020-04-11 16:41:17
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
  childCls: '.jy-drag-child',
  zoneCls: '.jy-drag-zone',
  gutter: 10,
  onSuccess: () => { }
}

class Drag {
  constructor(el, options) {
    this.el = el
    this.elPos = null
    this.children = []
    this.childrenPos = []
    this.childrenEvent = []
    this.zone = []
    this.zonePos = []
    this.current = -1
    this.options = Object.assign({}, DEFAULT_CONFIG, options)

    this.istap = false // 按下
    this.isplay = false // 游戏状态。true:可拖拽；false：不可拖拽

    this._initial()
  }
  activate() {
    this.isplay = true
    this.istap = false
  }
  deactivate() {
    this.isplay = false
    this.istap = false
  }
  getOffset(clientX, clientY) {
    const { top, left, width, height } = this.childrenPos[this.current]
    // console.log(this.childrenPos[this.current])

    const x = clientX - left - width / 2,
      y = clientY - top - height / 2
    return {
      x: parseInt(x),
      y: parseInt(y)
    }
  }
  zoneContain(touches) {
    const { clientY, clientX } = touches,
      curChild = this.childrenPos[this.current],
      { el: dragEl } = curChild
    this.zonePos.forEach(({ gtop, gleft, gxEnd, gyEnd, el }) => {
      // 包含
      if (clientY > gtop && clientY < gyEnd && clientX > gleft && clientX < gxEnd) {
        curChild.isContain = true
        curChild.containZone = el
      }

      // 移动
      const { x, y } = this.getOffset(clientX, clientY),
        pixel = `translate(${x}px, ${y}px)`,
        transform = preStyle('transform')

      dragEl.style[transform] = pixel

      // console.log(x, y, pixel)
    })
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
      gxEnd: parseInt(x + width - gutter),
      gyEnd: parseInt(y + height - gutter),
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
  _evChild() {
    const children = this.children

    children.forEach((child) => {
      child.addEventListener('touchstart', (e) => {
        // console.log('touchstart', e)
      }, true)
    })

    children.forEach((child) => {
      child.addEventListener('touchmove', (e) => {
        const touches = e.touches[0]
        // let { clientX, clientY } = touches
        // console.log('touchmove', clientX, clientY)
        this.zoneContain(touches)
      }, true)
    })
    children.forEach((child) => {
      child.addEventListener('touchend', (e) => {
        // console.log('touchend', e)
      }, true)
    })
  }
  _evDoc() {
    document.addEventListener('touchstart', (e) => {
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
        this.current = current
        this.istap = true
      } else {
        this.current = -1
        this.istap = false
      }
    }, true)
    document.addEventListener('touchmove', (e) => {
      if (!this.isplay) return;
      if (!this.istap) return

      const touches = e.touches[0]
      // let { clientX, clientY } = touches

      this.zoneContain(touches)


    }, true)
    document.addEventListener('touchend', (e) => {
      if (!this.isplay) return;

      const curChild = this.childrenPos[this.current]

      if (curChild && curChild.isContain) {
        this.options.onSuccess(curChild.el, curChild.containZone, curChild)
      } else {
        // console.log(curChild)
        if (curChild && curChild.el) {
          const transform = preStyle('transform')
          curChild.el.style[transform] = 'translate(0px, 0px)'
          curChild.isContain = false
          curChild.containZone = null
        }
      }
      // console.log('curChild', curChild)
      this.current = -1
      this.istap = false
    }, true)
  }
  _event() {
    // this._evChild()
    this._evDoc()
  }
  _setDOMAttr(el, index, siblings) {
    const top = getStyle(el, 'top'),
      left = getStyle(el, 'left')

    el.setAttribute('data-top', top)
    el.setAttribute('data-otop', top)
    el.setAttribute('data-left', left)
    el.setAttribute('data-oleft', left)
    el.setAttribute('data-order', index)
    el.setAttribute('data-index', index)

    // console.log(el)
  }
  _initDOM() {
    const { childCls, zoneCls } = this.options,
      children = Array.from(document.querySelectorAll(childCls)),
      zone = Array.from(document.querySelectorAll(zoneCls))

    children.forEach((child, index, siblings) => {
      this._setDOMAttr(child, index, siblings)
    })
    zone.forEach((child, index, siblings) => {
      this._setDOMAttr(child, index, siblings)
    })

    this.children = children
    this.zone = zone
    this.zonePos = this._getPosition(zone)
    this.childrenPos = this._getPosition(children)
    this.elPos = this._getPosition(this.el)
  }
  _initial() {
    this._initDOM()
    this._event()
  }

}


export default Drag
