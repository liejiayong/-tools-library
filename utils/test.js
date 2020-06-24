/**
   需求：传入一个数n，输出一个字符串s
  要求：
  1.n>=1e4 以万做单位
  亿， 万亿同理
  2.保留两位小数
  例：
  n = 11100;
  则： 输出s等于1.11万
 */

export const conv = (num = 0, precise = 0, unit = 1e4) => { }



/**
 * test bind | call
 */

class BFn {
   map = []
   add(cb) {
      console.log('add', cb)
      this.map.push(cb)
   }
   emit() {
      const map = [...this.map]
      console.log('listenimg cb', map)
      map.forEach(cb => {
         console.log('emit', cb)
         cb && typeof cb == 'function' && cb()
      })
   }
}
var bfn = new BFn()
bfn.add(function () {
   console.log('on listen onChange cb')
})
