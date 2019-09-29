/**
 * 对象键值转数组操作
 * Object.entries()
 * Object.fromEntries()
 */
let obj = { apple: 10, orange: 20, banana: 30 }
let entries = Object.entries(obj) // [["apple", 10], ["orange", 20]  ["banana", 30]]
let fromEntries = Object.fromEntries(entries) // { apple: 10, orange: 20, banana: 30 }
