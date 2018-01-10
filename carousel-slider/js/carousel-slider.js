/**
 * @name: js 原生轮播图
 * @description: 轮播图实现的功能有：可配置参数、鼠标经过悬停、移动端端鼠标滑动下一张、pc端鼠标滑动下一张、自动播放、图片自适应图片大小、图片自适应屏幕切换等，是一个轻量、使用、强大的轮播图插件
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
        this.sliderContainer.style.cssText = `transform:translate3d(${width}px,0,0);transition:.5s all`;
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

        let PreBtn = this.container.querySelector(this.options['arrowPreCls']),
            nextBtn = this.container.querySelector(this.options['arrowNextCls']);

        let len = this.sliderItem.length,
            preView = this.slidesPreView,
            moveView = len - preView + 1; //计算最后一块滑块的索引值

        this.container.addEventListener('click', function (e) {
            e = e || window.event;
            e.preventDefault();
            let target = e.target || e.srcElement;
            if (target === PreBtn) {
                lastView();
            } else if (target === nextBtn) {
                nextView();
            }
        }, true);

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
        });

        this.container.addEventListener('touchstart', function (e) {
            clearTimeout(that.timer);
            e = e || window.event;
            e.preventDefault();
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
            e.preventDefault();
            isTouchEnd = false;
            touchState.diff = touchState.x2 - touchState.x1;
            if (Math.abs(touchState.diff) > 80 && !isTouchEnd) {
                if (arrowChecker(touchState.x2, touchState.x1)) {
                    nextView();
                } else {
                    lastView();
                }
            }

            that.isLoop();
        });

        window.addEventListener('resize', function () {
            console.log('222')
            that._initSliderWidth();
            that._initElement();
        });

        function arrowChecker(x1, x2) {
            return x2 > x1 ? true : false
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
            sliderItemCls: '.g-carousel-item',
            dotsContainerCls: '.h-dots',
            arrowPreCls: '.h-arrow-pre',
            arrowNextCls: '.h-arrow-next',
            fullWidth: true
        }

        /* initial */
        this.options = Object.assign({}, defaultOpts, opts);
        this.sliderContainer = this.container.querySelector(this.options['sliderContainerCls']);
        this.sliderItem = this.container.querySelectorAll(this.options['sliderItemCls']);
        this.containerWidth = this.container.offsetWidth;
        this.sliderItemWidth = this.sliderItem.offsetWidth;
        this.slidesPreView = this.options['slidesPreView'];
    }

    _initSliderWidth() {
        if (this.slidesPreView && this.slidesPreView === 'auto') {
            return
        } else if (this.slidesPreView && typeof this.slidesPreView === 'number') {
            let contentWidth, //sliderContainer 的宽度
                sliderItemWidth, //sliderContainer item 的宽度
                slidesPreView = this.slidesPreView;
            if (this.options['fullWidth']) {
                contentWidth = document.documentElement.clientWidth;
            } else {
                contentWidth = this.containerWidth;
            }
            sliderItemWidth = contentWidth / slidesPreView | 0;
            let cssText = `width:${sliderItemWidth}px;flex:0 0 ${sliderItemWidth}px`;
            this.sliderItemWidth = sliderItemWidth;
            this.sliderItem.forEach((item) => {
                item.style.cssText = cssText;
            })
        }
    }

    _initElement() {
        let preBtn = this.container.querySelector(this.options['arrowPreCls']),
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

    _init(opts) {
        this._initData(opts)
        this._initSliderWidth();
        this._initElement();
        this.isLoop();
        this.event();
    }

}

CarouselSlider.prototype.DEVICE_PIXEL = 1024;