/**
 * brower添加url收藏
 * @param {*} sURL window.location
 * @param {*} title 标题
 */
function addFavorite(sURL, title) {
  sURL = sURL || window.location;
  title = title || document.title;

  try {
    window.external.addFavorite(sURL, title);
  } catch (e) {
    try {
      window.sidebar.addPanel(title, sURL, "");
    } catch (e) {
      alert("加入收藏失败，请使用Ctrl+D进行添加");
    }
  }
}

/**
 * 浏览器设置首页
 * @param {*} brower 浏览器对象
 * @param {*} url 被设置为首页的url
 */
function setHome(brower, url) {
  //debugger;
  //谷歌下url为数组对象非字符串
  url = url || window.location.url;

  try {
    brower.style.behavior = 'url(#default#homepage)';
    brower.setHomePage(url);
  } catch (e) {
    if (window.netscape) {
      try {
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
      } catch (e) {
        alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
      }
      var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
      prefs.setCharPref('browser.startup.homepage', url);
    }
  }
}