## react-template

> 技术栈基础

- react
- react-router
- mobx
- redux
- less(css module)

### 添加 css-reset

```
// /public/index.html
<link href="https://cdn.bootcss.com/meyer-reset/2.0/reset.min.css" rel="stylesheet" />
```

### less-modules

使用[babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules).

修改默认哈希规则

```
const scopedName = isEnvDevelopment ? "[path]-[name]-[local]" : "[hash:base64:10]"
```

### css 预编译

由于`node-sass`存在版本不兼容问题,选择`less`.解决办法是使用 python 多版本共存

### 注入全局'less'变量

方便用于复用,在所有的`.less`文件中默认引入变量文件和公共类.

`config/webpack.config.js`. 虽然使用的是`sass-resources-loader`,但对 less 也有效果.另外`style-reource-loader`这个插件有问题, 修改全局文件的时候,无法触发热更新.

```
injectStyleResource
```

### loadable

使用`@loadable/component`, 用于组件懒加载. react_v16.8.0 后提供 React.lazy

### 'alias'

添加根路径别名,方便引用模块

`config/webpack.config.js`

```
'@': path.resolve(__dirname, '../src'),
```

### proxy http

新版本的脚手架无法在`package.json`中使用对象形式的`proxy`.需要安装[http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware)插件.然后配置`proxy`

```
cd my-project
yarn add http-proxy-middleware -D
touch setupProxy.js
```

_注意_`/setupProxy.js`这个文件的路径在`/config/paths.js`中设置.按照插件说明配置完后,重启即可自动代理

### 配置请求代理

`setupProxy.js`. 其中关于代理的匹配规则定义在`/utils/axios.js`中的`customProxyRegx`.

### cross-env

打包之后,可能还需要调试,所以需要'source map'.而正式打包后,则不需要了.这个配置项由以下代码设置.

```
// config/webpack.config.js
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false"
// 当然也可以写死
const shouldUseSourceMap = true
```

其中`GENERATE_SOURCEMAP`变量从外部设置(命令行),此时需要安装'cross-env'插件.然后修改'package.json'

```
"scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    // 在这里设置是否需要'source map'
    "build:prod": "cross-env GENERATE_SOURCEMAP=false node scripts/build.js",
    "test": "node scripts/test.js"
}
```

### 打包后去除 console 和 debug

```
// config/webpack.config.js
const shouldRemoveLogs = process.env.REMOVE_LOGS === "true"

// package.json
"build:prod": "cross-env GENERATE_SOURCEMAP=false REMOVE_LOGS=true node scripts/build.js"
```

### mobx

由于`mobx@5.x`使用的是`Proxy`功能,在 ie 下无法使用,因此使用 4.x 的版本

### 打包模式

1. `build` - 保留`source-map`和`debug`.方便检错.
2. `build:prod` - 正式发布版

### polyfill

`babel@7.4`开始不再使用[@babel/polyfill](https://babeljs.io/docs/en/v7-migration#remove-proposal-polyfills-in-babel-polyfill-https-githubcom-babel-babel-issues-8416).

```
yarn add core-js@^3 regenerator-runtime
```

`.babelrc`

```
{
  "presets": [
    "react-app",
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3 //使用3.x
      }
    ]
  ], 
}
```

`src/index.js`

```
import 'core-js/stable'
import 'regenerator-runtime/runtime'
```

### 路由缓存功能

> [react-activation](https://github.com/CJY0208/react-activation/blob/HEAD/README_CN.md)

使得`react-router`可以缓存页面内容

### 路由模式

路由使用'HashRouter'模式. 注意原因是为了避免路由与后端接口冲突.

### 打包后的资源路径

> homepage 的作用是设置应用的跟路径，我们的项目打包后是要运行在一个域名之下的，有时候可能是运行在跟域名下，也有可能运行在某个子域名下或或域名的某个目录下，这时候我们就需要让我们的应用知道去哪里加载资源，这时候就需要我们设置一个跟路径，而且有时候我们的资源会部署在 CDN 上，你必须告诉打包工具你的 CDN 地址是什么。

package.json 中"homepage"指定为"."，用于打包时,资源路径使用的是相对路径.即`./`开头

默认打包后,`index.html`文件中的资源路径都是以`/`开头的,这可能会导致引用错误.解决方法:

```
// package.json

// 添加以下属性,最后打包后资源路径会以'./'开头
"homepage": "."
```
