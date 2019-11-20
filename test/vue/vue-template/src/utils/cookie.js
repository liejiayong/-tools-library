
// 判断浏览是否支持localStorage
export const isSupport = (function () {
  try {
    var isSupport = 'localStorage' in window && window['localStorage'] !== null;
    if (isSupport) {
      localStorage.setItem("local_storage_is_test", "1");
      localStorage.removeItem("local_storage_is_test");
    }
    return isSupport;
  } catch (e) {
    return false;
  }
}());

// 判断浏览器是否开启无痕模式
export const isPrivate = (function () {
  try {
    localStorage.setItem("local_storage_is_private", "1");
    localStorage.removeItem("local_storage_is_private");
    return false;
  } catch (e) {
    return true;
  }
}());

function log() {
  console.log(`Your brower is compatible width localStorage state: ${isSupport}`);
  console.log(`Whether your brower's localStorage is enabled in incognito mode: ${isPrivate}`);
}

export default {
  setItem(a, b) {
    let c;
    try {
      window.localStorage.setItem(a, b);
    } catch (e) {
      c = new Date();
      c.setTime(c.getTime() + 31536e6), (document.cookie = a + '=' + encodeURIComponent(b) + ';expires=' + c.toGMTString());
    }
    log();
  },
  getItem(a) {
    log();

    let b;
    try {
      return window.localStorage.getItem(a);
    } catch (e) {
      b = document.cookie.match(new RegExp('(^| )' + a + '=([^;]*)(;|$)'));
      return null != b ? decodeURIComponent(b[2]) : null;
    }
  },
  removeItem(a) {
    let b, c;
    try {
      window.localStorage.removeItem(a);
    } catch (e) {
      ((b = new Date()), b.setTime(b.getTime() - 1), (c = this.getItem(a)), null != c && (document.cookie = a + '=' + c + ';expires=' + b.toGMTString()));
    }
    log();
  },
  clear() {
    try {
      window.localStorage.clear();
    } catch (e) {
      log();
    }
  }
};
