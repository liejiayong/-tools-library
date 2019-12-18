/**
 * 当月总共日长
 * @param {*} year 年
 * @param {*} month 月
 */
function getMonthLength(year, month) {
  return new Date(year, month, 0).getDate()
}

