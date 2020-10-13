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
      android: ~window.navigator.userAgent.toLocaleLowerCase().indexOf('android') || ~window.navigator.userAgent.toLocaleLowerCase().indexOf('linux') ? true : false,
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

Dateinfo = {
  padZero: function (num) {
    return num > 9 ? num : '0' + num;
  },
  Date: function () {
    var date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      hour = date.getHours(),
      minutes = date.getMinutes();
    var length = (new Date(year + '/' + (month + 1) + '/1').getTime() - new Date(year + '/' + month + '/1').getTime()) / 86400000;
    return {
      year: year,
      month: this.padZero(month),
      day: this.padZero(day),
      hour: this.padZero(hour),
      minutes: this.padZero(minutes),
      length: length
    }
  }
}



/**
 * B转换到KB,MB,GB并保留两位小数
 * @param { number } fileSize
 */
export function formatFileSize(fileSize) {
  let temp;
  if (fileSize < 1024) {
    return fileSize + 'B';
  } else if (fileSize < (1024 * 1024)) {
    temp = fileSize / 1024;
    temp = temp.toFixed(2);
    return temp + 'KB';
  } else if (fileSize < (1024 * 1024 * 1024)) {
    temp = fileSize / (1024 * 1024);
    temp = temp.toFixed(2);
    return temp + 'MB';
  } else {
    temp = fileSize / (1024 * 1024 * 1024);
    temp = temp.toFixed(2);
    return temp + 'GB';
  }
}

/**
*  base64转file
*  @param { base64 } base64
*  @param { string } filename 转换后的文件名
*/
export const base64ToFile = (base64, filename) => {
  let arr = base64.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let suffix = mime.split('/')[1];// 图片后缀
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime })
};

/**
*  base64转blob
*  @param { base64 } base64
*/
export const base64ToBlob = base64 => {
  let arr = base64.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

/**
*  blob转file
*  @param { blob } blob
*  @param { string } fileName
*/
export const blobToFile = (blob, fileName) => {
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
};

/**
* file转base64
* @param { * } file 图片文件
*/
export const fileToBase64 = file => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    return e.target.result
  };
};

/**
* 递归生成树形结构
*/
export function getTreeData(data, pid, pidName = 'parentId', idName = 'id', childrenName = 'children', key) {
  let arr = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i][pidName] == pid) {
      data[i].key = data[i][idName];
      data[i][childrenName] = getTreeData(data, data[i][idName], pidName, idName, childrenName);
      arr.push(data[i]);
    }
  }

  return arr;
}


/**
* 遍历树节点
*/
export function foreachTree(data, childrenName = 'children', callback) {
  for (let i = 0; i < data.length; i++) {
    callback(data[i]);
    if (data[i][childrenName] && data[i][childrenName].length > 0) {
      foreachTree(data[i][childrenName], childrenName, callback);
    }
  }
}


/**
* 追溯父节点
*/
export function traceParentNode(pid, data, rootPid, pidName = 'parentId', idName = 'id', childrenName = 'children') {
  let arr = [];
  foreachTree(data, childrenName, (node) => {
    if (node[idName] == pid) {
      arr.push(node);
      if (node[pidName] != rootPid) {
        arr = arr.concat(traceParentNode(node[pidName], data, rootPid, pidName, idName));
      }
    }
  });
  return arr;
}


/**
* 寻找所有子节点
*/
export function traceChildNode(id, data, pidName = 'parentId', idName = 'id', childrenName = 'children') {
  let arr = [];
  foreachTree(data, childrenName, (node) => {
    if (node[pidName] == id) {
      arr.push(node);
      arr = arr.concat(traceChildNode(node[idName], data, pidName, idName, childrenName));
    }
  });
  return arr;
}

/**
* 根据pid生成树形结构
*  @param { object } items 后台获取的数据
*  @param { * } id 数据中的id
*  @param { * } link 生成树形结构的依据
*/
export const createTree = (items, id = null, link = 'pid') => {
  items.filter(item => item[link] === id).map(item => ({ ...item, children: createTree(items, item.id) }));
};


/**
* 查询数组中是否存在某个元素并返回元素第一次出现的下标 
* @param {*} item 
* @param { array } data
*/
export function inArray(item, data) {
  for (let i = 0; i < data.length; i++) {
    if (item === data[i]) {
      return i;
    }
  }
  return -1;
}


/**
*  Windows根据详细版本号判断当前系统名称
* @param { string } osVersion 
*/
export function OutOsName(osVersion) {
  if (!osVersion) {
    return
  }
  let str = osVersion.substr(0, 3);
  if (str === "5.0") {
    return "Win 2000"
  } else if (str === "5.1") {
    return "Win XP"
  } else if (str === "5.2") {
    return "Win XP64"
  } else if (str === "6.0") {
    return "Win Vista"
  } else if (str === "6.1") {
    return "Win 7"
  } else if (str === "6.2") {
    return "Win 8"
  } else if (str === "6.3") {
    return "Win 8.1"
  } else if (str === "10.") {
    return "Win 10"
  } else {
    return "Win"
  }
}


/**
* 判断手机是Andoird还是IOS
*  0: ios
*  1: android
*  2: 其它
*/
export function getOSType() {
  let u = navigator.userAgent, app = navigator.appVersion;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isIOS) {
    return 0;
  }
  if (isAndroid) {
    return 1;
  }
  return 2;
}


/**
* @desc 函数防抖
* @param { function } func
* @param { number } wait 延迟执行毫秒数
* @param { boolean } immediate  true 表立即执行，false 表非立即执行
*/
export function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args)
    }
    else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait);
    }
  }
}


/**
* @desc 函数节流
* @param { function } func 函数
* @param { number } wait 延迟执行毫秒数
* @param { number } type 1 表时间戳版，2 表定时器版
*/
export function throttle(func, wait, type) {
  let previous, timeout;
  if (type === 1) {
    previous = 0;
  } else if (type === 2) {
    timeout = null;
  }
  return function () {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let now = Date.now();

      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args)
        }, wait)
      }
    }

  }
}


/**
* 判断类型
* @param {*} target 
*/
export function type(target) {
  let ret = typeof (target);
  let template = {
    "[object Array]": "array",
    "[object Object]": "object",
    "[object Number]": "number - object",
    "[object Boolean]": "boolean - object",
    "[object String]": 'string-object'
  };

  if (target === null) {
    return 'null';
  } else if (ret == "object") {
    let str = Object.prototype.toString.call(target);
    return template[str];
  } else {
    return ret;
  }
}

/**
* 生成指定范围随机数
* @param { number } min 
* @param { number } max 
*/
export const RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


/**
* 数组乱序
* @param {array} arr
*/
export function arrScrambling(arr) {
  let array = arr;
  let index = array.length;
  while (index) {
    index -= 1;
    let randomIndex = Math.floor(Math.random() * index);
    let middleware = array[index];
    array[index] = array[randomIndex];
    array[randomIndex] = middleware
  }
  return array
}


/**
* 数组交集
* @param { array} arr1
* @param { array } arr2
*/
export const similarity = (arr1, arr2) => arr1.filter(v => arr2.includes(v));


/**
* 数组中某元素出现的次数
* @param { array } arr
* @param {*} value
*/
export function countOccurrences(arr, value) {
  return arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
}

/**
* 加法函数（精度丢失问题）
* @param { number } arg1
* @param { number } arg2
*/
export function add(arg1, arg2) {
  let r1, r2, m;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m
}

/**
* 减法函数（精度丢失问题）
* @param { number } arg1
* @param { number } arg2
*/
export function sub(arg1, arg2) {
  let r1, r2, m, n;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  n = (r1 >= r2) ? r1 : r2;
  return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
}
/**
* 除法函数（精度丢失问题）
* @param { number } num1
* @param { number } num2
*/
export function division(num1, num2) {
  let t1, t2, r1, r2;
  try {
    t1 = num1.toString().split('.')[1].length;
  } catch (e) {
    t1 = 0;
  }
  try {
    t2 = num2.toString().split(".")[1].length;
  } catch (e) {
    t2 = 0;
  }
  r1 = Number(num1.toString().replace(".", ""));
  r2 = Number(num2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}

/**
* 乘法函数（精度丢失问题）
* @param { number } num1
* @param { number } num2
*/
export function mcl(num1, num2) {
  let m = 0, s1 = num1.toString(), s2 = num2.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}


/**
* 递归优化（尾递归）
* @param { function } f
*/
export function tco(f) {
  let value;
  let active = false;
  let accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}


/**
*  生成随机整数
*
*/
export function randomNumInteger(min, max) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * min + 1, 10);
    case 2:
      return parseInt(Math.random() * (max - min + 1) + min, 10);
    default:
      return 0
  }
}

/**
* 去除空格
* @param { string } str 待处理字符串
* @param  { number } type 去除空格类型 1-所有空格  2-前后空格  3-前空格 4-后空格 默认为1
*/
export function trim(str, type = 1) {
  if (type && type !== 1 && type !== 2 && type !== 3 && type !== 4) return;
  switch (type) {
    case 1:
      return str.replace(/\s/g, "");
    case 2:
      return str.replace(/(^\s)|(\s*$)/g, "");
    case 3:
      return str.replace(/(^\s)/g, "");
    case 4:
      return str.replace(/(\s$)/g, "");
    default:
      return str;
  }
}


/**
* 大小写转换
* @param { string } str 待转换的字符串
* @param { number } type 1-全大写 2-全小写 3-首字母大写 其他-不转换
*/

export function turnCase(str, type) {
  switch (type) {
    case 1:
      return str.toUpperCase();
    case 2:
      return str.toLowerCase();
    case 3:
      return str[0].toUpperCase() + str.substr(1).toLowerCase();
    default:
      return str;
  }
}

/**
* 随机16进制颜色 hexColor
* 方法一
*/

export function hexColor() {

  let str = '#';
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  for (let i = 0; i < 6; i++) {
    let index = Number.parseInt((Math.random() * 16).toString());
    str += arr[index]
  }
  return str;
}
/**
* 随机16进制颜色 randomHexColorCode
* 方法二
*/
export const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};



/**
* 转义html(防XSS攻击)
*/
export const escapeHTML = str => {
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );
};

/**
* 检测移动/PC设备
*/
export const detectDeviceType = () => { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'; };


/**
* 隐藏所有指定标签
* 例: hide(document.querySelectorAll('img'))
*/
export const hideTag = (...el) => [...el].forEach(e => (e.style.display = 'none'));


/**
* 返回指定元素的生效样式
* @param { element} el  元素节点
* @param { string } ruleName  指定元素的名称
*/
export const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];

/**
* 检查是否包含子元素
* @param { element } parent
* @param { element } child
* 例：elementContains(document.querySelector('head'), document.querySelector('title')); // true
*/
export const elementContains = (parent, child) => parent !== child && parent.contains(child);


/**
* 数字超过规定大小加上加号“+”，如数字超过99显示99+
* @param { number } val 输入的数字
* @param { number } maxNum 数字规定界限
*/
export const outOfNum = (val, maxNum) => {
  val = val ? val - 0 : 0;
  if (val > maxNum) {
    return `${maxNum}+`
  } else {
    return val;
  }
};

/**
* 计算多个数字或者数组中数字的总和
* @param { number / array } arr 输入的数字
*
*/

export const sumNum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0);



/**
* 将阿拉伯数字翻译成中文的大写数字
* @param { number } num 
*/
export function numberToChinese(num) {
  var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
  var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
  var a = ("" + num).replace(/(^0*)/g, "").split("."),
    k = 0,
    re = "";
  for (var i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re;
        break;
      case 4:
        if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
          .test(a[0]))
          re = BB[4] + re;
        break;
      case 8:
        re = BB[5] + re;
        BB[7] = BB[5];
        k = 0;
        break;
    }
    if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
      re = AA[0] + re;
    if (a[0].charAt(i) != 0)
      re = AA[a[0].charAt(i)] + BB[k % 4] + re;
    k++;
  }

  if (a.length > 1) // 加上小数部分(如果有小数部分)
  {
    re += BB[6];
    for (var i = 0; i < a[1].length; i++)
      re += AA[a[1].charAt(i)];
  }
  if (re == '一十')
    re = "十";
  if (re.match(/^一/) && re.length == 3)
    re = re.replace("一", "");
  return re;
}

/**
* 将数字转换为大写金额
* @param { number } Num 
*/
export function changeToChinese(Num) {
  //判断如果传递进来的不是字符的话转换为字符
  if (typeof Num == "number") {
    Num = new String(Num);
  };
  Num = Num.replace(/,/g, "") //替换tomoney()中的“,”
  Num = Num.replace(/ /g, "") //替换tomoney()中的空格
  Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符
  if (isNaN(Num)) { //验证输入的字符是否为数字
    //alert("请检查小写金额是否正确");
    return "";
  };
  //字符处理完毕后开始转换，采用前后两部分分别转换
  var part = String(Num).split(".");
  var newchar = "";
  //小数点前进行转化
  for (var i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 10) {
      return "";
      //若数量超过拾亿单位，提示
    }
    var tmpnewchar = ""
    var perchar = part[0].charAt(i);
    switch (perchar) {
      case "0":
        tmpnewchar = "零" + tmpnewchar;
        break;
      case "1":
        tmpnewchar = "壹" + tmpnewchar;
        break;
      case "2":
        tmpnewchar = "贰" + tmpnewchar;
        break;
      case "3":
        tmpnewchar = "叁" + tmpnewchar;
        break;
      case "4":
        tmpnewchar = "肆" + tmpnewchar;
        break;
      case "5":
        tmpnewchar = "伍" + tmpnewchar;
        break;
      case "6":
        tmpnewchar = "陆" + tmpnewchar;
        break;
      case "7":
        tmpnewchar = "柒" + tmpnewchar;
        break;
      case "8":
        tmpnewchar = "捌" + tmpnewchar;
        break;
      case "9":
        tmpnewchar = "玖" + tmpnewchar;
        break;
    }
    switch (part[0].length - i - 1) {
      case 0:
        tmpnewchar = tmpnewchar + "元";
        break;
      case 1:
        if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
        break;
      case 2:
        if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
        break;
      case 3:
        if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
        break;
      case 4:
        tmpnewchar = tmpnewchar + "万";
        break;
      case 5:
        if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
        break;
      case 6:
        if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
        break;
      case 7:
        if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
        break;
      case 8:
        tmpnewchar = tmpnewchar + "亿";
        break;
      case 9:
        tmpnewchar = tmpnewchar + "拾";
        break;
    }
    var newchar = tmpnewchar + newchar;
  }
  //小数点之后进行转化
  if (Num.indexOf(".") != -1) {
    if (part[1].length > 2) {
      // alert("小数点之后只能保留两位,系统将自动截断");
      part[1] = part[1].substr(0, 2)
    }
    for (i = 0; i < part[1].length; i++) {
      tmpnewchar = ""
      perchar = part[1].charAt(i)
      switch (perchar) {
        case "0":
          tmpnewchar = "零" + tmpnewchar;
          break;
        case "1":
          tmpnewchar = "壹" + tmpnewchar;
          break;
        case "2":
          tmpnewchar = "贰" + tmpnewchar;
          break;
        case "3":
          tmpnewchar = "叁" + tmpnewchar;
          break;
        case "4":
          tmpnewchar = "肆" + tmpnewchar;
          break;
        case "5":
          tmpnewchar = "伍" + tmpnewchar;
          break;
        case "6":
          tmpnewchar = "陆" + tmpnewchar;
          break;
        case "7":
          tmpnewchar = "柒" + tmpnewchar;
          break;
        case "8":
          tmpnewchar = "捌" + tmpnewchar;
          break;
        case "9":
          tmpnewchar = "玖" + tmpnewchar;
          break;
      }
      if (i == 0) tmpnewchar = tmpnewchar + "角";
      if (i == 1) tmpnewchar = tmpnewchar + "分";
      newchar = newchar + tmpnewchar;
    }
  }
  //替换所有无用汉字
  while (newchar.search("零零") != -1)
    newchar = newchar.replace("零零", "零");
  newchar = newchar.replace("零亿", "亿");
  newchar = newchar.replace("亿万", "亿");
  newchar = newchar.replace("零万", "万");
  newchar = newchar.replace("零元", "元");
  newchar = newchar.replace("零角", "");
  newchar = newchar.replace("零分", "");
  if (newchar.charAt(newchar.length - 1) == "元") {
    newchar = newchar + "整"
  }
  return newchar;
}

/**
* 根据数组中的某一属性的值（数字）进行升序或降序排序
* @param { string } property  排序所依赖的属性
* @param { string } flag  "asc"：升序  "desc": 降序
* 调用方式：arr.sort(sortCompare('age','asc')); 
* 这里的 arr 为准备排序的数组
*/
function sortCompare(property, flag) {
  return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    if (flag === "asc") {
      return value1 - value2;
    } else if (flag === "desc") {
      return value2 - value1;
    }

  }
}

