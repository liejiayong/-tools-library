	/**
	 * @name: magnify-func
	 * @description: 函数是放大镜效果
	 * @version: 0.1
	 * @author: liejiayong(809206619@qq.com)
	 * @update: 2017-08-
	 */


(function ($) {
    $(function () {
        var magnifierContent = $('<div class="magnifier"></div>');
        var mask = $("<div class='mask'></div>");
        var imgData = $(".magnifier-box img");
        var magnifier;
        var imageBox = $(".magnifier-box");

        var scale = 2;
        var srcWidth = imgData.width();
        var srcHalfWidth = srcWidth / 2;
        var scaleWidth = {w: scale * srcWidth, h: scale * srcWidth};
        var halfOfScaleW, halfOfScaleH;
        var targetPos = {x: 0, y: 0};

        var maskW = srcWidth * 0.4;
        var maskH = maskW;
        var halfOfMask = maskW / 2;
        var endOfMask = srcWidth - halfOfMask;
        var maskPos = {top: (srcHalfWidth - halfOfMask) + "px", left: (srcHalfWidth - halfOfMask) + "px"};
        var maskMargin = {margLeft: "-" + halfOfMask + "px", margTop: "-" + halfOfMask + "px"}

        var bgUrl;
        var imgsrc;

        var clientX_ = 0;
        var clientY_ = 0;
        var objOffsetLeft = imgData.offset().left;
        var objOffsetTop = imgData.offset().top;

        var bgPosition;
        var bgSize;
        var disX;
        var disY;

        /**init the magnifier**/
        mask.css({
            top: maskPos.top,
            left: maskPos.left,
            width: maskW,
            height: maskH,
            position: "absolute",
            background: "rgba(13, 13, 13, 0.19)",
            display: "inline-block",
            "margin-left": maskMargin.margLeft,
            "margin-top": maskMargin.margTop
        });

        imageBox.after(magnifierContent);
        imgData.after(mask);
        magnifier = $(".magnifier");
        magnifier.css({
            width:"300px",
            height:"300px",
        });

        imgsrc = imgData.attr("src");
        bgUrl = "url(" + imgsrc + ")";
        disX = (scaleWidth.w - srcWidth) / 2;
        disY = (scaleWidth.h - srcWidth) / 2;
        halfOfScaleH = halfOfScaleW = scaleWidth / 2;
        imgData.on("mousemove", function (e) {
            clientX_ = Math.ceil(e.clientX - objOffsetLeft);
            clientY_ = Math.ceil(e.clientY - objOffsetTop);

            scaleView(clientX_, clientY_);
            cursorPostion(clientX_, clientY_);
        });
        mask.animate("mouseout", function () {
            magnifier.css({
                display: "none"
            },10);
        });

        function cursorPostion(cursorX, cursorY) {
            cursorX = cursorX < halfOfMask ? halfOfMask : cursorX > endOfMask ? endOfMask : cursorX;
            cursorY = cursorY < halfOfMask ? halfOfMask : cursorY > endOfMask ? endOfMask : cursorY;
            mask.animate({
                top: cursorY,
                left: cursorX
            },10);
        }

        function scaleView(x, y) {
            targetPos.x = x * scaleWidth.w / srcWidth;
            targetPos.y = y * scaleWidth.h / srcWidth + disY;
            targetPos.x = targetPos.x < halfOfScaleW ? (targetPos.x) : maskW - targetPos.x;
            targetPos.y = targetPos.y < halfOfScaleW ? targetPos.y : (2 * maskW - targetPos.y);
            bgPosition = "" + targetPos.x + "px " + targetPos.y + "px";
            bgSize = "" + scaleWidth.w + "px " + scaleWidth.h + "px";

            magnifier.css({
                "background": bgUrl,
                "background-position": bgPosition,
                "background-size": bgSize,
                "background-repeat": "no-repeat",
                display: "inline-block"
            });


        }
    });
})(jQuery);