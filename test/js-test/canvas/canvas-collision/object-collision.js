/**
 * 物体碰撞
 * cakao:https://aotu.io/notes/2017/02/16/2d-collision-detection/
 */

//  矩形边界反弹
function rectBounce(target, rect) {
  if (target.left < 0 || target.right > rect.width) target.x = -target.x;
  if (target.top < 0 || target.bottom > rect.height) target.y = -target.y;
}

/**
 * 两矩形碰撞，无旋转情况
 * 
 * 原理：判断两矩形边界及宽、高
 * 
 * @param {*} rect1 矩形1
 * @param {*} rect2 矩形2
 * @returns {Boolean}
 * 
 * 缺点：
 * 相对局限：两物体必须是矩形，且均不允许旋转（即关于水平和垂直方向上对称）。
 * 对于包含着图案（非填满整个矩形）的矩形进行碰撞检测，可能存在精度不足的问题。
 * 物体运动速度过快时，可能会在相邻两动画帧之间快速穿越，导致忽略了本应碰撞的事件发生
 * 
 * 适用于： （类）矩形物体间的碰撞。
 */
function rectCollision(rect1, rect2) {
  var is = false;
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
    ) {
      is = true;
    }
  return is;
}

/**
 * 获取矩形边界信息
 * @param {*} el 
 * @param {*} x 
 * @param {*} y 
 */
function canvasOffset(el, x, y) {
  var rect = el.getBoundingClientRect()
  return {
    x: x - rect.left * (el.width / rect.width),
    y: y - rect.top * (el.height / rect.height),
    left: x - rect.left * (el.width / rect.width),
    y: y - rect.top * (el.height / rect.height),
    x: x - rect.left * (el.width / rect.width),
    y: y - rect.top * (el.height / rect.height),
  }
}

/**
 * 两圆形碰撞，无旋转情况
 * 
 * 原理：判断圆心间距
 * 
 * @param {*} c1 
 * @param {*} c2 
 * @returns {Boolean}
 * 
 * 缺点：与『轴对称包围盒』类似
 * 
 * 
 * 原理： （类）圆形的物体，如各种球类碰撞。
 */
function circleCollision(c1, c2) {
  var is = false;
  if (Math.pow(c1.x - c2.x) + Math.pow(c1.y - c2.y) < c1.radius + c2.radius) is = true;
  return is;
}
