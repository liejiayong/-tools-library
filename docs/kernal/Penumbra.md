# 小林的面经

## 基础

### JavaScript 基础

- 装箱 / 拆箱 & 类型转换
- 原型
  - \_\_proto\_\_与 prototype
  - Object.prototype
  - Function
- 闭包
  - 实现与应用
  - 原理(VO 与 AO)
- 执行上下文
- 调用栈
- 作用域链
- 继承
  - 寄生组合式继承(组合+原型)
- 事件循环
  - 浏览器 UI 渲染与事件循环
  - async 与 await
  - Promise/A+规范
    - 立即 resolved 的 Promise 执行时机
- 垃圾收集
  - 标记清除
  - 引用计数
    - 循环引用
- this
  - 作用 & 意义
  - 隐式丢失
  - 优先级
  - 箭头函数的 this
- 其他
  - caller / callee
  - typeof 与 Instanceof 原理
  - 柯里化
    - 尾递归
  - 类数组
  - common.Js 与 ES Modules 比较

### CSS

- 优先级
- 盒模型
- 定位
  - sticky
- src & href
- Flex
- BFC / IFC
- 水平 / 垂直 / 水平垂直居中

### 基础手写/算法

- bind / call / apply
- debounce / throttle
- instanceof
- 深浅拷贝
- new
- 用 setTimeout 实现 setInterval
- 继承
- 冒泡 / 快排 / 选择
- 观察者与发布订阅模式
- 两数之和
- 比较版本号
- 大数相加
- 随机排序
- 回文数/回文字符串
- 不重复子串
- 整数反转
- 嵌套数组深度
- 最长公共前缀

### ES6

- ES6 的 Class 实质, 与 ES5 继承异同?
  - 静态方法
  - Babel 编译结果
- Generator
  - 协程
- Iterator
  - for...of
- Symbol
  - 内置接口
- ES6 Module 与 CommonJS 比较
  - 加载部分 / 加载全部
  - 输出引用 / 输出复制/浅拷贝
  - 每次动态加载 / 只会去取已缓存的
- Proxy
  - Object.defineProperty
- Reflect
  - 为什么需要它?
- map set
  - weakMap weakSet

### Node

- npm install
  - dedupe
- Buffer
- Stream
- Node 的适用场景及原因
- GC
  - 新生代与老生代机制
    - From 空间与 To 空间
  - 标记清除与标记整理
    - 触发点
  - 增量标记
- Cluster & IPC
  - child_progress
- 事件循环
  - timer
  - I/O
  - Idle prepare
  - poll
    - 阻塞
  - check
  - close CB
  - 每一阶段均有的 nextTick 与 microTask
- Koa
  - 中间件原理
  - 洋葱模型

### 浏览器

- 强缓存与协商缓存

  - E-tag 与 Last-Modified

- 从输入 URL 到页面呈现

  - 栅格化 位图 层爆炸概念
  - 重绘 回流
  - DOM 树与 CSSOM 树建树过程
    - 令牌化->建树
    - 样式收集
  - 阻塞
    - js & dom
    - css & js

- cookie / session / token

  - Chrome80 默认 cookie samesite 属性为 Lax, 造成的影响?
  - 双令牌机制

- 本地存储

- requesAnimationFrame

- requestIdleCallback

- 事件机制

  - 委托发生的阶段
  - IE 的事件模型
  - 阻止事件与冒泡
  - addEventListener 的 useCapture 参数

- 跨域

  - JSONP 原理
  - Nginx 原理
  - CORS
    - Options 预检
    - 简单 / 复杂 请求
    - 相关字段

- 前端路由原理

  - hash
    - onHashChange
  - history
    - pushState
    - replaceState
    - onPopState

- XSS

  - 文档型 & 反射型 & 存储型
  - httpOnly 与 转义

- XSRF

  - 同源检测

  - axios 的 XSRF 防御手段

- Fetch & XHR 对比

  - cookie
  - abort
  - onProgress

### 数据库

- 脏读 / 幻读 / 不可重复读
- 事务及边界
- 索引

### 移动端

- 设备像素比

  - 物理/独立(CSS)

- 点透现象
  - fastclick 原理
- 1px
  - line-gradient
  - 媒体查询 + viewport
  - 单独切图(SVG 绘制)
  - scale+伪类
- 图片模糊
  - srcset: 根据窗口宽带加载源，<img src="small.jpg " srcset="big.jpg 1440w, middle.jpg 800w, small.jpg 1x" />

### 网络

- 七层与五层模型

- DNS 查找机制

- http1.1 > http1?
  - 身份认证
  - 断点续传(206)
  - 缓存
  - keep-alive
- http2 > http1.1?
  - 多路复用
  - 头部压缩
  - server-push
- https 会话层机制?
- TCP 3 + 4 出错?
- 泛洪攻击
  - RST 包
- TCP/UDP 适用场景
- TCP 拥塞控制
  - 慢启动 & 拥塞避免
  - 快速重传 & 快速恢复

## 进阶

### 框架及工具

#### TypeScript

- type & interface
- 泛型
- 工具类型
- 类型守护
- 装饰器 / IOC 思想

#### Git

- git fetch
- git rebase
- git merge
- git reset
  - hard
  - soft
  - mixed
- git revert

#### Webpack & Parcel

- compiler 与 compilation
- HMR 原理

- 工作流程
- Loader
- Plugin
- 性能调优
  - 打包速率
  - 打包大小
  - 打包交互友好度
- 异同

#### React

- Immutable.JS
- 生命周期

  - WillMount x
  - render
  - DidMount
    - 为什么数据获取要在这里? 而不是 WillMount?
  - WillReceiveProps x
  - shouldComponentUpdate
  - WillUpdate x
  - render
  - DidUpdate x

  - 以下为新增

  - getDerivedStateFromProps
  - getSnapshotBeforeUpdate
  - getDerivedStateFromError

- 为什么要废弃掉这几个生命周期?
- Hooks

  - forwardRef & useRef & useImperativeHandle

- 新生命周期的使用
- static
- Fiber

  - requestIdleCallback

  - 机制

  - reconciliation / commit

- Redux
  - 中间件原理
- setState
  - 原生事件->同步, 合成事件->异步, 为什么?
- React 的事件机制
- V-Dom
- 与 Vue 的比较
  - 约束 / 迎合
  - Immutable 数据流

#### Vue

- MVVM 原理
  - Observer
  - Compile
  - Watcher

### 业务场景

- 白屏问题排查
- 骨架屏
- 超长列表
  - requesAnimationFrame
  - 虚拟列表
- 单点登录(SSO)
- 埋点的原理
- 扫码登陆
- 大文件分片/完整性校验/断点续传/秒传/拖拽上传/粘贴上传
- 双令牌(无感刷新)

## 漫谈

- 测试的必要性

  - 单元测试
  - E2E
  - 混沌

- 错误监控

- 性能优化

- MV\*架构

- Feflow

- 埋点

- GraphQL & BFF & Apollo

  - vs RESTFul 优劣势
  - BFF 意义, 解决了什么问题?
  - Apollo 生态

- CI / CD

- Serverless

  - FaaS
  - BaaS

- 进程 / 线程 / 协程 通信

- 小程序

  - 基础架构
  - properties / data
  - behavior

  - DOM BOM 如何禁止访问的?
  - 生命周期
  - 原生能力性能优化
  - **vs PWA / H5 / Hybrid / 跨端方案**

- 前端趋势
  - 智能
  - 跨端
  - 价值
- PWA
  - 概念
  - 场景
  - 阻力
- Flutter vs RN

- 工程化
  - 模块化
  - 规范化
  - 系统化
- Eslint-config-alloy

- Dva & Umi
