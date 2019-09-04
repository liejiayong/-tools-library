function MutiSlide($el, options) {
  options = options || {}
  this.opts = $.extend({
    preCls: '.gd_caputure_btn_pre',
    nextCls: '.gd_caputure_btn_next',
    wrapCls: '.gd_capture_wrap',
    slideCls: '.gd_capture_slide',
    preCount: 3,
    duration: 1000,
    speed: 300
  }, options);
  this.$el = $el;
  this.$pre = $el.find(this.opts.preCls);
  this.$next = $el.find(this.opts.nextCls);
  this.$wrap = $el.find(this.opts.wrapCls);
  this.$slide = $el.find(this.opts.slideCls);
  this.timer = null;
  this.$slideWidth = 0;
  this.current = 0;
  this.slideCount = 0;

  this.init();
}
MutiSlide.prototype.init = function () {
  var $slide = this.$slide;
  var widthWrap = $slide.length * $slide.width();
  this.$wrap.width(widthWrap).css({ position: 'absolute', top: 0, left: 0 });
  this.$slideWidth = $slide.width() * this.opts.preCount;
  this.slideCount = $slide.length % this.opts.preCount;

  this.event();
  this.move();
};
MutiSlide.prototype.move = function () {
  var left = -this.$slideWidth * this.current,
    $wrap = this.$wrap,
    speed = this.opts.speed,
    duration = this.opts.duration;
  $wrap.animate({ left: left }, speed);
};
MutiSlide.prototype.event = function () {
  var that = this;
  this.$pre.on('click', function () {
    var current = that.current;
    that.current = current == 0 ? 0 : current - 1;
    that.move();
  });
  this.$next.on('click', function () {
    var current = that.current,
      slideCount = that.slideCount - 1;
    that.current = current < slideCount ? current + 1 : slideCount;
    that.move();
  });
}