// 原始类型
// boolean
var isDone = false;
var isBoolean = new Boolean(1);
// number
var decLiteral = 6;
var hexLiteral = 0xf00d;
var octalLiteral = 484;
var binaryLiteral = 10;
// string
var myName = 'Tom';
// 空值void
var unusable = undefined;
// any
var myFavorite = 'seven';
myFavorite = 7;
myFavorite = true;
// 未声明类型
var something;
something = 'seven';
something = 7;
var something;
something = 'seven';
something = 7;
// 类型推论
var typeUndefined = 'seven';
// 等价于
var typeUndefined = 'seven';
// 联合类型,使用 | 分隔每个类型
var myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
// 数组的类型
// 「类型 + 方括号」表示法
var fibonacci = [1, 2, 3, 4, 5]; // 数组里面的值只能为数字
// 数字泛型
var fibonacci = [1, 2, 3, 4, 5];
var fibonaccis = [1, 2, 3, 4, 5];
// any 在数组中的应用
var list = ['luxun', 25, { website: 'https://www.twicetech.top' }];
// 类数组
// 函数的类型
// 函数声明
function sum(x, y) {
    return x + y;
}
// 函数表达式
var mySum = function (x, y) {
    return x + y;
};
// 类型断言
/* 语法
* <类型>值
* 或
* 值 as 类型
* 在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种。
*/
function getLength(something) {
    if (something.length) {
        return something.length;
    }
    else {
        return something.toString().length;
    }
}
// 内置对象
// ECMAScript 的内置对象Boolean、Error、Date、RegExp 等
var b = new Boolean(1);
var e = new Error('Error occurred');
var d = new Date();
var r = /[a-z]/;
// DOM 和 BOM 的内置对象:Document、HTMLElement、Event、NodeList 等
var body = document.body;
var allDiv = document.querySelectorAll('div');
document.addEventListener('click', function (e) {
});
function getName(n) {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
function handleEvent(ele, event) {
}
/**
 *  数组：合并了相同类型的对象
 *  元组（Tuple）: 合并了不同类型的对象
 */
// 元组
var xcatliu = ['liejiayong', 12];
// 枚举:（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
// 类
