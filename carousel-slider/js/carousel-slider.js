/**
 * @name: js 原生轮播图
 * @description: 轮播图实现的功能有：可配置参数、鼠标经过悬停、移动端端鼠标滑动下一张、pc端鼠标滑动下一张、自动播放、图片自适应图片大小、图片自适应屏幕切换等，是一个轻量、使用、强大的轮播图插件
 * @version: 0.3
 * @author: 家永(809206619@qq.com | liejystephen@gmail.com)
 * @update: 2017-12-30 00:02
 */

class CarouselSlider {

    constructor(container, options) {
        this.carousel = this;
        this.container = container;
        this.options = {};
        this.index = 1;
        this.timer = null;
        this._init(options);

    }

    /**
     *  判断是否开启自动滑动
     */
    isLoop() {
        if (this.options['loop']) {
            let len = this.sliderItem.length;
            let preView = this.slidesPreView;
            let moveView = len - preView + 1; //计算最后一块滑块的索引值
            function loop(that) {
                that.timer = setTimeout(function () {
                    that.index = that.index < moveView ? that.index + 1 : 1;
                    that.play(that.index);
                    loop(that);
                }, that.options['interval']);
            }

            loop(this);
        }
    }

    play(index) {
        let width = -this._getMoveOffset(index);
        this.sliderContainer.style.cssText = `transform:translate3d(${width}px,0,0);transition:.5s all;user-select:none`;
    }

    event() {
        const that = this;

        let isMouseUp = false,
            isTouchEnd = false,
            mouseState = {
                x1: 0,
                x2: 0,
                diff: 0
            },
            touchState = {
                x1: 0,
                x2: 0,
                diff: 0
            };
            
        let len = this.sliderItem.length,
            preView = this.slidesPreView,
            moveView = len - preView + 1; //计算最后一块滑块的索引值
        
        if (this.container.querySelector(this.options['arrowPreCls']) && this.container.querySelector(this.options['arrowNextCls'])) {
            const PreBtn = this.container.querySelector(this.options['arrowPreCls']),
                nextBtn = this.container.querySelector(this.options['arrowNextCls']);

            this.container.addEventListener('click', function (e) {
                e = e || window.event;
                let target = e.target || e.srcElement;
                if (target === PreBtn) {
                    lastView();
                } else if (target === nextBtn) {
                    nextView();
                }
                that._dotActive(that.index)
            }, true);
        }

        this.container.addEventListener('mouseover', function () {
            clearTimeout(that.timer);
        });

        this.container.addEventListener('mouseout', function () {
            that.isLoop();
        });

        this.container.addEventListener('mousedown', function (e) {
            e = e || window.event;
            e.preventDefault();
            isMouseUp = true;
            mouseState.x1 = e.pageX;
        });

        this.container.addEventListener('mousemove', function (e) {
            e = e || window.event;
            e.preventDefault();
            mouseState.x2 = e.pageX;
            mouseState.diff = mouseState.x2 - mouseState.x1
        });

        this.container.addEventListener('mouseup', function (e) {
            e = e || window.event;
            e.preventDefault();
            isMouseUp = false;
            mouseState.x2 = e.pageX;
            mouseState.diff = mouseState.x2 - mouseState.x1;
            if (Math.abs(mouseState.diff) > 80 && !isMouseUp) {
                if (arrowChecker(mouseState.x2, mouseState.x1)) {
                    nextView();
                } else {
                    lastView();
                }
            }
            that._dotActive(that.index)
        });

        this.container.addEventListener('touchstart', function (e) {
            clearTimeout(that.timer);
            e = e || window.event;
            isTouchEnd = true;

            let {targetTouches} = e;
            touchState.x1 = targetTouches[0]['pageX'];
        });

        this.container.addEventListener('touchmove', function (e) {
            e = e || window.event;
            e.preventDefault();

            let {targetTouches} = e;
            touchState.x2 = targetTouches[0]['pageX'];
        });

        this.container.addEventListener('touchend', function (e) {
            e = e || window.event;
            isTouchEnd = false;
            touchState.diff = touchState.x2 - touchState.x1;
            if (Math.abs(touchState.diff) > 80 && !isTouchEnd) {
                if (arrowChecker(touchState.x2, touchState.x1)) {
                    nextView();
                } else {
                    lastView();
                }
            }
            that._dotActive(that.index)
            that.isLoop();
        });

        window.addEventListener('resize', function () {
            console.log('window changed!')
            that._initSliderWidth();
            that._initElement();
        });

        this._dotEvent();
        this.unloadEvent();

        function arrowChecker(x1, x2) {
            return x2 > x1 ? true : false;
        }

        function nextView() {
            that.index = that.index < moveView ? ++that.index : 1;
            that.play(that.index);
        }

        function lastView() {
            that.index = Math.max(--that.index, 1);
            if (that.index === 1) {
                that.index = moveView;
            }
            that.play(that.index);
        }
    }

    unloadEvent() {
        window.addEventListener('unload', (e) => {
            clearTimeout(this.timer);
        })
    }

    /**
     * 下标点事件
     */
    _dotEvent() {
        if (!this.container.querySelector(this.options['dotsCls']) && !this.container.querySelectorAll(this.options['dotCls'])[0]) return;
        const dots = this.container.querySelector(this.options['dotsCls']);
        const active = this.options['dotActiveCls'];
        const dotList = this.container.querySelectorAll(this.options['dotCls']);
        const slideList = this.container.querySelectorAll(this.options['sliderItemCls']);
        const len = slideList.length;
        dots.addEventListener('click', (e) => {
            e = e || window.event;
            let target = e.target || e.srcElement;

            // 判断圆点选择器
            if (dotList.length !== len) {
                console.warn('轮播图的圆点选择器配置错误');
                if (this.index > len || this.index <= 1) {
                    this.index = 1;
                }
            }

            dotList.forEach((item, index) => {
                if (item === target) {
                    this.addClass(item, active);
                    this.index = index + 1;
                    this.play(this.index);
                } else {
                    this.removeClass(item, active);
                }
            })
        })

    }

    /**
     * 返回下一个滑块要移动的距离
     * @param index 当前下一个滑块索引值
     * @returns {number}
     * @private
     */
    _getMoveOffset(index) {
        return this.sliderItemWidth * (index - 1);
    }

    _initData(opts) {
        const defaultOpts = {
            loop: true,
            interval: 3400,
            slidesPreView: 3,
            moveCount: 1,
            sliderContainerCls: '.h-carousel-content',
            sliderItemCls: '.h-carousel-item',
            dotsContainerCls: '.h-dots',
            arrowPreCls: '.h-arrow-pre',
            arrowNextCls: '.h-arrow-next',
            dotsCls: '.h-dots',
            dotCls: '.h-dot',
            dotActiveCls: 'active',
            fullWidth: false,
            breakPoints: {
                900: {
                    slidesPreView: 3
                },
                600: {
                    slidesPreView: 2
                }
            }
        }

        /* initial */
        this.options = Object.assign({}, defaultOpts, opts);
        this.sliderContainer = this.container.querySelector(this.options['sliderContainerCls']);
        this.sliderItem = this.container.querySelectorAll(this.options['sliderItemCls']);
        this.sliderItemWidth = this.sliderItem.offsetWidth;
        this.slidesPreView = this.options['slidesPreView'];
    }

    /**
     *  序列化BreakPoints对象，以breakpoint像素从大到小排列
     * @param breakPoints 传入breakpoints对象
     * @returns {Array} 返回breakpoint像素从大到小排列的数组信息
     * @private
     */
    _normalizeBreakPoints(breakPoints) {
        if (typeof breakPoints === 'object' && typeof breakPoints !== 'function' && !(breakPoints instanceof Array)) {
            let origin = [];
            for (let key in breakPoints) {
                origin.push([
                    parseInt(key),
                    breakPoints[key]['slidesPreView']
                ])
            }
            origin.sort(function (a, b) {
                return a < b;
            })
            return origin;
        } else {
            console.error(JSON.stringify(breakPoints), 'is not a Object')
        }
    }

    _getSlidesPreView(breakPoints) {
        let winClientWidth = document.documentElement.clientWidth,
            slidesPreView = this.options['slidesPreView'];

        breakPoints = this._normalizeBreakPoints(breakPoints);
        breakPoints.forEach((val) => {
            if (winClientWidth > val[0]) {
                return slidesPreView
            } else {
                slidesPreView = val[1]
            }
        })
        //都不符合条件返回最后一个像素对应的sliderItem数
        return slidesPreView;
    }

    _initSliderWidth() {
        if (this.slidesPreView && this.slidesPreView === 'auto') {
            return
        } else if (this.slidesPreView && typeof this.slidesPreView === 'number') {
            let contentWidth, //sliderContainer 的宽度
                sliderItemWidth, //sliderContainer item 的宽度
                breakPoints = this.options['breakPoints'],
                slidesPreView = this.slidesPreView;
            if (this.options['breakPoints'] && !this.options['fullWidth']) slidesPreView = this._getSlidesPreView(breakPoints)
            if (this.options['fullWidth']) {
                contentWidth = document.documentElement.clientWidth;
            } else {
                contentWidth = this.container.offsetWidth;
            }
            sliderItemWidth = contentWidth / slidesPreView | 1;
            let cssText = `;width:${sliderItemWidth}px;max-width:${sliderItemWidth}px;flex:0 0 ${sliderItemWidth}px`;
            this.sliderItemWidth = sliderItemWidth;
            this.sliderItem.forEach((item) => {
                item.style.cssText = cssText;
            })
        }
    }

    _initArrow() {
        if (!this.container.querySelector(this.options['arrowPreCls']) && !this.container.querySelector(this.options['arrowNextCls'])) return
        const preBtn = this.container.querySelector(this.options['arrowPreCls']),
            nextBtn = this.container.querySelector(this.options['arrowNextCls']);
        let deviceWidth = document.documentElement.clientWidth;
        //屏幕分辨率低于1024，隐藏arrow
        if (this.DEVICE_PIXEL > deviceWidth) {
            preBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            preBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        }
    }

    _initElement() {
        this._initArrow()
    }

    _init(opts) {
        this._initData(opts)
        this._initSliderWidth();
        this._initElement();
        this.isLoop();
        this.event();
    }
    _dotActive(currIndex) {
        if (!this.container.querySelectorAll(this.options['dotCls'])) {
            return;
        }
        const dots = this.container.querySelectorAll(this.options['dotCls']);
        const activeCls = this.options['dotActiveCls'];
        dots.forEach((v, i) => {
            let ii = i + 1;
            if (ii === currIndex) {
                this.addClass(v, activeCls);
            } else {
                this.removeClass(v, activeCls);
            }
        })
    }

    hasClass(el, cls) {
        let reg = new RegExp(`(^|\\s)${cls}(\\s|$)`);
        return reg.test(el.className);
    }

    addClass(el, cls) {
        if (this.hasClass(el, cls)) {
            return;
        }
        let newCls = el.className.split(' ');
        newCls.push(cls);
        el.className = newCls.join(' ');
    }

    removeClass(el, cls) {
        if (!this.hasClass(el, cls)) {
            return;
        }
        let reg = new RegExp(`(^|\\s)${cls}(\\s|$)`);
        el.className = el.className.replace(reg, '');
    }
}

CarouselSlider.prototype.DEVICE_PIXEL = 1024;
