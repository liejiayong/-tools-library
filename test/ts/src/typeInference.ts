/**
 * 类型推论
 * 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。
 * 大致分为两类：
 * - 定义时赋值
 * - 定义时未赋值
 */
// 定义时赋值: 根据定义时赋值的类型来默认变量的类型
let assign = 'liejy' // 约等于 let assign:string = 'liejy'
// assign = 1 // 编译时报错

// 定义时未赋值：该情况都会被推断成 any类型
let noAssign // 约等于 let noAssign:any
noAssign = 'liejy'
noAssign = 1
