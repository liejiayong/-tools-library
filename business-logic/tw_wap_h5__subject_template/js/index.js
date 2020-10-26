/*
 * @Description: 工具函数
 * @version: 0.1.0
 * @Author: liejiayong(809206619@qq.com)
 * @Date: 2020-06-15 11:27:17
 * @LastEditors: liejiayong(809206619@qq.com)
 * @LastEditTime: 2020-08-03 18:03:33
 * @FilePath: \tool-library\business-logic\tw_wap_h5__subject_template\js\index.js
 */

var logic = null
var jyBus = {
	activeCls: 'active',
	disableCls: 'disable',
	doc: document.documentElement.body || document.body,
	swiper: function(el) {
		var psw = new Swiper(el, {
			initialSlide: 0,
			direction: 'vertical',
			autoHeight: true
		})
		this.psw = psw
		var startScroll, touchStart, touchCurrent
		psw.slides.on(
			'touchstart',
			function(e) {
				startScroll = Math.ceil(this.scrollTop)
				touchStart = e.targetTouches[0].pageY
			},
			true
		)
		psw.slides.on(
			'touchmove',
			function(e) {
				touchCurrent = e.targetTouches[0].pageY
				var touchesDiff = touchCurrent - touchStart
				var slide = this
				var onlyScrolling =
					slide.scrollHeight > slide.offsetHeight && //allow only when slide is scrollable
					((touchesDiff < 0 && startScroll === 0) || //start from top edge to scroll bottom
					(touchesDiff > 0 && startScroll === slide.scrollHeight - slide.offsetHeight) || //start from bottom edge to scroll top
						(startScroll > 0 && startScroll < slide.scrollHeight - slide.offsetHeight)) //start from the middle
				if (onlyScrolling) {
					e.stopPropagation()
				}
			},
			true
		)
	},
	elementCopy: function(btnCopyCls) {
		btnCopyCls = btnCopyCls || '.btnpopcode'
		var $tip = $('<div class="jy-copytips" style="display: none; padding: 10px; position: fixed; top: 30%; left: 50%; transform: translateX(-50%); background-color: rgb(0, 0, 0); color: rgb(255, 255, 255); box-shadow: rgb(0, 0, 0) 0px 0px 5px; white-space: nowrap; z-index: 2001;"></div>')
		$('body').append($tip)
		var clipboard = new ClipboardJS(btnCopyCls)
		clipboard.on('success', function() {
			$tip
				.text('复制成功')
				.fadeIn(500)
				.fadeOut(1000)
		})
		clipboard.on('error', function() {
			$tip
				.text('您的手机不支持点击复制，请长按复制！')
				.fadeIn(500)
				.fadeOut(1000)
		})
	},
	tip: {
		screen: function() {
			var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
			var $tip = ''
			$tip += '<!--旋屏提示 -->'
			$tip += '<div id="orientLayer" class="jy-orient_layer">'
			$tip += '<div class="jy-orient_content">'
			$tip += '<i class="jy-orient_icon"></i>'
			$tip += '<div class="jy-orient_extra">为了更好的体验，请使用竖屏浏览</div>'
			$tip += '</div>'
			$tip += '</div>'
			$tip = $($tip)
			$('body').append($tip)
			window.addEventListener(
				resizeEvt,
				function() {
					var clientWidth = window.innerWidth,
						clientHeight = window.innerHeight
					if (clientHeight < clientWidth) {
						if (!$tip.hasClass('active')) {
							$tip.addClass('active')
							setTimeout(function() {
								$tip.removeClass('active')
							}, 5000)
						}
					} else {
						$tip.removeClass('active')
					}
				},
				false
			)
		}
	},
	getRandom: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	},
	shuffle: function(arr) {
		var _arr = arr.slice()
		for (var i = 0; i < _arr.length; i++) {
			var j = this.getRandom(0, i)
			var n = _arr[i]
			_arr[i] = _arr[j]
			_arr[j] = n
		}
		return _arr
	},
	debounce: function(fn, delay) {
		var timer = null
		return function() {
			var context = this,
				arg = arguments
			if (timer) clearTimeout(timer)
			timer = setTimeout(function() {
				fn.apply(context, arg)
			}, delay)
		}
	},
	throttle: function(fn, delay) {
		if (!delay) delay = 160
		var timer = null
		var start = Date.now()
		return function() {
			var context = this,
				arg = arguments,
				curr = Date.now()
			if (curr - start >= delay) {
				fn.apply(context, arg)
				start = Date.now()
			} else {
				timer = setTimeout(function() {
					fn.apply(context, arg)
				}, delay)
			}
		}
	},
	trim: function(str) {
		return str.replace(/^\s+|\s+$/g, '')
	},
	getQueryString: function(key, type) {
		type = type ? type : 'search'
		const regExp = new RegExp('[?&#]{1}' + key + '=(.*?)([&/#]|$)')
		const value = window.location[type].match(regExp)
		return value && decodeURIComponent(value[1])
	},
	isNumber: function(number) {
		return Object.prototype.toString.call(number).toLocaleLowerCase() === '[object number]'
	},
	lottery(index, total, cbCurrent, cbEnd) {
		if (!this.isNumber(index)) return new Error('the arguments of index must number!')
		if (typeof cbEnd !== 'function') return new Error('the arguments of cbEnd must function!')
		if (typeof cbCurrent !== 'function') return new Error('the arguments of cbCurrent must function!')
		var TYPE_SPEED = 0
		var TYPE_ADD_SPEED = 20
		var TYPE_LAST_SPEED = 500
		var TYPE_MAX_INDEX = total
		var currSpeed = 0
		var totalIndex = 0
		var currentIndex = 0
		var animate = function() {
			var timer = setTimeout(function() {
				totalIndex += 1
				currSpeed += TYPE_ADD_SPEED
				if (currSpeed > TYPE_LAST_SPEED) {
					if (currentIndex === index) {
						clearTimeout(timer)
						cbEnd(currentIndex)
					} else {
						currentIndex = totalIndex % TYPE_MAX_INDEX
						clearTimeout(timer)
						cbCurrent(currentIndex)
						animate()
					}
				} else {
					currentIndex = totalIndex % TYPE_MAX_INDEX
					clearTimeout(timer)
					cbCurrent(currentIndex)
					animate()
				}
			}, TYPE_SPEED + currSpeed)
		}
		animate()
	},
	language: (navigator.browserLanguage || navigator.language).toLowerCase(),
	pop: {
		picker: function() {
			var $picker = '' + '<!-- pop selector  -->' + '<div style="z-index:1001;" class="jy-pop " id="J_selectorPop">' + '<div div class="jy-pop_mask jy-pop_mask--clickable" ></div>' + '<div class="jy-pop_picker_main">' + ' <div class="jy-pop_picker_hd">' + '<a href="javascript:;" class="jy-pop_picker_btn jy-pop_picker_btn--cancel">取消</a>' + '<a href="javascript:;" class="jy-pop_picker_btn jy-pop_picker_btn--confirm">确定</a>' + '</div>' + '<div class="jy-pop_picker__body">' + '<ul id="jyPopPicker">' + '<li class="active">xxx</li>' + '<li>xxx</li>' + '</ul>' + '</div>' + '</div>' + '</div >'
			$picker = $($picker)
			$picker.insertBefore($('#J_tipPop'))

			return {
				$picker: $picker
			}
		},
		authTime: { current: 60, default: 60 },
		authDisable: false,
		authTimer: null,
		btnAuth: function(cls) {
			var self = this
			$(cls).on('click', function() {
				if (self.authDisable) return
				self.authDisable = true
				clearTimeout(self.authTimer)
				self.authTime.current = self.authTime.default
				$btn = $(this)
				function count() {
					$btn.text('倒计时' + self.authTime.current + 's').addClass('disable')
					self.authTimer = setTimeout(function() {
						if (self.authTime.current == 1) {
							clearTimeout(self.timer)
							self.authDisable = false
							$btn.text('验证码').removeClass('disable')
							return
						}
						--self.authTime.current
						$btn.text('倒计时' + self.authTime.current + 's')
						count()
					}, 1000)
				}
				count()
			})
		}
	},
	showTip: function(html) {
		var $tip = $('#J_tipPop')
		$tip.find('.jy-pop-tiptxt').html(html)
		$tip.fadeIn()
	},
	navTo: function(cls) {
		$(cls)
			.addClass(this.activeCls)
			.siblings()
			.removeClass(this.activeCls)
	},
	$window: {
		fixed: function(cls) {
			cls = cls || '.jy-content'
			$(cls).css({ 'overflow-y': 'hidden' })
		},
		reset: function(cls) {
			cls = cls || '.jy-content'
			$(cls).css({ 'overflow-y': 'auto' })
		},
		winReset: function() {
			document.querySelector('body').style.overflow = ''
		},
		winFixed: function() {
			document.querySelector('body').style.overflow = 'hidden'
		}
	},
	preload: {
		init: (function() {
			var $loading = '' + '<!-- preload -->' + '<div class="ploading " id="pagePreload">' + '<div class="progress">' + '<p>loading...</p>' + '<p id="ploadingPro">0%</p>' + '</div>' + '</div>'
			$loading = $($loading)
			$('body').append($loading)

			return function(path, imgArr, cbSuccess, cbProcess) {
				$loading.fadeIn()
				$loading = null
				var loader = new ImagesLoader()
				loader.loadImages(imgArr, path)
				loader.complete(function() {
					cbSuccess()
				})
				loader.process(function() {
					cbProcess(this)
				})
				loader.start()
			}
		})(),
		open: function() {
			$('#pagePreload').fadeIn()
		},
		close: function() {
			$('#pagePreload').fadeOut()
		}
	},
	touchMove: {
		$doms: [],
		addListener: function(cls) {
			var dom = document.querySelector(cls)
			this.$doms.push({
				cls: cls,
				dom: dom,
				stat: false // 不阻止
			})
		},
		has: function(cls) {
			var ret = null
			this.$doms.forEach(function(dom, index) {
				if (dom.cls == cls) {
					ret = {
						stat: dom.stat,
						cls: dom.cls,
						dom: dom.dom,
						index: index
					}
				} else {
					ret = false
				}
			})
			return ret
		},
		preventFn: function(e) {
			e.preventDefault()
		},
		prevent: function(cls) {
			var self = this,
				clsStat = this.has(cls)
			if (!clsStat) return
			if (clsStat && clsStat.stat) return
			self.$doms[clsStat.index].stat = true
			// console.log('prevent', this.has(cls), clsStat.dom, self.preventFn)
			// clsStat.dom.addEventListener('touchmove', function (e) { self.preventFn(e, callback) }, {
			clsStat.dom.addEventListener('touchmove', self.preventFn, {
				passive: false
			})
		},
		reset: function(cls) {
			var self = this,
				clsStat = this.has(cls)
			if (!clsStat) return
			if (clsStat && !clsStat.stat) return
			self.$doms[clsStat.index].stat = false
			// console.log('reset', this.has(cls), clsStat.dom, self.preventFn)
			// clsStat.dom.removeEventListener('touchmove', function (e) { self.preventFn(e, callback) }, {
			clsStat.dom.removeEventListener('touchmove', self.preventFn, {
				passive: false
			})
		}
	}
}
// preinstall the code
$(function() {
	// jyBus.preload.init('./img/', [], function () {
	//   console.log('preload finish...')
	//   jyBus.preload.close();
	//   jyBus.navTo('.section-1');
	// }, function (install) {
	//   var prsnum = install.processNum;
	//   $('#ploadingPro').html(prsnum + "%");
	//   console.log('preload process...', prsnum)
	// });
	// jyBus.swiper('#psw');
	jyBus.tip.screen()
	jyBus.elementCopy()
	jyBus.pop.picker()
	jyBus.pop.btnAuth('.jy-pop_input_cell-auth')
	var queryTest = window.location.href
	if (queryTest.indexOf('debug=jylie') > -1) new VConsole()
	// 只复位到顶部
	// $("input, textarea, select").on("blur", function () {
	//   window.scroll(0, 0);
	// });
	// // 复位到特定情景的顶部
	// (function () {
	//   var bfscrolltop = document.body.scrollTop;
	//   $("input, textarea, select")
	//     .focus(function () {
	//       bfscrolltop = document.body.scrollTop;
	//     })
	//     .blur(function () {
	//       document.body.scrollTop = bfscrolltop;
	//     });
	// })();

	// 弹窗
	// 关闭弹窗
	$('.jy-pop_btn_close,.jy-pop_mask--clickable,.jy-pop_picker_btn--cancel').on('click', function() {
		jyBus.$window.winReset()
		$(this)
			.parents('.jy-pop')
			.fadeOut()
	})
})

// some business logic
$(function() {
	// selector
	$('#jyPopPicker').on('click', 'li', function() {
		$(this)
			.addClass(jyBus.activeCls)
			.siblings()
			.removeClass(jyBus.activeCls)
	})
	$('#jyCallPicker').on('click', function() {
		$('#J_selectorPop').fadeIn()
	})
	$('.jy-pop_picker_btn--confirm').on('click', function() {
		// 业务逻辑

		$(this)
			.parents('.jy-pop')
			.fadeOut()
		$('#J_gamePop').hide()
	})
	// 礼品查看
	$('.btn-pop-check').on('click', function() {
		$('#J_codePop').fadeIn()
	})
	// 礼品待领取
	$('.btn-pop-code').on('click', function() {
		$('#J_codePop').fadeIn()
	})
	// 填写信息
	$('.btn-pop-address').on('click', function() {
		$('#J_ownPop').fadeIn()
	})
	// 待领取
	$('.btn-pop-get').on('click', function() {
		$('#J_gamePop').fadeIn()
	})
	// 回到首页
	$('.btn-pop-nav-home,.btn-nav-home').on('click', function() {
		jyBus.navTo('.section-1')
	})

	// game logic
	logic = {
		isGaming: false,
		timer: null,
		time: { DEFAULT: 30, current: 30 },
		duration: 800,
		score: { total: 0, current: 0 },
		// 游戏结束业务
		gameResult: function() {
			var self = this,
				score = logic.score
			console.log('card result: ', score)

			// game success
			if (score.total <= score.current) {
				showTip('恭喜xxx')
			}
			// game fail
			else {
				$('#J_tipPop')
					.find('.jy-pop-tiptxt')
					.text('！再来一次吧~')
				$('#J_tipPop').fadeIn()
			}
		},
		gameReset: function() {
			var self = this
			self.isGaming = false
			self.score.current = 0
			self.time.current = self.time.DEFAULT
			self.setTime()
			clearInterval(self.timer)
		},
		setTime: function() {
			var self = this
			var $gTime = $('#gTime'),
				time = self.time.current
			$gTime.text(time)
		},
		gameTimer: function() {
			var self = this

			this.timer = setInterval(function() {
				if (self.time.current == -1 || self.score.current >= self.score.total) {
					clearInterval(self.timer)
					self.gameResult()
					return
				}

				self.setTime()
				self.time.current--
			}, 1000)
		},
		run: function() {
			var self = this
			if (self.isGaming) {
				return
			}
			self.gameReset()
		},
		loadGame: function() {
			var self = this,
				count = 3,
				$popReady = $('#J_gameReadyPop'),
				$count = $popReady.find('#gameReadyCount')
			jyBus.navTo('.section-2')
			$popReady.fadeIn()
			$count.text(count)

			self.run()

			var time = setInterval(function() {
				--count
				if (count == -1) {
					clearInterval(time)
					return
				} else if (count == 0) {
					$count.text('GO!')
					$popReady.fadeOut()
					$('.card-cell')
						.removeClass(activeCls)
						.siblings()
						.removeClass(activeCls)
					self.delay(function() {
						self.gameTimer()
					}, 100)
				} else {
					$count.text(count)
				}
			}, 1000)
		},
		$readyPop: function() {
			var $pop = '' + '<!-- pop game ready count -->' + '<div class="jy-pop " id="J_gameReadyPop">' + '<div class="jy-pop_mask"></div>' + '<div class="jy-pop_ready">' + ' <span id="gameReadyCount">3</span>' + '</div>' + '</div>'
			$pop = $($pop)
			$('body').append($pop)
		},
		init: function() {
			this.$readyPop()
		}
	}
	// logic.init();
})

// $(function () {
//   // test touchMove
//   jyBus.touchMove.addListener('.section-1')
//   // jyBus.touchMove.addListener('.section-2')
//   setTimeout(() => {
//     jyBus.touchMove.prevent('.section-1', function (e) {
//       console.log('0000000000', e)
//     })
//   }, 3000);
//   setTimeout(() => {
//     jyBus.touchMove.reset('.section-1', function (e) {
//       console.log('111111111', e)
//     })
//   }, 6000);
// })
