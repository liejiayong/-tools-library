/**
 * @name: js 原生轮播图
 * @description: 该轮播图实现的功能有：可配置参数、鼠标经过悬停、移动端端鼠标滑动下一张、pc端鼠标滑动下一张、自动播放、图片自适应图片大小、图片自适应屏幕切换等，是一个轻量、使用、强大的轮播图插件
 * @author: 家永(809206619@qq.com | liejystephen@gmail.com)
 * @update: 2017-12-30 00:02
 */

 # Carousel-slider

 轮播图实现的功能有：可配置参数、鼠标经过悬停、移动端端鼠标滑动下一张、pc端鼠标滑动下一张、自动播放、图片自适应图片大小、图片自适应屏幕切换等，是一个轻量、使用、强大的轮播图插件

 ## Licensing
Carousel-slider is released under the MIT license.

## Feature
可配置的参数

	const defaultOpts = {
	    loop: true,
	    // 是否开启自动轮播：false | true
	    interval: 3400,
	    // 设置滑块时差： 毫秒数
	    slidesPreView: 3,
	    // 设置当前显示滑块数量： 1-3(建议)
	    moveCount: 1,
	    // 每次滚动的滑块数
	    sliderContainerCls: '.h-carousel-content',
	    // 父滑块类名
	    sliderItemCls: '.g-carousel-item',
	    // 每个滑块类名
	    arrowPreCls: '.h-arrow-pre',
	    // 导航左按钮类名
	    arrowNextCls: '.h-arrow-next',
	    // 导航右按钮类名
	    fullWidth: true
	    // 是否开启屏幕全宽模式
	}
