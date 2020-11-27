Vue : 渐进式框架 ，采用 自底向上增量开发

Vue()构造器:先从 vue 成员属性入手

声明式渲染：所有元素都是 响应式， 双向绑定

### Directive 指令集 v-xxx

- v-bind 简写 ：
- v-on 简写@
- 绑定 DOM 文本到数据{{message}}
- 绑定 DOM 元素<input v-model="message">

组件渲染方式： 只包含运行时方式 （render） 运行时 （render） + 编译器 （template） 实例 Vue()构造函数后的模板渲染优先级：render() > template > el

```js
import App from './App.vue';
new Vue({
  el: '#app',
  template: <App />,
  render: h => h(App),
});
// 或者
new Vue({
  template: <App />,
  render: h => h(App),
}).$mount('#app');
```

### 组件系统：几乎任意类型的应用的界面都可以抽象为一个组件树

#### 定义全局组件：

```js
Vue.component( 'todo-item', { template:"<li>This is a todo</li>"; } ); <ul> <!-- Create an instance of the todo-item component --> <todo-item></todo-item> </ul>
```

#### 定义局部组件，调用使用(推荐)

```js
<div id="emp"> <ul> <todo-item v-for="item in menu" v-bind:todo="item"></todo-item> </ul> </div> Vue.component( 'todo-item', props:['todo'], template:'<li>{{todo.text}}</li> ); var em = new Vue({ el:"#emp", data:{ menu:[ {text:"vegetable"}, {text:"cheese"}, {text:"fruit"} ] } });

API： //Vue.nextTick(callback) //`，当数据发生变化，更新后执行回调。 //Vue.$nextTick(callback)`，当 dom 发生变化，更新后执行的回调。
```

### Template Syntax

#### 修改数据

> 下面 text 指数据纯文本，模板语法的使用方法跟vue@2.x一样

- 通过双胡子{{data}}来接收变量 data 的 text（纯文本），若 text 内容包含 html 字符则自动过滤转化为 text

- 如果 text 需要渲染 raw html（原始 html 字符）的效果，则需要 v-html 指令来 bind data， DOM 就可以渲染你所需要的效果

- 支持通过 v-bind 动态绑定属性: <div v-bind:id="dynamicId"></div>

- 支持 JavaScript 表达式

```vue
{{ number + 1 }} {{ ok ? 'YES' : 'NO' }} {{ message.split('').reverse().join('') }}
<div v-bind:id="'list-' + id"></div>
```

### 响应系统：

computed：计算属性，实现变量缓存，只有在属性值改变的时候才会 进行变量计算 This.value.replace(/\d/g," ") ==>实行数字排除

watch:监听属性，实现实时同步 ->当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的

watch 和 computed 各自处理的数据关系场景不同

1.watch 擅长处理的场景：一个数据影响多个数据

2.computed 擅长处理的场景：一个数据受多个数据影响

watch 的立即\深度检查   watch: {     data: {       handler(n) {         this.backup = newVal.slice()       }       immediate: true,  //刷新加载   立马触发一次 handler       deep: true  //  可以深度检测到  person  对象的属性值的变化     }   },

method:方法调用，每次相应调用方法

Transition 过度动画，可以参考引入 jquery，在 index.html 上引入

vue 高级用法，自定义指令：directives：{}

引入组件方法： 1.通过 ：is=''指令动态获取组件名称 2.通过直接调用所注册的组件名称

{{msg}} 双向绑定--输出字符串 {{*msg}} 单向绑定--v-once {{{msg}}}双向绑定--解析输出字符串，如果为 dom 时解析 dom 效果

v-bind 绑定特性(元素的特性 attribute) v-on 绑定事件

v-bind 和 v-on 的缩写 Vue.js 为最常用的两个指令 v-bind 和 v-on 提供了缩写方式。v-bind 指令可以缩写为一个冒号，v-on 指令可以缩写为@符号。 <!--完整语法--> <a href="javascripit:void(0)" v-bind:class="activeNumber === n + 1 ? 'active' : ''">{{ n + 1 }}</a>

<!--缩写语法-->

<a href="javascripit:void(0)" :class="activeNumber=== n + 1 ? 'active' : ''">{{ n + 1 }}</a> <!--完整语法--> <button v-on:click="greet">Greet</button>

<!--缩写语法-->

<button @click="greet">Greet</button>

v-show 判断条件 False 设置 style=“display:none”

v-else 紧跟在 v-if 或 v-show 后面使用

### 过滤器：

过滤器可以用在两个地方：mustache 插值和 v-bind 表达式。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符指示：

```vue
<!-- in mustaches -->
{{ message | capitalize }}
<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>

Vue( filter:{ filterfun:function(){ } } });
```

### 循环

使用：key="id" 是开启了 diff 算法优化代码，其中 id 就是 dom 要绑定的唯一值切记如果数据是要随时变动的情况。id 一定只能是绑定唯一值，因为如果在渲染数据时，id 当前值及其 dom 与变动后的相同，dom 数据是不会发生改变的。

### Prop

- 以 render 函数为例向组件传递参数的模板写法

```js
h(
  'div',
  {
    // 与 `v-bind:class` 的 API 相同，
    // 接受一个字符串、对象或字符串和对象组成的数组
    class: {
      foo: true,
      bar: false,
    },
    // 与 `v-bind:style` 的 API 相同，
    // 接受一个字符串、对象，或对象组成的数组
    style: {
      color: 'red',
      fontSize: '14px',
    },
    // 普通的 HTML attribute
    attrs: {
      id: 'foo',
    },
    // 组件 prop
    props: {
      myProp: 'bar',
    },
    // DOM property, 传递DOM元素，等于v-html
    domProps: {
      innerHTML: 'displayValue',
    },
    // 事件监听器在 `on` 内，
    // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
    // 需要在处理函数中手动检查 keyCode。
    on: {
      click: this.clickHandler,
    },
    // 仅用于组件，用于监听原生事件，而不是组件内部使用
    // `vm.$emit` 触发的事件。
    nativeOn: {
      click: this.nativeClickHandler,
    },
    // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
    // 赋值，因为 Vue 已经自动为你进行了同步。
    directives: [
      {
        name: 'my-custom-directive',
        value: '2',
        expression: '1 + 1',
        arg: 'foo',
        modifiers: {
          bar: true,
        },
      },
    ],
    // 作用域插槽的格式为
    // { name: props => VNode | Array<VNode> }
    scopedSlots: {
      default: props => createElement('span', props.text),
    },
    // 如果组件是其它组件的子组件，需为插槽指定名称
    slot: 'name-of-slot',
    // 其它特殊顶层 property
    key: 'myKey',
    ref: 'myRef',
    // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
    // 那么 `$refs.myRef` 会变成一个数组。
    refInFor: true,
  },
  'Template'
);
```

### transition

在 router-view 组件做移动端左右滑动过渡效果时，可以使用 watch 监听$route 的变化，有几种方法：

- 使用路由嵌套层级深度来确定向左向右滑， 如：to.path.split('/').length;from.path.split('/').length
- 在 router 配置表属性 mate 设置层级标志，如：meta:{index: 0}

```vue
<template>
  <!-- <transition :name="transitionName"> -->
  <router-view class="childview"></router-view>
  <!-- </transition> -->
</template>
<script>
export default {
  name: 'childrouter',
  data: () => ({
    transitionName: 'slide-left',
  }),
  // 监听路由的路径，可以通过不同的路径去选择不同的切换效果
  watch: {
    $route(to, from) {
      // console.log('现在路由:',to.path.split('/')[1],'来自路由:',from.path.split('/')[1],'现在的动画:',this.transitionName)
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    },
  },
};
</script>
<style>
/* 过渡动画 */
.childview {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
```

## 插件开发

### 使用

Vue.use(MyPlugin)

### 插件可以导出为一个包含**install**成员的对象

```js
const MyPlugin = {
  install: function (Vue, options) {
    // 1. 添加全局方法或 property
    Vue.myGlobalMethod = function () {
      // 逻辑...
    };
    // 2. 添加全局资源
    Vue.directive('my-directive', {
      bind(el, binding, vnode, oldVnode) {
        // 逻辑...
      },
    });
    // 3. 注入组件选项
    Vue.mixin({
      created: function () {
        // 逻辑...
      },
    });
    // 4. 添加实例方法
    Vue.prototype.$myMethod = function (methodOptions) {
      // 逻辑...
    };
  },
};
export default MyPlugin;
```

### 插件可以是一个函数

```js
const MyPlugin = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  };
  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind(el, binding, vnode, oldVnode) {
      // 逻辑...
    },
  });
  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    },
  });
  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  };
};
export default MyPlugin;
```

## 优化

- 建议使用 js 引入 css: import 'xxx.css'。因为使用 style 引入 css 的情况下，可能会出现相同 css 引入多次的情况

## scoped 穿透

当我们引入第三方组件库时(如使用 vue-awesome-swiper 实现移动端轮播)，需要在局部组件中修改第三方组件库的样式，而又不想去除 scoped 属性造成组件之间的样式覆盖。

- > > > 是 vue 官方方案，也是 /deep/ 或 ::v-deep 的别名

- stylus 的样式穿透 使用>>>

      外层 >>> 第三方组件
          样式

  .wrapper >>> .swiper-pagination-bullet-active background: #fff

- sass 和 less 的样式穿透 使用 /deep/ 或 ::v-deep

      外层 /deep/ 第三方组件 {
          样式
      }
      .wrapper /deep/ .swiper-pagination-bullet-active{
        background: #fff;
      }

- 不是用 scoped

  scoped 可以在项目打包的时候，css 按照组件模块来拆分，在使用组件的时候引入，从而达到减轻全局引入 css 的压力

## 引入外部插件

### 引入 cnzz 浏览统计
