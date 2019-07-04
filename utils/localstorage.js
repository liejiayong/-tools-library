//判断浏览是否支持localStorage
function isLocalStorageSupport() {
  try {
    var isSupport = 'localStorage' in window && window['localStorage'] !== null;
    if (isSupport) {
      localStorage.setItem("local_storage_test", "1");
      localStorage.removeItem("local_storage_test");
    }
    return isSupport;
  } catch (e) {
    return false;
  }
}
//判断浏览器是否开启无痕模式
function isInPrivate() {
  try {
    localStorage.setItem("local_storage_test", "1");
    localStorage.removeItem("local_storage_test");
    return false;
  } catch (e) {
    return true;
  }
}

const localstorageUtil = {}
localstorageUtil.setItem = (a, b) => {
  let c
  try {
    window.localStorage.setItem(a, b)
  } catch (e) {
    console.log('ios localStorage not support', e)
    c = new Date()
    c.setTime(c.getTime() + 31536e6), (document.cookie = a + '=' + encodeURIComponent(b) + ';expires=' + c.toGMTString())
  }
}

/*
获取localStorage
*/
localstorageUtil.getItem = a => {
  let b
  try {
    return window.localStorage.getItem(a)
  } catch (e) {
    console.log('ios localStorage not support', e)
    b = document.cookie.match(new RegExp('(^| )' + a + '=([^;]*)(;|$)'))
    return null != b ? decodeURIComponent(b[2]) : null
  }
}

/*
删除localStorage
*/
localstorageUtil.removeItem = a => {
  let b, c
  try {
    window.localStorage.removeItem(a)
  } catch (e) {
    ((b = new Date()), b.setTime(b.getTime() - 1), (c = util.getItem(a)), null != c && (document.cookie = a + '=' + c + ';expires=' + b.toGMTString()))
  }
}