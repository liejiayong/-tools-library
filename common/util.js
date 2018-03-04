/**
 *  获取指定范围内的随机数
 * @param min 最小值
 * @param max 最大值
 * @returns {number} 返回随机数
 */
function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 *  洗牌函数
 * @param arr 输入数组列表
 * @returns {Blob|ArrayBuffer|Array.<T>|string|*}
 */
export function shuffle (arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandom(0, i)
    let n = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = n
  }
  return _arr
}

/**
 *  防抖函数。使用柯里化返回新函数
 * @param fun
 * @param delay
 * @returns {Function}
 */
export function debounce (fun, delay) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fun.apply(this, args)
    }, delay)
  }
}
