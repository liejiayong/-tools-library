var jyBus = {
  activeCls: 'active',
  initial: function () {
    this.font();
  },
  // 字体适配
  font: function () {
    var docEl = document.documentElement || document.body;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var reCalc = function () {
      var clientWidth = docEl.clientWidth, PIX = 750;
      clientWidth = clientWidth > PIX ? PIX : clientWidth;
      var fontSize = 100 * (clientWidth / PIX);
      window.baseFontSize = fontSize;
      docEl.style.fontSize = fontSize + 'px';
    };
    reCalc();
    window.addEventListener(resizeEvt, reCalc, false);
    document.addEventListener('DOMContentLoaded', reCalc, false);
  },
  winReset: function () {
    document.querySelector('body').style.overflow = '';
  },
  winFixed: function () {
    document.querySelector('body').style.overflow = 'hidden';
  },
  getRandom: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  shuffle: function (arr) {
    var _arr = arr.slice();
    for (var i = 0; i < _arr.length; i++) {
      var j = this.getRandom(0, i);
      var n = _arr[i];
      _arr[i] = _arr[j];
      _arr[j] = n;
    }
    return _arr;
  },
  debounce: function (fn, delay) {
    var timer = null;
    return function () {
      var context = this,
        arg = arguments;
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, arg);
      }, delay);
    };
  },
  throttle: function (fn, delay) {
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
  },
  trim: function (str) {
    return str.replace(/^\s+|\s+$/g, '');
  },
  getQueryString: function (key, type) {
    type = type ? type : 'search';
    const regExp = new RegExp('[?&#]{1}' + key + '=(.*?)([&/#]|$)');
    const value = window.location[type].match(regExp);
    return value && decodeURIComponent(value[1]);
  },
  isNumber: function (number) {
    return Object.prototype.toString.call(number).toLocaleLowerCase() === '[object number]'
  },
  elementCopy: function (btnCopyCls) {
    btnCopyCls = btnCopyCls || '.btnpopcode';
    var $tip = $('<div class="jy-copytips" style="display: none; padding: 10px; position: fixed; top: 30%; left: 50%; transform: translateX(-50%); background-color: rgb(0, 0, 0); color: rgb(255, 255, 255); box-shadow: rgb(0, 0, 0) 0px 0px 5px; white-space: nowrap; z-index: 2001;"></div>');
    $('body').append($tip);
    var clipboard = new ClipboardJS(btnCopyCls);
    clipboard.on('success', function () {
      $tip.text('复制成功').fadeIn(500).fadeOut(1000);
    });
    clipboard.on('error', function () {
      $tip.text('您的手机不支持点击复制，请长按复制！').fadeIn(500).fadeOut(1000);
    });
  },
  /**
   * deprecated
   * @param {*} tipCls 
   * @param {*} cb 
   */
  elCopy: function (tipCls, cb) {
    tipCls = tipCls || '.jy-copytips';

    var $tip = null;
    if (document.querySelector(tipCls)) {
      $tip = document.querySelector(tipCls);
    } else {
      $tip = document.createElement('div');
      $tip.className = tipCls.substr(1);
      $tip.style.cssText = 'display: none;padding: 10px;position: fixed;top: 30%;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);background-color: #000;color: #fff;box-shadow: 0 0 5px #000;white-space: nowrap;z-index:2001;';
      document.body.appendChild($tip);
    };

    if (cb && typeof cb === 'function') {
      cb();
    } else {
      if (!ClipboardJS) return new Error('ClipboardJS is not found!');

      var clipboard = new ClipboardJS('.btnpopcode');
      clipboard.on('success', function () {
        $('#J_mycodePop').fadeOut();
        $tip
          .text('复制成功')
          .fadeIn(500)
          .fadeOut(1000);
      });
      clipboard.on('error', function () {
        $tip
          .text('您的手机不支持点击复制，请长按复制！')
          .fadeIn(500)
          .fadeOut(1000);
      });
    };
  },
  /**
   * 
   * @param {number} index 奖品总数
   * @param {number} index 中奖下标
   * @param {function} cbCurrent 抽奖动画中回调
   * @param {function} cbEnd 抽奖动画完成回调
   */
  lottery(index, total, cbCurrent, cbEnd) {
    if (!this.isNumber(index)) return new Error('the arguments of index must number!');
    if (typeof cbEnd !== 'function') return new Error('the arguments of cbEnd must function!');
    if (typeof cbCurrent !== 'function') return new Error('the arguments of cbCurrent must function!');

    var TYPE_SPEED = 0; // 转盘开始速度
    var TYPE_ADD_SPEED = 20; // 每次加速度
    var TYPE_LAST_SPEED = 500; // 转盘结束速度
    var TYPE_MAX_INDEX = total; // 奖品总数
    var currSpeed = 0; // 当前速度
    var totalIndex = 0; // 下标总数
    var currentIndex = 0; // 当前下标

    // 抽奖动画
    var animate = function () {
      var timer = setTimeout(function () {
        totalIndex += 1;
        currSpeed += TYPE_ADD_SPEED;
        if (currSpeed > TYPE_LAST_SPEED) {
          if (currentIndex === index) {
            clearTimeout(timer);
            cbEnd(currentIndex);
          } else {
            currentIndex = totalIndex % TYPE_MAX_INDEX;
            clearTimeout(timer);
            cbCurrent(currentIndex);
            animate();
          };
        } else {
          currentIndex = totalIndex % TYPE_MAX_INDEX;
          clearTimeout(timer);
          cbCurrent(currentIndex);
          animate();
        }
      }, TYPE_SPEED + currSpeed);
    };
    animate();
  },
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
};
jyBus.initial();

