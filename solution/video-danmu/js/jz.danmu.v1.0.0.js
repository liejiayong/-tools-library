
/*
 
 
 参数说明
 
device
类型：string

默认值：'pc'

设备是pc端还是移动端，'pc'代表pc端弹幕，'m'代表移动端弹幕

stage
类型：object

默认值：$(".danmustage")

弹幕舞台/容器

comments
类型：array

默认值：[]

弹幕初始数据

colors
类型：array

默认值：['#fff']

弹幕随机颜色数组

danMuHtml
类型：string

默认值：''

普通弹幕html模板;{userId}代表弹幕所属用户唯一标识属性值；{comment}代表弹幕内容；该html模板中支持出现多个{userId}和{comment}

alwaysDanMuHtml
类型：string | array

默认值：''

一直在舞台垂直居中位置出现的弹幕html模板（例如上面第二个demo的“TGideas弹幕来袭”）;不设置或设置为''代表没有

danMuClassName
类型：string

默认值：'danmu'

普通弹幕className

myDanMuClassName
类型：string

默认值：'mydanmu'

我发送的普通弹幕className

alwaysDanMuClassName
类型：string

默认值：'alwaysdanmu'

一直在舞台垂直居中位置出现的弹幕className

mAnimation
类型：string

默认值：'transform'

移动端弹幕动画类型；'transform'：代表采用css3的transform:translate3d(x,y,z);页面性能好，动画效果十分流畅；'left'：代表采用css3的transition:left;来过渡，性能差，动画效果有卡顿

hSpacing
类型：number

默认值：0.2

普通弹幕间最小高度间距是弹幕本身高度的几倍

flyTime
类型：number

默认值：10000

弹幕飞行时间，越大速度越慢

timeInterval
类型：number

默认值：3000

播放下一条普通弹幕的时间间隔

alwaysLoopTime
类型：number

默认值：10000

播放下一个舞台垂直居中弹幕的时间间隔

randomSort
类型：boolean

默认值：false

是否随机打乱初始弹幕数据

loop
类型：boolean

默认值：true

是否循环播放弹幕

autoplay
类型：boolean

默认值：true

是否自动播放弹幕

mouseoverpause
类型：boolean

默认值：true

是否鼠标上移悬停普通弹幕（只在pc端弹幕有效）

awmouseoverpause
类型：boolean

默认值：false

是否鼠标上移悬停舞台垂直居中弹幕（只在pc端弹幕有效）

danMuOverAlwaysLoop
类型：boolean

默认值：true

弹幕不循环播放的情况下，普通弹幕播放完毕，舞台垂直居中弹幕是否继续循环播放

cookieName
类型：string

默认值：'TGideasDanMu'

静态数据弹幕下，用户发布的弹幕存入本地cookie的cookie名称；设为''代表不存入cookie，也不从cookie中读取用户以前发布的弹幕数据

cookieExp
类型：number

默认值：3650

cookie过期时间（单位：天），仅在静态数据弹幕下，用户发布弹幕存于cookie时有效

localDanMuRandomInsert
类型：boolean

默认值：true

初始化弹幕时，存于本地cookie的弹幕数据是否随机插入到弹幕中

localDanMuNotRandomIndex
类型：number

默认值：3

表示从第几条开始播放本地cookie中的弹幕，仅在上一个参数设置为false时有效

localDanMuHasMyStyle
类型：boolean

默认值：false

本地cookie中的弹幕是否拥有'我发布的弹幕'样式，即mydanmu样式

appendRepeat
类型：boolean

默认值：false

静态弹幕追加弹幕数据，弹幕内容是否可重复

myDanMuPrefix
类型：string

默认值：'我：'

我发送弹幕时，显示在弹幕内容前面的前缀

uniqueTagName
类型：string

默认值：''

每条弹幕数据用户的唯一标识属性名称。仅在动态弹幕下，且需要区分每条弹幕的用户（如显示用户id、展示用户头像等），才需设置

userId
类型：string | number

默认值：''

代表当前用户的唯一标识属性值。仅在上一个参数有设置的情况下，才需设置

showMyStyle
类型：boolean

默认值：false

在动态弹幕下，除了用户当前发送的弹幕外的其他弹幕，如果用户标识也是当前用户，是否要显示'我的弹幕'样式，即mydanmu样式

submitSuccessCallback
类型：boolean

默认值：false

在动态弹幕下，该参数用于在发布弹幕时的成功回调方法里面，代表是否等到ajax提交弹幕数据到后台成功之后才置sendStatus为true

aDanMuCreated
类型：function

默认值：function(){}

每一条弹幕创建完毕的回调方法，该方法在弹幕进入舞台之前执行的。例如：function(index, el, className){...}index：弹幕索引el：弹幕domclassName：弹幕className

distanceToStage
类型：number

默认值：50

每个弹幕初始位置在弹幕舞台的右侧加上多少像素，50代表50px

sendIfStopTips
类型：string

默认值：'弹幕已经暂停或关闭，不能发布！'

如果当前弹幕已经暂停或关闭的话，发布弹幕会失败，且会有这个提醒

sendIfFastTips
类型：string

默认值：'您发布弹幕的速度太快了，请歇一会！'

如果用户发送弹幕的速度太快的话，发布弹幕会失败，且会有这个提醒

direction
类型：string

默认值：'h'

设置水平弹幕或垂直弹幕。'h'代表水平弹幕；'v'代表垂直弹幕

preventingXSS
类型：boolean

默认值：true

是否在用户使用send()方法发送弹幕时防御DomXSS，默认为true

hSpacingFixed
类型：boolean

默认值：false

上下两条弹幕的高度间距是否固定。默认为false，代表高度间距是随机不固定的

方法说明
send(data,callback)
用户发送弹幕方法。

data：【必选】一条弹幕的内容，类型string

callback(cval)：【可选】发送弹幕成功的回调方法，类型function。其中参数cval为防御DomXSS后弹幕的最终文本

triggerSend(params,callback)
前端开发同学模拟用户发送普通弹幕方法。

params：【必选】API调用的参数，类型object，含有3个属性，分别为data、sendid、insert；

params.data：【必选】一条弹幕的内容，类型string（当uniqueTagName为空时）或object（当uniqueTagName不为空时，data格式为{'comment':'',uniqueTagName:''}）

params.sendid：【可选】模拟用户发送普通弹幕时，每条弹幕添加的标识号(不同弹幕的标识号可以相同)，在aDanMuCreated参数方法中会抛出每条弹幕的el，我们通过$(el).data('sendid')即可获得我们模拟弹幕设置的sendid，类型string或number

params.insert：【可选】代表模拟用户发送的普通弹幕是否存入普通弹幕集合的数组中，用于loop为true的弹幕下次循环时播放显示，默认不存入数组，类型boolean

callback()：【可选】发送弹幕成功的回调方法，类型function

注：在send方法中，如果用户发送弹幕过快会给予提示；在triggerSend方法中则不会提示发送弹幕过快。

append(data,callback)
追加弹幕方法。

data：【必选】弹幕数组，类型array

callback()：【可选】追加弹幕成功的回调方法，类型function

pause(callback)
暂停弹幕方法。

callback()：【可选】暂停弹幕成功的回调方法，类型function

play(callback)
播放弹幕方法。

callback()：【可选】播放弹幕成功的回调方法，类型function

 
 */ 
function aDanMu(f) {
    this.opt = {
        danMuHtml: '<span style="display:block;color:#f00;">Welcome to use TGideas danmu component.</span>',
        className: "",
        danMuStage: null,
        hSpacing: 0,
        flyTime: 0
    };
    if ("object" === typeof f)
        for (var g in f)
            this.opt[g] = f[g];
    this.danMuStage = this.opt.danMuStage;
    this.getCss = function() {
        this.h = "m" === this.danMuStage.opt.device ? "v" === this.danMuStage.opt.direction ? $(this.dom).width() : $(this.dom).height() : "v" === this.danMuStage.opt.direction ? $(this.dom).outerWidth() : $(this.dom).outerHeight();
        this.danMuStage.position.y += this.h * ((this.danMuStage.opt.hSpacingFixed ? 0 : Math.random()) + 1 + this.opt.hSpacing);
        this.w = "m" === this.danMuStage.opt.device ? "v" === this.danMuStage.opt.direction ? $(this.dom).height() : $(this.dom).width() : "v" === this.danMuStage.opt.direction ? $(this.dom).outerHeight() : $(this.dom).outerWidth();
        $(this.dom).data("outer-w", this.w);
        return this
    }
    ;
    this.setCss = function(e) {
        this.dom.style.visibility = "visible";
        this.danMuStage.position.y > ("m" === this.danMuStage.opt.device ? "v" === this.danMuStage.opt.direction ? this.danMuStage.obj.width() : this.danMuStage.obj.height() : "v" === this.danMuStage.opt.direction ? this.danMuStage.obj.outerWidth() : this.danMuStage.obj.outerHeight()) - this.h * (1 + this.opt.hSpacing) && (this.danMuStage.position.y = this.h * ((this.danMuStage.opt.hSpacingFixed ? 0 : Math.random()) + 1 + this.opt.hSpacing));
        e ? (this.dom.style.top = ("m" === this.danMuStage.opt.device ? "v" === this.danMuStage.opt.direction ? this.danMuStage.obj.width() : this.danMuStage.obj.height() : "v" === this.danMuStage.opt.direction ? this.danMuStage.obj.outerWidth() : this.danMuStage.obj.outerHeight()) / 2 - this.h / 2 + "px",
        this.dom.style.zIndex = 998) : (this.dom.style.top = this.danMuStage.position.y - this.h + "px",
        this.dom.style.zIndex = 999);
        return this
    }
    ;
    this.create = function(e, f, b, a, c) {
        b = b ? "color:" + b + ";border-color:" + b + ";" : "";
        var d = Number("m" === this.danMuStage.opt.device ? "v" === this.danMuStage.opt.direction ? this.danMuStage.obj.height() : this.danMuStage.obj.width() : "v" === this.danMuStage.opt.direction ? this.danMuStage.obj.outerHeight() : this.danMuStage.obj.outerWidth()) + this.danMuStage.opt.distanceToStage;
        this.dom = document.createElement("div");
        this.opt.className ? this.dom.className = this.opt.className : null;
        this.dom.innerHTML = "" !== e ? e : this.opt.danMuHtml;
        this.dom.style.cssText = "white-space:nowrap;position:absolute;visibility:hidden;top:0;left:" + d + "px;" + b;
        this.danMuStage.dom.appendChild(this.dom);
        this.getCss();
        this.setCss(f);
        $(this.dom).data("init-left", d);
        "undefined" !== typeof c && $(this.dom).data("sendid", c);
        "function" !== typeof this.danMuStage.opt.aDanMuCreated || f || (this.danMuStage.opt.aDanMuCreated(this.danMuStage.normalDmIndex, this.dom, this.opt.className),
        this.danMuStage.normalDmIndex += 1);
        this.fly();
        0 !== a ? 12 === a ? this.pause() : 1 === a ? f ? null : this.pause() : 2 === a ? f ? this.pause() : null : null : null;
        return this
    }
    ;
    this.fly = function(e) {
        if (e)
            var f = e;
        else
            e = -(this.w + 100 * Math.ceil(5 * Math.random())),
            $(this.dom).data("ani-left", e),
            f = e;
        return "m" === this.danMuStage.opt.device ? ($(this.dom).data("dmid", "dm-" + this.danMuStage.dmId),
        e = this.dom.cloneNode(!0),
        $(e).data("dmid", "dm-temp-" + this.danMuStage.dmId).addClass("dmtemp"),
        this.dom.style.display = "none",
        this.dom.parentNode.insertBefore(e, this.dom),
        this.danMuStage.dmId += 1,
        f = "left" === this.danMuStage.opt.mAnimation ? {
            left: f + "px"
        } : {
            translate3d: f - Number($(e).data("init-left")) + "px,0,0"
        },
        $(e).animate(f, this.opt.flyTime, "linear", function() {
            var b = $(this)
              , a = b.data("dmid").split("dm-temp-")[1]
              , c = b.data("init-left") + "px"
              , a = $("div[data-dmid='dm-" + a + "']");
            c === a.css("left") && a.remove();
            b.remove()
        })) : $(this.dom).animate({
            left: f + "px"
        }, this.opt.flyTime, "linear", function() {
            $(this).remove()
        })
    }
    ;
    this.pause = function() {
        var e = this;
        return "m" === e.danMuStage.opt.device ? !1 : $(e.dom).hover(function() {
            e.danMuStage.isStop || $(this).stop()
        }, function() {
            if (!e.danMuStage.isStop) {
                var f = Number($(this).css("left").split("px")[0])
                  , b = Number($(this).data("init-left"))
                  , a = Number($(this).data("ani-left"));
                e.fly(a - b + f)
            }
        })
    }
}

function danMu(f) {
    this.opt = {
        device: "pc",
        randomSort: !1,
        danMuHtml: "",
        alwaysDanMuHtml: "",
        danMuClassName: "danmu",
        myDanMuClassName: "mydanmu",
        alwaysDanMuClassName: "alwaysdanmu",
        stage: $(".danmustage"),
        hSpacing: .2,
        hSpacingFixed: !1,
        flyTime: 1E4,
        timeInterval: 3E3,
        alwaysLoopTime: 1E4,
        leastNum: 4,
        colors: ["#fff"],
        comments: [],
        loop: !0,
        autoplay: !0,
        mouseoverpause: !0,
        awmouseoverpause: !1,
        danMuOverAlwaysLoop: !0,
        cookieName: "TGideasDanMu",
        cookieExp: 3650,
        localDanMuRandomInsert: !0,
        localDanMuNotRandomIndex: 3,
        localDanMuHasMyStyle: !1,
        appendRepeat: !1,
        myDanMuPrefix: "\u6211\uff1a", //我：
        type: 1,
        uniqueTagName: "",
        userId: "",
        showMyStyle: !1,
        submitSuccessCallback: !1,
        aDanMuCreated: function() {},
        sendIfStopTips: "\u5f39\u5e55\u5df2\u7ecf\u6682\u505c\u6216\u5173\u95ed\uff0c\u4e0d\u80fd\u53d1\u5e03\uff01",
        sendIfFastTips: "\u60a8\u53d1\u5e03\u5f39\u5e55\u7684\u901f\u5ea6\u592a\u5feb\u4e86\uff0c\u8bf7\u6b47\u4e00\u4f1a\uff01",
        distanceToStage: 50,
        mAnimation: "transform",
        direction: "h",
        preventingXSS: !0
    };
    if ("object" === typeof f) {
        for (var g in f)
            this.opt[g] = f[g];
        "" === $.trim(this.opt.danMuClassName) ? this.opt.danMuClassName = "danmu" : null;
        "" === $.trim(this.opt.myDanMuClassName) ? this.opt.myDanMuClassName = "mydanmu" : null;
        "" === $.trim(this.opt.alwaysDanMuClassName) ? this.opt.alwaysDanMuClassName = "alwaysdanmu" : null
    }
    if ("m" === this.opt.device) {
        if (!window.Zepto) {
            alert("\u6839\u636e\u60a8\u7684\u914d\u7f6e\uff0c\u60a8\u76ee\u524d\u5b9e\u4f8b\u5316\u7684\u662f\u79fb\u52a8\u7aef\u7684\u5f39\u5e55\uff0c\u8bf7\u5148\u5f15\u5165Zepto\uff01");
            return
        }
    } else if (!window.jQuery) {
        alert("\u6839\u636e\u60a8\u7684\u914d\u7f6e\uff0c\u60a8\u76ee\u524d\u5b9e\u4f8b\u5316\u7684\u662fpc\u7aef\u7684\u5f39\u5e55\uff0c\u8bf7\u5148\u5f15\u5165jQuery\uff01");
        return
    }
    this.curIndex = this.curCommentsIndex = this.dmId = this.normalDmIndex = 0;
    this.isStop = this.isOver = !1;
    this.comments = [];
    this.obj = this.opt.stage;
    this.dom = this.opt.stage[0];
    this.sendStatus = !0;
    this.myDanMu = [];
    this.awDanMuHtmlCurIndex = 0;
    this.position = {
        x: 0,
        y: 0
    };
    this.dom.style.position = "static" == this.obj.css("position") ? "relative" : this.obj.css("position");
    this.dom.style.overflow = "hidden";
    this.util = {
        cfg: {
            cUrl: window.location.href.toLocaleLowerCase().replace(/\./g, "[dm]"),
            cDomain: window.location.host.toLocaleLowerCase().replace(/\./g, "_")
        },
        getCurTransformVal: function(b) {
            var a = window.getComputedStyle(b, null) ? window.getComputedStyle(b, null) : b.currentStyle ? b.currentStyle : !1;
            if (!a)
                return !1;
            a = a.webkitTransform ? a.webkitTransform : a.transform ? a.transform : a.oTransform ? a.oTransform : a.mozTransform ? a.mozTransform : a.msTransform ? a.msTransform : !1;
            if (!a)
                return !1;
            a = "string" === typeof a ? a : !1;
            if (!a)
                return !1;
            b = Number($(b).data("init-left"));
            return -1 !== a.indexOf("matrix3d") ? Number(a.split(", ")[12]) + b : -1 !== a.indexOf("matrix") ? Number(a.split(", ")[4]) + b : !1
        },
        random: function(b, a) {
            return Math.floor(Math.random() * (a - b + 1) + b)
        },
        getCookie: function(b) {
            if (0 < document.cookie.length) {
                var a = document.cookie.indexOf(b + "=");
                if (-1 != a)
                    return a = a + b.length + 1,
                    b = document.cookie.indexOf(";", a),
                    -1 == b && (b = document.cookie.length),
                    unescape(document.cookie.substring(a, b))
            }
            return ""
        },
        setCookie: function(b, a, c) {
            var d = new Date;
            d.setDate(d.getDate() + c);
            document.cookie = b + "=" + escape(a) + (null == c ? "" : "; expires=" + d.toGMTString())
        },
        randomSort: function(b) {
            if (0 < b.length) {
                for (var a = [], c = 0; c < b.length; c++)
                    a[c] = b[c];
                a.sort(function() {
                    return .5 - Math.random()
                });
                return a
            }
            return b
        },
        scriptLoader: function() {
            var b = document.getElementsByTagName("script")[0]
              , a = b.parentNode
              , c = /ded|co/
              , d = function(d, e, f) {
                var h = document.createElement("script");
                h.charset = f;
                h.onload = h.onreadystatechange = function() {
                    if (!this.readyState || c.test(this.readyState))
                        h.onload = h.onreadystatechange = null,
                        e && e(h),
                        h = null
                }
                ;
                h.async = !0;
                h.src = d;
                a.insertBefore(h, b)
            };
            return function(a, b, c) {
                c = c || "gb2312";
                if ("string" == typeof a)
                    d(a, b, c);
                else {
                    var e = a.shift();
                    d(e, function() {
                        a.length ? scriptLoader(a, b, c) : b && b()
                    }, c)
                }
            }
        }(),
        countJsRequest: function() {},
        preventingXSS: function(b) {
            for (var a = [["<", "&lt;"], [">", "&gt;"], ["'", "&#39;"], ['"', "&quot;"], ["`", "&#96;"]], c = 0; c < a.length; c++) {
                var d = eval("/" + a[c][0] + "/g");
                b = b.replace(d, a[c][1])
            }
            return b
        }
    };
    this.createDanMu = function(b, a, c, d) {
        if (!this.isStop) {
            c = new aDanMu({
                className: c ? this.opt.myDanMuClassName : a ? this.opt.alwaysDanMuClassName : this.opt.danMuClassName,
                danMuStage: this,
                hSpacing: this.opt.hSpacing,
                flyTime: this.opt.flyTime
            });
            var e = this.opt.colors[parseInt(Math.random() * this.opt.colors.length)]
              , f = this.opt.mouseoverpause && this.opt.awmouseoverpause ? 12 : this.opt.mouseoverpause ? 1 : this.opt.awmouseoverpause ? 2 : 0;
            a ? "undefined" !== typeof d ? c.create(b, !0, !1, f, d) : c.create(b, !0, !1, f) : "undefined" !== typeof d ? c.create(b, !1, e, f, d) : c.create(b, !1, e, f)
        }
    }
    ;
    this.createAllDanMu = function(b, a, c) {
        var d = this;
        if (d.opt.autoplay) {
            var e = 0;
            d.obj.find("." + d.opt.danMuClassName).each(function(a, b) {
                0 < Number($(b).data("outer-w")) + Number($(b).css("left").split("px")[0]) && (e += 1)
            });
            d.obj.find("." + d.opt.myDanMuClassName).each(function(a, b) {
                0 < Number($(b).data("outer-w")) + Number($(b).css("left").split("px")[0]) && (e += 1)
            });
            if (1 === d.opt.type)
                var f = c ? 0 : 0 == d.curIndex ? 0 : d.opt.timeInterval * Math.random();
            else
                d.curIndex > d.opt.leastNum ? d.curIndex = e < d.opt.leastNum ? 0 : d.curIndex : null,
                f = c ? 0 : d.opt.timeInterval * d.curIndex;
            setTimeout(function() {
                var c = d.comments[d.curCommentsIndex];
                void 0 !== c && (b ? c[b] == a && d.opt.showMyStyle ? d.createDanMu(d.opt.danMuHtml.replace(/{userId}/g, c[b]).replace(/{comment}/g, d.opt.myDanMuPrefix + c.comment), !1, !0) : d.createDanMu(d.opt.danMuHtml.replace(/{userId}/g, c[b]).replace(/{comment}/g, c.comment), !1, !1) : c.self ? d.createDanMu(d.opt.danMuHtml.replace(/{comment}/g, d.opt.myDanMuPrefix + c.comment), !1, !0) : d.createDanMu(d.opt.danMuHtml.replace(/{comment}/g, c.comment), !1, !1));
                c = null;
                d.curCommentsIndex += 1;
                d.curIndex += 1;
                d.curCommentsIndex < d.comments.length ? d.isStop || (b ? d.createAllDanMu(b, a) : d.createAllDanMu()) : d.opt.loop ? setTimeout(function() {
                    d.curCommentsIndex = 0;
                    d.curIndex = 0;
                    d.isStop || (b ? d.createAllDanMu(b, a) : d.createAllDanMu())
                }, f + d.opt.timeInterval) : (d.isOver = !0,
                d.curIndex = 0)
            }, f)
        } else
            d.isStop = !0
    }
    ;
    this.send = function(b, a) {
        if (this.isStop)
            alert(this.opt.sendIfStopTips);
        else if (this.sendStatus) {
            this.sendStatus = !1;
            b = $.trim(b);
            this.opt.preventingXSS && (b = this.util.preventingXSS(b));
            if (this.opt.uniqueTagName) {
                var c = {
                    comment: b
                };
                c[this.opt.uniqueTagName] = this.opt.userId;
                this.myDanMu.push(c);
                this.createDanMu(this.opt.danMuHtml.replace(/{userId}/g, c[this.opt.uniqueTagName]).replace(/{comment}/g, this.opt.myDanMuPrefix + c.comment), !1, !0)
            } else
                c = {
                    comment: b,
                    self: !0
                },
                this.myDanMu.push(c),
                this.createDanMu(this.opt.danMuHtml.replace(/{comment}/g, this.opt.myDanMuPrefix + c.comment), !1, !0),
                this.opt.cookieName && this.util.setCookie(this.opt.cookieName, JSON.stringify(this.myDanMu), this.opt.cookieExp);
            c = null;
            if ("function" === typeof a) {
                var d = this;
                d.opt.submitSuccessCallback ? a(b, function() {
                    d.sendStatus = !0
                }) : (a(b),
                d.sendStatus = !0)
            } else
                this.sendStatus = !0;
        } else
            alert(this.opt.sendIfFastTips)
    }
    ;
    this.triggerSend = function(b, a) {
        var c = function(a) {
            console = console || {
                log: function() {}
            };
            console.log(a)
        };
        if ("object" !== typeof b)
            c("Parameter format error!");
        else {
            var d = b.data
              , e = b.sendid;
            b = b.insert;
            if (this.isStop)
                c("The danmu has stopped.");
            else {
                if (this.opt.uniqueTagName)
                    if ("object" === typeof d && "undefined" !== typeof d.comment && "undefined" !== typeof d[this.opt.uniqueTagName])
                        c = d,
                        b && this.comments.push(c),
                        "undefined" !== typeof e ? this.createDanMu(this.opt.danMuHtml.replace(/{userId}/g, c[this.opt.uniqueTagName]).replace(/{comment}/g, c.comment), !1, !1, e) : this.createDanMu(this.opt.danMuHtml.replace(/{userId}/g, c[this.opt.uniqueTagName]).replace(/{comment}/g, c.comment), !1, !1),
                        c = null;
                    else {
                        c("Data format error!");
                        return
                    }
                else
                    c = {
                        comment: $.trim(d),
                        self: !1
                    },
                    b && this.comments.push(c),
                    "undefined" !== typeof e ? this.createDanMu(this.opt.danMuHtml.replace(/{comment}/g, c.comment), !1, !1, e) : this.createDanMu(this.opt.danMuHtml.replace(/{comment}/g, c.comment), !1, !1),
                    c = null;
                "function" === typeof a && (this.opt.submitSuccessCallback ? a(function() {}) : a())
            }
        }
    }
    ;
    this.pause = function(b) {
        var a = this;
        a.isStop || (a.isStop = !0,
        "m" === a.opt.device ? a.obj.find("." + a.opt.danMuClassName + ",." + a.opt.myDanMuClassName + ",." + a.opt.alwaysDanMuClassName).each(function(b, d) {
            if (!$(d).hasClass("dmtemp")) {
                b = $(d)[0];
                var c = $(d).data("dmid").split("dm-")[1]
                  , c = $("div[data-dmid='dm-temp-" + c + "']");
                "left" === a.opt.mAnimation ? (c[0] && ($(d).css("left", c[0].offsetLeft + "px"),
                c.remove()),
                b.style.display = "block") : c[0] && (a.util.getCurTransformVal(c[0]) ? ($(d).css("left", a.util.getCurTransformVal(c[0]) + "px"),
                c.remove(),
                b.style.display = "block") : c[0].style.visibility = "hidden")
            }
        }) : a.obj.find("." + a.opt.danMuClassName + ",." + a.opt.myDanMuClassName + ",." + a.opt.alwaysDanMuClassName).stop(),
        "function" === typeof b && b())
    }
    ;
    this.play = function(b) {
        var a = this;
        if (a.isStop) {
            a.isStop = !1;
            a.opt.autoplay || ("string" === typeof a.opt.alwaysDanMuHtml && "" !== a.opt.alwaysDanMuHtml ? a.createDanMu(a.opt.alwaysDanMuHtml, !0, !1) : a.opt.alwaysDanMuHtml.constructor === Array && 0 < a.opt.alwaysDanMuHtml.length && (a.createDanMu(a.opt.alwaysDanMuHtml[a.awDanMuHtmlCurIndex], !0, !1),
            a.awDanMuHtmlCurIndex = a.awDanMuHtmlCurIndex < a.opt.alwaysDanMuHtml.length - 1 ? a.awDanMuHtmlCurIndex + 1 : 0),
            a.opt.autoplay = !0);
            if ("m" === a.opt.device) {
                var c = a.obj.find(".dmtemp");
                0 < c.length ? c.each(function(a, b) {
                    b.style.visibility = "visible"
                }) : a.obj.find("." + a.opt.danMuClassName + ",." + a.opt.myDanMuClassName + ",." + a.opt.alwaysDanMuClassName).each(function(b, c) {
                    b = Number($(c).css("left").split("px")[0]);
                    var d = Number($(c).data("init-left"))
                      , e = Number($(c).data("ani-left"))
                      , e = e - d + b
                      , d = $(c)[0]
                      , f = $(c).data("dmid").split("dm-")[1];
                    c = d.cloneNode(!0);
                    $(c).data("dmid", "dm-temp-" + f).addClass("dmtemp").data("init-left", b);
                    d.style.display = "none";
                    d.parentNode.insertBefore(c, d);
                    b = "left" === a.opt.mAnimation ? {
                        left: e + "px"
                    } : {
                        translate3d: e - Number($(c).data("init-left")) + "px,0,0"
                    };
                    $(c).animate(b, a.opt.flyTime, "linear", function() {
                        var a = $(this)
                          , b = a.data("dmid").split("dm-temp-")[1]
                          , c = a.data("init-left") + "px"
                          , b = $("div[data-dmid='dm-" + b + "']");
                        c === b.css("left") && b.remove();
                        a.remove()
                    })
                })
            } else
                a.obj.find("." + a.opt.danMuClassName + ",." + a.opt.myDanMuClassName + ",." + a.opt.alwaysDanMuClassName).each(function(b, c) {
                    b = Number($(c).css("left").split("px")[0]);
                    var d = Number($(c).data("init-left"))
                      , e = Number($(c).data("ani-left"))
                      , e = e - d + b;
                    $(c).animate({
                        left: e + "px"
                    }, a.opt.flyTime, "linear", function() {
                        $(this).remove()
                    })
                });
            !a.isOver && a.curCommentsIndex < a.comments.length && (a.opt.uniqueTagName ? a.createAllDanMu(a.opt.uniqueTagName, a.opt.userId) : a.createAllDanMu());
            "function" === typeof b && b()
        }
    }
    ;
    this.append = function(b, a) {
        var c = function() {
            console = console || {
                log: function() {}
            };
            console.log("Data format error!")
        };
        if (b.constructor === Array && 0 < b.length) {
            if (this.opt.uniqueTagName)
                if ("object" === typeof b[0] && "undefined" !== typeof b[0].comment && "undefined" !== typeof b[0][this.opt.uniqueTagName]) {
                    for (var c = this.myDanMu, d = 0; d < b.length; d++) {
                        for (var e = $.trim(b[d].comment), f = b[d][this.opt.uniqueTagName], g = 0, k = 0; k < c.length; k++) {
                            var l = c[k].comment;
                            if (c[k][this.opt.uniqueTagName] == f && l == e) {
                                g += 1;
                                break
                            }
                        }
                        0 == g && this.comments.push(b[d])
                    }
                    c = null
                } else {
                    c();
                    return
                }
            else if ("undefined" !== typeof b[0]) {
                c = this.comments.concat(this.myDanMu);
                for (d = 0; d < b.length; d++) {
                    e = $.trim(b[d]);
                    g = 0;
                    if (!this.opt.appendRepeat)
                        for (k = 0; k < c.length; k++)
                            if (l = c[k].comment,
                            l == e) {
                                g += 1;
                                break
                            }
                    0 == g && this.comments.push({
                        comment: b[d],
                        self: !1
                    })
                }
                c = null
            } else {
                c();
                return
            }
            this.isOver && this.curCommentsIndex < this.comments.length && (this.opt.uniqueTagName ? this.createAllDanMu(this.opt.uniqueTagName, this.opt.userId) : this.createAllDanMu(),
            this.isOver = !1);
            "function" === typeof a && a()
        } else
            c()
    }
    ;
    if ("string" === typeof this.opt.alwaysDanMuHtml && "" !== this.opt.alwaysDanMuHtml) {
        var e = this;
        e.opt.autoplay ? e.createDanMu(e.opt.alwaysDanMuHtml, !0, !1) : e.isStop = !0;
        setInterval(function() {
            e.isOver ? e.opt.danMuOverAlwaysLoop && !e.isStop && e.createDanMu(e.opt.alwaysDanMuHtml, !0, !1) : e.isStop || e.createDanMu(e.opt.alwaysDanMuHtml, !0, !1)
        }, e.opt.alwaysLoopTime)
    } else
        this.opt.alwaysDanMuHtml.constructor === Array && 0 < this.opt.alwaysDanMuHtml.length && (e = this,
        e.opt.autoplay ? (e.createDanMu(e.opt.alwaysDanMuHtml[e.awDanMuHtmlCurIndex], !0, !1),
        e.awDanMuHtmlCurIndex = e.awDanMuHtmlCurIndex < e.opt.alwaysDanMuHtml.length - 1 ? e.awDanMuHtmlCurIndex + 1 : 0) : e.isStop = !0,
        setInterval(function() {
            e.isOver ? e.opt.danMuOverAlwaysLoop && !e.isStop && (e.createDanMu(e.opt.alwaysDanMuHtml[e.awDanMuHtmlCurIndex], !0, !1),
            e.awDanMuHtmlCurIndex = e.awDanMuHtmlCurIndex < e.opt.alwaysDanMuHtml.length - 1 ? e.awDanMuHtmlCurIndex + 1 : 0) : e.isStop || (e.createDanMu(e.opt.alwaysDanMuHtml[e.awDanMuHtmlCurIndex], !0, !1),
            e.awDanMuHtmlCurIndex = e.awDanMuHtmlCurIndex < e.opt.alwaysDanMuHtml.length - 1 ? e.awDanMuHtmlCurIndex + 1 : 0)
        }, e.opt.alwaysLoopTime));
    if (0 == this.opt.comments.length)
        this.isOver = !0;
    else {
        this.opt.randomSort && (this.opt.comments = this.util.randomSort(this.opt.comments));
        if (this.opt.uniqueTagName)
            this.comments = this.opt.comments,
            this.position.y = 0,
            this.createAllDanMu(this.opt.uniqueTagName, this.opt.userId);
        else {
            for (f = 0; f < this.opt.comments.length; f++)
                g = {
                    comment: this.opt.comments[f],
                    self: !1
                },
                this.comments.push(g),
                g = null;
            if (this.opt.cookieName && (f = this.util.getCookie(this.opt.cookieName))) {
                g = "undefined" === typeof JSON ? eval("(" + f + ")") : JSON.parse(f);
                var l = g.length;
                this.myDanMu = g.concat(this.myDanMu);
                if (!this.opt.localDanMuHasMyStyle)
                    for (f = 0; f < l; f++)
                        g[f].self = !1;
                if (this.opt.localDanMuRandomInsert)
                    for (f = 0; f < l; f++)
                        this.comments.splice(this.util.random(1, this.comments.length), 0, g[f]);
                else if (this.comments.length >= this.opt.localDanMuNotRandomIndex - 1)
                    for (f = 0; f < l; f++)
                        this.comments.splice(f + (this.opt.localDanMuNotRandomIndex - 1), 0, g[f]);
                else
                    this.comments = g.concat(this.comments)
            }
            this.position.y = 0;
            this.createAllDanMu()
        }
    }
};
