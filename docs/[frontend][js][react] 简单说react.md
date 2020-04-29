在多次阅读 react 文档，实践 react 项目后，留下一丝丝思维侧重点，方便下查阅及更新。

> [react  中文文档链接](https://react.docschina.org/docs/getting-started.html)

## 安装

### 在 create-react-app 中实用修饰器

    npm run eject // 用于自动安装webpack

安装相关插件：

    // 针对react
    npm install babel-preset-stage-2 babel-preset-react-native-stage-0 --save-dev

根目录下创建.babelrc

{
"presets": ["react-native-stage-0/decorator-support"]
}

## 核心概念

### 事件

#### 阻止路由 Link 组件跳转

react-route-dom 下的 Link 组件实际上封装的是 a 标签

    在传统开发上，阻止a标签跳转的途径可以是
    <a href="javascript:;"></a>
    <a onclick="return false"></a>

    在react开发上，则需要使用事件event来阻止e.preventDefault()
    <Link onClick={(e) => {e.preventDefault()} to={`/${v.link}`} >更多</Link>

## 高级进阶

### 代码分割

通过打包工具

### Context

### 高阶组件

- 是一个接受一个组件作为参数并返回一个新组件的 `函数`
- 是一个 `函数`，并不是一个 `组件`
