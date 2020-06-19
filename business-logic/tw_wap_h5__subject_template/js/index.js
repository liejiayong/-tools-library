var jyBus = {
  activeCls: "active",
  doc: document.documentElement.body || document.body,
  swiper: function (el) {
    var psw = new Swiper("el", {
      initialSlide: 0,
      direction: "vertical",
      autoHeight: true,
    });
    this.psw = psw;
    var startScroll, touchStart, touchCurrent;
    psw.slides.on(
      "touchstart",
      function (e) {
        startScroll = Math.ceil(this.scrollTop);
        touchStart = e.targetTouches[0].pageY;
      },
      true
    );
    psw.slides.on(
      "touchmove",
      function (e) {
        touchCurrent = e.targetTouches[0].pageY;
        var touchesDiff = touchCurrent - touchStart;
        var slide = this;
        var onlyScrolling =
          slide.scrollHeight > slide.offsetHeight && //allow only when slide is scrollable
          ((touchesDiff < 0 && startScroll === 0) || //start from top edge to scroll bottom
            (touchesDiff > 0 &&
              startScroll === slide.scrollHeight - slide.offsetHeight) || //start from bottom edge to scroll top
            (startScroll > 0 &&
              startScroll < slide.scrollHeight - slide.offsetHeight)); //start from the middle
        if (onlyScrolling) {
          e.stopPropagation();
        }
      },
      true
    );
  },
  elementCopy: function (btnCopyCls) {
    btnCopyCls = btnCopyCls || ".btnpopcode";
    var $tip = $(
      '<div class="jy-copytips" style="display: none; padding: 10px; position: fixed; top: 30%; left: 50%; transform: translateX(-50%); background-color: rgb(0, 0, 0); color: rgb(255, 255, 255); box-shadow: rgb(0, 0, 0) 0px 0px 5px; white-space: nowrap; z-index: 2001;"></div>'
    );
    $("body").append($tip);
    var clipboard = new ClipboardJS(btnCopyCls);
    clipboard.on("success", function () {
      $tip.text("复制成功").fadeIn(500).fadeOut(1000);
    });
    clipboard.on("error", function () {
      $tip
        .text("您的手机不支持点击复制，请长按复制！")
        .fadeIn(500)
        .fadeOut(1000);
    });
  },
  tip: {
    screen: function () {
      var resizeEvt =
        "orientationchange" in window ? "orientationchange" : "resize";
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
      window.addEventListener(resizeEvt, function () {
        var clientWidth = window.innerWidth,
          clientHeight = window.innerHeight;
        if (clientHeight < clientWidth) {
          if (!$tip.hasClass('active')) {
            $tip.addClass('active');
            setTimeout(function () {
              $tip.removeClass('active');
            }, 5000);
          }
        }
      }, false);
    }
  },
  winReset: function () {
    document.querySelector("body").style.overflow = "";
    document.querySelector("body").style.overflow = "";
  },
  winFixed: function () {
    document.querySelector("body").style.overflow = "hidden";
    document.querySelector("body").style.overflow = "hidden";
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
    return str.replace(/^\s+|\s+$/g, "");
  },
  getQueryString: function (key, type) {
    type = type ? type : "search";
    const regExp = new RegExp("[?&#]{1}" + key + "=(.*?)([&/#]|$)");
    const value = window.location[type].match(regExp);
    return value && decodeURIComponent(value[1]);
  },
  isNumber: function (number) {
    return (
      Object.prototype.toString.call(number).toLocaleLowerCase() ===
      "[object number]"
    );
  },
  lottery(index, total, cbCurrent, cbEnd) {
    if (!this.isNumber(index))
      return new Error("the arguments of index must number!");
    if (typeof cbEnd !== "function")
      return new Error("the arguments of cbEnd must function!");
    if (typeof cbCurrent !== "function")
      return new Error("the arguments of cbCurrent must function!");
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
};

$(function () {

  jyBus.elementCopy();
  // jyBus.swiper('#psw');
  jyBus.tip.screen();

  // 只复位到顶部
  $("input, textarea, select").on("blur", function () {
    window.scroll(0, 0);
  });
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
  $(".jy-pop_btn_close,.jy-pop_mask--clickable,.jy-pop_picker_btn--cancel").on(
    "click",
    function () {
      jyBus.winReset();
      $(this).parents(".jy-pop").fadeOut();
    }
  );
  // selector
  $("#jyPopPicker").on("click", "li", function () {
    $(this).addClass(activeCls).siblings().removeClass(activeCls);
  });
  $("#jyCallPicker").on("click", function () {
    $("#J_selectorPop").fadeIn();
  });
});
