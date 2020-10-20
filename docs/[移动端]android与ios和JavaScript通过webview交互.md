---
title: android与ios和JavaScript通过webview交互
---

## 前言

在移动开发过程中，总会碰上 webview 交互的时候，JavaScript 和 android webview 交互，JavaScript 和 ios 交互也是很常见的。app 端不管使用哪种语言开发，与 JavaScript 交互的时候是两种方式：app 通过 webview 传参给 JavaScript 和 JavaScript 通过 webview 传参给 app，下面总结一下在开发的实战经验，给自己留一份碎片记忆。

> ios 端以 OC 为例。 OC->Objective-C。

## 传参数据

在实际开发中，app 通过 webview 与 JavaScript 相互传递参数时，可以通过向 window 注入成员属性或者函数来实现，双方的数据传输协定根据 app 实际的开发语言有所区别。

从属性与函数的功能性，我们可以简单的区分一下：

- 属性： app 向 window 注入变量，主要用于获得标识参考。
- 函数：
  - app 向 window 的回调函数注入回调参数，主要用于让 window 动态获取 app 传递的参数（需要提前向 window 注入全局函数）。
  - window 向 app 传递参数，接收方式因终端语言而异。

谈完数据传输方式后接下来聊一下传输的数据结构。

一般来讲传输的数据结构可以是字符串、数字、JSON 字符串，需要注意的是 JSON 这块。

JSON 字符串传输对象（指数组和对象等符合数据结构）数据：

- 在 window 传递数据给 APP 时需要使用 JSON.stringify(params)将对象传化为 JSON 字符串才能顺利传输数据
- 在 window 调回 APP 的回调函数时，回调参数需要使用 JSON.parse(params)将对象传化为传输前的数据形式。
- 目前暂时不能给 window 注入属性？（2020/10/13）

## ios 端

### OC 传参给 window

当 oc 需要传参给 window 时，开发者需要在 window 定义好属性和函数，这里以 vuejs 为例。

先使用 JavaScript 定义好方法

```js
export default {
  data() {
    return {
      id: -1,
      record: null,
    }
  },
  methods: {
    /**
     * @param {Number} id
     * @return {Object} params -> {"name": "JyLie", "age": 18}
     */
    getRecord(id, params) {
      this.id = id
      this.record = JSON.parse(params)
    },
  },
  beforeMounted() {
    window.getRecord = this.getRecord
  },
}
```

接着 ios 端就可以定义接受数据

```c
// 页面加载完成之后调用在iOS里面调用js方法：
(void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation {
    NSString *jsStr = @"getRecord('{"name": "JyLie", "age": 18}')";
    NSLog(@"%@",jsStr);
    [webView evaluateJavaScript:jsStr completionHandler:^(id _Nullable d, NSError * _Nullable error) {
        NSLog(@"%@",d);
        NSLog(@"%@",error);
    }];
}
```

### window 传参给 OC

基本数据结构直接可以传输数据，复合对象则需要通过 JSON.stringify()将数据转化为 JSON 字符串。开发者需要在 webview 定义好传输数据的函数，ios 端根据实际情况接收函数参数即可完成数据交互。

```js
export default {
  data() {
    return {
      awakeIOSFnMap: {
        pc: "gotoWebGame",
        h5: "gotoWebGame",
        wap: "gotoMobileGame",
        server: "gotoService",
      },
    }
  },
  methods: {
    awakedIOSAPP(url, type) {
      const fun = this.awakeIOSFnMap[type]
      if (!fun) return
      window.webkit.messageHandlers[fun].postMessage(url)
    },
  },
  beforeMounted() {
    this.awakedIOSAPP()
  },
}
```

## android 端

android端直接调用数据注入即可，待完善~

### JavaScript 传参给 OC
