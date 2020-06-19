/**
 * Created by Administrator on 2017/10/12.
 * requestAnimateFrame 兼容性
 */

; (function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz', 'ms', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { return callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
})();

(function (global) {


    (function () {


        if (global.requestAnimationFrame) {

            return;

        }

        if (global.webkitRequestAnimationFrame) { // Chrome <= 23, Safari <= 6.1, Blackberry 10

            global.requestAnimationFrame = global['webkitRequestAnimationFrame'];
            global.cancelAnimationFrame = global['webkitCancelAnimationFrame'] || global['webkitCancelRequestAnimationFrame'];
            return;

        }

        // IE <= 9, Android <= 4.3, very old/rare browsers

        var lastTime = 0;

        global.requestAnimationFrame = function (callback) {

            var currTime = new Date().getTime();

            var timeToCall = Math.max(0, 16 - (currTime - lastTime));

            var id = global.setTimeout(function () {

                callback(currTime + timeToCall);

            }, timeToCall);

            lastTime = currTime + timeToCall;

            return id; // return the id for cancellation capabilities

        };

        global.cancelAnimationFrame = function (id) {

            clearTimeout(id);

        };

    })();

    if (typeof define === 'function') {

        define(function () {

            return global.requestAnimationFrame;

        });

    }

})(window);
