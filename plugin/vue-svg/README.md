# svg-icon

## Config

- 配置 svg 文件目录，在 Boostrap Vue 前引入。配置 svg 目录后就可以防止图片了

```js
const svgList = require.context('../assets/svg', false, /\.svg$/);
const requireSvg = requireContext => requireContext.keys().map(requireContext);
requireSvg(svgList);
```

- vue.config.js 配置加载 svg 的 loader

```js
{
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/svg'))
      .end();
    config.module
      .rule('remixIcon')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'svg-icon-[name]' })
      .end();
  };
}
```

## Usage

- 引入模块

```js
import Vue from 'vue';
import SvgIcon from 'vue-svg';
Vue.use(SvgIcon, { name: 'svgIcon' });
```

- icon-class 可以传入 svg 名称，或 http 地址图片

```html
<svg-icon :icon-class="'home'"></svg-icon>
```
