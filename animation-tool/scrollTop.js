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

function scrollTo (top, duration) {
    var fresh = 16;
    var time = duration / fresh;
    var eachMove = top / time;
    var y = 0;
    var handler = null;
    move()
    function move () {
        if (y >= top) {
            return cancelAnimationFrame(handler)
        }

        handler = requestAnimationFrame(function () {
            y += eachMove
            console.log(y)
            window.scrollTo(0, y)
            move()
        })
    }
}