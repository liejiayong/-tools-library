在多次阅读 react 文档，实践 react 项目后，留下一丝丝思维侧重点，方便下查阅及更新。

> [react 中文文档链接](https://react.docschina.org/docs/getting-started.html)

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

### 组件的生命周期

组件在生命周期中可能会经历三个过程：

- 装载(Mount)，即组件第一次在 DOM 树种渲染的过程
- 更新(Update)，即组件重新渲染的过程
- 卸载(Unmount)，即组件从 DOM 树种删除的过程

#### 装载

组件装载过程中会经历以下阶段: constructor -> getInitialState -> getDefaultProps -> componentWillMount -> render -> componentDidMount

constructor 是组件类的构造函数，我们在这里完成组件的初始化工作(设置 state 以及通过 bind 绑定成员函数的 this 环境)

getInitialState 和 getDefaultProps 值在 React.createClass 这种写法中生效，但这种写法已被 Facebook 官方逐步废弃

render 是整个 React 组件中最重要的函数，组件通过该函数的返回值进行渲染。 render 函数不做实际的渲染动作，它只是返回一个 JSX 描述的解构，最终由 React 来操作渲染过程

componentWillMount 和 componentDidMount 的调用分别发生在 render 前后，这里需要注意 componentDidMount 函数。

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
