/*
 * Description: 
 * version: 
 * Author: liejiayong(809206619@qq.com)
 * Date: 2020-04-13 20:57:36
 * LastEditors: liejiayong(809206619@qq.com)
 * LastEditTime: 2020-04-13 21:24:55
 */
/**
 * c1\c2 包含变量
 * width: el 宽
 * height: el 高
 * top: el 顶部 y 坐标
 * left: el 左侧 x 坐标
 * bottom: el 底部 y 坐标
 * right: el 右侧 x 坐标
 */
export const hit = {
  rect: function (c1, c2) {
    return c1.left > c2.right || c1.top > c2.bottom || c1.right < c2.left || c1.bottom < c2.top;
  },
  circle: function (c1, c2) {
    var dis = Math.sqrt(Math.pow(c1.x - c2.x) + Math.pow(c1.y - c2.y));

    if (dis > c1.r + c2.r) {
      return false;
    } else {
      return true;
    }
  }
}
