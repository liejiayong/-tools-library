## IE 兼容性问题

### 运行页面白屏

IE 白屏一般是页面报错引起的，大部分情况是兼容性问题。

对于此类问题，先搞个常规排查添加 polyfill 尝试，再来个 babel 将代码编译为 es5，如果仍然报错则需要调试报错源处写法问题。

### 报错 "TypeError: 调用的对象无效

出现调用的对象无效，是因为引用了 IE window 上不存在的对象或函数引起的。

ie 不支持 es6|es6+的结构类型、函数、对象以及表达式，因此使用时要考虑 polyfill 进行支持，否则会报错。

在自己写兼容 polyfill 时要注册 DOM 和 js 相关的结构性、调用方式问题，赋值类型也要注意。如在 IE11 下 判断不存在的函数方法时会报错（不要写!requestAnimationFrame，而要写!window.requestAnimationFrame）

## JS

-

## BOM

- 冒泡事件，ie 默认接受冒泡事件 if ( e && e.stopPropagation ) {e.stopPropagation(); } else {window.event.cancelBubble = true;}

- ie10+开始支持 FormData ，且只支持 formData.append(name, value, filename)

- ie 下 input 框的 change 事件不能用 enter 键触发，只能用键盘捕捉事件，判断键值是否等于‘13’

```js
function getIsIE() {
    if (!!window["ActiveXObject"] || "ActiveXObject" in window) return true;
    else return false;
}
  // 获取回车键事件 -- 兼容ie
 const getEnterEvent = getEnterEvent(e)=> {
     //判断是否是ie浏览器
     if(getIsIE()) {
      if(e.keyCode == 13){
          //注意判断值没有发生变化时不做修改

     }

}
```

## DOM

- IE 下 input 框设置了 readonly 属性，鼠标还是可以点击光标聚焦，因此需要采用 disabled 属性替换使用

## css

- 解决 ie 和 modern brower 的盒子模型差异：\* {box-sizing: content-box;-moz-box-sizing: inherit;-webkit-box-sizing:inherit;}

- ie11 使用 flex 时，使用 min-height 会导致垂直居中失效，min-width 同理。

- 一行样式：white-space: nowrap ：nowrap 不生效时，添加 word-break: keep-all
