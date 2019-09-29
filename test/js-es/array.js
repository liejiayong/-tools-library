/**
 * 数组扁平化操作
 * Array.flat() 扁平化数组
 * Array.flatMap() 扁平化遍历操作数据
 */
let multi = [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]]
multi.flat() // [1,2,3,4,5,6,Array(4)]
multi.flat().flat() // [1,2,3,4,5,6,7,8,9,Array(3)]

let array = [1, 2, 3, 4, 5]
array.flatMap(v => [v, v * 2]) // [1, 2, 2, 4, 3, 6, 4, 8, 5, 10]
