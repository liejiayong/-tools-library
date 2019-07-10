/**
 * Array type,两种方式：
 * - 「类型 + 方括号」表示法:
 *  - <type>[]
 *  - (<type> | <type>)[]
 * - 数组泛型: Array<type>
 */
let list1: number[] = [1, 2, 3]
let list3: (string | number)[] = [1, 2, '3']
let list2: Array<number> = [1, 2, 3]

// any 在数组中的应用
let anyArray: any[] = ['liejy', 1, { website: 'http://www.twicetech.com' }]

// 用接口表示数组
interface NumberArray {
  [index: number]: number
}
let numberArray: NumberArray = [1, 1, 2, 3, 5]

// 类数组（Array-like Object）不是数组类型，比如 arguments
// 可参考内置对象，如：IArguments
function sum() {
  let args: IArguments = arguments
  return args
}

// 类型断言改造只读数组
let a: number[] = [1, 2, 3, 4]
// ReadonlyArray只读数组，可使用as改变结果
let ro: ReadonlyArray<number> = a
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!
// 上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：
a = ro as number[]
console.log(`ReadonlyArray as numberArray 类型断言 ${a}`)
