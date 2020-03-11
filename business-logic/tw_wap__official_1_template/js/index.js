/*
 * Description: 
 * version: 
 * Author: liejiayong(809206619@qq.com)
 * Date: 2020-02-17 16:56:53
 * @LastEditors: liejiayong(809206619@qq.com)
 * @LastEditTime: 2020-02-21 15:55:10
 */
var activeCls = 'active';
function showTip(str) {
  var $tip = $('#J_tipPop');
  $tip.find('.jy-pop-tiptxt').text(str);
  $tip.fadeIn();
}
// 弹窗
// 关闭弹窗
$('.jy-btn_pop_close,.jy-pop_mask--clickable,.jy-pop_picker_btn--cancel').on('click', function () {
  jyBus.winReset();
  $(this).parents('.jy-pop').fadeOut();
});


// 导航
$('#btnNavMenu').on('click', function () {
  if ($(this).hasClass(activeCls)) {
    $(this).removeClass(activeCls);
    $('#menuPanel').removeClass(activeCls);
  } else {
    $(this).addClass(activeCls);
    $('#menuPanel').addClass(activeCls);
  }
});

if ($('.btn-scrollTop')) {
  $('.btn-scrollTop').on('click', function() {
    $('body,html').animate({ 'scrollTop': 0 });
  });
}
