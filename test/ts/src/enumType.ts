/**
 * 枚举：定义一组带名字的常量，用来严格描述用例。
 * TypeScript支持数字的和基于字符串的枚举。
 * 
 * 外部枚举和非外部枚举之间有一个重要的区别，在正常的枚举里，没有初始化方法的成员被当成常数成员。 
 * 对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的。
 */

/**
 * 基础
 */

/**
 * 数字枚举: 具有自增长的行为, 枚举首个常量成员默认值从0开始，其余的成员会从1开始自动增长。
 *
 * 首个常量blue默认值为0，
 * 因此[Color.blue, Color.red, Color.green]的值，
 * 对应为[0,1,2]
 */
// 默认值
enum Color {
  blue,
  red,
  green,
}
let blue: Color = Color.blue;
let color: number[] = [Color.blue, Color.red, Color.green];
console.log("color :", blue); // 0
console.log("color:", color); // [0,1,2]

// 自定义赋值
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
let direction: Array<number> = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right,
];
console.log("direction :", direction); // [1,2,3,4]
enum pcSys {
  window = 1,
  imac = 3,
  linux = 8,
}
let sys: Array<number> = [pcSys.window, pcSys.imac, pcSys.linux];
console.log("sys :", sys); // [1,3,8]

// 数字枚举实例
enum httpStatus {
  no = 0,
  yes = 0,
}
function response(recipient: string, message: httpStatus): void {}
response("suc", httpStatus.yes);

/**
 * 字符枚举: 没有自增长的行为,
 * 在一个字符串枚举里，
 * 每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。
 */
enum Gesture {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
const gesture: Array<string> = [
  Gesture.Up,
  Gesture.Down,
  Gesture.Left,
  Gesture.Right,
];
console.log("gesture: ", gesture); // ["UP", "DOWN", "LEFT", "RIGHT"]

/**
 * 异构枚举（Heterogeneous enums）
 *
 * 从技术的角度来说，枚举可以混合字符串和数字成员，但是似乎你并不会这么做：
 *
 * 除非你真的想要利用JavaScript运行时的行为，否则我们不建议这样做。
 */
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}

/**
 * 进阶
 */

/**
 * 计算的和常量成员
 *
 * 每个枚举成员都带有一个值，它可以是 常量或 计算出来的。
 * 当满足如下条件时，枚举成员被当作是常量：
 */
// （数字枚举）它是枚举的第一个成员且没有初始化器，这种情况下它被赋予值 0：
// E.X is constant:
enum E {
  X,
}

// 它不带有初始化器且它之前的枚举成员是一个 数字常量。
// 这种情况下，当前枚举成员的值为它上一个枚举成员的值加1。
// All enum members in 'E1' and 'E2' are constant.
enum E1 {
  X,
  Y,
  Z,
}
enum E2 {
  A = 1,
  B,
  C,
}

/**

枚举成员使用 常量枚举表达式初始化。 常数枚举表达式是TypeScript表达式的子集，它可以在编译阶段求值。 当一个表达式满足下面条件之一时，它就是一个常量枚举表达式：
  一个枚举表达式字面量（主要是字符串字面量或数字字面量）
  一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
  带括号的常量枚举表达式
  一元运算符 +, -, ~其中之一应用在了常量枚举表达式
  常量枚举表达式做为二元运算符 +, -, *, /, %, <<, >>, >>>, &, |, ^的操作对象。 若常数枚举表达式求值后为 NaN或 Infinity，则会在编译阶段报错。

*/
enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = "123".length,
}

/**

* 联合枚举与枚举成员的类型

存在一种特殊的非计算的常量枚举成员的子集：字面量枚举成员。 
字面量枚举成员是指不带有初始值的常量枚举成员，或者是值被初始化为:
  任何字符串字面量（例如： "foo"， "bar"， "baz"）
  任何数字字面量（例如： 1, 100）
  应用了一元 -符号的数字字面量（例如： -1, -100）

当所有枚举成员都拥有字面量枚举值时，它就带有了一种特殊的语义。

 */
/**
 * 枚举成员成为了类型！ 例如，我们可以说某些成员 只能是枚举成员的值：
 */
enum ShapeKind {
  Circle,
  Square,
}
interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}
interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}
// let c: Circle = {
//   kind: ShapeKind.Square,
//   //    ~~~~~~~~~~~~~~~~ Error!
//   radius: 100,
// }

/**
 * 另一个变化是枚举类型本身变成了每个枚举成员的 联合。
 * 通过联合枚举，类型系统能够利用这样一个事实，它可以知道枚举里的值的集合。
 * 因此，TypeScript能够捕获在比较值的时候犯的愚蠢的错误。
 */
enum EU {
  Foo,
  Bar,
}
function f(x: EU) {
  if (x !== EU.Foo) {
    // if (x !== EU.Foo || x !== EU.Bar) { // Error! Operator '!==' cannot be applied to types 'E.Foo' and 'E.Bar'.
  }
}

/**
 * 反向映射
 */
enum Enum {
  A,
}
let en = Enum.A;
let nameOfA = Enum[en]; // "A"

/**
 * const枚举
 */
const enum constEnum {
  A = 1,
  B = A * 2,
}

/**
 * 外部枚举: 外部枚举用来描述已经存在的枚举类型的形状。
 */
declare enum declareEnum {
  A = 1,
  B,
  C = 2
}
