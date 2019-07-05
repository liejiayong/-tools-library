/**
 * 接口：定义一个结构类型模型作为类型定义
 * 用途：使用接口（Interfaces）来定义对象的类型
 * 绕开这些检查非常简单。 最简便的方法是使用类型断言
 */
// 用于对「对象的形状（Shape）」进行描述，需要根据数据约束
// 普通对象
interface Point {
  readonly x: number // 只读属性，约束只能在定义是赋值属性值，后不能做修改
  y: number // 正常为必选属性
  width: number
  height?: number // 可选属性
  // 允许任意属性: 在输入接口上不存在属性时，可跳过额外属性检查（与断言相比，为最佳方式）。
  // 需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集，
  // 也就是 任意属性 的类型 要是其他确定属性的超集或相同
  // 本案例中， 任意属性只能是 any 或 number
  [propName: string]: number
}

function getPoint(point: Point): Object {
  return {
    x: 1, // 初始赋值， 若再修改则编译时报错
    y: 2,
    width: 100,
    height: 100, // 可选属性可不写
    flag: 100 // 定义任意属性时添加
  }
}

// 函数类型：一个只有参数列表和返回值类型的函数定义
interface SearchFun {
  (source: string, subString: string): boolean
}
let mySearch: SearchFun
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}

// 可索引的类型:具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。 
// 持两种索引签名：字符串和数字.但是数字索引的返回值必须是字符串索引返回值类型的子类型。 
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];
let myStr: string = myArray[0];

// 用于对类的一部分行为进行抽象