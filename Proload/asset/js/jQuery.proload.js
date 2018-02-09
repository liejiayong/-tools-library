(function ($) {
    /**
     * Proload 构造函数，传递imageURL数组 与可配置参数
     * @param imageList imageURL数组
     * @param opts 配置参数
     * @constructor
     */
    function ProLoad(imageList, opts) {
        this.name = 'Proload';
        this.imageList = (typeof imageList === 'string') ? [imageList] : imageList;
        this.options = $.extend({}, ProLoad.DEFAULTS, opts);

        if (this.options['order'] === 'unorder') {
            this._unorderLoad();
        } else {
            this._orderedLoad();
        }
    };

    ProLoad.prototype._orderedLoad = function () {
        const opts = this.options;
        let imageList = this.imageList,
            len = imageList.length,
            count = 0; // 当前图片加载的索引计数器

        $.each(imageList, function (i, src) {
            if (typeof src !== 'string') return
            load();
        });

        function load() {
            const image = new Image();
            $(image).on('load error', function () {
                opts.each && opts.each();

                if (count >= len - 1) {
                    opts.all && opts.all();
                } else {
                    load();
                }
                count++;
            });
            image.src = imageList[count];
        }
    };

    ProLoad.prototype._unorderLoad = function () {
        const opts = this.options;
        let imageList = this.imageList,
            len = imageList.length,
            count = 0; // 当前图片加载的索引计数器

        $.each(imageList, function (i, src) {
            if (typeof src !== 'string') {
                return;
            }
            const image = new Image();
            $(image).on('load error', function () {
                opts.each && opts.each(count);

                if (count >= len - 1) {
                    opts.all && opts.all();
                }
                count++;
            });
            image.src = src;
        });
    };

    ProLoad.DEFAULTS = {
        order: 'unorder',
        each: null,
        all: null
    };

    $.extend({
        proload: function (imageList, opts) {
            new ProLoad(imageList, opts);
        }
    })
})(jQuery);