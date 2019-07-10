/**
 * 函数的类型
 * 函数是 JavaScript 中的一等公民
 * 参数长度不能大于或小于声明长度
 */

//  函数声明
function declarationFn(x: number, y: number): number {
  return x + y
}
declarationFn(1, 2) // 3
// declarationFn(1, 2, 3) // 编译报错,大于声明长度
// declarationFn(1) // 编译报错,小于声明长度

// 函数表达式
// 下面是 错误示范 。因为代码只对等号右侧的匿名函数进行了类型定义，
// 而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的。
let expErrFn = function(x: number, y: number): number {
  return x + y
}
// 正确示范
// 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
let expSucFn:(x: number, y: number) => number = (x:number, y:number):number {
    return x + y
}

// 用接口定义函数的形状
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let searchFn: SearchFunc;
searchFn = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}

// 可选参数
function nameFn(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = nameFn('Tom', 'Cat')
let tom = nameFn('Tom')
// 需要注意的是，可选参数必须接在必需参数后面。
// 换句话说，可选参数后面不允许再出现必须参数了：
// 错误示范
// function nameFailFn(firstName?: string, lastName: string) {
//     if (lastName) {
//         return firstName + ' ' + lastName;
//     } else {
//         return firstName;
//     }
// }

// 参数默认值
function argumentFn(firstName: string = 'Tom', lastName: string = 'men') {
    return firstName + ' ' + lastName;
}
let argument = argumentFn()

// 剩余参数（rest 参数）: rest参数只能是最后一个参数
function pushFn(arr:any[], ...items:any[]) {
    items.forEach(val => arr.push(val))
}
pushFn([1,2,3], 'a')

// 重载:允许一个函数接受不同数量或类型的参数时，作出不同的处理。
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
