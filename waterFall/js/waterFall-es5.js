/**
 * @name: js 瀑布流
 * @description: 使用es5对象封装的瀑布流。实现的功能有：可配置参数、图片大小随窗口改变、可接受图片数据，自适应
 * @author: 家永(809206619@qq.com | liejystephen@gmail.com)
 * @update: 2017-09-01 --:--
 */
(function (undefined) {
    var WaterFall = function (options) {
        if (!(this instanceof WaterFall)) return new WaterFall(options);
        this.options = this.extend({}, options);
        var parentObj = document.querySelector(this.options.parentTarget);
        var childObj = document.querySelectorAll(this.options.childTarget);
        var childClassName = childObj[0].className;
        var subChildClassName = childObj[0].childNodes[1].className;
        var padding_ = this.options.padding;
        var imageData = this.options.imgData;
        var that = this;

        imagesLocation(parentObj, childObj);

        window.onscroll = function () {
            if (checkFlag(childObj)) {
                for (var i = 0; i < imageData.data.length; i++) {
                    var imageSrc = imageData.data[i].src;
                    createImages(parentObj, childClassName, subChildClassName, imageSrc);
                }
                imagesLocation(parentObj, childObj)
            }
        }

        window.addEventListener('resize', () => {
            imagesLocation(parentObj, childObj);
        });
        /**
         * 判断最后图片元素是否到底
         * @returns {boolean}
         */
        function checkFlag(childObj) {
            var lastImageBoxTop = childObj[childObj.length - 1].offsetTop;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var viewportHeight = document.documentElement.clientHeight || document.body.clientHeight;
            // console.log(lastImageBoxTop+":"+scrollTop+":"+viewportHeight);
            if (lastImageBoxTop < scrollTop + viewportHeight) {
                return true;
            }
        }

        function createImages(parentObj, childClassName, subChildClassName, imageSrc) {
            var box = document.createElement("div");
            box.className = childClassName;
            parentObj.appendChild(box);
            var boxImage = document.createElement("div");
            boxImage.className = subChildClassName;
            box.appendChild(boxImage);
            var image = document.createElement("img");
            image.src = imageSrc;
            boxImage.appendChild(image);
        }
        /**
         * set imgbox position
         * 操作子元素的瀑布流位置
         * @param parent
         * @param content
         */
         function imagesLocation(parentObj, childObj) {
            var imageWidth = childObj[0].offsetWidth;
            var columns = Math.floor(document.documentElement.clientWidth / imageWidth);
            var boxHeightArr = [];
            var minHeight, minIndex;
            parentObj.style.cssText = "width:" + imageWidth * columns + "px;margin:0 auto";
            for (var i = 0; i < childObj.length; i++) {
                // console.log(childObj[i].offsetLeft)
                if (i < columns) {
                    boxHeightArr[i] = childObj[i].offsetHeight;
                } else {
                    minHeight = Math.min.apply(null, boxHeightArr);
                    minIndex = getMinHeightLocation(boxHeightArr, minHeight);5
                    childObj[i].style.position = "absolute";
                    childObj[i].style.top = minHeight + "px";
                    childObj[i].style.left = childObj[minIndex].offsetLeft + "px";
                    boxHeightArr[minIndex] = boxHeightArr[minIndex] + childObj[i].offsetHeight;
                }
            }
        }
        /**
         * get imgbox min height index
         * 获取高度最小的子元素，并返回子元素的索引index
         * @param boxHeightArr
         * @param minHeight
         * @returns {string}
         */
        function getMinHeightLocation(boxHeightArr, minHeight) {
            for (var index in boxHeightArr) {
                if (boxHeightArr[index] === minHeight) {
                    // console.log(boxHeightArr[index])
                    // console.log(minHeight)
                    return index;
                }
            }
        }


    }
    WaterFall.prototype = {
        /**
         * 继承属性
         * @param resultObj
         * @param optionsObj
         * @returns resultObj
         */
        extend: function (resultObj, optionsObj) {
            for (var opt in optionsObj) {
                resultObj[opt] = optionsObj[opt];
            }
            return resultObj;
        },

    }
    window.WaterFall = WaterFall;
})(window, document);

window.onload = function () {
    WaterFall({
        parentTarget: "#container",
        childTarget: ".box",
        padding: "5px",
        imgData: {data: [{"src": "images/1.jpg"}, {"src": "images/7.jpg"}, {"src": "images/2.jpg"}, {"src": "images/3.jpg"}, {"src": "images/4.jpg"}, {"src": "images/5.jpg"}, {"src": "images/6.jpg"}]}
    });
}