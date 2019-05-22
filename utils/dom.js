/* control class */
export function hasClass(el, cls) {
    let reg = new RegExp(`(^|\\s)${cls}(\\s|$)`)
    return reg.test(el.className)
}

export function addClass(el, cls) {
    if (hasClass(el, cls)) {
        return
    }
    let newCls = el.className.split(' ')
    newCls.push(cls)
    el.className = newCls.join(' ')
}

export function removeClass(el, cls) {
    if (!hasClass(el, cls)) {
        return
    }
    let reg = new RegExp(`(^|\\s)${cls}(\\s|$)`)
    el.className = el.className.replace(reg, '')
}

/* control cssText style */
export function getStyle(ele, style) {
    let ret;
    if (window.getComputedStyle) {
        ret = window.getComputedStyle(ele, null).getPropertyValue(style);
    } else {
        if (style === 'opacity') {
            var filter = null;
            // 早期的 IE 中要设置透明度有两个方法：
            // 1、alpha(opacity=0)
            // 2、filter:progid:DXImageTransform.Microsoft.gradient( GradientType= 0 , startColorstr = ‘#ccccc’, endColorstr = ‘#ddddd’ );
            // 利用正则匹配
            filter = ele.style.filter.match(/progid:DXImageTransform.Microsoft.Alpha\(.?opacity=(.*).?\)/i) || ele.style.filter.match(/alpha\(opacity=(.*)\)/i);
            if (filter) {
                var value = parseFloat(filter);
                if (!isNaN(value)) {
                    // 转化为标准结果
                    ret = value ? value / 100 : 0;
                }
            }
            // 透明度的值默认返回 1
            ret = 1;
        } else if (style === 'float') {
            ret = ele.currentStyle.getAttribute("styleFloat");
        } else if ((style === 'width' || style === 'height') && (ele.currentStyle[style] === 'auto')) {
            // 取高宽使用 getBoundingClientRect
            let clientRect = ele.getBoundingClientRect();
            ret = (style === 'width' ? clientRect.right - clientRect.left : clientRect.bottom - clientRect.top) + "px";
        }
        // 其他样式，无需特殊处理
        ret = ele.currentStyle.getAttribute(style);
    }
    return ret;
}

/**
 * input元素选择兼容性处理
 * @param {*} id 可以为dom id 或class
 * @param {*} startPos 
 * @param {*} endPos 
 * @param {*} preSymbol 
 * @param {*} endSymbol 
 * @param {*} direction 
 */
function inputSelection(id, startPos, endPos, preSymbol, endSymbol, direction) {
    var $el = document.querySelector(id), val = $el.value;
  
    if (!$el.tagName === 'INPUT') return console.trace(':::the function is used to be input Element');
  
    $el.addEventListener('focus', function (e) {
      setTimeout(function () {
        sele($el)
      });
    });
  
    $el.addEventListener('click', function (e) {
      setTimeout(function () {
        sele($el)
      });
    });
  
    function sele($el) {
      if ($el.setSelectionRange) {
        startPos = startPos || 0;
        endPos = endPos || $el.value.length;
        direction = direction || 'forward';
        $el.setSelectionRange(startPos, endPos, direction);
      } else {
        console.trace(':::setSelectionRange不兼容该方法');
      }
    }
  }
