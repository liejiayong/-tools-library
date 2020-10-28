// 精度校准
function strip(num, precision = 12) {
  return parseFloat(num.toPrecision(precision));
}
// 计算小数位长度
function digitLength(num) {
  let eSplit = num.toString().split(/[eE]/),
    len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}
// 小数转整数
function float2Int(num) {
  if (num.toString().indexOf('e') === -1) {
    return parseInt(num.toString().replace('.', ''));
  }
  let dLen = digitLength(num);
  return strip(num * Math.pow(10, dLen));
}
// 精确加法
function add(...items) {
  return items.reduce((accumulator, current) => {
    let base = Math.pow(10, Math.max(digitLength(accumulator), digitLength(current))),
      num1 = mult(accumulator, base),
      num2 = mult(current, base),
      res = (num1 + num2) / base;
    return res;
  });
}
// 精确减法
function sub(...items) {
  return items.reduce((accumulator, current) => {
    let base = Math.pow(10, Math.max(digitLength(accumulator), digitLength(current))),
      num1 = mult(accumulator, base),
      num2 = mult(current, base),
      res = (num1 - num2) / base;
    return res;
  });
}
// 精确乘法
function mult(...items) {
  return items.reduce((accumulator, current) => {
    let base = Math.pow(10, digitLength(accumulator) + digitLength(current)),
      num1 = float2Int(accumulator),
      num2 = float2Int(current),
      res = (num1 * num2) / base;
    return res;
  });
}
// 精确除法
function div(...items) {
  return items.reduce((accumulator, current) => {
    let base = Math.pow(10, digitLength(current) - digitLength(accumulator)),
      num1 = float2Int(accumulator),
      num2 = float2Int(current),
      res = mult(num1 / num2, base);
    return res;
  });
}

export default {
  strip,
  digitLength,
  float2Int,
  add,
  sub,
  mult,
  div,
};
