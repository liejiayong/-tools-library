/**
 * canvas 刮刮卡
 * 支持ie9及以上浏览器
 *
 * canvas 设置this.ctx.scale(scale, scale)之后，canvas上像素图像的坐标位置及长宽会根据scale倍数来缩放图像。
 * 本做法用来适配移动端的高清屏，在pc端时pixelRatio默认为像素 1，无需手动设置；在移动端时，图片需设置则可按需设置，刮刮卡封面图片的长宽原则根据 width = canvas的width * pixelRatio，height = canvas 的height * pixelRatio即可
 * 支持加锁解锁
 * 支持复位
 * 支持随机设置奖品与覆盖面
 *
 * 存在问题，当鼠标移开canvas元素后，touchend事件 与touchleave事件没有正常触发，在解决中
 *
 * author: liejiayong(809206619@qq.com)
 *
 */
"use strict"

require('@/lib/simulateTouch.js')
var pkg = require('@/package.json')

class CanvasScraping {
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
			onReady: function () { console.log('ready') },
			doneCallback: () => { console.log('done') }, // 全部刮开回调
			awardCssText: '', // 奖品图片样式
			unit: 'px', // 宽高css单位
			containerClass: 'scraping-container', // 装载刮卡的父元素类名
			mode: 'default' // 刮刮卡刮开卡片模式。default:默认模式，一个个像素点刮开；sector:快速模式，以鼠标按下点开始到结束点形成扇形消除像素
		}
		this.version = pkg.version
		this.config = this._extend(DEFAULT_CONFIG, config)
		this.ctx = null // canvas画板对象
		this.isDown = false // 手指按下
		this.done = false // 是否清除刮刮卡图层
		this.width = 0 // canvas width
		this.height = 0 // canvas height
		this.offsetTop = 0
		this.offsetLeft = 0
		this.lock = true // 锁住不能刮
		this.first = true

		const pixelRatio = this.config.pixelRatio > 1 ? this.config.pixelRatio : 1
		this.pixelRatio = pixelRatio
		this.scale = 1 / pixelRatio

		this.el = element // canvas元素挂载点
		this.container = null // 装载刮卡的父元素

		this._init()
	}
	_readyCB() {
		if (!this.first) return
		this.first = false
		this.config.onReady()
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
		this.lock = true
		this.config.doneCallback()
		const transition = this._preStyle('transition')
		this.ctx.canvas.style[transition] = 'none'
	}
	setLock(lock) {
		if (typeof lock !== "boolean") return new Error(' the paramtar must be Boolean false or true')
		this.lock = lock
	}
	reset() {
		this.lock = false
		this.first = true
		this.setCover()
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

			this.ctx.save()
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

			this.ctx.globalCompositeOperation = 'source-over'
			this.ctx.drawImage(image, left, top, width, height)
			this.ctx.restore()
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
		this.ctx.canvas.style.opacity = '1'

		// 图层背景
		if (url) {
			this.setBG(url)
		} else {
			// 如果没设置图片涂层，则使用纯色涂层
			this.ctx.save()
			this.ctx.globalCompositeOperation = 'source-over'
			this.ctx.fillStyle = this.config.coverColor;
			this.ctx.fillRect(0, 0, this.width, this.height)
			this.ctx.restore()
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
		canvas.style.cssText = `;width:initial;height:initial;`
		this.container.appendChild(canvas)

		const { width, height } = this.config
		let cw = 0,
			ch = 0


		if (width && height) {
			cw = width
			ch = height
		} else {
			const b = this.container.getBoundingClientRect()
			cw = b.width
			ch = b.height
		}

		this.width = canvas.width = cw
		this.height = canvas.height = ch
		this.ctx = canvas.getContext('2d')
		this.ctx.fillStyle = this.config.coverColor
		this._resetBounding()
	}
	_resetBounding() {
		const b = this.container.getBoundingClientRect()
		this.offsetLeft = b.left
		this.offsetTop = b.top
		// console.log('getBoundingClientRect', b, this.offsetLeft, this.offsetTop)
	}
	_drawPoint({ x = 0, y = 0, radius = 0 }) {
		this.ctx.save()
		this.ctx.globalCompositeOperation = 'destination-out'
		const scale = this.scale
		this.ctx.scale(scale, scale)
		if (this.config.mode !== 'sector') this.ctx.beginPath()
		this.ctx.arc(x, y, radius, 0, 2 * Math.PI)
		this.ctx.fill()
		this.ctx.restore()
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
		// let x = (touches.clientX + document.body.scrollLeft || touches.pageX) - this.offsetLeft || 0,
		// y = (touches.clientY + document.body.scrollTop || touches.pageY) - this.offsetTop || 0
		let x = (touches.clientX - this.offsetLeft),
			y = (touches.clientY - this.offsetTop)

		// console.log('touches', x, y, this.offsetLeft, this.offsetTop)
		x = Math.abs(x) * pixelRatio
		y = Math.abs(y) * pixelRatio
		// console.log(touches, x, y)
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
		if (this.lock) return
		this.isDown = false
		this.ctx.restore()
	}
	_eventDown(e) {
		e.preventDefault()
		if (this.lock) return
		this._readyCB()
		this._resetBounding()
		this.ctx.save()
		if (this.config.mode === 'sector') this.ctx.beginPath()
		this.ctx.globalCompositeOperation = 'destination-out'
		this.isDown = true
	}
	_eventMove(e) {
		e.preventDefault()
		if (this.lock) return
		if (this.isDown && !this.done) {
			const { x, y, radius } = this._getPostion(e.changedTouches[0])
			this._drawPoint({ x, y, radius })
			// console.log('--move', x, y, radius)
			this._judgeArea()
		}
	}
}

module.exports = CanvasScraping;
module.exports.default = CanvasScraping;
