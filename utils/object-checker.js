/**
 * 检查变量是否对象:Array\Object
 * @param {*} value
 */
export function isObjectStructure(value) {
    return value === Object(value)
}

/**
 * 检查变量是否对象:Array\Object
 * @param {*} value
 */
export function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]'
}