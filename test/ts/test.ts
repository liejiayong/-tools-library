// 原始类型
// boolean
let isDone: boolean = false
let isBoolean: Boolean = new Boolean(1)

// number
let decLiteral: number = 6
let hexLiteral: number = 0xf00d
let octalLiteral: number = 0o744
let binaryLiteral: number = 0b1010

// string
let myName: string = 'Tom'

// 空值void
let unusable: void = undefined

// any
let myFavorite: any = 'seven'
myFavorite = 7
myFavorite = true

// 未声明类型
var something;
something = 'seven';
something = 7
var something: any;
something = 'seven';
something = 7

// 类型推论
var typeUndefined = 'seven'
// 等价于
var typeUndefined: string = 'seven'

// 联合类型,使用 | 分隔每个类型
var myFavoriteNumber: string | number
myFavoriteNumber = 'seven'
myFavoriteNumber = 7

// 对象类型 --- 接口
// 在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implements）。
// TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。
interface Person {
    name: string,
    phone: number,
    readonly email: string, // 只读属性,只在初始化时赋值
    age?: number,  // 可选属性，使用?:
    [propName: string]: any  // 任意属性
}

// 数组的类型
// 「类型 + 方括号」表示法
var fibonacci: number[] = [1,2,3,4,5] // 数组里面的值只能为数字
// 数字泛型
var fibonacci: Array<number> = [1,2,3,4,5]
// 使用接口表示数组
interface NumberArray {
    [index: number]: number
}
var fibonaccis: NumberArray = [1,2,3,4,5]
// any 在数组中的应用
var list: any[] = ['luxun', 25, {website:'https://www.twicetech.top'}]
// 类数组

// 函数的类型
// 函数声明
function sum(x: number, y: number): number {
    return x + y;
}
// 函数表达式
var mySum: (x: number, y: number) => number = function(x: number, y: number){
    return x + y;
}

// 类型断言
/* 语法
* <类型>值
* 或
* 值 as 类型
* 在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种。
*/
function getLength(something: string | number): number{
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}

// 声明文件：引入第三方库时，对其进行引用声明
declare var jQuery: (string) => any

// 内置对象
// ECMAScript 的内置对象Boolean、Error、Date、RegExp 等
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
// DOM 和 BOM 的内置对象:Document、HTMLElement、Event、NodeList 等
var body: HTMLElement = document.body
var allDiv: NodeList = document.querySelectorAll('div')
document.addEventListener('click', function(e: MouseEvent){

})


// 类型别名
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}

// 字符串字面量类型: 用来约束取值只能是某几个字符串中的一个
type EventNames = 'click' | 'scroll' | 'mousemove'
function handleEvent(ele: Element, event: EventNames){

}

/**
 *  数组：合并了相同类型的对象
 *  元组（Tuple）: 合并了不同类型的对象
 */
// 元组
var xcatliu: [string, number] = ['liejiayong', 12]

// 枚举:（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat}
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true

// 类



