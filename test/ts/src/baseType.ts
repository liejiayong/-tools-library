/**
 * boolean type
 * 在 TypeScript 中，boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数。
 */
let isDone: boolean = false
let isboolean: boolean = Boolean(1)
// 注意，使用构造函数 Boolean 创造的对象不是布尔值：
let isBoolean: Boolean = new Boolean(1)

/**
 * number type
 * JavaScript 默认是十进制表示法，es6语法编译后其他进制会转化为十进制表示
 */
let decLiteral: number = 6
let hexLiteral: number = 0xf00d
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010
// ES6 中的八进制表示法
let octalLiteral: number = 0o744
let notANumber: number = NaN
let infinityNumber: number = Infinity

/**
 * string type
 */
let username: string = `Gene`
let sentence: string = `Hello, my name is ${username}.
I'll be ${decLiteral + 1} years old next month.`

// Tuple元祖:表示一个已知元素数量和类型的数组，各元素的类型不必相同
let tuple1: [string, number]
tuple1 = ['ljy', 18] // success
// tuple1 = [1, 1] // error
// 当访问越界时会使用联合类型替代

/**
 * any任意类型，表示允许赋值为任意类型，包括属性和方法。
 * 一般用于用户输入和第三方代码库，
 * 或者未声明类型的变量
 */
let anyTest: any = 4
anyTest = true
anyTest = Object

let noDecribe // 等价于let something: any
noDecribe = 'seven'
noDecribe = 7

/**
 * void:没有任何类型，与any相反
 * 如用在function中,表示没有任何返回值的函数
 * 只能将它赋值为 undefined 和 null
 */
function voidFun(): void {
  anyTest = Array
}
// 或者用在一个值只能为 null 或 undefined
let unusable: void = undefined
unusable = null

/**
 * Null 和 Undefined.和 void相似
 * 但undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null
 * 默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number等类型类型的变量。
 * 然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。
 */
let u: undefined = undefined
let n: null = null

// Never类型：表示的是那些永不存在的值的类型。
// 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
// never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}
// 推断的返回值类型为never
function fail() {
  return error('Something failed')
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}

// object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
declare function create(o: object | null): void
create({ prop: 0 }) // OK
create(null) // OK
// create(42); // Error
// create("string"); // Error
// create(false); // Error
// create(undefined); // Error

// 类型断言
// 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查
// “尖括号”语法：
let someValue: any = 'this is a string'
let strLength: number = (<string>someValue).length
// as语法：
let strAsLength: number = (someValue as string).length
// 两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；
// 然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。
