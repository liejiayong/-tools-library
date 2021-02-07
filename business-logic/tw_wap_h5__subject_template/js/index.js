/*
 * @Description: 工具函数
 * @version: 0.1.0
 * @Author: liejiayong(809206619@qq.com)
 * @Date: 2020-06-15 11:27:17
 * @LastEditors: liejiayong(809206619@qq.com)
 * @LastEditTime: 2021-02-05 19:21:28
 * @FilePath: \tw_wap_h5__subject_template\js\index.js
 */

var logic = null;
var jtool = {
  imgPath: './img/', // 图片地址
  audioPath: './media/', // 音乐地址
  activeCls: 'active',
  disableCls: 'disable',
  doc: document.documentElement.body || document.body,
  swiper: function (el) {
    var psw = new Swiper(el, {
      initialSlide: 0,
      direction: 'vertical',
      autoHeight: true,
    });
    this.psw = psw;
    var startScroll, touchStart, touchCurrent;
    psw.slides.on(
      'touchstart',
      function (e) {
        startScroll = Math.ceil(this.scrollTop);
        touchStart = e.targetTouches[0].pageY;
      },
      true
    );
    psw.slides.on(
      'touchmove',
      function (e) {
        touchCurrent = e.targetTouches[0].pageY;
        var touchesDiff = touchCurrent - touchStart;
        var slide = this;
        var onlyScrolling =
          slide.scrollHeight > slide.offsetHeight && //allow only when slide is scrollable
          ((touchesDiff < 0 && startScroll === 0) || //start from top edge to scroll bottom
            (touchesDiff > 0 && startScroll === slide.scrollHeight - slide.offsetHeight) || //start from bottom edge to scroll top
            (startScroll > 0 && startScroll < slide.scrollHeight - slide.offsetHeight)); //start from the middle
        if (onlyScrolling) {
          e.stopPropagation();
        }
      },
      true
    );
  },
  elementCopy: function (btnCopyCls) {
    btnCopyCls = btnCopyCls || '.btnpopcode';
    var $tip = $(
      '<div class="jy-copytips" style="display: none; padding: 10px; position: fixed; top: 30%; left: 50%; transform: translateX(-50%); background-color: rgb(0, 0, 0); color: rgb(255, 255, 255); box-shadow: rgb(0, 0, 0) 0px 0px 5px; white-space: nowrap; z-index: 2001;"></div>'
    );
    $('body').append($tip);
    var clipboard = new ClipboardJS(btnCopyCls);
    clipboard.on('success', function () {
      $tip.text('复制成功').fadeIn(500).fadeOut(1000);
    });
    clipboard.on('error', function () {
      $tip.text('您的手机不支持点击复制，请长按复制！').fadeIn(500).fadeOut(1000);
    });
  },
  tip: {
    screen: function () {
      var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
      var $tip = '';
      $tip += '<!--旋屏提示 -->';
      $tip += '<div id="orientLayer" class="jy-orient_layer">';
      $tip += '<div class="jy-orient_content">';
      $tip += '<i class="jy-orient_icon"></i>';
      $tip += '<div class="jy-orient_extra">为了更好的体验，请使用竖屏浏览</div>';
      $tip += '</div>';
      $tip += '</div>';
      $tip = $($tip);
      $('body').append($tip);
      window.addEventListener(
        resizeEvt,
        function () {
          var clientWidth = window.innerWidth,
            clientHeight = window.innerHeight;
          if (clientHeight < clientWidth) {
            if (!$tip.hasClass('active')) {
              $tip.addClass('active');
              setTimeout(function () {
                $tip.removeClass('active');
              }, 5000);
            }
          } else {
            $tip.removeClass('active');
          }
        },
        false
      );
    },
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
    return Object.prototype.toString.call(number).toLocaleLowerCase() === '[object number]';
  },
  lottery(index, total, cbCurrent, cbEnd) {
    if (!this.isNumber(index)) return new Error('the arguments of index must number!');
    if (typeof cbEnd !== 'function') return new Error('the arguments of cbEnd must function!');
    if (typeof cbCurrent !== 'function') return new Error('the arguments of cbCurrent must function!');
    var TYPE_SPEED = 0;
    var TYPE_ADD_SPEED = 20;
    var TYPE_LAST_SPEED = 500;
    var TYPE_MAX_INDEX = total;
    var currSpeed = 0;
    var totalIndex = 0;
    var currentIndex = 0;
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
          }
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
  language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  pop: {
    picker: function () {
      var $picker =
        '' +
        '<!-- pop selector  -->' +
        '<div style="z-index:1001;" class="jy-pop " id="J_selectorPop">' +
        '<div div class="jy-pop_mask jy-pop_mask--clickable" ></div>' +
        '<div class="jy-pop_picker_main">' +
        ' <div class="jy-pop_picker_hd">' +
        '<a href="javascript:;" class="jy-pop_picker_btn jy-pop_picker_btn--cancel">取消</a>' +
        '<a href="javascript:;" class="jy-pop_picker_btn jy-pop_picker_btn--confirm">确定</a>' +
        '</div>' +
        '<div class="jy-pop_picker__body">' +
        '<ul id="jyPopPicker">' +
        '<li class="active">xxx</li>' +
        '<li>xxx</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div >';
      $picker = $($picker);
      $picker.insertBefore($('#J_tipPop'));

      return {
        $picker: $picker,
      };
    },
    authTime: { current: 60, default: 60 },
    authDisable: false,
    authTimer: null,
    btnAuth: function (cls) {
      var self = this;
      $(cls).on('click', function () {
        if (self.authDisable) return;
        self.authDisable = true;
        clearTimeout(self.authTimer);
        self.authTime.current = self.authTime.default;
        $btn = $(this);
        function count() {
          $btn.text('倒计时' + self.authTime.current + 's').addClass('disable');
          self.authTimer = setTimeout(function () {
            if (self.authTime.current == 1) {
              clearTimeout(self.timer);
              self.authDisable = false;
              $btn.text('验证码').removeClass('disable');
              return;
            }
            --self.authTime.current;
            $btn.text('倒计时' + self.authTime.current + 's');
            count();
          }, 1000);
        }
        count();
      });
    },
  },
  showTip: function (html) {
    var $tip = $('#J_tipPop');
    $tip.find('#popTipNorm').html(html);
    $tip.fadeIn();
  },
  navTo: function (cls) {
    $(cls).addClass(this.activeCls).siblings().removeClass(this.activeCls);
  },
  $window: {
    fixed: function (cls) {
      cls = cls || '.jy-content';
      $(cls).css({ 'overflow-y': 'hidden' });
    },
    reset: function (cls) {
      cls = cls || '.jy-content';
      $(cls).css({ 'overflow-y': 'auto' });
    },
    winReset: function () {
      document.querySelector('body').style.overflow = '';
    },
    winFixed: function () {
      document.querySelector('body').style.overflow = 'hidden';
    },
  },
  preload: {
    init: (function () {
      var $loading = '' + '<!-- preload -->' + '<div class="ploading " id="pagePreload">' + '<div class="progress">' + '<p>loading...</p>' + '<p id="ploadingPro">0%</p>' + '</div>' + '</div>';
      $loading = $($loading);
      $('body').append($loading);

      return function (path, imgArr, cbSuccess, cbProcess) {
        $loading.fadeIn();
        $loading = null;
        var loader = new ImagesLoader();
        loader.loadImages(imgArr, path);
        loader.complete(function () {
          cbSuccess();
        });
        loader.process(function () {
          cbProcess(this);
        });
        loader.start();
        jtool.$window.winFixed();
      };
    })(),
    open: function () {
      jtool.$window.winFixed();
      $('#pagePreload').fadeIn();
    },
    close: function () {
      jtool.$window.winReset();
      $('#pagePreload').fadeOut();
    },
  },
  touchMove: {
    $doms: [],
    addListener: function (cls) {
      var dom = document.querySelector(cls);
      this.$doms.push({
        cls: cls,
        dom: dom,
        stat: false, // 不阻止
      });
    },
    has: function (cls) {
      var ret = null;
      this.$doms.forEach(function (dom, index) {
        if (dom.cls == cls) {
          ret = {
            stat: dom.stat,
            cls: dom.cls,
            dom: dom.dom,
            index: index,
          };
        } else {
          ret = false;
        }
      });
      return ret;
    },
    preventFn: function (e) {
      e.preventDefault();
    },
    prevent: function (cls) {
      var self = this,
        clsStat = this.has(cls);
      if (!clsStat) return;
      if (clsStat && clsStat.stat) return;
      self.$doms[clsStat.index].stat = true;
      // console.log('prevent', this.has(cls), clsStat.dom, self.preventFn)
      // clsStat.dom.addEventListener('touchmove', function (e) { self.preventFn(e, callback) }, {
      clsStat.dom.addEventListener('touchmove', self.preventFn, {
        passive: false,
      });
    },
    reset: function (cls) {
      var self = this,
        clsStat = this.has(cls);
      if (!clsStat) return;
      if (clsStat && !clsStat.stat) return;
      self.$doms[clsStat.index].stat = false;
      // console.log('reset', this.has(cls), clsStat.dom, self.preventFn)
      // clsStat.dom.removeEventListener('touchmove', function (e) { self.preventFn(e, callback) }, {
      clsStat.dom.removeEventListener('touchmove', self.preventFn, {
        passive: false,
      });
    },
  },
  // music
  initMusic: function () {
    var url = this.audioPath + 'bgm.mp3',
      btnAudio = $('.btn-aud'),
      audio = new Audio();
    audio.setAttribute('src', url);
    audio.setAttribute('loop', true);
    audio.setAttribute('autoplay', true);
    audio.setAttribute('muted', false);
    audio.volume = 0.5;
    audio.style.cssText = ';opacity:.1;height:1px;';
    document.body.appendChild(audio);

    function play(label) {
      if (audio.paused) {
        audio.play();
        console.log(label, audio.paused);
        if (!audio.paused) btnAudio.addClass(jtool.activeCls);
        else {
          btnAudio.addClass(jtool.activeCls);
        }
      } else {
        btnAudio.addClass(jtool.activeCls);
      }
    }
    play('initial');
    window.setTimeout(function () {
      audio.addEventListener(
        'canplay',
        function () {
          play('canlpay');
        },
        false
      );
      document.addEventListener(
        'WeixinJSBridgeReady',
        function () {
          play('wechat');
        },
        false
      );
      $('document,body').one('click', function () {
        play('one');
      });
      //   需要显示按钮是使用
      //   if (audio.paused && audio.play() !== undefined) {
      //     audio.play().catch(function () {
      //       audio.play();
      //       console.log('promise', audio.paused);
      //       if (!audio.paused) btnAudio.addClass(jtool.activeCls);
      //       else {
      //         btnAudio.addClass(jtool.activeCls);
      //       }
      //     });
      //   }
      btnAudio.on('click', function () {
        if ($(this).hasClass(jtool.activeCls)) {
          audio.pause();
          $(this).removeClass(jtool.activeCls);
        } else {
          audio.play();
          $(this).addClass(jtool.activeCls);
        }
      });
    }, 20);
  },
};
// // 倒计时
// var jcountdown = {
//   timer: null,
//   format: function (num) {
//     num = Number(num) || 0;
//     return num < 10 ? '0' + num : num;
//   },
//   getTime: function (y, mo, d, h, mi, s) {
//     return new Date(y, mo, d, h, mi, s).getTime();
//   },
//   getDate: function (y, mo, d, h, mi, s) {
//     mo = mo - 1;
//     var now = new Date().getTime(),
//       last = new Date(y, mo, d, h, mi, s).getTime(),
//       diff = (last - now) / 1000,
//       day = 0,
//       hour = 0,
//       min = 0,
//       sec = 0,
//       end = true;

//     if (diff > 0) {
//       day = parseInt(diff / 24 / 60 / 60);
//       hour = parseInt((diff / 60 / 60) % 24);
//       min = parseInt((diff / 60) % 60);
//       sec = parseInt(diff % 60);
//       end = false;
//     }
//     return { end: end, day: this.format(day), hour: this.format(hour), min: this.format(min), sec: this.format(sec) };
//   },
//   setTimeDOM: function (y, mo, d, h, mi, s) {
//     var date = this.getDate(y, mo, d, h, mi, s);
//     $('#day').text(date.day);
//     $('#hour').text(date.hour);
//     $('#minute').text(date.min);
//     $('#second').text(date.sec);
//     if (!date.end) {
//       var t = this;
//       this.timer = setTimeout(function () {
//         t.setTimeDOM(y, mo, d, h, mi, s);
//       }, 1000);
//     }
//   },
//   countDown: function (y, mo, d, h, mi, s) {
//     clearTimeout(this.timer);
//     this.setTimeDOM(y, mo, d, h, mi, s);
//   },
// };

// // 第一波2月11号
// if (Date.now() < new Date(2021, 02, 11, 20, 00, 00)) {
//   jcountdown.countDown(2021, 02, 11, 20, 00, 00);
// }
// preinstall the code
$(function () {
  // jtool.preload.init(jtool.imgPath, [], function () {
  //   console.log('preload finish...')
  //   jtool.preload.close();
  //   // jtool.navTo('.section-1');
  // }, function (install) {
  //   var prsnum = install.processNum;
  //   $('#ploadingPro').html(prsnum + "%");
  //   console.log('preload process...', prsnum)
  // });
  // jtool.swiper('#psw');
  jtool.tip.screen();
  jtool.elementCopy();
  jtool.pop.picker();
  jtool.pop.btnAuth('.jy-pop_input_cell-auth');
  var queryTest = window.location.href;
  if (queryTest.indexOf('debug=jylie') > -1) new VConsole();
  // 只复位到顶部
  // $("input, textarea, select").on("blur", function () {
  //   window.scroll(0, 0);
  // });
  // // 复位到特定情景的顶部
  // (function () {
  //   var bfscrolltop = document.body.scrollTop;
  //   $("input, textarea, select")
  //     .focus(function () {
  //       bfscrolltop = document.body.scrollTop;
  //     })
  //     .blur(function () {
  //       document.body.scrollTop = bfscrolltop;
  //     });
  // })();

  // 弹窗
  // 关闭弹窗
  $('.jy-pop_btn_close,.jy-pop_mask--clickable,.jy-pop_picker_btn--cancel').on('click', function () {
    jtool.$window.winReset();
    $(this).parents('.jy-pop').fadeOut();
  });
});

// some business logic
$(function () {
  // selector
  $('#jyPopPicker').on('click', 'li', function () {
    $(this).addClass(jtool.activeCls).siblings().removeClass(jtool.activeCls);
  });
  $('#jyCallPicker').on('click', function () {
    $('#J_selectorPop').fadeIn();
  });
  $('.jy-pop_picker_btn--confirm').on('click', function () {
    // 业务逻辑

    $(this).parents('.jy-pop').fadeOut();
    $('#J_gamePop').hide();
  });
  // 礼品查看
  $('.btn-pop-check').on('click', function () {
    $('#J_codePop').fadeIn();
  });
  // 礼品待领取
  $('.btn-pop-code').on('click', function () {
    $('#J_codePop').fadeIn();
  });
  // 填写信息
  $('.btn-pop-address').on('click', function () {
    $('#J_ownPop').fadeIn();
  });
  // 待领取
  $('.btn-pop-get').on('click', function () {
    $('#J_gamePop').fadeIn();
  });
  // // 回到首页
  // $('.btn-pop-nav-home,.btn-nav-home').on('click', function () {
  //   jtool.navTo('.section-1');
  // });
  // // 概率公示
  // $('.btn-faqs').on('click', function () {
  //   $('#J_adverPop').fadeIn();
  // });
  // // 锦囊
  // $('.btn-kit').on('click', function () {
  //   $('#J_rulePop').fadeIn();
  // });
  // // 我的奖励
  // $('.btn-mygift').on('click', function () {
  //   $('#J_recordPop').fadeIn();
  // });

  // // 开始游戏
  // $('.btn-start').on('click', function () {
  //   navTo('.section-2');
  //   $('#J_rulePop').fadeIn();
  // });

  // game logic
  logic = {
    isGaming: false,
    timer: null,
    time: { DEFAULT: 30, current: 30 },
    duration: 800,
    score: { total: 0, current: 0 },
    // 游戏结束业务
    gameResult: function () {
      var t = this,
        score = logic.score;
      console.log('card result: ', score);

      // game success
      if (score.total <= score.current) {
        showTip('恭喜xxx');
      }
      // game fail
      else {
        $('#J_tipPop').find('#popTipNorm').text('！再来一次吧~');
        $('#J_tipPop').fadeIn();
      }
    },
    gameReset: function () {
      var t = this;
      t.isGaming = false;
      t.score.current = 0;
      t.time.current = t.time.DEFAULT;
      t.setTime();
      clearInterval(t.timer);
    },
    setTime: function () {
      var t = this;
      var $gTime = $('#gTime'),
        time = t.time.current;
      $gTime.text(time);
    },
    gameTimer: function () {
      var t = this;

      this.timer = setInterval(function () {
        if (t.time.current == -1 || t.score.current >= t.score.total) {
          clearInterval(t.timer);
          t.gameResult();
          return;
        }

        t.setTime();
        t.time.current--;
      }, 1000);
    },
    run: function () {
      var t = this;
      if (t.isGaming) {
        return;
      }
      t.gameReset();
    },
    loadGame: function () {
      var t = this,
        count = 3,
        $popReady = $('#J_gameReadyPop'),
        $count = $popReady.find('#gameReadyCount');
      jtool.navTo('.section-2');
      $popReady.fadeIn();
      $count.text(count);

      t.run();

      var time = setInterval(function () {
        --count;
        if (count == -1) {
          clearInterval(time);
          return;
        } else if (count == 0) {
          $count.text('GO!');
          $popReady.fadeOut();
          $('.card-cell').removeClass(activeCls).siblings().removeClass(activeCls);
          t.delay(function () {
            t.gameTimer();
          }, 100);
        } else {
          $count.text(count);
        }
      }, 1000);
    },
    $readyPop: function () {
      var $pop =
        '' +
        '<!-- pop game ready count -->' +
        '<div class="jy-pop " id="J_gameReadyPop">' +
        '<div class="jy-pop_mask"></div>' +
        '<div class="jy-pop_ready">' +
        ' <span id="gameReadyCount">3</span>' +
        '</div>' +
        '</div>';
      $pop = $($pop);
      $('body').append($pop);
    },
    init: function () {
      this.$readyPop();
    },
  };
  // logic.init();
});

// $(function () {
//   // test touchMove
//   jtool.touchMove.addListener('.section-1')
//   // jtool.touchMove.addListener('.section-2')
//   setTimeout(() => {
//     jtool.touchMove.prevent('.section-1', function (e) {
//       console.log('0000000000', e)
//     })
//   }, 3000);
//   setTimeout(() => {
//     jtool.touchMove.reset('.section-1', function (e) {
//       console.log('111111111', e)
//     })
//   }, 6000);
// })
