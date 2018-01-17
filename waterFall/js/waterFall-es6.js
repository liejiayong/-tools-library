/**
 * @name: js 瀑布流
 * @description: 使用es6改造封装的瀑布流。实现的功能有：可配置参数、图片大小随窗口改变、可接受图片数据、自适应
 * @author: 家永(809206619@qq.com | liejystephen@gmail.com)
 * @update: 2017-01-10 --:--
 */
class WaterFall {
    constructor(options) {
        this.vm = this;
        this.options = this._extend(this.defaultOption, options);
        this.parentObj = document.querySelector(this.options.containerCls);
        this.subParentObj = document.querySelector(this.options.subContainerCls);
        this.childObj = document.querySelectorAll(this.options['childCls']);
        this.childCls = this.options['childCls'].substr(1);
        this.subChildCls = this.options['subChildCls'].substr(1);
        this._init();
    }

    calculateImageWidth() {
        let viewportWidth = this.getDOMWidth(this.parentObj),
            columns = this.getColumns(),
            boxWidth = viewportWidth - (columns * this.getGutter(this.childObj));
        return Math.floor(boxWidth / columns);
    }

    getColumns() {
        const viewportWidth = this.getDOMWidth(this.parentObj)
        let ret = viewportWidth >= 1024 ? this.options['columns'] : viewportWidth >= 600 ? this.options['columnsPad'] : this.options['columnsMobile'];
        return ret;
    }

    getGutter(obj) {
        let gutter = 0,
            dom = obj.length > 1 ? obj[0] : obj,
            css = {
                marginLeft: "",
                marginRight: "",
                paddingLeft: "",
                paddingRight: ""
            };
        const walker = document.createTreeWalker(dom, NodeFilter.SHOW_ELEMENT, null, false);
        let node = walker.nextNode();

        gutter += getCSS(dom, css, this);

        while (node !== null) {
            gutter += getCSS(dom, css, this);
            node = walker.nextNode();
        }

        function getCSS(node, css, that) {
            css.marginLeft = that._getStyle(node, 'margin-left');
            css.marginRight = that._getStyle(node, 'margin-right');
            css.paddingLeft = that._getStyle(node, 'padding-left');
            css.paddingRight = that._getStyle(node, 'padding-right');
            return that._toInt(css.marginLeft) + that._toInt(css.marginRight) + that._toInt(css.paddingLeft) + that._toInt(css.paddingRight);
        }

        return gutter;
    }

    /**
     *  获取dom可视区宽度
     * @param obj 所获取的dom对象
     * @returns {number} 返回宽度
     */
    getDOMWidth(obj) {
        return obj.clientWidth;
    }

    setImagePosition() {
        let imageWidth = this.calculateImageWidth(),
            viewportWidth = this.getDOMWidth(this.parentObj),
            columns = this.getColumns(),
            childObj = document.querySelectorAll(this.options['childCls']),
            subParentObj = document.querySelector(this.options['subContainerCls']);

        let boxHeight = [],minHeight, minIndex;
        setBoxPosition(columns, this);

        function setBoxPosition(columns, that) {
            subParentObj.style.cssText = `;width:${viewportWidth}px;margin: 0 auto;`;
            for (let i = 0; i < childObj.length; i++) {
                let image = childObj[i].querySelector('img');
                image.style.cssText = `;width:${imageWidth}px;`;
                if (i < columns) {
                    childObj[i].style.cssText = "";
                    boxHeight.push( childObj[i].offsetHeight);
                } else {
                    minHeight = Math.min.apply(null, boxHeight);
                    minIndex = that.getMinHeightIndex(boxHeight, minHeight);
                    childObj[i].style.cssText = `;position:absolute;left:${childObj[minIndex].offsetLeft}px;top:${minHeight}px`;
                    boxHeight[minIndex] = boxHeight[minIndex] + childObj[i].offsetHeight;
                }
            }
        }
    }

    getMinHeightIndex(heightList, minHeight) {
        for (let index in heightList) {
            if (heightList[index] === minHeight) {
                return index;
            }
        }
    }

    isBottom() {
        let _scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            _viewPortHeight = document.documentElement.clientHeight || document.body.clientHeight,
            lastImageBoxTop = this.childObj[this.childObj.length - 1].offsetTop;

        if (lastImageBoxTop < _scrollTop + _viewPortHeight) {
            return true;
        }
    }

    _toInt(str) {
        const reg = /(em|px|rem|%)+$/gi;
        let ret = -1;
        if (reg.test(str)) {
            ret = parseInt(str.replace(reg, ''));
        }
        return ret;
    }

    _getStyle(ele, style) {
        let ret;
        if (window.getComputedStyle) {
            ret = window.getComputedStyle(ele, null).getPropertyValue(style);
        } else {
            if (style === 'opacity') {
                var filter = null;
                // 早期的 IE 中要设置透明度有两个方法：
                // 1、alpha(opacity=0)
                // 2、filter:progid:DXImageTransform.Microsoft.gradient( GradientType= 0 , startColorstr = ‘#ccccc’, endColorstr = ‘#ddddd’ );
                // 利用正则匹配
                filter = ele.style.filter.match(/progid:DXImageTransform.Microsoft.Alpha\(.?opacity=(.*).?\)/i) || ele.style.filter.match(/alpha\(opacity=(.*)\)/i);
                if (filter) {
                    var value = parseFloat(filter);
                    if (!isNaN(value)) {
                        // 转化为标准结果
                        ret = value ? value / 100 : 0;
                    }
                }
                // 透明度的值默认返回 1
                ret = 1;
            } else if (style === 'float') {
                ret = ele.currentStyle.getAttribute("styleFloat");
            } else if ((style === 'width' || style === 'height') && (ele.currentStyle[style] === 'auto')) {
                // 取高宽使用 getBoundingClientRect
                let clientRect = ele.getBoundingClientRect();
                ret = (style === 'width' ? clientRect.right - clientRect.left : clientRect.bottom - clientRect.top) + "px";
            }
            // 其他样式，无需特殊处理
            ret = ele.currentStyle.getAttribute(style);
        }
        return ret;
    }

    _createImage(parentObj, childCls, subChildCls, url) {
        let box = document.createElement('div'),
            boxImage = document.createElement('div'),
            image = document.createElement('img');

        box.className = childCls;
        boxImage.className = subChildCls;
        image.src = url;

        parentObj.appendChild(box);
        box.appendChild(boxImage);
        boxImage.appendChild(image);

    }

    eventList() {
        const vm = this.vm;
        window.addEventListener('resize', function () {
            vm.setImagePosition();
        });

        window.addEventListener('scroll', function () {
           if(vm.isBottom()){
               for (let i = 0; i < vm.options['imageData'].data.length; i++) {
                   let url = vm.options['imageData'].data[i].src;
                   vm._createImage(vm.subParentObj, vm.childCls, vm.subChildCls, url);
               }
           }
           vm.setImagePosition(vm.parentObj, vm.childObj);
        });
    }

    _init() {
        this.setImagePosition(this.parentObj, this.childObj);
        this.eventList();
    }

    _extend(defOption, extOption) {
        let {...ret} = defOption;
        for (let key in extOption) {
            if (ret[key]) {
                ret[key] = extOption[key];
            }
        }
        return ret;
    }
}

WaterFall.prototype.defaultOption = {
    containerCls: '#container',
    subContainerCls: '.content',
    childCls: '.box',
    subChildCls: '.box-img',
    widthGutter: 5,
    columns: 5,
    columnsPad: 3,
    columnsMobile: 2,
    imageData: {data: [{"src": "images/1.jpg"}, {"src": "images/7.jpg"}, {"src": "images/2.jpg"}, {"src": "images/3.jpg"}, {"src": "images/4.jpg"}, {"src": "images/5.jpg"}, {"src": "images/6.jpg"}]}
}