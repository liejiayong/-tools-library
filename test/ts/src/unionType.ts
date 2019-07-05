/**
 * 联合类型（Union Types）
 * 表示取值可以为多种类型中的一种
 */
// 定义
let union:string | number
union = 'liejy'
union = 1

// 调用：当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法,
// 因此要注意使用
function getStr(str: string | number): string {
  return str.toString()
}

// 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型，
// 这种情况不避免
let str: string | number 
str  = 'seven' // 此时 str 为 string类型
str.length // 5
// str = 1 // 此时 str 为 number类型
// str.length // 编译时报错