/**
 * Created by Administrator on 2017/10/11.
 */
;(function ($) {
    function easyModal(options) {
        let defaultOptions = {
            mask: ".mask",
            close: ".close",
            dialogContent: ".dialog-content",
            dialogContentHeight: "550px",
            mobile: "500"
        };
        defaultOptions = $.extend({}, defaultOptions, options);

        const that = $(this);
        let mask = $(defaultOptions.mask);
        let close = $(defaultOptions.close);
        let dialogContent = $(defaultOptions.dialogContent);
        let dialogContentHeight = $(defaultOptions.dialogContentHeight);
        let window_w = $(window).width();
        $(window).resize(function () {
            window_w = $(window).width();
            if (window_w < defaultOptions.mobile) {
                setMobile_W(window_w);
            }
        });
        if (window_w < defaultOptions.mobile) {
            setMobile_W(window_w);
        }

        that.on({
            'click': function () {
                mask.show();
                dialogContent.css("height", dialogContentHeight).show();
            },
        })

        close.on({
            'click': function () {
                mask.hide();
                dialogContent.hide();
            }
        })

        mask.on({
            'click': function () {
                mask.hide();
                dialogContent.hide();
            }
        })

        function setMobile_W(width) {
            console.log(width)
            dialogContent.css("width", width);
        }
    }

    $.fn.extend({
        easyModal: easyModal
    });

})(jQuery)