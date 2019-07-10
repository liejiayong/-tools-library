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
 *  使用说明：限制函数在指定时间后触发
 *  应用场景：适用于输入搜索（input、keyup）、提交按钮、弹窗
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

function debounce_es5(fn, delay) {
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
 *  使用说明：强制函数以固定的速率执行
 *  应用场景：适合应用于动画相关的场景（resize、touchmove、mousemove、scroll）
 * @param fun
 * @param delay
 * @returns {Function}
 */
export function throttle(fn, threshhold = 160) {
  var timer = null;
  var start = Date.now();
  return function (...args) {
    var curr = Data.now();
    if (timer) clearTimeout(timer);
    if (curr - start >= threshhold) {
      fn.apply(this, args);
      start = curr;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, threshhold);
    }
  };
}

function throttle_es5(fn, threshhold = 160) {
  var timer = null;
  var start = Data.now();
  return function () {
    var context = this,
      arg = arguments,
      curr = Data.now();
    if (timer) clearTimeout(timer);
    if (curr - start >= threshhold) {
      fn.apply(context, arg);
      start = curr;
    } else {
      timer = setTimeout(function () {
        fn.apply(context, arg);
      }, threshhold);
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

/**
 * 获取url query的指定参数
 * @param {*} name 
 * @returns {String}
 */
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var c = window.location.search.substr(1).match(reg);
  return null != c ? decodeURIComponent(c[2]) : null
}

/**
 * 检查ie版本
 */
function IEVersion() {
  var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
  var isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
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
      return 6;// IE版本<=7
    }
  } else if (isEdge) {
    return 'edge';// edge
  } else if (isIE11) {
    return 11; // IE11
  } else {
    return -1;// 不是ie浏览器
  }
};

// 获取移动终端浏览器版本信息
var mobileBrowser = {
  versions: function () {
    var u = navigator.userAgent;
    return {//移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
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