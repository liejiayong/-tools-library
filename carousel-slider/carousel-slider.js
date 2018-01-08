/**
	* 实现简单的轮播图效果
	* Author：liejiayong（809206619@qq.com）
	*
	**/

class CarouselSlider {
    constructor(container, options) {
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
                that.timer = setTimeout(function(){
                    that.index = that.index < moveView ? that.index + 1 : 1;
                    that.play(that.index);
                    loop(that);
                }, that.options['interval']);
            }
            loop(this);
        }
    }

    play(index) {
        let width = - this._getMoveOffset(index);
        this.sliderContainer.style.cssText = `transform:translate3d(${width}px,0,0);transition:.5s all`;
    }

    event() {
        const that = this;

        let dotsContainer = this.container.querySelector(this.options['dotsContainerCls']),
            PreBtn = this.container.querySelector(this.options['arrowPreCls']),
            nextBtn = this.container.querySelector(this.options['arrowNextCls']);

        let len = this.sliderItem.length,
             preView = this.slidesPreView,
             moveView = len - preView + 1; //计算最后一块滑块的索引值

        this.container.addEventListener('click', function (e) {
            e = e || window.event;
            e.preventDefault();
            let target = e.target || e.srcElement;
            if (target === PreBtn) {
                that.index = Math.max(--that.index, 1);
                that.play(that.index);
            } else if (target === nextBtn) {
                that.index = that.index < moveView ? ++that.index : 1;
                that.play(that.index);
            }
        }, true);

        this.container.addEventListener('touchstart',function () {
            clearTimeout(that.timer);
        });

        this.container.addEventListener('mouseover',function () {
            clearTimeout(that.timer);
        });

        this.container.addEventListener('mouseout',function () {
            that.isLoop();
        });
    }

    /**
     * 返回下一个滑块要移动的距离
     * @param index 当前下一个滑块索引值
     * @returns {number}
     * @private
     */
    _getMoveOffset(index){
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
            arrowNextCls: '.h-arrow-next'
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
        if (this.slidesPreView  && this.slidesPreView === 'auto'){
            return
        } else if (this.slidesPreView  && typeof this.slidesPreView === 'number') {
            let contentWidth = this.containerWidth,slidesPreView = this.slidesPreView;
            let sliderItemWidth = contentWidth / slidesPreView | 0;
            let cssText = `width:${sliderItemWidth}px;flex:0 0 ${sliderItemWidth}px`;
            this.sliderItemWidth = sliderItemWidth;
            this.sliderItem.forEach((item) => {
                item.style.cssText = cssText;
            })
        }
    }

    _init(opts) {
        this._initData(opts)
        this._initSliderWidth();
        this.isLoop();
        this.event();
    }

}
