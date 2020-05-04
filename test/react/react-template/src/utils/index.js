/**
 * @name isDev
 * @desc 判断是否为开发模式
 */
export const isDev = process.env.NODE_ENV === "development"

/**
 * 
 * @param {*} ms 
 */
export function delay(ms = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
