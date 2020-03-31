/**
 * 正则表达式：要么匹配字符，要么匹配位置
 * 
 * 贪婪：
 *  贪婪量词（{n,m}）(尽可能多匹配，如：{n,m}会匹配m个，不符合则尝试n个，期间会产生回溯)；
 * 
 * 惰性：
 *  惰性量词（?）(尽可能少的匹配, 期间可能产生回溯)；
 *  分支（a|b）(满足前面则停止匹配)
 * 
 * 简单总结就是，正因为有多种可能，所以要一个一个试。直到，要么到某一步时，整体匹配成功了；要么最后都试完后，发现整体匹配不成功。
 * 
 * 贪婪量词“试”的策略是：买衣服砍价。价钱太高了，便宜点，不行，再便宜点。
 * 
 * 惰性量词“试”的策略是：卖东西加价。给少了，再多给点行不，还有点少啊，再给点。
 * 
 * 分支结构“试”的策略是：货比三家。这家不行，换一家吧，还不行，再换。
 * 
 * 既然有回溯的过程，那么匹配效率肯定低一些。相对谁呢？
 * 
 * 相对那些DFA引擎。而JS的正则引擎是NFA，NFA是“非确定型有限自动机”的简写。
 * 
 * 大部分语言中的正则都是NFA，为啥它这么流行呢？
 * 
 * 答：你别看我匹配慢，但是我编译快啊，而且我还有趣哦。
 * 
 * 正则表达式捕获组:
 * 在 regex 中捕获组只是从 () 括号中提取一个模式，可以使用 /regex/.exec(string) 和string.match 捕捉组。
 * 常规捕获组是通过将模式包装在 (pattern) 中创建的，但是要在结果对象上创建 groups 属性，它是: (?<name>pattern)。
 * 要创建一个新的组名，只需在括号内附加 ?<name>，结果中，分组 (pattern) 匹配将成为 group.name，并附加到 match 对象，以下是一个实例：
 * 
 */

const regExpUitl = {
  idCard: '/^(\d{15}|\d{17}[\dxX])$/',
  ipv4: '/^((0{0,2}\d|0?\d{2}|1\d{2}|2[0-4]\d|25[0-5])\.){3}(0{0,2}\d|0?\d{2}|1\d{2}|2[0-4]\d|25[0-5])$/',
  // 密码长度6-12位，由数字、小写字符和大写字母组成，但必须至少包括2种字符
  pwd: '/(?!^[0-9]{6,12}$)(?!^[a-z]{6,12}$)(?!^[A-Z]{6,12}$)^[0-9A-Za-z]{6,12}$/',
  url: url => /^(http|https|ftp|\/\/)/.test(url),
  // 数字逗号
  comma(string = '', attr = 'g') {
    const reg = new RegExp(`(?!^)(?=(\\d{3})+$)`, attr)
    return string.replace(reg, ',')
  },
  // 多组数字添加逗号
  commaMutil(string = '', attr = 'g') {
    const reg = new RegExp(`(?!\\b)(?=(\\d{3})+\\b)`, attr)
    return string.replace(reg, ',')
  },
  // 密码长度6-12位，由数字、小写字符和大写字母组成，但必须至少包括2种字符
  pwd2(string = '') {
    const reg = new RegExp('(?!^[0-9]{6,12}$)(?!^[a-z]{6,12}$)(?!^[A-Z]{6,12}$)^[0-9a-zA-Z]{6,12}$')
    return reg.test(string)
  },
  // 密码长度6-12位，由数字、小写字符和大写字母组成
  pwd3(string = '') {
    const reg = new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])^[0-9a-zA-Z]{6,12}$')
    return reg.test(string)
  },
  // 格式化年月日-1, 指定原始格式
  ymd(string = '', from = '.', to = '-') {
    const reg = new RegExp(`(\\d{4})(${from})(\\d{2})\\2(\\d{2})`)
    return string.replace(reg, `$1${to}$3${to}$4`)
  },
  // 格式化年月日-2, 指定原始格式
  ymd(string = '', sym = '-') {
    const reg = new RegExp(`(\\d{4})([.\-\/\\\|])(\\d{2})\\2(\\d{2})`)
    return string.replace(reg, `$1${sym}$3${sym}$4`)
  },
  // 匹配时分秒
  hms(string = '') {
    const reg = new RegExp('^(0?\\d|1\\d|2[0-3]):(0?\\d|[1-5]\\d)$')
    return reg.test(string)
  },
  // 匹配 window 下 路径 格式：盘符:\文件夹\文件夹\文件夹\
  winPath(string = '') {
    const reg = new RegExp('^[a-zA-Z]:\\\\([^\\\\:*<>|\'\"\?\!\\r\\n\/]+\\\\)*([^\\\\:*<>|\'\"\?\!\\r\\n\/]+)?$')
    return reg.test(string)
  },
  // 匹配element指定内容
  elId(string = '', sym = 'id') {
    const reg = new RegExp(`${sym}="([^\"]*)"`, 'g')
    return string.match(reg)[1]
  },
  // 获取移动终端浏览器版本信息
  brower: (function () {
    var u = navigator.userAgent, dpr = window.devicePixelRatio,
      sw = window.screen.width, sh = window.screen.height;

    return {
      trident: ~u.indexOf('Trident') ? true : false,
      presto: ~u.indexOf('Presto') ? true : false,
      webKit: !!u.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
      gecko: ~u.indexOf('Gecko') && ~u.indexOf('KHTML') ? true : false,
      Symbian: ~u.indexOf('Symbian') ? true : false,
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? true : false,
      android: !u.indexOf('Android') || !u.indexOf('Linux') ? true : false,
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) ? true : false,
      iPhone: ~u.indexOf('iPhone') ? true : false,
      iPad: ~u.indexOf('iPad') ? true : false,
      osx: !!u.match(/\(Macintosh\; Intel /),
      iphoneXS: /iphone/gi.test(u) && ((dpr == 3 && sw == 375 && sh == 812)
        || (dpr == 3 && sw == 414 && sh == 896)
        || (dpr == 2 && sw == 414 && sh == 896)) ? true : false,
      wechat: /micromessenger/i.test(u),
      qq: /QQ\//i.test(u),
      weiBo: /WeiBo/i.test(u),
      Safari: /Safari/i.test(u),
      qqBrw: /MQQBrowser/i.test(u),
      win: /Win\d{2}|Windows/.test(u),
      wp: !!u.match(/Windows Phone ([\d.]+)/),
      webos: !!u.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
      touchpad: this.webos && !!u.match(/TouchPad/),
      kindle: !!u.match(/Kindle\/([\d.]+)/),
      silk: !!u.match(/Silk\/([\d._]+)/),
      blackberry: !!u.match(/(BlackBerry).*Version\/([\d.]+)/),
      bb10: !!u.match(/(BB10).*Version\/([\d.]+)/),
      rimtabletos: !!u.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
      playbook: !!u.match(/PlayBook/),
      chrome: !!u.match(/Chrome\/([\d.]+)/) || u.match(/CriOS\/([\d.]+)/),
      webview: !!u.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
      uc: ~u.indexOf("UBrowser") || ~u.indexOf("UCBrowser") ? true : false,
      firefox: !!u.match(/Firefox\/([\d.]+)/),
      firefoxos: !!u.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
      ie: !!u.match(/MSIE\s([\d.]+)/) || !!u.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
      edge: this.ie && ~u.indexOf('Edge') ? true : false,
      ieV: (function () {
        var isIE11 = ~u.indexOf('Trident') && ~u.indexOf('rv:11.0') ? true : false;
        if (this.ie) {
          var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
          reIE.test(u);
          var fIEVersion = parseFloat(RegExp['$1']);
          if (fIEVersion === 7) {
            return 7;
          } else if (fIEVersion === 8) {
            return 8;
          } else if (fIEVersion === 9) {
            return 9;
          } else if (fIEVersion === 10) {
            return 10;
          } else {
            return 6; // IE版本<=7
          }
        } else if (this.edge) {
          return 'edge'; // edge
        } else if (isIE11) {
          return 11; // IE11
        } else {
          return 0; // 不是ie浏览器
        }
      }())
    };
  }()),
  // 判断iphoneX series系列
  isIphoneXS() {
    const u = navigator.userAgent, dpr = window.devicePixelRatio, sw = window.screen.width, sh = window.screen.height;
    return /iphone/gi.test(u) && ((dpr == 3 && sw == 375 && sh == 812)
      || (dpr == 3 && sw == 414 && sh == 896)
      || (dpr == 2 && sw == 414 && sh == 896))
  },
  // 判断是否移动端
  isMobile: () => !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/),
  // 判断微信浏览器
  isWechat: () => navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1,
  // 验证手机格式
  isTel: (tel) => /(^[1][2,3,4,5,6,7,8,9][0-9]{9}$)|(^[2,8,6][0-9]{7}$)|(^[2,3,5,6,9][0-9]{7}$)/.test(tel),
  // 匹配QQ与TIM
  isQQ = () => {
    const u = navigator.userAgent
    let match = u.match(/QQ\//i)
    match = match ? match[0] : false
    return match == 'QQ/'
  },
  /**
   * 判断字符串是否含有中文
   */
  isZh: (str) => {
    var reg = /[^/u4e00-/u9fa5]/;
    if (reg.test(str)) {
      return true;
    } {
      return false;
    }
  },
  /**
   * 获取字符实际长度
   * 中文长度为2，英文长度为1
   */
  stringLen: (str) => {
    var len = str.length;
    var curr = 0;
    for (i = 0; i < len; i++) {
      if ((str.charCodeAt(i) & 0xff00) != 0) {
        curr++;
      }
      curr++;
    }
    return curr;
  }
}
