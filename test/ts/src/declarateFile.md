## 声明文件

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能

    新语法:
    declare var 声明全局变量
    declare function 声明全局方法
    declare class 声明全局类
    declare enum 声明全局枚举类型
    declare namespace 声明（含有子属性的）全局对象
    interface 和 type 声明全局类型
    export 导出变量
    export namespace 导出（含有子属性的）对象
    export default ES6 默认导出
    export = commonjs 导出模块
    export as namespace UMD 库声明全局变量
    declare global 扩展全局变量
    declare module 扩展模块
    /// <reference /> 三斜线指令

### 什么是声明语句

假如我们想使用第三方库 jQuery，一种常见的方式是在 html 中通过 <script> 标签引入 jQuery，然后就可以使用全局变量 \$ 或 jQuery 了。

但是在 ts 中，编译器并不知道 \$ 或 jQuery 是什么东西

这时，我们需要使用 declare var 来定义它的类型

declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。编译后值输入：jQuery('#foo')

```ts
declare var jQuery: (selector: string) => any
jQuery('#foo')
```

### 什么是声明文件

<filename>.d.ts

声明文件必需以 .d.ts 为后缀

假如仍然无法解析，那么可以检查下 tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 <filename>.d.ts 文件。

### 第三方声明文件

npm install @types/<name> --save-dev

推荐到微软官方下载：https://microsoft.github.io/TypeSearch/

### 书写声明文件

当一个第三方库没有提供声明文件时，我们就需要自己书写声明文件了。前面只介绍了最简单的声明文件内容，而真正书写一个声明文件并不是一件简单的事，以下会详细介绍如何书写声明文件。

在不同的场景下，声明文件的内容和使用方式会有所区别。

库的使用场景主要有以下几种：

- 全局变量：通过 <script> 标签引入第三方库，注入全局变量
- npm 包：通过 import foo from 'foo' 导入，符合 ES6 模块规范
- UMD 库：既可以通过 <script> 标签引入，又可以通过 import 导入
- 直接扩展全局变量：通过 <script> 标签引入后，改变一个全局变量的结构
- 在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构
- 模块插件：通过 <script> 或 import 导入后，改变另一个模块的结构

#### 全局变量

使用全局变量的声明文件时，如果是以 npm install @types/xxx --save-dev 安装的，则不需要任何配置。如果是将声明文件直接存放于当前项目中，则建议和其他源码一起放到 src 目录下（或者对应的源码目录下）：

    /path/to/project
    ├── src
    |  ├── index.ts
    |  └── jQuery.d.ts
    └── tsconfig.json

如果没有生效，可以检查下 tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 jQuery.d.ts 文件。

全局变量的声明文件主要有以下几种语法：

- declare var 声明全局变量
- declare function 声明全局方法
- declare class 声明全局类
- declare enum 声明全局枚举类型
- declare namespace 声明（含有子属性的）全局对象
- interface 和 type 声明全局类型

因为全局变量都是禁止修改的常量，因此使用 const 而不是 let、var

```ts
declare const jQuery: (selector: string) => any
```

#### 全局函数

declare function 用来定义全局函数的类型。jQuery 其实就是一个函数，所以也可以用 function 来定义：

```ts
declare function jQuery(selector: string): any
declare function jQuery(domReadyCallback: () => any): any
```

#### 全局类

declare class 当全局变量是一个类的时候，我们用 declare class 来定义它的类型

```ts
declare class Animal {
  name: string
  constructor(name: string)
  sayHi(): string
}
```

#### 全局枚举

declare enum 定义的枚举类型也称作外部枚举（Ambient Enums）

与其他全局变量的类型声明一致，declare enum 仅用来定义类型，而不是具体的值。

Directions.d.ts 仅仅会用于编译时的检查，声明文件里的内容在编译结果中会被删除。

```ts
// src/Dceiinorst.d.ts
declare enum Directions {
  Up,
  Down,
  Left,
  Right
}

// src/index.ts
let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right
]
```

#### 命名空间

declare namespace

由于历史遗留原因，在早期还没有 ES6 的时候，ts 提供了一种模块化方案，使用 module 关键字表示内部模块。但由于后来 ES6 也使用了 module 关键字，ts 为了兼容 ES6，使用 namespace 替代了自己的 module，更名为命名空间。

随着 ES6 的广泛应用，现在已经不建议再使用 ts 中的 namespace，而推荐使用 ES6 的模块化方案了，故我们不再需要学习 namespace 的使用了。

namespace 被淘汰了，但是在声明文件中，declare namespace 还是比较常用的，它用来表示全局变量是一个对象，包含很多子属性。

比如 jQuery 是一个全局变量，它是一个对象，提供了一个 jQuery.ajax 方法可以调用，那么我们就应该使用 declare namespace jQuery 来声明这个拥有多个子属性的全局变量。

```ts
// src/jQuery.d.ts
declare namespace jQuery {
  function ajax(url: string, settings?: any): void
}

// src/index.ts
jQuery.ajax('/api/get_something')

// 注意，在 declare namespace 内部，我们直接使用 function ajax 来声明函数，而不是使用 declare function ajax。类似的，也可以使用 const, class, enum
declare namespace jQuery {
  function ajax(url: string, settings?: any): void
  const version: number
  class Event {
    blur(eventType: EventType): void
  }
  enum EventType {
    CustomClick
  }
}
// src/index.ts
jQuery.ajax('/api/get_something')
console.log(jQuery.version)
const e = new jQuery.Event()
e.blur(jQuery.EventType.CustomClick)
```
