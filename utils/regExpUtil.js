const regExpUitl = {
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
  // 获取ie版本
  iev() {
    const userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
    const isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
    const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    if (isIE) {
      const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
      reIE.test(userAgent);
      const fIEVersion = parseFloat(RegExp['$1']);
      if (fIEVersion === 7) {
        return 7;
      } else if (fIEVersion === 8) {
        return 8;
      } else if (fIEVersion === 9) {
        return 9;
      } else if (fIEVersion === 10) {
        return 10;
      } else {
        return 6;// IE版本<=7
      }
    } else if (isEdge) {
      return 'edge';// edge
    } else if (isIE11) {
      return 11; // IE11
    } else {
      return -1;// 不是ie浏览器
    }
  },
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
}