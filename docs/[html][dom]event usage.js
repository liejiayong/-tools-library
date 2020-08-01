/*

    addEventListener 与 removeEventListener 的细节说明



*/


/*
    当 dom 元素需要 A(添加\移除) 事件时，
    注意 dom 监听的 A 事件句柄相同、A 共用事件处理函数、A 事件处理函数不能传参，
    否则不能成功移除事件监听
*/

// 错误示例：A 共用事件处理函数 不一致
document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);
document.body.removeEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);

// 错误示例：A 事件处理函数不能传参，传了event报错
function bodyScroll(event) {
    event.preventDefault();
}
document.body.addEventListener('touchmove', bodyScroll(event), false);
document.body.removeEventListener('touchmove', bodyScroll(event), false);

// 正确方法
document.body.addEventListener('touchmove', bodyScroll, false);
document.body.removeEventListener('touchmove', bodyScroll, false);

/**

ios 阻止滚动动画

*/
var touchMove = {
    $doms: [],
    addListener: function (cls) {
        var dom = document.querySelector(cls);
        this.$doms.push({
            cls: cls,
            dom: dom,
            stat: false // 不阻止
        });
    },
    has: function (cls) {
        var ret = null
        this.$doms.forEach(function (dom, index) {
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
        });
        return ret
    },
    preventFn: function (e) {
        e.preventDefault();
    },
    prevent: function (cls) {
        var self = this, clsStat = this.has(cls);
        if (!clsStat) return;
        if (clsStat && clsStat.stat) return;
        self.$doms[clsStat.index].stat = true;
        // console.log('prevent', this.has(cls), clsStat.dom, self.preventFn)
        // clsStat.dom.addEventListener('touchmove', function (e) { self.preventFn(e, callback) }, {
        clsStat.dom.addEventListener('touchmove', self.preventFn, {
            passive: false
        })
    },
    reset: function (cls) {
        var self = this, clsStat = this.has(cls);
        if (!clsStat) return;
        if (clsStat && !clsStat.stat) return;
        self.$doms[clsStat.index].stat = false;
        // console.log('reset', this.has(cls), clsStat.dom, self.preventFn)
        // clsStat.dom.removeEventListener('touchmove', function (e) { self.preventFn(e, callback) }, {
        clsStat.dom.removeEventListener('touchmove', self.preventFn, {
            passive: false
        })
    }
}
