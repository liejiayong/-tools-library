// !function (t, e) { "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.ES6Promise = e() }(this, function () { "use strict"; function t(t) { var e = typeof t; return null !== t && ("object" === e || "function" === e) } function e(t) { return "function" == typeof t } function n(t) { W = t } function r(t) { z = t } function o() { return function () { return process.nextTick(a) } } function i() { return "undefined" != typeof U ? function () { U(a) } : c() } function s() { var t = 0, e = new H(a), n = document.createTextNode(""); return e.observe(n, { characterData: !0 }), function () { n.data = t = ++t % 2 } } function u() { var t = new MessageChannel; return t.port1.onmessage = a, function () { return t.port2.postMessage(0) } } function c() { var t = setTimeout; return function () { return t(a, 1) } } function a() { for (var t = 0; t < N; t += 2) { var e = Q[t], n = Q[t + 1]; e(n), Q[t] = void 0, Q[t + 1] = void 0 } N = 0 } function f() { try { var t = Function("return this")().require("vertx"); return U = t.runOnLoop || t.runOnContext, i() } catch (e) { return c() } } function l(t, e) { var n = this, r = new this.constructor(p); void 0 === r[V] && x(r); var o = n._state; if (o) { var i = arguments[o - 1]; z(function () { return T(o, r, i, n._result) }) } else j(n, r, t, e); return r } function h(t) { var e = this; if (t && "object" == typeof t && t.constructor === e) return t; var n = new e(p); return w(n, t), n } function p() { } function v() { return new TypeError("You cannot resolve a promise with itself") } function d() { return new TypeError("A promises callback cannot return that same promise.") } function _(t, e, n, r) { try { t.call(e, n, r) } catch (o) { return o } } function y(t, e, n) { z(function (t) { var r = !1, o = _(n, e, function (n) { r || (r = !0, e !== n ? w(t, n) : A(t, n)) }, function (e) { r || (r = !0, S(t, e)) }, "Settle: " + (t._label || " unknown promise")); !r && o && (r = !0, S(t, o)) }, t) } function m(t, e) { e._state === Z ? A(t, e._result) : e._state === $ ? S(t, e._result) : j(e, void 0, function (e) { return w(t, e) }, function (e) { return S(t, e) }) } function b(t, n, r) { n.constructor === t.constructor && r === l && n.constructor.resolve === h ? m(t, n) : void 0 === r ? A(t, n) : e(r) ? y(t, n, r) : A(t, n) } function w(e, n) { if (e === n) S(e, v()); else if (t(n)) { var r = void 0; try { r = n.then } catch (o) { return void S(e, o) } b(e, n, r) } else A(e, n) } function g(t) { t._onerror && t._onerror(t._result), E(t) } function A(t, e) { t._state === X && (t._result = e, t._state = Z, 0 !== t._subscribers.length && z(E, t)) } function S(t, e) { t._state === X && (t._state = $, t._result = e, z(g, t)) } function j(t, e, n, r) { var o = t._subscribers, i = o.length; t._onerror = null, o[i] = e, o[i + Z] = n, o[i + $] = r, 0 === i && t._state && z(E, t) } function E(t) { var e = t._subscribers, n = t._state; if (0 !== e.length) { for (var r = void 0, o = void 0, i = t._result, s = 0; s < e.length; s += 3)r = e[s], o = e[s + n], r ? T(n, r, o, i) : o(i); t._subscribers.length = 0 } } function T(t, n, r, o) { var i = e(r), s = void 0, u = void 0, c = !0; if (i) { try { s = r(o) } catch (a) { c = !1, u = a } if (n === s) return void S(n, d()) } else s = o; n._state !== X || (i && c ? w(n, s) : c === !1 ? S(n, u) : t === Z ? A(n, s) : t === $ && S(n, s)) } function M(t, e) { try { e(function (e) { w(t, e) }, function (e) { S(t, e) }) } catch (n) { S(t, n) } } function P() { return tt++ } function x(t) { t[V] = tt++ , t._state = void 0, t._result = void 0, t._subscribers = [] } function C() { return new Error("Array Methods must be provided an Array") } function O(t) { return new et(this, t).promise } function k(t) { var e = this; return new e(L(t) ? function (n, r) { for (var o = t.length, i = 0; i < o; i++)e.resolve(t[i]).then(n, r) } : function (t, e) { return e(new TypeError("You must pass an array to race.")) }) } function F(t) { var e = this, n = new e(p); return S(n, t), n } function Y() { throw new TypeError("You must pass a resolver function as the first argument to the promise constructor") } function q() { throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.") } function D() { var t = void 0; if ("undefined" != typeof global) t = global; else if ("undefined" != typeof self) t = self; else try { t = Function("return this")() } catch (e) { throw new Error("polyfill failed because global object is unavailable in this environment") } var n = t.Promise; if (n) { var r = null; try { r = Object.prototype.toString.call(n.resolve()) } catch (e) { } if ("[object Promise]" === r && !n.cast) return } t.Promise = nt } var K = void 0; K = Array.isArray ? Array.isArray : function (t) { return "[object Array]" === Object.prototype.toString.call(t) }; var L = K, N = 0, U = void 0, W = void 0, z = function (t, e) { Q[N] = t, Q[N + 1] = e, N += 2, 2 === N && (W ? W(a) : R()) }, B = "undefined" != typeof window ? window : void 0, G = B || {}, H = G.MutationObserver || G.WebKitMutationObserver, I = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process), J = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel, Q = new Array(1e3), R = void 0; R = I ? o() : H ? s() : J ? u() : void 0 === B && "function" == typeof require ? f() : c(); var V = Math.random().toString(36).substring(2), X = void 0, Z = 1, $ = 2, tt = 0, et = function () { function t(t, e) { this._instanceConstructor = t, this.promise = new t(p), this.promise[V] || x(this.promise), L(e) ? (this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? A(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(e), 0 === this._remaining && A(this.promise, this._result))) : S(this.promise, C()) } return t.prototype._enumerate = function (t) { for (var e = 0; this._state === X && e < t.length; e++)this._eachEntry(t[e], e) }, t.prototype._eachEntry = function (t, e) { var n = this._instanceConstructor, r = n.resolve; if (r === h) { var o = void 0, i = void 0, s = !1; try { o = t.then } catch (u) { s = !0, i = u } if (o === l && t._state !== X) this._settledAt(t._state, e, t._result); else if ("function" != typeof o) this._remaining-- , this._result[e] = t; else if (n === nt) { var c = new n(p); s ? S(c, i) : b(c, t, o), this._willSettleAt(c, e) } else this._willSettleAt(new n(function (e) { return e(t) }), e) } else this._willSettleAt(r(t), e) }, t.prototype._settledAt = function (t, e, n) { var r = this.promise; r._state === X && (this._remaining-- , t === $ ? S(r, n) : this._result[e] = n), 0 === this._remaining && A(r, this._result) }, t.prototype._willSettleAt = function (t, e) { var n = this; j(t, void 0, function (t) { return n._settledAt(Z, e, t) }, function (t) { return n._settledAt($, e, t) }) }, t }(), nt = function () { function t(e) { this[V] = P(), this._result = this._state = void 0, this._subscribers = [], p !== e && ("function" != typeof e && Y(), this instanceof t ? M(this, e) : q()) } return t.prototype["catch"] = function (t) { return this.then(null, t) }, t.prototype["finally"] = function (t) { var n = this, r = n.constructor; return e(t) ? n.then(function (e) { return r.resolve(t()).then(function () { return e }) }, function (e) { return r.resolve(t()).then(function () { throw e }) }) : n.then(t, t) }, t }(); return nt.prototype.then = l, nt.all = O, nt.race = k, nt.resolve = h, nt.reject = F, nt._setScheduler = n, nt._setAsap = r, nt._asap = z, nt.polyfill = D, nt.Promise = nt, nt.polyfill(), nt });
// var eventTarget; var supportTouch = "ontouchstart" in window; if (!document.createTouch) { document.createTouch = function (view, target, identifier, pageX, pageY, screenX, screenY) { return new Touch(target, identifier, { pageX: pageX, pageY: pageY, screenX: screenX, screenY: screenY, clientX: pageX - window.pageXOffset, clientY: pageY - window.pageYOffset }, 0, 0) } } if (!document.createTouchList) { document.createTouchList = function () { var touchList = TouchList(); for (var i = 0; i < arguments.length; i++) { touchList[i] = arguments[i] } touchList.length = arguments.length; return touchList } } var Touch = function Touch(target, identifier, pos, deltaX, deltaY) { deltaX = deltaX || 0; deltaY = deltaY || 0; this.identifier = identifier; this.target = target; this.clientX = pos.clientX + deltaX; this.clientY = pos.clientY + deltaY; this.screenX = pos.screenX + deltaX; this.screenY = pos.screenY + deltaY; this.pageX = pos.pageX + deltaX; this.pageY = pos.pageY + deltaY }; function TouchList() { var touchList = []; touchList["item"] = function (index) { return this[index] || null }; touchList["identifiedTouch"] = function (id) { return this[id + 1] || null }; return touchList } function fakeTouchSupport() { var objs = [window, document.documentElement]; var props = ["ontouchstart", "ontouchmove", "ontouchcancel", "ontouchend"]; for (var o = 0; o < objs.length; o++) { for (var p = 0; p < props.length; p++) { if (objs[o] && objs[o][props[p]] === undefined) { objs[o][props[p]] = null } } } } function onMouse(touchType) { return function (ev) { if (ev.which !== 1) { return } if (ev.type === "mousedown" || !eventTarget || eventTarget && !eventTarget.dispatchEvent) { eventTarget = ev.target } triggerTouch(touchType, ev); if (ev.type === "mouseup") { eventTarget = null } } } function triggerTouch(eventName, mouseEv) { var touchEvent = document.createEvent("Event"); touchEvent.initEvent(eventName, true, true); touchEvent.altKey = mouseEv.altKey; touchEvent.ctrlKey = mouseEv.ctrlKey; touchEvent.metaKey = mouseEv.metaKey; touchEvent.shiftKey = mouseEv.shiftKey; touchEvent.touches = getActiveTouches(mouseEv); touchEvent.targetTouches = getActiveTouches(mouseEv); touchEvent.changedTouches = createTouchList(mouseEv); eventTarget.dispatchEvent(touchEvent) } function createTouchList(mouseEv) { var touchList = TouchList(); touchList.push(new Touch(eventTarget, 1, mouseEv, 0, 0)); return touchList } function getActiveTouches(mouseEv) { if (mouseEv.type === "mouseup") { return TouchList() } return createTouchList(mouseEv) } function TouchEmulator() { fakeTouchSupport(); window.addEventListener("mousedown", onMouse("touchstart"), true); window.addEventListener("mousemove", onMouse("touchmove"), true); window.addEventListener("mouseup", onMouse("touchend"), true) } TouchEmulator["multiTouchOffset"] = 75; if (!supportTouch) { new TouchEmulator() };

/**
 * canvas 刮刮卡
 * 支持ie9及以上浏览器
 * 
 * canvas 设置this.ctx.scale(scale, scale)之后，canvas上像素图像的坐标位置及长宽会根据scale倍数来缩放图像。
 * 本做法用来适配移动端的高清屏，在pc端时pixelRatio默认为像素 1，无需手动设置；在移动端时，图片需设置则可按需设置，刮刮卡封面图片的长宽原则根据 width = canvas的width * pixelRatio，height = canvas 的height * pixelRatio即可
 * 
 * 存在问题，当鼠标移开canvas元素后，touchend事件 与touchleave事件没有正常触发，在解决中
 * 
 * author: liejiayong(809206619@qq.com)
 * version: 0.1.0
 */

// import './lib/Promise.ployfill.js'
import '../lib/simulateTouch.js'

export default class CanvasScraping {
	constructor(element = null, config) {
		const DEFAULT_CONFIG = {
			width: 300, // canvas 宽
			height: 150, // canvas 高
			awardImg: '', // 奖品图片
			coverImg: '', // 覆盖层图片
			coverColor: '#ccc', // 纯色覆盖层
			radius: 20, // 擦除手势半径
			pixelRatio: 1, // 屏幕倍数
			duration: 2000, // 展现全部的淡出效果时间（ms）
			percent: 60, // 刮开面积 占 整张刮卡的百分比
			doneCallback: () => { console.log('done') }, // 全部刮开回调
			awardCssText: '', // 奖品图片样式
			unit: 'px', // 宽高css单位
			containerClass: 'scraping-container', // 装载刮卡的父元素类名
			mode: 'default' // 刮刮卡刮开卡片模式。default:默认模式，一个个像素点刮开；sector:快速模式，以鼠标按下点开始到结束点形成扇形消除像素
		}
		this.config = this._extend(DEFAULT_CONFIG, config)
		this.ctx = null // canvas画板对象
		this.isDown = false // 手指按下
		this.done = false // 是否清除刮刮卡图层
		this.width = 0 // canvas width
		this.height = 0 // canvas height
		this.offsetTop = 0
		this.offsetLeft = 0

		const pixelRatio = this.config.pixelRatio > 1 ? this.config.pixelRatio : 1
		this.pixelRatio = pixelRatio
		this.scale = 1 / pixelRatio

		this.el = element // canvas元素挂载点
		this.container = null // 装载刮卡的父元素

		this._init()
	}
	/**
	 * 清除覆盖层所有像素,支持动画消除
	 */
	clear() {
		const { duration } = this.config
		if (duration >= 0) {
			// 先使用CSS opacity清除，再使用canvas清除
			const transition = this._preStyle('transition')
			const canvas = this.ctx.canvas
			canvas.style[transition] = `all ${duration / 1000}s linear`
			canvas.style.opacity = '0'
			setTimeout(() => {
				this._clearAll()
			}, duration)
		} else {
			this._clearAll()
		}
	}
	/**
	 * 清除覆盖层所有像素，无动画直接清除
	 */
	_clearAll() {
		this.ctx.fillRect(0, 0, this.width, this.height)
		this.done = false
		this.config.doneCallback()
	}
	/**
	 * 设置背景图
	 */
	setBG(url = '') {
		if (!url) return new Error('not found picture url for load.')

		this._loadImg(url).then(({ width, height, image }) => {
			let cw = this.width,
				ch = this.height,
				top = 0,
				left = 0

			if (this.pixelRatio !== 1) {
				const scale = this.scale,
					sw = width * scale,
					sh = height * scale

				left = (cw - sw) / 2 / scale
				top = (ch - sh) / 2 / scale
				this.ctx.scale(scale, scale)
			} else {
				left = (cw - width) / 2
				top = (ch - height) / 2
			}

			this.ctx.drawImage(image, left, top, width, height)
		})
	}
	/**
	 * 设置奖品图片
	 */
	setAward(url = this.config.awardImg) {
		this.container.style.backgroundImage = `url("${url}")`
	}
	/**
	 * 设置刮刮卡封面
	 */
	setCover(url = this.config.coverImg) {
		// 图层背景
		if (url) {
			this.setBG(url)
		} else {
			// 如果没设置图片涂层，则使用纯色涂层
			this.ctx.fillStyle = this.config.coverColor;
			this.ctx.fillRect(0, 0, this.width, this.height);
		}
	}
	/**
	 * 初始化
	 */
	_init() {
		if (!this.el) return new Error('the.el is not found.')
		this._createAward()
		this._createCanvas()
		this._event()
		this.setCover()
	}
	/**
	 * 创建奖品DOM
	 */
	_createAward() {
		const parentEl = document.createElement('div')
		let { awardCssText, width, height, unit, containerClass } = this.config

		awardCssText += `;width:${width}${unit};height:${height}${unit};background: url("") no-repeat center / contain;`
		parentEl.style.cssText = awardCssText
		parentEl.className = containerClass

		this.el.appendChild(parentEl)
		this.container = parentEl
	}
	/**
	 * 创建canvas
	 */
	_createCanvas() {
		const canvas = document.createElement('canvas')
		canvas.innerText = '浏览器版本过低，请使用最新版本浏览器进行浏览！'
		this.container.appendChild(canvas)

		const { width, height } = this.config
		let cw = 0,
			ch = 0

		const b = this.container.getBoundingClientRect()
		this.offsetLeft = b.left
		this.offsetTop = b.top
		if (width && height) {
			cw = width
			ch = height
		} else {
			cw = b.width
			ch = b.height
		}

		this.width = canvas.width = cw
		this.height = canvas.height = ch
		this.ctx = canvas.getContext('2d')

		canvas.style.cssText = `;width:initial;height:initial;`
	}
	_drawPoint({ x = 0, y = 0, radius = 0 }) {
		if (this.config.mode !== 'sector') this.ctx.beginPath()
		this.ctx.arc(x, y, radius, 0, 2 * Math.PI)
		this.ctx.fill()
	}
	_pixelPercent() {
		const pixelData = this.ctx.getImageData(0, 0, this.width, this.height).data, pixelLen = pixelData.length
		let transPixels = []
		for (let i = 0; i < pixelLen; i += 4) {
			if (pixelData[i + 3] < 128) {
				transPixels.push(pixelData[i + 3]);
			}
		}
		return (transPixels.length / (pixelLen / 4) * 100).toFixed(2)
	}
	_getPostion(touches) {
		if (!touches || (touches && !touches.clientX)) return { x: 0, y: 0, radius: 0 }

		const { pixelRatio, radius } = this.config
		let x = (touches.clientX + document.body.scrollLeft || touches.pageX) - this.offsetLeft || 0,
			y = (touches.clientY + document.body.scrollTop || touches.pageY) - this.offsetTop || 0

		x = x * pixelRatio
		y = y * pixelRatio
		return { x, y, radius }
	}
	_judgeArea() {
		const percent = this.config.percent
		const currPercent = this._pixelPercent()

		if (currPercent >= percent) {
			this.done = true
			this.clear()
		}
	}
	_preStyle(style) {
		var el = document.createElement('div');

		var vendor = (function () {
			var transformName = {
				webkit: 'webkitTransform',
				Moz: 'MozTransform',
				O: 'OTransform',
				ms: 'msTransform',
				standard: 'transform'
			};
			for (var key in transformName) {
				if (el[key] !== 'undefined') {
					return key;
				}
			}
			return false;
		})();

		if (vendor === false) {
			return false;
		}

		if (vendor === 'standard') {
			return style;
		}

		return vendor + style.charAt(0).toUpperCase() + style.substr(1);
	}
	_extend(defOption, extOption) {
		if ('assign' in Object) {
			return Object.assign(defOption, extOption)
		}

		for (let key in extOption) {
			if (defOption[key]) {
				defOption[key] = extOption[key];
			}
		}
		return defOption;
	}
	/**
	 * 加载背景图
	 */
	_loadImg(url = '') {
		return new Promise((resolve, reject) => {
			try {
				var img = new Image()
				img.setAttribute('crossorigin', 'anonymous')
				img.src = url
				img.onload = () => {
					resolve({
						image: img,
						width: img.width,
						height: img.height
					})
				}
				img.onerror = () => reject(new Error('Image loading fail.'))
			} catch (error) {
				reject(error)
			}
		})
	}
	/**
	 * add event
	 */
	_event() {
		this.ctx.canvas.addEventListener('touchstart', this._eventDown.bind(this), { passive: false })
		this.ctx.canvas.addEventListener('touchmove', this._eventMove.bind(this), { passive: false })
		this.ctx.canvas.addEventListener('touchend', this._eventUp.bind(this), { passive: false })
		this.ctx.canvas.addEventListener('touchcancel', this._eventUp.bind(this), { passive: false })
		this.ctx.canvas.addEventListener('touchleave', () => this._eventUp.bind(this), { passive: false })
	}
	_eventUp(e) {
		e.preventDefault()
		this.isDown = false
		this.ctx.restore()
	}
	_eventDown(e) {
		e.preventDefault()
		this.ctx.save()
		if (this.config.mode === 'sector') this.ctx.beginPath()
		this.ctx.globalCompositeOperation = 'destination-out'
		this.isDown = true
	}
	_eventMove(e) {
		e.preventDefault()
		if (this.isDown && !this.done) {
			const { x, y, radius } = this._getPostion(e.changedTouches[0])
			this._drawPoint({ x, y, radius })
			this._judgeArea()
		}
	}
}
