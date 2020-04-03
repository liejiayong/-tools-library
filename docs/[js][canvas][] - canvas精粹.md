---
title: canvas精粹
---

## canvas 基础

- canvas 元素绘图表面（drawimg surface）的 width、height 才是用于画布实际大小；
- canvas 元素通过 css 设置的 width、height 只是设置了元素本身大小，不是 canvas 元素绘图表面（drawimg surface）大小，默认为 300x150；
- canvas 执行环境画布的 width、height 不设置时，会自动跟随元素 width、height 自动缩放，因此需要手动设置画布 width、heigth；
- 兼容性：ie9 以上及现代浏览器

### 常用 API：

#### HTMLCanvasElement.toDataURL(type, encoderOptions)

返回一个包含图片展示的 data URI

> 本方法在导出图片前会检查在 canvas 上的图片源 Image，若图片源 Image 不设置 Image.setAttribute('crossOrigin', 'Anonymous');则会爆出跨域错误：

- **Tainted canvases may not be exported**

若设置 crossOrigin 后, 图片无法显示并且爆出错误**CORS policy**

则需要在图片源设置的时候加时间戳清除缓存，并且在后端 header 设置跨域：Access-Control-Allow-Origin: '\* '

```js
var img = new Image();
img.src = "./win.png?timestamp=" + Date.now();
img.setAttribute("crossOrigin", "Anonymous");
img.onload = function() {};
```

#### canvas.getBoundingClientRect()

获得 canvase 画布边框信息，包括画布离浏览器的 top、left

#### beginPath()

新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。

#### closePath()

闭合路径之后图形绘制命令又重新指向到上下文中。

#### stroke()

通过线条来绘制图形轮廓。

#### fill()

通过填充路径的内容区域生成实心的图形。

#### save()

将当前 canvas 的状态（左边变换信息（transformation）、剪辑区域（clipping region）、属性（fillStyle、globalCompositeOperation 等））push 到堆栈顶部，相当于保存局部属性变量

#### restore()

将 canvas 堆栈顶部的状态 pop 出来，相当于回复默认属性变量

> 值得注意的是，在每次 fill()和 stroke()时必须设置样式、线宽等

```js
// 填充三角形
// 路径使用填充（filled）时，路径自动闭合
ctx.beginPath();
ctx.moveTo(25, 25);
ctx.lineTo(105, 25);
ctx.lineTo(25, 105);
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.strokeStyle = "#ff0000";
ctx.lineWidth = 8;
ctx.fill();
// 描边三角形
// 路径使用填充（filled）时，路径自动闭合 使用描边（stroked）则不会闭合路径
ctx.beginPath();
ctx.moveTo(125, 125);
ctx.lineTo(125, 45);
ctx.lineTo(45, 125);
ctx.closePath();
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.strokeStyle = "#ff0000";
ctx.lineWidth = 8;
ctx.stroke();
```

## 画柔顺线条

在画柔顺线条的时候，需要注意 lintTo 的时候位置复位

```js
var point = { x: 0, y: 0, prevX: 0, prevY: 0, tap: false };

function getPosition(touches) {
  if (!touches || (touches && !touches.clientX))
    return { x: 0, y: 0, radius: 0 };

  var bc = canvas.getBoundingClientRect();
  let x = Math.abs(touches.clientX - bc.left),
    y = Math.abs(touches.clientY - bc.top);
  x = x.toFixed(2);
  y = y.toFixed(2);

  if (!point.tap) {
    point.prevX = x;
    point.prevY = y;
  }
  // console.log(touches, x, y)

  return { x, y };
}

canvas.addEventListener("touchstart", function(e) {
  e.preventDefault();
  point.tap = true;

  var pos = getPosition(e.touches[0]);
  point.x = pos.x;
  point.y = pos.y;
});
canvas.addEventListener(
  "touchmove",
  function(e) {
    e.preventDefault();
    if (!tap) return;
    var pos = t.getPos(e.touches[0]),
      x = pos.x,
      y = pos.y;

    ctx.beginPath(); // 开始新的路径
    ctx.moveTo(point.prevX, point.prevY); // 复位到最后一个像素点
    ctx.lineTo(x, y); // 画像素点

    ctx.closePath(); // 关闭路径
    ctx.stroke(); // 画线条

    point.prevX = x;
    point.prevY = y;
  },
  false
);
```

## retina 高清显示方案

高清显示主要作用于类似移动端的高清屏，在描绘文字 或 描绘图片时，由于终端物理像素\设备像素（DP）与 css 像素的倍率差异，因此在初始化 canvas 画布时，要通过设置 canvas 的绘图表面与 canvas 的元素大小比例来完成倍率缩放。

```
科普：
DP(device pixels): 物理像素\设备像素。显示屏是由一个个物理像素点组成的，通过控制每个像素点的颜色，使屏幕显示出不同的图像，屏幕从工厂出来那天起，它上面的物理像素点就固定不变了，单位pt。

DPR：设备像素比。 描述的是未缩放状态下，物理像素和CSS像素的初始比例关系。

DIP(Device independent Pixel)：设备独立像素，也称为逻辑像素，简称dip。

DPR = DP/CSS像素

CSS像素 = 设备独立像素 = 逻辑像素

```

### canvas 自适应缩放逻辑

获取设备终端画布的像素比例 backingStorePixelRatio，

将 canvas 元素绘图表面的 width 与 height 设置为缩放后的数值 width*backingStorePixelRatio、height*backingStorePixelRatio

将 canvas 的 css 设置的 width、height 设置为设计稿实际尺寸

```js
var canvasRatio = {
  // 获取像素比
  getPixelRatio: function(context) {
    var backingStore =
      context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio ||
      1
    return (window.devicePixelRatio || 1) / backingStore
  },
  clientWidth: window.screen.availWidth,
  clientHeight: window.screen.availWidth,
  designW: 750,
  designH: 1500,
  init: function(el) {
    var canvas = document.querySelector("#gStage"),
      ctx = canvas.getContext("2d"),
      ratio = getPixelRatio(ctx)
    ctx.scale(ratio, ratio)
    canvas.width = this.designW * ratio
    canvas.height = this.designH * ratio
    el.appendChild(canvas)
    this.ctx = ctx
    this.canvas = canvas
    this.ratio = ratio
  }
  canvasRatio.init();
}
```

## 跨域

跨域问题归根于浏览器同源策略导致的，浏览器为了保证用户信息的安全，防止恶意的网站窃取数据。默认不允许跨域情景。

同源策略是浏览器的一个安全功能，不同源的客户端脚本(js 文件)在没有明确授权的情况下，不能读写对方资源。只有同一个源的脚本赋予 dom、读写 cookie、session、ajax 等操作的权限。

在实际开发中，canvas 开发经常会碰到跨域问题，因为更多时候线上图片是调用域外的，因此我们要做好跨域设置。

在调用域外图片时，若后端服务器没有设置允许跨域 Access-Control-Allow-Origin: '\* '，浏览器则会显示报错：

> xxx' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

解决方法是在对应的服务器上设置跨域允许，如下：

### node 跨域允许

```js
//设置请求头
app.all("*", function(req, res, next) {
  //允许所有来源访问
  res.header("Access-Control-Allow-Origin", "*");
  //用于判断request来自ajax还是传统请求
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //允许访问的方式
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  //修改程序信息与版本
  res.header("X-Powered-By", " 3.2.1");
  //内容类型：如果是post请求必须指定这个属性
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
```

### php 跨域允许

```php
//方式一：
header("Access-Control-Allow-Origin: *");//允许所有地址跨域请求

//方式二：
header("Access-Control-Allow-Origin: http://localhost:8080");//指定某个地址可以跨域请求，这里只能指定一个

//方式三：如果要允许多个地址跨域请求可以这样写
$origin = ['http://localhost:8080','http://localhost:8081'];
$AllowOrigin = 'http://localhost:8080';
if(in_array($_SERVER["HTTP_ORIGIN"],$origin))
{
    $AllowOrigin = $_SERVER["HTTP_ORIGIN"];
}
header("Access-Control-Allow-Origin: ".$AllowOrigin );
//设置允许的请求方法，可以用*表示所有，
header("Access-Control-Allow-Methods: POST");
//如果允许请求携带cookie，此时 origin配置不能用 *，此时前端似乎也要做配置，让请求中携带cookie
header('Access-Control-Allow-Credentials:true');
//设置允许跨域的请求头，通常会在请求头里面加登录验证信息，那么服务端需要指定允许那些请求头，这里不能用*，多个字段用逗号隔开。
header('Access-Control-Allow-Headers:token');
})
```

### java 跨域允许

```java
@WebFilter("/*")
public class CORSFilter implements Filter {
    public CORSFilter() {
    }

    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        //设置跨域请求
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        String[] allowDomains = {"http://www域名1",http://www域名2"};
        Set allowOrigins = new HashSet(Arrays.asList(allowDomains));
        String originHeads = request.getHeader("Origin");
        if(allowOrigins.contains(originHeads)){
            response.setHeader("Access-Control-Allow-Origin", originHeads);
            response.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,DELETE,HEAD,PUT,PATCH");
            response.setHeader("Access-Control-Max-Age", "36000");
            response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,authorization");
            response.setHeader("Access-Control-Allow-Credentials","true");
        }
        chain.doFilter(req, response);
    }

    public void init(FilterConfig fConfig) throws ServletException {
    }
}
```

服务端设置好跨域允许后，第一波搞定，下面的问题都可以交给前端了。

当使用 canvas 开发时，浏览器仍然是允许你将域外图片绘制到画板 canvas 上的，但是 toDataURL 就会报错（toBlob 也是）：

> Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.

为什么会这样呢？

官方给出的解析是：This protects users from having private data exposed by using images to pull information from remote web sites without permission.

大意就是说：如果你请求外域的图片 without permission，可能会暴露你的隐私数据，所以浏览器为了保护你的隐私会限制这样的请求。

「why?请求外域图片怎么就会暴露我的隐私数据了？」其实我也不明白，这个坑请先自己填一下，之后会补充，先接触 Tainted canvases 的问题。

解决办法： 设置 Image.setAttribute('crossOrigin', 'anonymous')来告诉浏览器，我允许跨域！

```js
var img = new Image();
img.src = "./win.png";
img.setAttribute("crossorigin", "anonymous");
img.onload = function() {};
```

**图片添加了 setAttribute("crossOrigin", "Anonymous")，实际就是图片请求变成了 CORS 请求，就要受同源策略的限制了，图片源请求 request header 上就会自动添加 Origin 与 referer 并设置图片源出处地址 ** ， 如下：

```http

Referer: http://hd.693975.com/huodong/2020identity/

```

跨域到这里基本问题也要解决了，然鹅有时候为了网站相应性能，开发者喜欢将域外图片放在 cdn 的域外，像这种高缓存高性能的巨无霸，若前端对频发更新的图片画在 canvas，那么只能骚一波，消除缓存，给图片源添加时间戳即可，如下：

```js
var img = new Image();
img.src = "./win.png?timestamp=" + Date.now();
img.setAttribute("crossorigin", "anonymous");
img.onload = function() {};
```
