/*
 * Description: 
 * version: 
 * Author: liejiayong(809206619@qq.com)
 * Date: 2020-04-01 17:28:20
 * LastEditors: liejiayong(809206619@qq.com)
 * LastEditTime: 2020-06-12 16:48:18
 */

export function getPixelRatio(context) {
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
export function preStyle(style) {
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

export default {
  addClass
}
