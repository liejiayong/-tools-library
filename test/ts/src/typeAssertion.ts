/**
 * 类型断言
 * 可以用来手动指定一个值的类型。
 * 方式：
 * - <类型>值
 * - 值 as 类型 (在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种。)
 */

function getLength(something: string | number): number {
  if ((<string>something).length) {
    return (<string>something).length
  } else {
    return something.toString().length
  }
}
// 或 tsx版本
function getLengthJSX(something: string | number): number {
  if ((something as string).length) {
    return (<string>something).length
  } else {
    return something.toString().length
  }
}
