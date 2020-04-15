---
title: 探讨h5横竖屏的最佳实现方案
date:2020.04.15
---

在移动端，判断横竖屏的场景并不少见，比如根据横竖屏以不同的样式来适配，抑或是提醒用户切换为竖屏以保持良好的用户体验。

判断横竖屏的实现方法多种多样，现在就来探讨下目前有哪些实现方法以及其中的优缺点。

> The [orientation CSS media](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/orientation) feature can be used to test the orientation of the viewport (or the page box, for paged media).The orientation feature is specified as a keyword value chosen from the list below.

- portrait——The viewport is in a portrait orientation, i.e., the height is greater than or equal to the width.
- landscape——The viewport is in a landscape orientation, i.e., the width is greater than the height.

## CSS Media Queries

通过媒体查询的方式，我们可以通过以下方法来实现根据横竖屏不同的情况来适配样式：

- 内联样式

```css
@media screen and (orientation: portrait) {
  //竖屏
}

@media screen and (orientation: landscape) {
  //横屏
}
```

- 外联样式

```css
<!-- 竖屏 -->
<link rel="stylesheet" media="all and (orientation:portrait)" href="" />

<!-- 横屏 -->
<link rel="stylesheet" media="all and (orientation:landscape)" href="" />

```

## window.matchMedia()

除此之外，[CSS Object Model（CSSOM）Views](https://www.w3.org/TR/cssom-view/#dom-window-matchmedia) 规范增加了对 JavaScript 操作 CSS Media Queries 的原生支持，它在 window 对象下增加了 matchMedia() 方法，让我们能够通过脚本的方式来实现媒体查询。

window.matchMedia() 方法接受一个 Media Queries 语句的字符串作为参数，返回一个 MediaQueryList 对象。该对象有 media 和 matches 两个属性：

- media：返回所查询的 Media Queries 语句字符串
- matches：返回一个布尔值，表示当前环境是否匹配查询语句

同时，它还包含了两个方法，用来监听事件：

- addListener(callback)：绑定回调 callback 函数
- removeListener(callback)：注销回调 callback 函数

兼容性方面[Can I Use - matchMeida](http://caniuse.com/#search=matchmedia)，该 API 在移动端得到良好的支持，并无兼容性问题,pc 端支持 ie10+及现代浏览器。

那么，通过 window.matchMedia() 的方法，我们可以这样判断横竖屏：

```js
var mql = window.matchMedia("(orientation: portrait)");
function onMatchMeidaChange(mql) {
  if (mql.matches) {
    // 竖屏
  } else {
    // 横屏
  }
}
onMatchMeidaChange(mql);
mql.addListener(onMatchMeidaChange);
```

## window.innerHeight/window.innerWidth

在 CSS Media Queries 中，Orientation 属性有两个值：

- portrait，指的是当 height 大于等于 width 的情况
- landscape，指的是当 height 小于 width 的情况

所以，还有一种最为常见的方法是通过比较页面的宽高，当页面的高大于等于宽时则认为是竖屏，反之则为横屏。

```js
function detectOrient() {
  if (window.innerHeight >= window.innerWidth) {
    // 竖屏
  } else {
    // 横屏
  }
}
detectOrient();
window.addEventListener("resize", detectOrient);
```

## [window.orientation](https://developer.mozilla.org/en-US/docs/Web/API/Window/orientation#Browser_compatibility)

> 不推荐使用，因为该 API 已经在 web 标准中移除，有些浏览器可能任然支持

在 iOS 平台以及大部分 Android 手机都有支持 window.orientation 这个属性，它返回一个与默认屏幕方向偏离的角度值：

0：代表此时是默认屏幕方向
90：代表顺时针偏离默认屏幕方向 90 度
-90：代表逆时针偏离默认屏幕方向 90 度
180：代表偏离默认屏幕方向 180 度

在 iOS 的开发者文档[（iOS Developer Library - Handling Orientation Events）](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html)是这样明确定义的：

```js
switch (window.orientation) {
  case 0:
    displayStr += "Portrait";
    break;

  case -90:
    displayStr += "Landscape (right, screen turned clockwise)";
    break;

  case 90:
    displayStr += "Landscape (left, screen turned counterclockwise)";
    break;

  case 180:
    displayStr += "Portrait (upside-down portrait)";
    break;
}
```

在实际应用中，对于 iPhone 和大部分 Android 是没有 180 度的手机竖屏翻转的情况的，但是 iPad 是存在的。所以，简化下代码，我们可以绑定 orientationchange 事件来判断横竖屏：

```js
function detectOrient() {
  if (Math.abs(window.orientation) === 90) {
    // 横屏
  } else {
    // 竖屏
  }
}
detectOrient();
window.addEventListener("orientationchange", detectOrient);
```

![示例](data:image/png;base64,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)

## 影响判断的因素

### window.orientation 属性值的不一致

在 iOS 平台，对 window.orientation 属性值是无异议的，规范当中有明确规定每个值对应的情况。但是对于 Android 平台（如： Samsung Tab 2），就有不一致的特殊情况出现。

按照[Compatibility Standard - 4.2 window.orientation API](https://compat.spec.whatwg.org/#event-orientationchange)规范中的定义，0 值指的是 natural 、 default 的屏幕方向，所以如果生厂商对 natural 、 default 状态是用户应当手持设备方向为横屏，那么 0 值对应为 landscape 的横屏方向了。
针对这种不一致情况的出现，对于追求完美的开发者来说，通过 window.orientation 的方法来判断横竖屏则变得有点不可靠的。

而且在最新标准中 window.orientation 以被移除，真心不推荐使用。

### 软键盘的弹出

是否除了 window.orientation 的其它方法都是可靠的呢？

然而，实际上是事与愿违的。在 Android 下，如果页面中出现软键盘弹出的情况（存在有 Input 的元素）时，页面有时会因为软键盘的弹出而导致页面回缩，即页面的宽度（竖屏时）或者高度（横屏时）被改变。

无论是 CSS Media Queries 还是 window.matchMedia() 方法，还是根据 window.innerWidth 、window.innerHeight 的页面宽高比对方法来实现的横竖屏判断方法，都会因此受到影响，出现判断失误的情况（ Samsung SCH-i699 机型，在竖屏时由于软键盘弹出导致页面高度小于宽度，被错误地判定为横屏）。

所以，在这样的情况下，这几种方式也变得不可靠。

但是可以设置一个定时器来延迟获取尺寸。

### 在 华为 P9 的微信（6.5.4）、华为荣耀的微信（6.5.7）和 Chrome 浏览器上，screen.width 与 screen.height 均会随着横竖屏的切换而变。

随着横竖屏幕的切换，screen.width 与 screen.height 在大部分机型上会维持不变，而在一些机型上如@Jc、@百思不得姐夫
提出的华为 P9 微信内置浏览器(6.5.4 版本)、Chrome 桌面端浏览器模拟器中会出现值交换的现象。

例如，在 Chome 上 iPhone 6 模拟器中，竖屏时 screen.width 与 screen.height 等于 375px、667px，而横屏时，sreen.width 与 screen.height 等于 667px 、 375px，两者属性值出现了值交换现象。

这个问题很容易解决，虽然出现了值交换，但是值大小还是不变的，那么我们可以先通过比较大小来判断出属性值较小的是 screen.width，而属性值较大的是 screen.height，然后再用来与 document.documentElement.clientWidth/clientHeight 进行比较，从而判断出横竖屏。

### Meta Viewport 的设置会影响到 document.documentElement.clientWidth/clientHeight 的值。

Peter-Paul Koch 的《两个 Viewport 的故事》的一文中提出的关于 Viewport 的理论被认为是业界的主流论调，它指出 Layout Viewport 的尺寸可以通过 document.documentElement.clientWidth/clientHeight 进行度量。而通过设置 Meta Viewport （也就是 viewport meta 标签）是可以改变 Layout Viewport 的尺寸。

所以，Meta Viewport 的属性设置如何是会影响到 document.documentElement.clientWidth/clientHeight 的值，这就是一部分读者迷惑到”为什么会我测量 document.documentElement.clientWidth/clientHeight 的值与 screen.width/height 的值不相同？“的原因所在。

因此，在这里也补充一点，在笔者提出的方法中，有个忘记跟大家说明的前提——页面设置了以下属性以保证页面的适配：

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;"
/>
```

这句语句的设置就保证了页面是始终适配屏幕的，在横竖屏切换的场景中 document.documentElement.clientWidth/clientHeight 必然与 screen.width/height 其中一值相等，并且这也是本文提出的横竖屏检测方法的核心。

### 在微信内（其他移动浏览器也会），会多次触发 resize 事件。

笔者是通过绑定监听 resize 事件来响应执行横竖屏检测方法的，而在实际应用中确实出现了 resize 事件触发两次的情况。

虽然并没有影响到事件的判断结果，但是这也算个值得优化的点，而且问题也不大，我们只要通过函数去抖（ Debounce Function ) 办法来进行简单的解决就好。

## 探讨最佳实现方式

本着核心的原则——具体情况具体解决来讨论。

如果你没有遇上以上两个问题所在，恭喜你！上面所提到的方法都可以被应用，选择你最为喜欢的方法就好。

但是如果想要避免以上两个问题所在，有没有更好的办法呢？

经过实际情况的研究，针对开发环境兼容的情况（ iOS 与 Android 下的微信内置浏览器与原生浏览器）来说，屏幕分辨率是不会改变的，那么我们可以尝试比对页面宽高和屏幕分辨率来判断横竖屏。

需要注意的是，微信内置浏览器页面宽度不包括顶栏部分的，而 Android 和 iOS 的原生浏览器都是带有底栏或顶栏兼有的。

那么，我们可以确定为：

假如屏幕分辨率固定值为：screen.width 和 screen.height（需要注意，这里很重要的一点是：在移动端，屏幕翻转时，screen.width 和 screen.height 的值依然是不变的后面有补充修正，可以直接跳到下一个章节阅读）

- 若获取 当前页面的宽（document.documentElement.clientWidth），等于屏幕分辨率的宽(screen.width)，则可认定当前属于竖屏。

- 若获取 当前页面的宽（document.documentElement.clientWidth），等于屏幕分辨率的高(screen.height)，则可认定当前属于横屏。

如此，对应的代码为：

```js
// 判断横竖屏
var utils = {
  debounce: function (func, delay) {
    var timer = null;
    return function () {
      var context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        func.apply(context, args);
      }, delay);
    };
  },
};

var detectRes = document.getElementById("J_detectRes");
var detectData = document.getElementById("J_detectData");

function detectOrient() {
  var storage = localStorage; // 不一定要使用localStorage，其他存储数据的手段都可以
  var data = storage.getItem("J-recordOrientX");
  var cw = document.documentElement.clientWidth;

  var _Width = 0,
    _Height = 0;
  if (!data) {
    sw = window.screen.width;
    sh = window.screen.height;
    // 2.在某些机型（如华为P9）下出现 srceen.width/height 值交换，所以进行大小值比较判断
    _Width = sw < sh ? sw : sh;
    _Height = sw >= sh ? sw : sh;
    storage.setItem("J-recordOrientX", _Width + "," + _Height);
  } else {
    var str = data.split(",");
    _Width = str[0];
    _Height = str[1];
  }

  if (cw == _Width) {
    // 竖屏
    return;
  }
  if (cw == _Height) {
    // 横屏
    return;
  }
}

// 3.函数去抖处理
window.onresize = utils.debounce(detectOrient, 300);
detectOrient();
```

目前，W3C 引入[Screen Orientation API](https://www.w3.org/TR/screen-orientation/)，该标准能够帮助 Web 应用获得屏幕方向的状态，在状态改变时获得通知，并能够从应用程序中将屏幕状态锁定到特定状态。
但截止目前，该标准仍在 W3C 草案阶段。在移动端，它在 Android 和 iOS 平台上仍未得到支持，仅仅在 Chrome for Android 39 版本及以上才得到实现，所以对目前的开发来说意义不大。只能期待它能够尽快通过并得到广泛支持，这样的检测屏幕方向的问题就能够得到规范化的解决。

## 参考文档

- [Compatibility Standard - 4.2 window.orientation API](https://compat.spec.whatwg.org/#event-orientationchange)
- [MDN-Window.orientation](https://developer.mozilla.org/en-US/docs/Web/API/Window/orientation#Browser_compatibility)
- [探讨判断横竖屏的最佳实现](https://aotu.io/notes/2017/01/31/detect-orientation/)
