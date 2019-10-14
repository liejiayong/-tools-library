# CanvasScraping

CanvasScraping 一个轻巧简单的使用 canvas 实现的 web 端刮刮卡插件。

- 支持 ie9 及以上浏览器。
- 支持移动端多倍分辨率屏幕

# Installation

```js
npm install CanvasScraping
```

# Usage

可以直接在html文件直接引入CanvasScraping模块

```html
<script src="xxx/canvas-scraping.min.js"></script>
```

或引入模块

```js

import CanvasScraping from 'CanvasScraping'

var card = document.querySelector('.card')
var scraping = new CanvasScraping(card, {
  coverImg: './scratch-2x.jpg',
  pixelRatio: 2
})

```

## API

构造函数：

```js
CanvasScraping(element, config)
```

其中CanvasScraping在申明前需要传入挂载父元素element

config参数表：

| 参数           | 说明                                                             | 默认 |
| :------------- | ---------------------------------------------------------------- | ---: |
| width         | canvas 宽                                                      | 300 |
| height | canvas 高                                            |   150 |
| awardImg       | 奖品图片                                                         | null |
| coverImg     | 覆盖层图片 | null |
| coverColor   | 纯色覆盖层                                                     | #ccc |
| radius         | 擦除手势半径                                                         |   20 |
| pixelRatio     | 屏幕倍数                                                         |    1 |
| duration        | 展现全部的淡出效果时间（ms）                                     | 2000 |
| percent        | 刮开面积 占 整张刮卡的百分比                                     | 60 |
| doneCallback        | 全部刮开回调                                     | null |
| awardCssText        | 奖品图片样式                                     | null |
| unit        | 宽高css单位                                     | px |
| containerClass        | 装载刮卡的父元素类名                                     | scraping-container |
| mode        | 刮刮卡刮开卡片模式。default:默认模式，一个个像素点刮开；sector:快速模式，以鼠标按下点开始到结束点形成扇形消除像素                                     | default |

### setAward(url)

设置奖品图片

```js
instance.setAward(url)
```

### setCover(url)

设置刮卡覆盖层图片，若不设置图片url，则默认渲染config表coverColor的默认颜色

```js
instance.setAward(url)
```
