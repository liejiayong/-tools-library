/**
 * @name: 匹配空格并去掉
 * @description: 匹配匹配空格并去掉
 * @author: 家永(809206619@qq.com | liejystephen@gmail.com)
 * @update: 2017-1-10 --:--
 */

class filterSpace {
    constructor(elList) {
        this.name = 'filterSpace';
        this.elList = elList;
        this._init();
    }

    _init() {
        let clsList = Array.isArray(this.elList) ? this.elList: 'body *';
        let allDom = this._getDom(clsList);
        this._controlElement(allDom);
    }

    _getDom (clsList) {
        const symbol = " *";
        let allDom;
        if( typeof  clsList === 'string'){
            return allDom = document.querySelectorAll(clsList);
        }
        clsList.forEach((item) => {
            let cls = item.concat(symbol);
            if (!document.querySelector(cls)) {
                return
            }
            let dom = document.querySelectorAll(cls);
            [...allDom] = dom;
        });
        return allDom;
    }
    _controlElement(domList) {
        domList.forEach(function (dom) {
            dom.innerHTML = dom.innerHTML.replace(filterSpace.space, ' ');
        });
    }
}

filterSpace.space = /&nbsp;/ig;