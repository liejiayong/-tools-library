var jyBus = {
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
    document.querySelector('body').style.overflow = '';
  },
  winFixed: function () {
    document.querySelector('body').style.overflow = 'hidden';
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
