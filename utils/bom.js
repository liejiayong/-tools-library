/**
 *  此文件下主要是针对浏览器上各种操作的工具函数
 */

/**
 * brower添加url收藏
 * @param {*} sURL window.location
 * @param {*} title 标题
 */
function addFavorite(sURL, title) {
	sURL = sURL || window.location
	title = title || document.title

	try {
		window.external.addFavorite(sURL, title)
	} catch (e) {
		try {
			window.sidebar.addPanel(title, sURL, '')
		} catch (e) {
			alert('加入收藏失败，请使用Ctrl+D进行添加')
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
	url = url || window.location.url

	try {
		brower.style.behavior = 'url(#default#homepage)'
		brower.setHomePage(url)
	} catch (e) {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect')
			} catch (e) {
				alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。")
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch)
			prefs.setCharPref('browser.startup.homepage', url)
		}
	}
}

/**
 * 获取url参数（第一种）
 * @param {*} name
 * @param {*} origin
 */

export function getUrlParam(name, origin = null) {
	let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
	let r = null
	if (origin == null) {
		r = window.location.search.substr(1).match(reg)
	} else {
		r = origin.substr(1).match(reg)
	}
	if (r != null) return decodeURIComponent(r[2])
	return null
}

/**
 * 获取url参数（第二种）
 * @param {*} name
 * @param {*} origin
 */
export function getUrlParams(name, origin = null) {
	let url = location.href
	let temp1 = url.split('?')
	let pram = temp1[1]
	let keyValue = pram.split('&')
	let obj = {}
	for (let i = 0; i < keyValue.length; i++) {
		let item = keyValue[i].split('=')
		let key = item[0]
		let value = item[1]
		obj[key] = value
	}
	return obj[name]
}

/**
 * 修改url中的参数
 * @param { string } paramName
 * @param { string } replaceWith
 */
export function replaceParamVal(paramName, replaceWith) {
	var oUrl = location.href.toString()
	var re = eval('/(' + paramName + '=)([^&]*)/gi')
	location.href = oUrl.replace(re, paramName + '=' + replaceWith)
	return location.href
}

/**
 * 删除url中指定的参数
 * @param { string } name
 */
export function funcUrlDel(name) {
	var loca = location
	var baseUrl = loca.origin + loca.pathname + '?'
	var query = loca.search.substr(1)
	if (query.indexOf(name) > -1) {
		var obj = {}
		var arr = query.split('&')
		for (var i = 0; i < arr.length; i++) {
			arr[i] = arr[i].split('=')
			obj[arr[i][0]] = arr[i][1]
		}
		delete obj[name]
		var url =
			baseUrl +
			JSON.stringify(obj)
				.replace(/[\"\{\}]/g, '')
				.replace(/\:/g, '=')
				.replace(/\,/g, '&')
		return url
	}
}

/**
 * 获取全部url参数,并转换成json对象
 * @param { string } url
 */
export function getUrlAllParams(url) {
	var url = url ? url : window.location.href
	var _pa = url.substring(url.indexOf('?') + 1),
		_arrS = _pa.split('&'),
		_rs = {}
	for (var i = 0, _len = _arrS.length; i < _len; i++) {
		var pos = _arrS[i].indexOf('=')
		if (pos == -1) {
			continue
		}
		var name = _arrS[i].substring(0, pos),
			value = window.decodeURIComponent(_arrS[i].substring(pos + 1))
		_rs[name] = value
	}
	return _rs
}

export const winFulllScreen = {
	/**
	 * 开启全屏
	 * @param {*} element
	 */
	request: function(element) {
		if (element.requestFullscreen) {
			element.requestFullscreen()
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen()
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen()
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullScreen()
		}
	},
	/**
	 *  关闭全屏
	 */
	cancel: function() {
		if (document.exitFullscreen) {
			document.exitFullscreen()
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen()
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen()
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen()
		}
	}
}

/**
 * http跳转https
 */
export const httpsRedirect = () => {
	if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1])
}

/**
 * 获取当前浏览器名称
 */
export const getExplorerName = () => {
	const userAgent = window.navigator.userAgent
	const isExplorer = exp => {
		return userAgent.indexOf(exp) > -1
	}
	if (isExplorer('MSIE')) return 'IE'
	else if (isExplorer('Firefox')) return 'Firefox'
	else if (isExplorer('Chrome')) return 'Chrome'
	else if (isExplorer('Opera')) return 'Opera'
	else if (isExplorer('Safari')) return 'Safari'
}

/**
 * 禁止鼠标右键、选择、复制
 */
export const contextmenuBan = () => {
	;['contextmenu', 'selectstart', 'copy'].forEach(function(ev) {
		document.addEventListener(ev, function(event) {
			return (event.returnValue = false)
		})
	})
}

/**
 * 打开一个窗口
 * @param { string } url
 * @param { string } windowName
 * @param { number } width
 * @param { number } height
 */
export function openWindow(url, windowName, width, height) {
	var x = parseInt(screen.width / 2.0) - width / 2.0
	var y = parseInt(screen.height / 2.0) - height / 2.0
	var isMSIE = navigator.appName == 'Microsoft Internet Explorer'
	if (isMSIE) {
		var p = 'resizable=1,location=no,scrollbars=no,width='
		p = p + width
		p = p + ',height='
		p = p + height
		p = p + ',left='
		p = p + x
		p = p + ',top='
		p = p + y
		window.open(url, windowName, p)
	} else {
		var win = window.open(url, 'ZyiisPopup', 'top=' + y + ',left=' + x + ',scrollbars=' + scrollbars + ',dialog=yes,modal=yes,width=' + width + ',height=' + height + ',resizable=no')
		eval('try { win.resizeTo(width, height); } catch(e) { }')
		win.focus()
	}
}

/**
 * 检查页面底部是否可见
 */
export const bottomVisible = () => {
	return document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight)
}

/**
 * 返回当前滚动条位置
 */
export const getScrollPosition = (el = window) => ({
	x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
	y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
})

/**
 * 获取窗口尺寸
 */
export function getViewportOffset() {
	if (window.innerWidth) {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	} else {
		// ie8及其以下
		if (document.compatMode === 'BackCompat') {
			// 怪异模式
			return {
				width: document.body.clientWidth,
				height: document.body.clientHeight
			}
		} else {
			// 标准模式
			return {
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight
			}
		}
	}
}

/**
 * 获取文档尺寸
 */
export function getDocBoundingRect() {
	var doc = document,
		width,
		height,
		scrollTop,
		scrollLeft

	if (document.compatMode === 'BackCompat') {
		width = doc.body.clientWidth
		height = doc.body.clientHeight
		scrollTop = doc.body.scrollTop
		scrollLeft = doc.body.scrollLeft
	} else {
		width = doc.documentElement.clientWidth
		height = doc.documentElement.clientHeight
		scrollTop = doc.documentElement.scrollTop
		scrollLeft = doc.documentElement.scrollLeft
	}

	return {
		documentWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth, document.documentElement.clientWidth),
		width: width,
		height: height,
		scrollTop: scrollTop,
		scrollLeft: scrollLeft
	}
}
