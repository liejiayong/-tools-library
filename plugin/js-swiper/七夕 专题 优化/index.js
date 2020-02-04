// initial swiper
var slideListEl = $('#slice .swiper-slide'), swiperIndex = 0;
var slice = new Swiper('#slice', {
  initialSlide: 0,
  parallax: true,
  // autoplay: true,
  speed: 200,
  direction: 'vertical',
  noSwipingClass: 'stop-swiping',
  on: {
    slideChangeTransitionStart: function () {
      swiperIndex = this.activeIndex;
      var parent = slideListEl[swiperIndex],
        parent$ = $(slideListEl[swiperIndex])
      var bgImg = parent$.find('.swiper-bg')
      parent$.on('scroll', function () {
        var parentInnerHeight = parent.scrollHeight
        if (bgImg.height() < parentInnerHeight) {
          bgImg.css({ height: parentInnerHeight })
        }
      })
    },
  },
});
var startScroll, touchStart, touchCurrent;
slice.slides.on('touchstart', function (e) {
  startScroll = this.scrollTop;
  touchStart = e.targetTouches[0].pageY;
}, true);
slice.slides.on('touchmove', function (e) {
  touchCurrent = e.targetTouches[0].pageY;
  var touchesDiff = touchCurrent - touchStart;
  var slide = this;
  var onlyScrolling =
    (slide.scrollHeight > slide.offsetHeight) && //allow only when slide is scrollable
    (
      (touchesDiff < 0 && startScroll === 0) || //start from top edge to scroll bottom
      (touchesDiff > 0 && startScroll === (slide.scrollHeight - slide.offsetHeight)) || //start from bottom edge to scroll top
      (startScroll > 0 && startScroll < (slide.scrollHeight - slide.offsetHeight)) //start from the middle
    );
  if (onlyScrolling) {
    e.stopPropagation();
  }
}, true);
