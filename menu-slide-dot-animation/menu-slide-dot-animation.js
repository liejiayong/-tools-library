	/**
	 * @name: 菜单栏小动画
	 * @description: 鼠标经过菜单栏时展示小动画
	 * @version: 0.2
	 * @author: liejiayong(809206619@qq.com)
	 * @update: 2017-09-29
 */

;(function (undefined) {
        "use strick"
        var _global,moveFlag = false,lineCls,dotCls,dotOpt,menuOffsetLeft,menuCls,
            def = {
                el: "ul#menu-main-1",
                child: "li",
                menuLine:"menu-line",
                menuDot:"menu-dot",
                dotWidth:"10px",
                dotColor:"#000",
                lineSty:"position:absolute;bottom:0;width:100%;left:0;right:0;border:1px #999 solid;transition:all ease-in .3s",
                lineHoverSty:"position:absolute;bottom:0;width:0;left:50%;right:50%;border:0px #999 solid;transition:all ease-out .3s",
                "animate-in":"all ease-in .3s",
                "animate-out":"all ease-out .3s"
            };
        
        function MenuLine(options) {
            this._inital(options)           
        }

        MenuLine.prototype = {
            constructor: this,
            _inital: function (options) {
                for (i in options) {
                    def[i] = options[i]
                }
                this.itemList = []
                menuCls = document.querySelector(def["el"])
                menuCls.style.position = "relative"
                menuOffsetLeft = menuCls.offsetLeft
                this.child = menuCls.querySelectorAll(def["child"])
                this._getMenuInfo()
                this._createLine()
                this._createDot()
                eventList()
            },
            _getItemPointCoord: function () {
                window.addEventListener("resize", function () {
                    this.itemList = this._getMenuInfo()
                })
            },
            _getMenuInfo: function () {
                var list = [], menuWidth = menuCls.offsetWidth, menuHeight = menuCls.offsetHeight;
                this.child.forEach(function (val, i, arr) {
                    var loca = {
                        w: val.offsetWidth,
                        h: val.offsetHeight,
                        top: val.offsetTop,
                        left: val.offsetLeft,
                        menuWidth: menuWidth,
                        menuHeight: menuHeight
                    }
                    list.push(loca)
                })

                return list
            },
            _createLine: function (options) {
                lineCls = document.createElement("div")
                lineCls.className = def["menuLine"]
                menuCls.appendChild(lineCls)
            },
            _createDot:function (options) {
                dotCls = document.createElement("span")
                dotCls.className = def["menuDot"]
                createStyle(def)
                menuCls.appendChild(dotCls)
            },
        }

        function eventList(){
            eventMouseover();
            eventMousemove();
            eventMouseout();
        }

        function eventCompatibility(e){
            var event = e || window.event
            var tar = event.target || event.srcElement
            return {e:event,target:tar}
        }

        function getLineObj (moveFlag) {
                if (moveFlag) {
                    lineCls.style.cssText = def["lineSty"]
                }else{
                    lineCls.style.cssText = def["lineHoverSty"]
                }
            }

        function createStyle(opt){
            var style = document.createElement("style"),dotWidth = def["dotWidth"].replace(/px/g,"").toString(10)
            style.type = "text/css";
            style.innerHTML = `.${def["menuDot"]}{background-color:${opt.dotColor};width:${opt.dotWidth};height:${opt.dotWidth};border-radius:${opt.dotWidth};left:0;bottom:${-dotWidth/2}px};transition:${def["animate-in"]};}`
            document.head.appendChild(style)
        }

        function dotStatus(event,moveFlag){
            if(event.target.nodeName === "A"){
                    var currLeft,liObj=event.target.parentNode,
                        liObjBoxInfo = {
                            width:liObj.offsetWidth,
                            height:liObj.offsetHeight,
                            left:liObj.offsetLeft,
                            top:liObj.offsetTop,
                            marginTop:liObj.style.marginTop,
                            marginBottom:liObj.style.marginBottom,
                            marginLeft:liObj.style.marginLeft,
                            marginRight:liObj.style.marginRight,
                            paddingTop:liObj.style.paddingTop,
                            paddingBottom:liObj.style.paddingTop,
                            paddingLeft:liObj.style.paddingLeft,
                            paddingRight:liObj.style.paddingRight,
                            borderTop:liObj.style.borderTopWidth,
                            borderBottom:liObj.style.borderBottomWidth,
                            borderLeft:liObj.style.borderLeftWidth,
                            borderRight:liObj.style.borderRightWidth
                        }
                    currLeft = liObjBoxInfo.left+liObjBoxInfo.width/2
                    if(moveFlag){
                        window.requestAnimationFrame(function(){
                            dotCls.style.cssText = `position:absolute;left:${currLeft}px;transition:${def["animate-out"]}`

                        })
                    }else {
                        dotCls.style.cssText = `;position:absolute;left:${currLeft}px;transition:${def["animate-out"]};opacity:0;`
                    }
                }   
        }
        function eventMouseover(){
            menuCls.addEventListener('mouseover',function (e) {
                var event = eventCompatibility(e)
                event.e.preventDefault()
                moveFlag = true
                getLineObj(moveFlag)
        
            })
        }
        function eventMousemove(){
            menuCls.addEventListener('mousemove', function (e) {
                    var event = e || window.event
                    event.preventDefault()
                    moveFlag = true
                    dotStatus(event,moveFlag)
                })
        }
        function eventMouseout(){
            menuCls.addEventListener('mouseout', function (e) {
                    var event = e || window.event
                    event.preventDefault()
                    moveFlag = false
                    getLineObj(moveFlag)
                    dotStatus(event,moveFlag)
                })
        }


        _global = (function () {
            return this || (0, eval)(this)
        }())

        if(typeof module !== "undefined" && module.exports){
            module.exports = MenuLine 
        }else if(typeof define === "function" &&define.amd){
            define(function(){return MenuLine})
        }else{
            !('MenuLine' in _global) && (_global.MenuLine = MenuLine)
        }
    }());
    var options = {
        el: "ul#menu-main-1",
        child: "li"
    }