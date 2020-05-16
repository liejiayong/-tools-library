import "./util.js";

function ImagesPreview(el, config) {
  this.self = this;
  this._ = this;
  this._upload = el;
  this.config = config && JSON.stringify(config) !== '{}' ? config : {};
  this._init();
}

ImagesPreview._init = function () {
  this.config = utils.extend(this.default, this.config);
  this._event();
}

ImagesPreview._event = function () {x`
  var t = this, _upload = t._upload;
  on(_upload, 'change', function () {

  });
}


/** 现代浏览器获取图片地址
 * @param {File} file 文件对象
 * @param {Function} cb({DOMString} dataURIScheme) 回调函数
 */
ImagesPreview.prototype.readAsDataURL = function (file, cb) {
  // 空文件则返回空字符串
  if (!file) return cb('');

  if (!!URL) {
    // 使用window.URL.createObjectURL提高性能
    cb(URL.createObjectURL(file));
  }
  else if (!window.FileReader) {
    // ff3.0不支持FileReader
    cb(file.readAsDataURL());
  }
  else {
    var fr = new window.FileReader();
    on(fr, 'load', function (e) {
      cb(e.target.result);
    });
    fr.readAsDataURL(file);
  }
}



/**
 * 获取文件上传(如:input)元素的图片地址
 * 用于IE浏览器
 * @param {*} fileEl 文件上传元素
 */
ImagesPreview.prototype.readPathForIE = function (fileEl) {
  let path = fileEl.value || ''

  // IE11下，文档模式小于10无法通过value、getAttribute和outerHTML获取input[type=file]的真实路径
  if (src.search(/\w:\\fakepath/) === 0) {
    fileEl.select()
    path = document.selection.createRangeCollection()[0].htmlText
  }

  return path
}

/** 清理预览图的渲染
 * @param {HTMLElement} previewEl 预览图区域元素
 * @param {Boolean} [isRemove=false] 是否将预览图IMG元素从DOM树移除
 */
ImagesPreview.prototype.clearRender = function (previewEl, isRemove) {
  var img = previewEl.getElementsByClassName(imgCls)[0];
  if (!img) return null;

  // 释放window.URL.createObjectURL生成的链接所独占的资源
  URL && URL.revokeObjectURL(img.src);
  if (isRemove) {
    // IE10+只有removeNode没有remove方法
    img[img.remove && 'remove' || 'removeNode'].call(img);
    img = null;
  }

  return img;
};

/**
 * 文件后缀校验函数
 * 正则化, 将形如image/*,image/jpg正则化为image/[^\\u002c]+,image/jpg
 */
ImagesPreview.prototype.mineChecker = function () {
  var t = this;
  var accept = t._upload.accept || 'image/*';
  // 使用逗号的unicode字符编码,以便后面以逗号,作为分隔符
  accept = accept.replace(/\*/g, function (m) {
    return '[^\\u002c]+';
  });

  var acceptMIMEs = accept.split(/\s*,\s*/), rAcceptMIMEs = [];
  for (var i = 0, am; am = acceptMIMEs[i++];) {
    rAcceptMIMEs.push(RegExp(am));
  }

  var MIME_EXT_MAP = t.MIME_EXT_MAP;
  return function (mimes) {
    mimes = [].concat(mimes);
    for (var i = 0, r; r = rAcceptMIMEs[i++];) {
      for (var j = 0, m; m = mimes[j++];) {
        if (r.test(m)) return true;
      }
    }
    return false;
  };
};

ImagesPreview.prototype.default = {
  MIME_EXT_MAP: {
    'jpeg': ['image/jpeg'],
    'jpg': ['image/jpeg'],
    'gif': ['image/gif'],
    'png': ['image/png', 'image/x-png'],
    'tiff': ['image/tiff'],
    'bmp': ['image/x-ms-bmp', 'image/bmp']
  }
}
