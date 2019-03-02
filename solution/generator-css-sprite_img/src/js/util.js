/**
 * business logic methods
 */

// 初始化游戏初级
function resetData() {
  result.qIndex = 0;
  result.right = 0;
  result.integral = 0;
  initialQuestion(ansIndexList);
  initialTimeProgress();
}

// 播放答题正确
function playAudioSuc() {
  var audio = document.getElementById('audioSuc');
  audio.pause();
  audio.play();
}
// 暂停答题错误
function playAudioFail() {
  var audio = document.getElementById('audioFail');
  audio.pause();
  audio.play();
}

// 时间进度条
function timeProgress() {
  timer = setInterval(function() {
    // 超时状态
    if (TYPE_TIME_DURARION <= currentTime) {
      clearInterval(timer);
      currentTime = 0;
      ++result.qIndex;

      timeoutSound.play();
      slideToNext(0);
      return;
    }

    // 未超时
    currentTime += TYPE_TIME_EACH;
    var $currCount = $($('.count').get(result.qIndex));
    var time = (TYPE_TIME_DURARION - currentTime) / 1000;
    $currCount.text(time);
  }, TYPE_TIME_EACH);
}

// 跳到都下一题
function nextQuestion(duration) {
  duration = duration || 300;
  // console.log(1111111, qIndex)

  var timer = setTimeout(function() {
    pSwiper.slideNext(duration);
    // 倒计时
    timeProgress();
    clearTimeout(timer);
  }, TYPE_NUMBER_DURATION);
}

// 显示结果
function showResult() {
  $('#resultR').text(result.right);
  $('#resultInte').text(result.integral);
  $('#J_qsucPop').fadeIn();
}

//  跳到下一页
function slideToNext(duration) {
  // console.log(result)
  if (result.qIndex < TYPE_QUESTION_TOTAL) return nextQuestion(duration);
  else showResult();
}

// 选择答题
function chooseCard($el) {
  var chose = $el.attr('data-chose') || $el.siblings().attr('data-chose');
  if (chose === '1') return;
  $el.attr('data-chose', 1);
  $el.siblings().attr('data-chose', 1);

  // 翻开选中
  var right = $el.attr('data-index') + '',
    index = $el.index() + '';
  if (right === index) {
    $el.addClass(qestionSucCls);
    result.integral += TYPE_INTEGRAL_ADD;
    result.totalIntegral += TYPE_INTEGRAL_ADD;
    result.right += 1;
    playAudioSuc();
  } else {
    $el.addClass(qestionFailCls);
    $elRight = $($el.parent().find('.qitem').get(right));
    $elRight.addClass(qestionSucCls);
    playAudioFail();
  }

  // 答题计数
  clearInterval(timer);
  ++result.qIndex;
  currentTime = 0;
  
  // 暂停时间进度条
  var $currTime = $('.page2.swiper-slide-active').find('.current');
  $currTime.addClass(timePauseCls);

  // 切换题目
  slideToNext();
}

// 初始化答题数据
function initialQuestion(indexlist) {
  var answer = [];
  $.each(indexlist, function(i, val) {
    answer.push(questions[val])
  });
  answer = shuffle(answer);

  $('.jy-eachq').each(function(i) {
    setAnswer($(this), answer[i], i + 1);
  });
}

// 初始化进度条
function initialTimeProgress() {
  $('.jy-counttime .current').each(function() {
    $(this).removeClass(timePauseCls);
  })
  $('.jy-counttime .count').each(function() {
    $(this).text(TYPE_TIME_DURARION/1000);
  })
}

//  设置每题数据
function setAnswer($el, question, index) {
  var qtit = question.title,
  qtip = titConfig[index-1];
  $el.find('.jy-qtip').text(qtip);
  $el.find('.jy-qtit').text(qtit);

  var $qaitem = $el.find('.qitem');
  var answer = question.answer;
  $qaitem.each(function(i, item) {
    var that = $(this);
    that.attr('data-chose', 0).removeClass(qestionActiveCls);
    that.attr('data-index', question.right).text(answer[i].name);
  });
}

/**
 * tool methods
 */
function padZero(str) {
  str = str + '';
  if (str === '0') return 0;
  str = str.length === 1 ? '0' + str : str;
  return str;
}

function debounce(fn, delay) {
  var timer = null;
  return function() {
    var context = this,
      arg = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, arg);
    }, delay);
  };
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(arr) {
  let _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandom(0, i);
    let n = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = n;
  }
  return _arr;
}

function throttle(fn, threshhold) {
  var timer = null;
  var start = Date.now();
  return function() {
    var context = this,
      arg = arguments,
      curr = Date.now();
    if (timer) clearTimeout(timer);
    if (curr - start >= threshhold) {
      fn.apply(context, arg);
      start = curr;
    } else {
      timer = setTimeout(function() {
        fn.apply(context, arg);
      }, threshhold);
    }
  };
}
