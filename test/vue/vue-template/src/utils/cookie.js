
const cookie = {
  setItem(a, b) {
    let c;
    c = new Date();
    c.setTime(c.getTime() + 31536e6), (document.cookie = a + '=' + encodeURIComponent(b) + ';expires=' + c.toGMTString());
  },
  getItem(a) {
    let b;
    b = document.cookie.match(new RegExp('(^| )' + a + '=([^;]*)(;|$)'));
    return null != b ? decodeURIComponent(b[2]) : null;
  },
  removeItem(a) {
    let b, c;
    ((b = new Date()), b.setTime(b.getTime() - 1), (c = this.getItem(a)), null != c && (document.cookie = a + '=' + c + ';expires=' + b.toGMTString()));
  },
  clear() {

  }
};

export default cookie;
