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
  throttle: function (fn, threshhold) {
    if (!threshhold) threshhold = 160;
    var timer = null;
    var start = Date.now();
    return function () {
      var context = this,
        arg = arguments,
        curr = Date.now();
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
  versions: function () {
    var u = navigator.userAgent, dpr = window.devicePixelRatio, sw = window.screen.width, sh = window.screen.height;
    return {
      trident: u.indexOf('Trident') > -1,
      presto: u.indexOf('Presto') > -1,
      webKit: u.indexOf('AppleWebKit') > -1,
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      iPhone: u.indexOf('iPhone') > -1,
      iPad: u.indexOf('iPad') > -1,
      webApp: u.indexOf('Safari') == -1,
      iphoneXS: /iphone/gi.test(u) && ((dpr == 3 && sw == 375 && sh == 812)
        || (dpr == 3 && sw == 414 && sh == 896)
        || (dpr == 2 && sw == 414 && sh == 896)),
      weixin: u.toLowerCase().indexOf('micromessenger') > -1,
      qq: function () {
        var match = u.match(/QQ\//i);
        match = match ? match[0] : false;
        return match == 'QQ/';
      },
      weiBo: u.match(/WeiBo/i) == "weibo",
      Safari: u.indexOf('Safari') > -1,
      QQbrw: u.indexOf('MQQBrowser') > -1,
      webview: !(u.match(/Chrome\/([\d.]+)/) || u.match(/CriOS\/([\d.]+)/)) && u.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
      ucweb: function () {
        try {
          return parseFloat(u.match(/ucweb\d+\.\d+/gi).toString().match(/\d+\.\d+/).toString()) >= 8.2
        } catch (e) {
          if (u.indexOf('UC') > -1) {
            return true;
          }
          return false;
        }
      }(),
      Symbian: u.indexOf('Symbian') > -1,
      ucSB: u.indexOf('Firofox/1.') > -1
    };
  }()
};
jyBus.initial();

  // var jyBus = {
  //     // 滚动
  //     swiper: function () {
  //       $('#pSwiper').fadeIn();
  //       pSwiper = new Swiper('#pSwiper', {
  //         autoplay: false,
  //         direction: 'vertical',
  //         initialSlide: 0,
  //         speed: TYPE_NUMBER_DURATION,
  //         width: window.innerWidth,
  //         height: window.innerHeight < 667 ? 667 : window.innerHeight,
  //         autoHeight: true, //高度随内容变化
  //         on: {
  //           slideChange: function () {
  //             var index = this.activeIndex;
  //             // 滑到提交答案页面
  //             if (index == 11) {
  //               result.isLosed = false;
  //             }
  //           }
  //         }
  //       });
  //     },
  //     // 音乐
  //     music: function () {
  //       // 背景音乐
  //       bgSound = new Howl({
  //         src: [],
  //         autoplay: true,
  //         loop: true,
  //         volume: 0.35
  //       });
  //       bgSound.play();
  //       $('#btnBgm').addClass('active');
  //     },
  //     // 预加载
  //     proload: function () {
  //       var loader = new ImagesLoader();

  //       loader.loadImages([], imgBaseUrl);
  //       loader.complete(function () {
  //         // $('#loadpage').fadeOut(500);
  //         // $('#pSwiper').fadeIn();
  //         subject.swiper();
  //         console.log(':::initial loader success');
  //       });
  //       loader.process(function () {
  //         // var prsnum = this.processNum ? this.processNum : 100;
  //         // $('#loading_rate').html(prsnum + '%');
  //       });
  //       loader.start();
  //     },
  //   initial: function () {
  //     this.font();
  //     // this.proload();
  //     // this.music();
  //     // this.swiper();
  //   },
  //   // 字体适配
  //   font: function () {
  //     var docEl = document.documentElement || document.body;
  //     var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  //     var reCalc = function () {
  //       var clientWidth = docEl.clientWidth;
  //       var fontSize = 100 * (clientWidth / 750);
  //       window.baseFontSize = fontSize;
  //       docEl.style.fontSize = fontSize + 'px';
  //       // 屏幕提示
  //       var w = docEl.clientWidth;
  //       var h = docEl.clientHeight;
  //       if (h > w) {
  //         $('#orientLayer').hide();
  //       } else {
  //         $('#orientLayer').show();
  //       }
  //     };
  //     reCalc();
  //     window.addEventListener(resizeEvt, reCalc, false);
  //     document.addEventListener('DOMContentLoaded', reCalc, false);
  //   }
  // };
