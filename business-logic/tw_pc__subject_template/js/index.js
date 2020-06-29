/*
 * Description: 
 * version: 
 * Author: liejiayong(809206619@qq.com)
 * Date: 2020-06-29 16:25:09
 * LastEditors: liejiayong(809206619@qq.com)
 * LastEditTime: 2020-06-29 16:25:39
 */ 
$(function () {
  eval(function (p, a, c, k, e, r) { e = function (c) { return c.toString(36) }; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[1-9a-n]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('2 copysFn=(b(){2 $1=$(\'<c class="jy-copytips" style="display: none; padding: d; position: fixed; top: 30%; left: e%; transform: translateX(-e%); background-f: 3(0, 0, 0); f: 3(4, 4, 4); box-shadow: 3(0, 0, 0) g g 5px; white-space: nowrap;font-size: d; z-index: 2001;"></c>\');$(\'body\').append($1);2 h=b(i){2 j=5.querySelector(i);j.select();try{if(5.k("l",m,n)){5.k("l",m,n);$1.6(\'复制成功\').7(8).9(a)}else{$1.6(\'复制失败，请手动复制！\').7(8).9(a)}}catch(err){$1.6(\'复制失败，请手动复制！\').7(8).9(a)}};return h}());', [], 24, '|tip|var|rgb|255|document|text|fadeIn|500|fadeOut|1000|function|div|20px|50|color|0px|core|cls|cop|execCommand|copy|false|null'.split('|'), 0, {}));
  $('.jy-pop_close,.jy-pop_submit').on('click', function () {
    $(this).parents('.jy-pop').fadeOut();
  });
  $('.btnpopcop').on('click', function () {
    copysFn('.btnpopcoptxt')
  });
  //  home page
  jQuery("#hnews").slide({
    triggerTime: 0, effect: "fold"
  });
  jQuery("#hbans").slide({ titCell: '.hd', mainCell: ".bd", autoPage: true, effect: "fade", autoPlay: true });
})
