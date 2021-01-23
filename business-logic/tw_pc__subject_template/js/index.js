/*
 * Description:
 * version:
 * Author: liejiayong(809206619@qq.com)
 * Date: 2020-06-29 16:25:09
 * @LastEditors: liejiayong(809206619@qq.com)
 * @LastEditTime: 2021-01-23 17:05:20
 */
var jtool = {
  disableCls: 'disable',
  activeCls: 'active',
  showTip: function (html, cls) {
    cls = cls || '#popTips';
    var $tip = $('#J_tipPop');
    $tip.find(cls).html(html);
    $tip.fadeIn();
  },
  throttle: function throttle(fn, threshhold) {
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
  preStyle: function preStyle(style) {
    var el = document.createElement('div');

    var vendor = (function () {
      var transformName = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform',
      };
      for (var key in transformName) {
        if (el[key] !== 'undefined') {
          return key;
        }
      }
      return false;
    })();

    if (vendor === false) {
      return false;
    }

    if (vendor === 'standard') {
      return style;
    }
    return '-' + vendor.toLowerCase() + '-' + style.toLowerCase();
  },
  getRandom: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  // extend: function extend(def, nw) {
  //   for (var key in nw) {
  //     if (def[key] && nw.hasOwnProperty(key)) {
  //       def[key] = nw[key];
  //     }
  //   }
  //   return def;
  // },
  // /**
  //  * 骰子点数动画
  //  * @param {*} count 最后点数
  //  */
  // diss: function (count, cb, duration) {
  //   duration = duration || 800;
  //   var $diss = $('.btn-dot-i'),
  //     self = this;
  //   var ra, fn;
  //   fn = function () {
  //     ra = requestAnimationFrame(function () {
  //       $diss.attr('class', 'jy-btn btn-dot-i i-dot-' + self.getRandom(1, 6));
  //       fn();
  //     });
  //   };
  //   fn();
  //   setTimeout(function () {
  //     cancelAnimationFrame(ra);
  //     $diss.attr('class', 'jy-btn btn-dot-i i-dot-' + count);
  //     setTimeout(function () {
  //       cb();
  //     }, 100);
  //   }, duration);
  // },
};

// function SmoothSwing(el, range) {
//   this.el = document.querySelector(el) || null;
//   this.preX = 0;
//   this.preY = 0;
//   this.nextX = 0;
//   this.nextY = 0;
//   this.curX = 0;
//   this.curY = 0;
//   this.range = range;
// }
// SmoothSwing.prototype.setPosition = function (pos) {
//   this.nextX = pos.x;
//   this.nextY = pos.y;
//   var curX,
//     curY,
//     range = this.range;
//   curX = this.nextX - this.preX;
//   curX = curX > 0 ? range[1] : range[0];
//   curY = this.nextY - this.preY;
//   curY = curY > 0 ? range[1] : range[0];
//   this.curX = curX;
//   this.curY = curY;
//   this.preX = pos.x;
//   this.preY = pos.y;
// };
// SmoothSwing.prototype.listen = function (cb) {
//   var ever = document.body || document.documentElement,
//     t = this;
//   ever.addEventListener('mousemove', function (e) {
//     t.setPosition({ x: e.clientX, y: e.clientY });
//     var x = t.curX,
//       y = t.curY;
//     t.el.style.cssText = '-webkit-transition: all .2s;transition: all .2s;-webkit-transform:translate(' + x + 'px, ' + y + 'px)' + ';transform:translate(' + x + 'px, ' + y + 'px)';
//     console.log();
//   });
//   this.ever = ever;
// };
// SmoothSwing.prototype.remove = function (cb) {
//   this.ever.removeEventListener('mousemove', cb);
//   this.ever = null;
// };
// // 使用前需要将元素设置固定定位
// var smoothSwing = new SmoothSwing('.c-logo', [-10, 10]);
// smoothSwing.listen();

$(function () {
  eval(
    (function (p, a, c, k, e, r) {
      e = function (c) {
        return c.toString(36);
      };
      if ('0'.replace(0, e) == 0) {
        while (c--) r[e(c)] = k[c];
        k = [
          function (e) {
            return r[e] || e;
          },
        ];
        e = function () {
          return '[1-9a-n]';
        };
        c = 1;
      }
      while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
      return p;
    })(
      "2 copysFn=(b(){2 $1=$('<c class=\"jy-copytips\" style=\"display: none; padding: d; position: fixed; top: 30%; left: e%; transform: translateX(-e%); background-f: 3(0, 0, 0); f: 3(4, 4, 4); box-shadow: 3(0, 0, 0) g g 5px; white-space: nowrap;font-size: d; z-index: 2001;\"></c>');$('body').append($1);2 h=b(i){2 j=5.querySelector(i);j.select();try{if(5.k(\"l\",m,n)){5.k(\"l\",m,n);$1.6('复制成功').7(8).9(a)}else{$1.6('复制失败，请手动复制！').7(8).9(a)}}catch(err){$1.6('复制失败，请手动复制！').7(8).9(a)}};return h}());",
      [],
      24,
      '|tip|var|rgb|255|document|text|fadeIn|500|fadeOut|1000|function|div|20px|50|color|0px|core|cls|cop|execCommand|copy|false|null'.split('|'),
      0,
      {}
    )
  );
  $('.jy-pop_close,.jy-pop_submit').on('click', function () {
    $(this).parents('.jy-pop').fadeOut();
  });
  $('.btnpopcop').on('click', function () {
    copysFn('.btnpopcoptxt');
  });
  // 礼包码
  $('.btn-pop-code').on('click', function () {
    $('#J_codePop').fadeIn();
  });
  // 填写信息
  $('.btn-pop-address').on('click', function () {
    $('#J_addressPop').fadeIn();
  });
  // 待领取
  $('.btn-pop-get').on('click', function () {
    $('#J_regPop').fadeIn();
  });
  // 区服搜索;
  $('.jy-pop_select_seek-label').on('click', function () {
    var $content = $('.jy-pop_select_seek-content');
    if ($content.hasClass('active')) {
      $content.fadeOut().removeClass('active');
    } else {
      $content.fadeIn().addClass('active');
    }
  });
  $('.jy-pop_select_seek-val').on('click', function () {
    $('.jy-pop_select_seek-content').fadeOut().removeClass('active');
  });

  $('.btn-get').on('click', function () {
    if ($(this).hasClass(jtool.activeCls)) {
      jtool.showTip('<p>恭喜获得</p>');
    }
  });
  $('.btn-inter').on('click', function () {
    jtool.showTip('<p>我的积分：0</p>');
  });
  $('.btn-record').on('click', function () {
    $('#J_recordPop').fadeIn();
  });
  $('.btn-mygift').on('click', function () {
    $('#J_mygiftPop').fadeIn();
  });

  // // 摇骰子
  // $('.btn-jdot').on('click', function () {
  //   var $t = $(this);
  //   if (!$t.hasClass(jtool.activeCls) || jtool.loading) return;
  //   $t.removeClass(jtool.activeCls);
  //   var dissNum = jtool.getRandom(1, 6);
  //   jtool.diss(dissNum, function () {
  //     jtool.showTip('恭喜抽到' + dissNum);
  //     $t.addClass(activeCls);
  //   });
  // });

  // //  home page
  // jQuery("#hnews").slide({
  //   triggerTime: 0, effect: "fold"
  // });
  // jQuery("#hbans").slide({ titCell: '.hd', mainCell: ".bd", autoPage: true, effect: "fade", autoPlay: true });
});
