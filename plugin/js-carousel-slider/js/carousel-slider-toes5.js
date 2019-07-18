/**
 * @name: js 原生轮播图
 * @description: 轮播图实现的功能有：可配置参数、鼠标经过悬停、移动端端鼠标滑动下一张、pc端鼠标滑动下一张、自动播放、图片自适应图片大小、图片自适应屏幕切换等，是一个轻量、使用、强大的轮播图插件
 * @author: 家永(809206619@qq.com | liejystephen@gmail.com)
 * @update: 2017-12-30 00:02
 * @version: 0.4
 */

"use strict";
var _typeof =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function(c) {
          return typeof c;
        }
      : function(c) {
          return c &&
          "function" == typeof Symbol &&
          c.constructor === Symbol &&
          c !== Symbol.prototype
            ? "symbol"
            : typeof c;
        },
  _createClass = (function() {
    function c(d, f) {
      for (var h, g = 0; g < f.length; g++)
        (h = f[g]),
          (h.enumerable = h.enumerable || !1),
          (h.configurable = !0),
          "value" in h && (h.writable = !0),
          Object.defineProperty(d, h.key, h);
    }
    return function(d, f, g) {
      return f && c(d.prototype, f), g && c(d, g), d;
    };
  })();
function _classCallCheck(c, d) {
  if (!(c instanceof d))
    throw new TypeError("Cannot call a class as a function");
}
var CarouselSlider = (function() {
  function c(d, f) {
    _classCallCheck(this, c),
      (this.carousel = this),
      (this.container = d),
      (this.options = {}),
      (this.index = 1),
      (this.timer = null),
      this._init(f);
  }
  return (
    _createClass(c, [
      {
        key: "isLoop",
        value: function isLoop() {
          if (this.options.loop) {
            var h = function(j) {
                j.timer = setTimeout(function() {
                  (j.index = j.index < d - f + 1 ? j.index + 1 : 1),
                    j.play(j.index),
                    j._dotActive(j.index),
                    h(j);
                }, j.options.interval);
              },
              d = this.sliderItem.length,
              f = this.slidesPreView;
            h(this);
          }
        }
      },
      {
        key: "play",
        value: function play(d) {
          var f = -this._getMoveOffset(d);
          this.sliderContainer.style.cssText =
            "transform:translate3d(" +
            f +
            "px,0,0);transition:.5s all;user-select:none";
        }
      },
      {
        key: "event",
        value: function event() {
          function d(s, t) {
            return !!(t > s);
          }
          function f() {
            (h.index = h.index < p ? ++h.index : 1), h.play(h.index);
          }
          function g() {
            (h.index = Math.max(--h.index, 1)),
              1 === h.index && (h.index = p),
              h.play(h.index);
          }
          var h = this,
            j = !1,
            k = !1,
            l = { x1: 0, x2: 0, diff: 0 },
            m = { x1: 0, x2: 0, diff: 0 },
            n = this.sliderItem.length,
            o = this.slidesPreView,
            p = n - o + 1;
          if (
            this.container.querySelector(this.options.arrowPreCls) &&
            this.container.querySelector(this.options.arrowNextCls)
          ) {
            var q = this.container.querySelector(this.options.arrowPreCls),
              r = this.container.querySelector(this.options.arrowNextCls);
            this.container.addEventListener(
              "click",
              function(s) {
                s = s || window.event;
                var t = s.target || s.srcElement;
                t === q ? g() : t === r && f(), h._dotActive(h.index);
              },
              !0
            );
          }
          this.container.addEventListener("mouseover", function() {
            clearTimeout(h.timer);
          }),
            this.container.addEventListener("mouseout", function() {
              h.isLoop();
            }),
            this.container.addEventListener("mousedown", function(s) {
              (s = s || window.event),
                s.preventDefault(),
                (j = !0),
                (l.x1 = s.pageX);
            }),
            this.container.addEventListener("mousemove", function(s) {
              (s = s || window.event),
                s.preventDefault(),
                (l.x2 = s.pageX),
                (l.diff = l.x2 - l.x1);
            }),
            this.container.addEventListener("mouseup", function(s) {
              (s = s || window.event),
                s.preventDefault(),
                (j = !1),
                (l.x2 = s.pageX),
                (l.diff = l.x2 - l.x1),
                80 < Math.abs(l.diff) && !j && (d(l.x2, l.x1) ? f() : g()),
                h._dotActive(h.index);
            }),
            this.container.addEventListener("touchstart", function(s) {
              clearTimeout(h.timer), (s = s || window.event), (k = !0);
              var _e = s,
                t = _e.targetTouches;
              m.x1 = t[0].pageX;
            }),
            this.container.addEventListener("touchmove", function(s) {
              (s = s || window.event), s.preventDefault();
              var _e2 = s,
                t = _e2.targetTouches;
              m.x2 = t[0].pageX;
            }),
            this.container.addEventListener("touchend", function(s) {
              (s = s || window.event),
                (k = !1),
                (m.diff = m.x2 - m.x1),
                80 < Math.abs(m.diff) && !k && (d(m.x2, m.x1) ? f() : g()),
                h._dotActive(h.index),
                h.isLoop();
            }),
            window.addEventListener("resize", function() {
              console.log("window changed!"),
                h._initSliderWidth(),
                h._initElement();
            }),
            this._dotEvent(),
            this.unloadEvent();
        }
      },
      {
        key: "unloadEvent",
        value: function unloadEvent() {
          var d = this;
          window.addEventListener("unload", function() {
            clearTimeout(d.timer);
          });
        }
      },
      {
        key: "_dotEvent",
        value: function _dotEvent() {
          var k = this;
          if (
            this.container.querySelector(this.options.dotsCls) ||
            this.container.querySelectorAll(this.options.dotCls)[0]
          ) {
            var d = this.container.querySelector(this.options.dotsCls),
              f = this.options.dotActiveCls,
              g = this.container.querySelectorAll(this.options.dotCls),
              h = this.container.querySelectorAll(this.options.sliderItemCls),
              j = h.length;
            d.addEventListener("click", function(l) {
              l = l || window.event;
              var m = l.target || l.srcElement;
              g.length !== j &&
                (console.warn(
                  "\u8F6E\u64AD\u56FE\u7684\u5706\u70B9\u9009\u62E9\u5668\u914D\u7F6E\u9519\u8BEF"
                ),
                (k.index > j || 1 >= k.index) && (k.index = 1)),
                g.forEach(function(n, o) {
                  n === m
                    ? (k.addClass(n, f), (k.index = o + 1), k.play(k.index))
                    : k.removeClass(n, f);
                });
            });
          }
        }
      },
      {
        key: "_getMoveOffset",
        value: function _getMoveOffset(d) {
          return this.sliderItemWidth * (d - 1);
        }
      },
      {
        key: "_initData",
        value: function _initData(d) {
          (this.options = Object.assign(
            {},
            {
              loop: !0,
              interval: 3400,
              slidesPreView: 3,
              moveCount: 1,
              sliderContainerCls: ".h-carousel-content",
              sliderItemCls: ".h-carousel-item",
              dotsContainerCls: ".h-dots",
              arrowPreCls: ".h-arrow-pre",
              arrowNextCls: ".h-arrow-next",
              dotsCls: ".h-dots",
              dotCls: ".h-dot",
              dotActiveCls: "active",
              fullWidth: !1,
              breakPoints: {
                900: { slidesPreView: 3 },
                600: { slidesPreView: 2 }
              }
            },
            d
          )),
            (this.sliderContainer = this.container.querySelector(
              this.options.sliderContainerCls
            )),
            (this.sliderItem = this.container.querySelectorAll(
              this.options.sliderItemCls
            )),
            (this.sliderItemWidth = this.sliderItem.offsetWidth),
            (this.slidesPreView = this.options.slidesPreView);
        }
      },
      {
        key: "_normalizeBreakPoints",
        value: function _normalizeBreakPoints(d) {
          if (
            "object" === ("undefined" == typeof d ? "undefined" : _typeof(d)) &&
            "function" != typeof d &&
            !(d instanceof Array)
          ) {
            var f = [];
            for (var g in d) f.push([parseInt(g), d[g].slidesPreView]);
            return (
              f.sort(function(h, j) {
                return h < j;
              }),
              f
            );
          }
          console.error(JSON.stringify(d), "is not a Object");
        }
      },
      {
        key: "_getSlidesPreView",
        value: function _getSlidesPreView(d) {
          var f = document.documentElement.clientWidth,
            g = this.options.slidesPreView;
          return (
            (d = this._normalizeBreakPoints(d)),
            d.forEach(function(h) {
              return f > h[0] ? g : void (g = h[1]);
            }),
            g
          );
        }
      },
      {
        key: "_initSliderWidth",
        value: function _initSliderWidth() {
          if (
            !(this.slidesPreView && "auto" === this.slidesPreView) &&
            this.slidesPreView &&
            "number" == typeof this.slidesPreView
          ) {
            var d,
              f,
              g = this.options.breakPoints,
              h = this.slidesPreView;
            this.options.breakPoints &&
              !this.options.fullWidth &&
              (h = this._getSlidesPreView(g)),
              (d = this.options.fullWidth
                ? document.documentElement.clientWidth
                : this.container.offsetWidth),
              (f = 1 | (d / h));
            var j =
              ";width:" + f + "px;max-width:" + f + "px;flex:0 0 " + f + "px";
            (this.sliderItemWidth = f),
              this.sliderItem.forEach(function(k) {
                k.style.cssText = j;
              });
          }
        }
      },
      {
        key: "_initArrow",
        value: function _initArrow() {
          if (
            this.container.querySelector(this.options.arrowPreCls) ||
            this.container.querySelector(this.options.arrowNextCls)
          ) {
            var d = this.container.querySelector(this.options.arrowPreCls),
              f = this.container.querySelector(this.options.arrowNextCls),
              g = document.documentElement.clientWidth;
            this.DEVICE_PIXEL > g
              ? ((d.style.display = "none"), (f.style.display = "none"))
              : ((d.style.display = "block"), (f.style.display = "block"));
          }
        }
      },
      {
        key: "_initElement",
        value: function _initElement() {
          this._initArrow();
        }
      },
      {
        key: "_init",
        value: function _init(d) {
          this._initData(d),
            this._initSliderWidth(),
            this._initElement(),
            this.isLoop(),
            this.event();
        }
      },
      {
        key: "_dotActive",
        value: function _dotActive(d) {
          var h = this;
          if (this.container.querySelectorAll(this.options.dotCls)) {
            var f = this.container.querySelectorAll(this.options.dotCls),
              g = this.options.dotActiveCls;
            f.forEach(function(j, k) {
              k + 1 === d ? h.addClass(j, g) : h.removeClass(j, g);
            });
          }
        }
      },
      {
        key: "hasClass",
        value: function hasClass(d, f) {
          var g = new RegExp("(^|\\s)" + f + "(\\s|$)");
          return g.test(d.className);
        }
      },
      {
        key: "addClass",
        value: function addClass(d, f) {
          if (!this.hasClass(d, f)) {
            var g = d.className.split(" ");
            g.push(f), (d.className = g.join(" "));
          }
        }
      },
      {
        key: "removeClass",
        value: function removeClass(d, f) {
          if (this.hasClass(d, f)) {
            var g = new RegExp("(^|\\s)" + f + "(\\s|$)");
            d.className = d.className.replace(g, "");
          }
        }
      }
    ]),
    c
  );
})();
CarouselSlider.prototype.DEVICE_PIXEL = 1024;

