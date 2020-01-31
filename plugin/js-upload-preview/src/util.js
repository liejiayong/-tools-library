/***
 * 工具函数
 */
var utils = {
  /**
   * 剔除前后空字符
   * @param {*} str 字符串
   */
  trim: function (str) {
    return str.replace(/^\s+|\s+$/g, '');;
  },
  /**
   * 
   * @param {*} fn 
   */
  preset: function (fn) {
    var presetArgs = [].slice.call(arguments, 1);
    return function () {
      fn.apply(null, presetArgs.concat([].slice.call(arguments)));
    };
  },
  /**
   * 合并对象
   */
  extend: function () {
    var ret = {};
    for (var i = 0, len = arguments.length, arg; i < len; ++i) {
      if (arg = arguments[i]) {
        for (var p in arg) {
          if (!ret.hasOwnProperty(p)) {
            ret[p] = arg[p];
          }
        }
      }
    }
    return ret;
  }
};

/**
 * URL 兼容
 */
let URL = (function (URL) {
  if (!URL) return;

  return {
    createObjectURL: function (blob) {
      return URL.createObjectURL(blob);
    },
    revokeObjectURL: function (url) {
      URL.revokeObjectURL(url);
    }
  };
}(window.webkitURL || window.URL));

/**
* 事件 兼容
**/
let on, off;
//v1.0.1 修复document.body未生成时，特征检测报错的bug
if (document.documentElement.addEventListener) {
  on = function (el, evt, fn) {
    el.addEventListener(evt, fn);
  };
  off = function (el, evt, fn) {
    el.removeEventListener.apply(el, Array.prototype.slice.call(arguments, 1));
  };
}
else {
  on = function (el, evt, fn) {
    el.attachEvent('on' + evt, fn);
  };
  off = function (el, evt, fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    args[0] = 'on' + args[0];
    el.detachEvent.apply(el, args);
  };
}

