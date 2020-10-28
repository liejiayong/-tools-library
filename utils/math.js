/**
 * @description: JavaScript精准运算
 * @param {*}
 * @return {*}
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-10-28 21:58:34
 */

/**
 * @description: 切取浮点数指点小数。因为number.toFixed()剪切数字时，尾数会四舍五入。
 * @param {*} num 传入数字
 * @param {*} precision 精确尾数
 * @return {*}
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-10-28 22:41:08
 */
function subFloat(num, precision = 2) {
  let [base = '', decimal = ''] = num.toString().split('.');
  console.log(typeof base, typeof decimal, decimal);
  decimal = decimal.substr(0, precision);
  return +`${base}.${decimal}`;
}
/**
 * @description: 精度校准
 * @param {Number} num 传入数字
 * @param {Number} precision 精确尾数
 * @return {Number}
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-10-28 22:41:08
 */
function strip(num, precision = 12) {
  return parseFloat(num.toPrecision(precision));
}
/**
 * @description: 计算小数位长度
 * @param {Number} num 传入数字
 * @return {Number}
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-10-28 22:41:08
 */
function dfLength(num) {
  let eSplit = num.toString().split(/[eE]/),
    len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}
/**
 * @description: 小数转整数
 * @param {Number} num 传入数字
 * @return {Number}
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-10-28 22:41:08
 */
function float2Int(num) {
  if (!~num.toString().indexOf('e') || !~num.toString().indexOf('E')) {
    return parseInt(num.toString().replace('.', ''));
  }
  let dLen = dfLength(num);
  return strip(num * Math.pow(10, dLen));
}
// 精确加法
function add(...items) {
  return items.reduce((accumulator, current) => {
    let base = Math.pow(10, Math.max(dfLength(accumulator), dfLength(current))),
      num1 = mul(accumulator, base),
      num2 = mul(current, base),
      res = (num1 + num2) / base;
    return res;
  });
}
// 精确减法
function sub(...items) {
  return items.reduce((accumulator, current) => {
    let base = Math.pow(10, Math.max(dfLength(accumulator), dfLength(current))),
      num1 = mul(accumulator, base),
      num2 = mul(current, base),
      res = (num1 - num2) / base;
    return res;
  });
}
// 精确乘法
function mul(...items) {
  return items.reduce((accumulator, current) => {
    let base = Math.pow(10, dfLength(accumulator) + dfLength(current)),
      num1 = float2Int(accumulator),
      num2 = float2Int(current),
      res = (num1 * num2) / base;
    return res;
  });
}
// 精确除法
function div(...items) {
  return items.reduce((accumulator, current) => {
    let base = Math.pow(10, dfLength(current) - dfLength(accumulator)),
      num1 = float2Int(accumulator),
      num2 = float2Int(current),
      res = mul(num1 / num2, base);
    return res;
  });
}

export default {
  strip,
  dfLength,
  float2Int,
  subFloat,
  add,
  sub,
  mul,
  div,
};
