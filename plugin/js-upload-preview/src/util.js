/**
 * 
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
 事件兼容性处理
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

/**
 * 将文件转化为base64
 * 用于现代浏览器
 * @param {*} file 文件对象
 */
function fileToBase64(file) {
  new Promise((resolve, reject) => {
    if (!file) return resolve(undefined)

    // 存在则使用，使用window.URL.createObjectURL提高性能
    if (!!URL) {
      resolve(URL.createObjectURL(file))
    }
    // // ff3.0不支持FileReader
    else if (!window['FileReader']) {
      resolve(file.readAsDataURL())
    }
    else {
      var freader = new FileReader(file)
      freader.readAsDataURL(file)
      freader.onload = ev => {
        resolve(ev.target.result)
      }
      freader.onerror = () => {
        reject(new Error('FileReader read error!'))
      }
    }
  })
}

/**
 * 获取文件上传(如:input)元素的图片地址
 * 用于IE浏览器
 * @param {*} fileEl 文件上传元素
 */
function readPathForIE(fileEl) {
  let path = fileEl.value || ''

  // IE11下，文档模式小于10无法通过value、getAttribute和outerHTML获取input[type=file]的真实路径
  if (src.search(/\w:\\fakepath/) === 0) {
    fileEl.select()
    path = document.selection.createRangeCollection()[0].htmlText
  }

  return path
} 
