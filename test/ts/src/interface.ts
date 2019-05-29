// 接口：定义一个结构类型模型作为类型定义
// 绕开这些检查非常简单。 最简便的方法是使用类型断言：
// 普通对象
interface Point {
  readonly x: number // 只读属性，只能在定义是修改属性值
  y: number
  width: number
  height?: number // 可选属性
  [propName: string]: any // 输入不存在属性时，可跳过额外属性检查（与断言相比，为最佳方式）
}

function getPoint(point: Point): Object {
  return {}
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
