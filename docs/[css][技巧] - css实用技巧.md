## css 使用技巧

### 布局

### 优化

- css 压缩（服务端使用 Gzip、前端使用 minify）

- 通过`少写css属性`来达到减少 css 字节码的目的

- 使用复合属性

  - font 次序：font-style | font-variant | font-weight | font-size | font-family
  - background 次序：background-color | background-image | background-repeat | background-attachment | background-position

  - background:#000 url(image.jpg) top left no-repeat;
            font: font-style font-weight font-size font-familiy;
            margin:5px 10px 20px 15px;
            padding:5px;
            border:2px 5px 10px 3px;

  - 使用属性继承（在父容器设置了默认属性，子容器会默认也使用这些属性）

    - 所有元素都可以继承的属性：

            visibility
            cursor

    - 内联元素和块元素可以继承的属性：

            letter-spacing、word-spacing、white-space
            line-height
            color font、font-family、font-size、font-style、font-variant、font-weight
            text-decoration、text-transform
            direction


    - 块状元素可以继承的属性：

            text-indent、text-align


    - 列表元素可以继承的属性：

           list-style、list-style-type、list-style-position、list-style-image


    - 表格元素可以继承的属性：border-collapse
    - 不可以继承的属性：

            display、margin、border、padding、background、height、min-height、max-height、width、min-width、max-width、overflow、position、left、right、top、bottom、z-index、float、clear、table-layout、vertical-align、page-break-after、page-break-before、unicode-bidi

- 抽离原则：抽离公共 css
  > reflow：当 dom 元素出现隐藏/显示，尺寸变化 ; repaint：当元素的背景颜色，边框颜色变化的时候
- 减少 repaint 和 reflow：
  - css 放在 head 中(当浏览器从上到下一遍下载 html 生成 dom tree，一边根据浏览器默认以及现有 css 生成 render tree 来渲染页面。当遇到新的 css 的时候下载并结合现有 css 重新生成 render tree。则刚才的渲染功能就全废了。当我们把所有 css 放在页面的顶部，就没有重新渲染的过程了。)
- 避免使用通配符或隐式通配符：visible.
- 避免层级或过度限制 css（css 是从右向左解析的）

  - 尽量使用最具体的类别，避免使用后代选择器，在 css 选择器中，后代选择器非但没有加快 css 查找，反而后代选择器是 css 中耗费最贵的
  - 尽量不要用标签限制 class:

         div .info  不好

  - 尽量不要用标签或 class 来限制 id:

          如：#test .info

- 动画 - 事件 + animation 动画只能添加在块状元素上 + will-change 属性：{针对某些行为事件触发提前优化} - 如：transfrom、animate、：hover 等

- 动画 - 过渡

复合写法：

    #test1{
    transition-property: width,background;
    transition-delay: 200ms;
    transition-timing-function: linear;
    transition-duration: 2s;

}
/_类似于_/
#test2{
transition: width 2s linear 200ms,background 2s linear 200ms;
}

- 图片经过效果 + css 混合模式 + mix-blend-mode 用于多个不同标签间的混合模式 + background-blend-mode 用于单个标签间内背景图与渐变背景间的混合模式。

## 实用属性

### overscroll-behavior： https://drafts.csswg.org/css-overscroll-behavior/

允许开发者覆盖默认的浏览器滚动行为
auto：其默认值。元素（容器）的滚动会传播给其祖先元素。有点类似 JavaScript 中的冒泡行为一样；
contain：阻止滚动链接。滚动行为不会传播给其祖先元素，但会影响节点内的局部显示。例如，Android 上的光辉效果或 iOS 上的回弹效果。当用户触摸滚动边界时会通知用户。注意，overscroll-behavior:contain 在 html 元素上使用，可以阻止导航滚动操作；（类似禁用下拉刷新 pull-to-refresh，可以阻止固定元素的滚动传播）
none：和 contain 一样，但它也可以防止节点本身的滚动效果（禁用炫光和回弹效果）
-ms-scroll-chaining: none;
overscroll-behavior: contain;

### 文字渐变

- 使用 mask-image: 如：mask-image:-webkit-gradient(linear, 0 0, 0 bottom, from(yellow), to(rgba(0, 0, 255, 0)));

- 使用 background-cli 与 text-fill-color：

      	    background-image:-webkit-linear-gradient(bottom,red,#fd8403,yellow);

  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;

- 使用 svg 的组合属性（使用 linearGradient、fill）

### text-rendering

CSS 属性定义浏览器渲染引擎如何渲染字体。浏览器会在速度、清晰度、几何精度之间进行权衡。

text-rendering: optimizeLegibility; // 可用在 pc 端，wap 端有性能问题

/_ Keyword values _/
text-rendering: auto;
text-rendering: optimizeSpeed; // 着重考虑渲染速度
text-rendering: optimizeLegibility; // 着重考虑易读性,在移动设备上会造成比较明显的性能问题
text-rendering: geometricPrecision; // 着重考虑几何精度
/_ Global values _/
text-rendering: inherit;
text-rendering: initial;
text-rendering: unset;

### 当前暂时屏蔽 video 组件的全屏播放按钮

```css
video::-webkit-media-controls-fullscreen-button {
    display: none !important;
}
```

### 对字体进行抗锯齿渲染可以使字体看起来会更清晰舒服

这个设定在 ios 中表现比较明显，在 windows 中表现的不明显。
font-smoothing 不是标准的 CSS3 属性，曾出现在提案中，最终被移除。
前缀-webkit 是 chrome 和 safari 的私有属性，-moz 是 Firefox 的私有属性。

-webkit-font-smoothing
-webkit-font-smoothing 有三个值，none，subpixel-antialiased，antialiased。
-webkit-font-smoothing：none，无抗锯齿。
-webkit-font-smoothing：subpixel-antialiased，默认值，效果一般。
-webkit-font-smoothing：antialiased，抗锯齿，字体清晰。
-moz-osx-font-smoothing
-moz-osx-font-smoothing，是火狐针对 ios 系统制定的规则，有两个值，inherit，grayscale（字体抗锯齿，比较清晰）。

```css
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
```

### 字体描边

- text-stroke:1px #f00;（1px 是文字宽度，#ff 是文字描边颜色）。
  大多浏览器已经开始支持该属性，只需要加上前缀-webkit-即可，但兼容性相对较差

- text-shadow： #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
  现代浏览器基本兼容

### 动画特性

#### 设置平滑滚动，现代浏览器适用

```css
scroll-behavior: smooth;
```

### pointer-events

设置时间指定触发状态

- 兼容性：ie11+、Firefox3.6+、Safari4.3+、Opera46+(除 mini)、及所有现代浏览器

特性：

- 阻止缺省鼠标指针的显示
- 阻止 由 js 触发 或由 css 伪类状态触发 的事件

主要属性：

- auto: 与 pointer-events 属性未指定时的表现效果相同,事件不会穿透当前层。对于 SVG 内容，该值与 visiblePainted 效果相同。
- none: 元素永远不会成为鼠标事件的 target。但是，当其后代元素的 pointer-events 属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。
- 其他属性与 svg 相关，[详情文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events)。

实用：

- 在 类提交按钮 点击后添加，可以防止阻止事件，避免重复提交。

```css
.btn-sumbit.active {
  pointer-events: none;
}
```

- 在绝对定位 mask 元素覆盖按钮时，mask 元素点击穿透，因此被覆盖按钮可以被点击，如：页面水印覆盖页面。

```css
.pointer-events {
  pointer-events: none;
}
```
