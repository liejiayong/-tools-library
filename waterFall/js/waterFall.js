/**
 * @name: js 瀑布流
 * @description: 函数式的封装了瀑布流。实现的功能有：可配置参数、图片大小随窗口改变
 * @author: 家永(809206619@qq.com | liejystephen@gmail.com)
 * @update: 2017-03-28 --:--
 */
window.onload = function () {

    var imgData = {data: [{"src": "images/1.jpg"}, {"src": "images/7.jpg"}, {"src": "images/2.jpg"}, {"src": "images/3.jpg"}, {"src": "images/4.jpg"}, {"src": "images/5.jpg"}, {"src": "images/6.jpg"}]};

    imageLocation("container", "box");

    window.onscroll = function () {
        if (checkFlag()) {
            var parent = document.getElementById("container");
            for (var i = 0; i < imgData.data.length; i++) {
                var box = document.createElement("div");
                box.className = "box";
                parent.appendChild(box);
                var boxImg = document.createElement("div");
                boxImg.className = "box-img";
                box.appendChild(boxImg);
                var img = document.createElement("img");
                img.src = imgData.data[i].src;
                boxImg.appendChild(img);
            }
            imageLocation("container", "box");
        }
    }

    window.onresize = function () {
        imageLocation("container", "box");
    }
}

/**
 * 判断最后图片元素是否到底
 * @returns {boolean}
 */
function checkFlag() {
    var parent = document.getElementById("container");
    var childObj = getChildElement(parent, "box");
    var lastImageBoxTop = childObj[childObj.length - 1].offsetTop;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var viewportHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // console.log(lastImageBoxTop+":"+scrollTop+":"+viewportHeight);
    if (lastImageBoxTop < scrollTop + viewportHeight) {
        return true;
    }
}

/**
 * set imgbox position
 * 操作子元素的瀑布流位置
 * @param parent
 * @param content
 */
function imageLocation(parent, content) {
    var parentObj = document.getElementById(parent);
    var childObj = getChildElement(parentObj, content);
    var imgWidth = childObj[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / imgWidth);

    parentObj.style.cssText = "width:" + imgWidth * cols + "px;margin:0 auto";

    var boxHeightArr = [];
    for (var i = 0; i < childObj.length; i++) {
        if (i < cols) {
            boxHeightArr[i] = childObj[i].offsetHeight;
        } else {
            var minHeight = Math.min.apply(null, boxHeightArr);
            var minIndex = getMinHeightLocation(boxHeightArr, minHeight);
            childObj[i].style.position = "absolute";
            childObj[i].style.top = minHeight + "px";
            childObj[i].style.left = childObj[minIndex].offsetLeft + "px";
            boxHeightArr[minIndex] = boxHeightArr[minIndex] + childObj[i].offsetHeight;
            console.log(boxHeightArr[minIndex])
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
    for (var i in boxHeightArr) {
        if (boxHeightArr[i] == minHeight) {
            return i;
        }
    }
}

/**get the child element to control their location
 * 获取每一个子元素，用于控制瀑布布局位置
 * @param parent
 * @param content
 * @returns {Array}
 */
function getChildElement(parent, content) {
    var contentArr = [];
    var allContent = parent.getElementsByTagName("*");
    for (var i = 0; i < allContent.length; i++) {
        if (content === allContent[i].className) {
            contentArr.push(allContent[i]);
        }
    }
    return contentArr;
}
