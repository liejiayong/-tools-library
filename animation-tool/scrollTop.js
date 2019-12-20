(function () {
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

function scrollToElement(top, duration) {
    var fresh = 16;
    var time = duration / fresh;
    var eachMove = top / time;
    var y = 0;
    var handler = null;
    move()
    function move() {
        if (y >= top) {
            return cancelAnimationFrame(handler)
        }

        handler = requestAnimationFrame(function () {
            y += eachMove
            // console.log(y)
            window.scrollTo(0, y)
            move()
        })
    }
}

// scrollTop animation
export const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60)
            }
        )
    }
    const difference = Math.abs(from - to)
    const step = Math.ceil(difference / duration * 50)

    const scroll = (start, end, step) => {
        if (start === end) {
            endCallback && endCallback()
            return
        }

        let d = (start + step > end) ? end : start + step
        if (start > end) {
            d = (start - step < end) ? end : start - step
        }

        if (el === window) {
            window.scrollTo(d, d)
        } else {
            el.scrollTop = d
        }
        window.requestAnimationFrame(() => scroll(d, end, step))
    }
    scroll(from, to, step)
}

/**
 * 主要针对移动端的动画滚动
 * @param {*} element 所滚动到的元素
 * @param {*} option scrollIntoView api 的option
 */
export function scrollIntoView(element, option = { behavior: "smooth", block: "end", inline: "nearest" }) {
    if ('scrollIntoView' in element) {
        element.scrollIntoView(option);
    } else {
        var offsetTop = element.offsetTop;
        window.scrollTo(0, offsetTop);
    }
}
