/**
 *  获取指定范围内的随机数
 * @param min 最小值
 * @param max 最大值
 * @returns {number} 返回随机数
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 *  洗牌函数
 * @param arr 输入数组列表
 * @returns {Blob|ArrayBuffer|Array.<T>|string|*}
 */
export function shuffle(arr) {
  let _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandom(0, i);
    let n = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = n;
  }
  return _arr;
}

/**
 *  防抖函数。使用柯里化返回新函数
 *  使用说明：在最后一次事件后才触发一次函数。
          *  当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，
          *  如果设定的时间到来之前，又一次触发了事件，就重新开始延时。
 *  应用场景：适合应用于监听事件（event）类型的场景（如：输入搜索（input、keyup）、提交按钮、弹窗）
 * @param fn
 * @param delay
 * @returns {Function}
 */
export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this,
      arg = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, arg);
    }, delay);
  };
}


/**
 * 节流函数。使用柯里化返回新函数
 *  使用说明：使得一定时间内只触发一次函数。原理是通过判断是否到达一定时间来触发函数。。
          * 当持续触发事件时，保证一定时间段内只调用一次事件处理函数。
          * 节流通俗解释就比如我们水龙头放水，阀门一打开，水哗哗的往下流，秉着勤俭节约的优良传统美德，我们要把水龙头关小点，最好是如我们心意按照一定规律在某个时间间隔内一滴一滴的往下滴。
 *  应用场景：适合应用于监听事件（event）类型的场景（如：resize、touchmove、mousemove、scroll）
 * @param fun
 * @param delay
 * @returns {Function}
 */
export function throttle(fn, delay = 160) {
  let timer = null;
  let start = Date.now();
  return function (...args) {
    var curr = Date.now();
    if (curr - start >= delay) {
      fn.apply(this, args);
      start = Date.now();
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
}

function throttle(fn, delay) {
  if (!delay) delay = 160;

  var timer = null;
  var start = Date.now();
  return function () {
    var context = this,
      arg = arguments,
      curr = Date.now();
    if (curr - start >= delay) {
      fn.apply(context, arg);
      start = Date.now();
    } else {
      timer = setTimeout(function () {
        fn.apply(context, arg);
      }, delay);
    }
  };
}

/**
 * 获取字符串长度
 * 采用扩展运算符可以识别四个字符的Unicode字符，
 * 因此使用扩展运算符结构字符串为数组，能返回实际的字符长度
 * 注：凡是涉及到操作四个字节的 Unicode 字符的函数，最好都用扩展运算符改写。
 *
 * @param {*} str
 * @returns {Number}
 */
export function strlen(str) {
  return [...str].length;
}

function trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
}

/**
 * 获取url query的指定参数
 * 用于bom环境下
 * @param {String} key
 *  @param {String} type only support hash | search * @returns {String}
 */
export function getQueryString(key, type = 'search') {
  const regExp = new RegExp(`[?&#]{1}${key}=(.*?)([&/#]|$)`)
  const value = window.location[type].match(regExp)
  return value && decodeURIComponent(value[1])
}

function getQueryString(key, type) {
  type = type ? type : 'search'
  const regExp = new RegExp('[?&#]{1}' + key + '=(.*?)([&/#]|$)')
  const value = window.location[type].match(regExp)
  return value && decodeURIComponent(value[1])
}

/**
 * 设置url query参数
 * 用于bom环境下
 * @param {Object} map key-value object
 * @param {String} type only support hash | search
 */
export function setQueryString(map, type = 'search') {
  let query = window.location[type]

  for (const key in map) {
    const val = map[key]

    if (getQueryString(key, type)) {
      const regExp = new RegExp(`(.*)([#&?]${key}=)(.*?)($|&.*)`)
      const match = query.match(regExp)

      if (val === '') {
        match.splice(2, 2)
      } else {
        match[3] = val
      }
      match.shift()
      query = match.join('')
    } else {
      query = query.length ? `${query}&${key}=${val}` : `${key}=${val}`
    }
  }

  window.location[type] = query
}

function setQueryString(map, type) {
  let query = window.location[type];

  if (!type) {
    type = 'search';
  }

  for (const key in map) {
    const val = map[key]

    if (getQueryString(key, type)) {
      const regExp = new RegExp(`(.*)([#&?]${key}=)(.*?)($|&.*)`)
      const match = query.match(regExp)

      if (val === '') {
        match.splice(2, 2)
      } else {
        match[3] = val
      }
      match.shift()
      query = match.join('')
    } else {
      query = query.length ? `${query}&${key}=${val}` : `${key}=${val}`
    }
  }

  window.location[type] = query
}

// 获取移动终端浏览器版本信息
var mobileBrowser = {
  brower: (function () {
    var u = navigator.userAgent, dpr = window.devicePixelRatio,
      sw = window.screen.width, sh = window.screen.height;

    return {
      trident: ~u.indexOf('Trident') ? true : false,
      presto: ~u.indexOf('Presto') ? true : false,
      webKit: !!u.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
      gecko: ~u.indexOf('Gecko') && ~u.indexOf('KHTML') ? true : false,
      Symbian: ~u.indexOf('Symbian') ? true : false,
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? true : false,
      android: !u.indexOf('Android') || !u.indexOf('Linux') ? true : false,
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) ? true : false,
      iPhone: ~u.indexOf('iPhone') ? true : false,
      iPad: ~u.indexOf('iPad') ? true : false,
      osx: !!u.match(/\(Macintosh\; Intel /),
      iphoneXS: /iphone/gi.test(u) && ((dpr == 3 && sw == 375 && sh == 812)
        || (dpr == 3 && sw == 414 && sh == 896)
        || (dpr == 2 && sw == 414 && sh == 896)) ? true : false,
      wechat: /micromessenger/i.test(u),
      qq: /QQ\//i.test(u),
      weiBo: /WeiBo/i.test(u),
      Safari: /Safari/i.test(u),
      qqBrw: /MQQBrowser/i.test(u),
      win: /Win\d{2}|Windows/.test(u),
      wp: !!u.match(/Windows Phone ([\d.]+)/),
      webos: !!u.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
      touchpad: this.webos && !!u.match(/TouchPad/),
      kindle: !!u.match(/Kindle\/([\d.]+)/),
      silk: !!u.match(/Silk\/([\d._]+)/),
      blackberry: !!u.match(/(BlackBerry).*Version\/([\d.]+)/),
      bb10: !!u.match(/(BB10).*Version\/([\d.]+)/),
      rimtabletos: !!u.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
      playbook: !!u.match(/PlayBook/),
      chrome: !!u.match(/Chrome\/([\d.]+)/) || u.match(/CriOS\/([\d.]+)/),
      webview: !!u.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
      uc: ~u.indexOf("UBrowser") || ~u.indexOf("UCBrowser") ? true : false,
      firefox: !!u.match(/Firefox\/([\d.]+)/),
      firefoxos: !!u.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
      ie: !!u.match(/MSIE\s([\d.]+)/) || !!u.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
      edge: this.ie && ~u.indexOf('Edge') ? true : false,
      ieV: (function () {
        var isIE11 = ~u.indexOf('Trident') && ~u.indexOf('rv:11.0') ? true : false;
        if (this.ie) {
          var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
          reIE.test(u);
          var fIEVersion = parseFloat(RegExp['$1']);
          if (fIEVersion === 7) {
            return 7;
          } else if (fIEVersion === 8) {
            return 8;
          } else if (fIEVersion === 9) {
            return 9;
          } else if (fIEVersion === 10) {
            return 10;
          } else {
            return 6; // IE版本<=7
          }
        } else if (this.edge) {
          return 'edge'; // edge
        } else if (isIE11) {
          return 11; // IE11
        } else {
          return 0; // 不是ie浏览器
        }
      }())
    };
  }()),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

/**
 * 判断是在qq内置浏览器还是qq浏览器
 */
// 匹配QQ与TIM
export const isQQ = () => {
  const u = navigator.userAgent
  let match = u.match(/QQ\//i)
  match = match ? match[0] : false
  return match == 'QQ/'
}

/**
 * 判断iphoneX series
 */
var isIphoneXS = function () {
  var u = navigator.userAgent, dpr = window.devicePixelRatio, sw = window.screen.width, sh = window.screen.height;
  return /iphone/gi.test(u) && ((dpr == 3 && sw == 375 && sh == 812)
    || (dpr == 3 && sw == 414 && sh == 896)
    || (dpr == 2 && sw == 414 && sh == 896))
}

// 判断是否移动端
var isMobile = function () {
  return !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)
}

/**
 * 判断微信浏览器
 */
export const isWechat = () => navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1

/**
 * 验证手机格式
 * @param {*} tel 
 */
export const isTel = (tel) => /(^[1][3,4,5,6,7,8,9][0-9]{9}$)|(^[2,8,6][0-9]{7}$)|(^[2,3,5,6,9][0-9]{7}$)/.test(tel)

/**
 * 验证身份证号码
 * @param {*} idcard 
 */
export const isIdcard = (idcard) => /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(idcard)

/**
 * 获取url query的指定参数
 * @param {*} name
 * @returns {String}
 */
export function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var c = window.location.search.substr(1).match(reg)
  return null != c ? decodeURIComponent(c[2]) : null
}

/**
* 将url对象转化为一维string
* @param {*} data 
*/
export function getStringify(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}

/**
 * 显示文件大小标识
 * @param {*} val 
 */
export const sizeSym = (val) => {
  let ret = ''
  if (val < 1048576) {
    ret = (val / 1024) + 'KB'
  } else if (val < 1073741820) {
    ret = (val / 1048576) + 'MB'
  } else {
    ret = (val / 1073741820) + 'GB'
  }
  return ret
}

/**
 * 是否base64，不太严谨版本
 * @param {*} url 
 */
export const isBase64 = url => /^data:image\/([\w+]+);base64,([\s\S]+)/.test(url)

/**
 * 消除浏览器惯性
 * 
 * 适用于移动端，尤其是ios浏览器上下滚动时，滚动到顶部或底部时产生的整体滑动一定位置的惯性情况
 */
export const inertiaScroll = {
  fn: function (e) { e.preventDefault(); },
  open: function () { window.addEventListener('touchmove', this.fn, { passive: false }); },
  off: function () { window.removeEventListener('touchmove', this.fn, { passive: false }); }
}

