/*
 * Description: 解决 移动端中 ios 与 andorid 在输入法弹窗和收回时input元素与texture元素的兼容性问题 
                解决键盘弹出后挡表单的问题
 * version: 0.1.0
 * Author: liejiayong(809206619@qq.com)
 * Date: 2019-09-25 09:52:00
 * LastEditors: liejiayong(809206619@qq.com)
 * LastEditTime: 2019-09-26 15:38:56
 */

const u = navigator.userAgent
const isMobile = !!u.match(/AppleWebKit.*Mobile.*/) // 移动终端
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios 终端
const isAndroid = /(Android)/i.test(u) // android 终端
let CONFiG_DURATION = 50 // 延迟时间
function getClientHeight() {
	return document.documentElement.clientHeight || document.body.clientHeight
}
function activeElementScrollIntoView(el) {
	if (el) {
		el.scrollIntoViewIfNeeded()
		el.scrollIntoView()
		return
	}
	if ('scrollIntoViewIfNeeded' in document.activeElement) {
		document.activeElement.scrollIntoViewIfNeeded()
	} else {
		document.activeElement.scrollIntoView()
	}
}
/**
 * 兼容移动终端，ios 与 android Input 元素 在输入法 不回弹 或不移动到可视界面的问题
 * element 可为 input 或texture
 */
export function inputReset(element = 'input', duration = CONFiG_DURATION) {
	CONFiG_DURATION = duration
	;[].forEach.call(document.querySelectorAll(element), function(el) {
		if (isMobile) {
			// ios and android 输入法统一弹出处理
			el.addEventListener('focus', function() {
				console.log('ios or android focus')
				activeElementScrollIntoView(el)
			})
			// element 触发 blur 事件 收起输入法
			el.addEventListener('blur', function() {
				if (isIOS) {
					blurResetForIOS()
				}
			})
			if (isAndroid) {
				blurResetForAndroid()
			}
		}
	})
}

// ios 回弹
function blurResetForIOS() {
	setTimeout(() => {
		const activeTag = document.activeElement.tagName.toUpperCase()
		if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return
		console.log('ios blur')
		activeElementScrollIntoView()
	}, CONFiG_DURATION)
}

// android 回弹
function blurResetForAndroid() {
	const originHeight = getClientHeight()
	window.addEventListener('resize', function() {
		var currHeight = getClientHeight()
		if (currHeight < originHeight) {
			console.log('android up')
			// 键盘弹起所后所需的页面逻辑
			setTimeout(function() {
				activeElementScrollIntoView()
			}, CONFiG_DURATION)
		} else {
			console.log('android down')
			// 键盘收起所后所需的页面逻辑
		}
	})
}
