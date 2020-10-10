---
title: 深入浅出Object.create(proto[, propertiesObject])
---

## 前言

日常开发中经常会碰到创建对象、继承对象的情况，期间需要比较频繁的使用到**Object.create()**、**Object.assign()**等内置函数。“工欲善其事,必先利其器”，熟练的掌握工具势在必行。接下来会围绕着一下几个知识点来展开：

- Object.create()的使用
- 区分 new Object() 和 Object.create()
- 操作原型对象（prototype）
  - Object.setPrototypeOf()
  - Object.getPrototypeOf()
- 对象继承
  - 只拷贝自身可枚举属性
  <!-- - 拷贝自身可枚举属性与原型上的属性 -->
  - 拷贝自身可枚举属性、原型上的属性、get /set 属性

> 文中的 built-in 指 built-in function and built-in properties

## [Object.create(proto[, propertiesObject])的使用](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

- 描述：该方法创建一个新对象，使用现有的对象来提供新创建的对象的**proto**

- 语法：
  - proto：必须。新创建对象的原型对象，即通过 Object.create()生成的对象的原型 指向 proto(可以是 null、对象、函数的 prototype 属性)。
    （注：**创建空原型的对象时需传 null , 否则会抛出 TypeError 异常**）。
  - propertiesObjec：可选。 添加到新创建对象的可枚举属性（即其自身的属性，而不是原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应 Object.defineProperties()的第二个参数。
  - 返回值：一个新对象，带着指定的原型对象和属性。

因此可以看出 Object.create()的两个参数其实就是，proto 设置原型对象的属性和方法，propertiesObjec 设置新创建对象的属性和方法。而 propertiesObjec 创建属性方法的时候加入了属性可配置的形式，相当于简化并增强对象对象的写法，让其拥有对象字面量和 Object.defineProperties()的特性

```js
var org = { type: "human" }
var persion = Object.create(org)
var persionSelf = Object.create(org, {
  name: {
    value: "NvWa",
    configurable: false,
    enumerable: true,
    writable: false,
    // 注意不能同时制定get/set和writable
    // get() {
    //     return '-'
    // },
    // set(val) {
    //     console.log("persionSelf Setting name", val);
    // }
  },
})
console.log(
  "first visit: ",
  persion,
  Object.getPrototypeOf(persion),
  persionSelf,
  Object.getPrototypeOf(persionSelf)
)
```

## 区分 new Object() 和 Object.create()

可以从对象创建方式；对象属性描述符；创建空对象时，是否有原型属性不同几个方面来探讨

### 对象创建方式

- new Object(obj) ：通过构造函数的对象, 对象添加的属性 obj 是在自身实例下

```js
var Obj = new Object(org)
console.log("create by new Object()", Obj) // { type: 'human' }
console.log(Obj.__proto__) // {} -> built-in
console.log(Obj.type) // human
```

- Object.create(proto[, propertiesObject]) ：创建的新对象继承一个对象。 添加的属性 proto 是在原型下，添加的属性 propertiesObject 才在自身实例下

```js
var ObjCre = Object.create(org, { name: { value: "JyLie" } })
console.log("create by Object.create", ObjCre) // {name: 'JyLie'}
console.log(ObjCre.__proto__) // { type: 'human' }
console.log(ObjCre.type) // human
```

### 对象属性描述符

- 通过 Object.create 第二个参数创建非空对象的属性描述符默认是为 false 的，不可写,不可枚举,不可配置

```js
console.log(Object.getOwnPropertyDescriptors(ObjCre)) // {type: {configurable: false,enumerable: false,value: "human",writable: false}}
console.log(ObjCre.name) // JyLie
ObjCre.name = "SuperJyLie" // JyLie。不可修改
delete ObjCre.name // false。不可删除
```

- 构造函数或对象字面量创建的对象属性的描述符默认为 true

```js
console.log(Object.getOwnPropertyDescriptors(Obj)) // {type: {configurable: true,enumerable: true,value: "human",writable: true}}
console.log(ObjCre.type) // human
ObjCre.type = "SuperJyLie" // SuperJyLie
```

### 创建空对象时，是否有原型属性

- Object.create(null)创建空对象，新对象是没有原型属性的

```js
Object.create(null) // {} 没有原型对象的空对象。纯空对象。
```

- 构造函数或对象字面量方法创建空对象时，新对象有原型属性（built-in）

```js
new Object() // {} 拥有built-in
```

因此 Object.create()主要是在创建新对象设置原型对象和对象实例属性的，接下来会讲一下 es6 规范的对象原型操作。

## 操作原型对象（prototype）

传统方法是通过给对象的 prototype 上添加属性和方法来实现原型链设置的

```js
var Person = function () {}
Person.prototype.age = 18
Person.prototype.name = "JyLie"
Person.prototype.show = function () {}
//通过构造函数创建实例
var traditionPserion = new Person()
traditionPserion.__proto__ === Person.prototype // true
```

通过使用 Object.create(proto[, propertiesObject])则可以直接使用 proto 来设置原型对象，使用 propertiesObject 来设置实例对象属性和方法，使得代码更直观更通俗易懂。除此之外还可以使用 Object.setPrototypeOf()来设置和 Object.getPrototypeOf()读取原型对象。

### Object.setPrototypeOf(obj, prototype)

- 描述：用来设置一个对象的 prototype 对象。原型对象 prototype 直接设置在需要设置原型对象的对象 obj 上。

- 语法：
  - obj：要设置其原型的对象。
  - prototype：该对象的新原型(一个对象 或 null)。
  - 返回值：无

```js
var setPrototype = { sex: "女" }
Object.setPrototypeOf(setPrototype, person)
setPrototype.__proto__ === person // true
```

### Object.getPrototypeOf()

- 描述：用于读取一个对象的原型对象；

- 语法：
  - obj：要返回其原型的对象。
  - 返回值：给定对象的原型。如果没有继承属性，则返回 null 。

```js
Object.getPrototypeOf(setPrototype) === person // true
```

## 对象继承

上面分析了有关 Object.create()的使用方法，相信大家对其有个大概的认识了。正所谓实践出真知，接下来会结合 Object.create()来对对象继承做实践。

下面我来个抛砖引玉，如果你有更好的方法可以相互留言交流学习(\*´▽ ｀)ノノ

传统的方法定义对象，如果直接通过 Object.assign()继承源对象 org 实例属性和方法生成新对象 obj 时，新对象 obj 不会继承源对象 org 的原型链的属性和方法。并且虽然新对象 obj 继承了源对象 org 的 get/set 属性，但是 get/set 会失去原本的动态监听属性的功能。

```js
var Person = function () {}
Person.prototype.age = 18
Person.prototype.name = "JyLie"
Person.prototype.show = function () {}
Object.assign(Person.prototype, { objAssign: true }) // 为原型链添加属性objAssign
//通过构造函数创建实例
var traditionPserion = new Person()
traditionPserion.__proto__ === Person.prototype // true
// 设置 get/set，测试对象继承的get/set
Object.defineProperty(traditionPserion, "getType", {
  enumerable: true, // 设为可枚举，不然 Object.assign 方法会过滤该属性
  get() {
    return "Could get: " + this.type
  },
  set(val) {
    this.type = val
  },
})

// 设置情景继承对象实例traditionPserion
var traditionPserionObjAs = Object.assign({}, traditionPserion)
// 此时traditionPserionObjAs只会继承traditionPserion的实例属性和set/get属性（但失去get/set的功能），但不能继承traditionPserion的原型属性和方法
traditionPserionObjAs.show //  不能拷贝到原型上的方法
traditionPserionObjAs.type = "Alient"
traditionPserionObjAs.getType //  getType不会动态改变
```

那么该怎样才能让新对象拷贝源对象上的原型上的方法呢？可以通过 Object.create 来创建新对象，而原型对象可以通过 Object.getPrototypeOf 获取，实例方法和属性可以通过 Object.getOwnPropertyDescriptors 来获取。

```js
// 使用Object.getOwnPropertyDescriptors 和 Object.getPrototypeOf() 可以正确拷贝原型对象的方法和属性、实例属性的方法和属性（包括get/set）
var traditionPserionProto = Object.getPrototypeOf(traditionPserion)
var traditionPserionOwnPropDesc = Object.getOwnPropertyDescriptors(
  traditionPserion
)
var traditionPserionByProtoAndOwnPropDesc = Object.create(
  traditionPserionProto,
  traditionPserionOwnPropDesc
)
```

因此我们可以得出结论

- 如果只是拷贝自身可枚举属性，就可以只用 Object.assign 方法
- （推荐）如果要拷贝 get /set 属性以及原型对象，配合Object.getPrototypeOf + Object.getOwnPropertyDescriptors + Object.create使用

### 题外话

如果你不需要设置get/set，那么可以对上面实现小改也可以达到拷贝目的。get/set失效归根于Object.assign()的拷贝过滤，而创建阉割版本的对象很多时候不是我们想要的，所以就老老实实使用标准推荐方法吧。

```js
var traditionPserionProto = Object.getPrototypeOf(traditionPserion)
var traditionPserionProtoNew = Object.create(traditionPserionProto);
var traditionPserionByProtoAndObjAss = Object.assign(traditionPserionProtoNew, traditionPserion)
```

最后，如果哪里有纰漏的请大神多多指教~(￣▽￣)~*
