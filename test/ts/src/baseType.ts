/**
 * baseType
 */

//  boolean type
let isDone: boolean = false
let isBoolean: Boolean = new Boolean(1)

// number type
let decLiteral: number = 6
let hexLiteral: number = 0xf00d
let octalLiteral: number = 0o744
let binaryLiteral: number = 0b1010

// string type
let username: string = `Gene`
let sentence: string = `Hello, my name is ${username}.
I'll be ${decLiteral + 1} years old next month.`

// Array type,两种方式：type[] 和 Array<type>
let list1: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]
let a: number[] = [1, 2, 3, 4];
// ReadonlyArray只读数组，可使用as改变结果
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!
// 上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：
a = ro as number[];

// Tuple元祖:表示一个已知元素数量和类型的数组，各元素的类型不必相同
let tuple1: [string, number]
tuple1 = ['ljy', 18] // success
// tuple1 = [1, 1] // error
// 当访问越界时会使用联合类型替代

// 枚举：定义一组指定数值。默认情况下标从0开始。
// 枚举可以生成键值互转的对象，如Color,可以通过Color.blue获取下标为0，可以Color[0]获取值为blue
enum Color {
  blue,
  red,
  green
}
let blue: Color = Color.blue
console.log('color:', blue)
// 可以自定义赋值下标
enum pcSys {
  window = 1,
  imac = 3,
  linux = 8
}
let win10: pcSys = pcSys.window
console.log('pcSys:', pcSys, win10)

// any任意类型，一般用于用户输入和第三方代码库
let anyTest: any = 4
anyTest = true
anyTest = Object

// void:没有任何类型，与any相反，如用在function中
function voidFun(): void {
  anyTest = Array
}
// 或者用在一个值只能为 null 或undefined
let unusable: void = undefined
unusable = null

// Null 和 Undefined.和 void相似
// 默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
// 然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。
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

