/*
 * Description: 
 * version: 
 * Author: liejiayong(809206619@qq.com)
 * Date: 2020-06-15 11:37:41
 * LastEditors: liejiayong(809206619@qq.com)
 * LastEditTime: 2020-06-15 11:42:46
 */
; (function (mode) {
  var rem = function () {
    var docEl = document.documentElement || document.body
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    var reCalc = function () {
      var clientWidth = docEl.clientWidth,
        PIX = 750
      clientWidth = clientWidth > PIX ? PIX : clientWidth
      var fontSize = 100 * (clientWidth / PIX)
      window.baseFontSize = fontSize
      docEl.style.fontSize = fontSize + 'px'
    }
    window.addEventListener(resizeEvt, reCalc, false)
    document.addEventListener('DOMContentLoaded', reCalc, false)
  }
  if (mode == 'rem') rem();
}('rem'));
