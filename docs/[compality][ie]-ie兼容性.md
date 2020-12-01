## IE 兼容性问题

### 运行页面白屏

IE 白屏一般是页面报错引起的，大部分情况是兼容性问题。

对于此类问题，先搞个常规排查添加 polyfill 尝试，再来个 babel 将代码编译为 es5，如果仍然报错则需要调试报错源处写法问题。

### 报错 "TypeError: 调用的对象无效

出现调用的对象无效，是因为引用了 IE window 上不存在的对象或函数引起的。

ie 不支持 es6|es6+的结构类型、函数、对象以及表达式，因此使用时要考虑 polyfill 进行支持，否则会报错。

在自己写兼容 polyfill 时要注册 DOM 和 js 相关的结构性、调用方式问题，赋值类型也要注意。如在 IE11 下 判断不存在的函数方法时会报错（不要写!requestAnimationFrame，而要写!window.requestAnimationFrame）
