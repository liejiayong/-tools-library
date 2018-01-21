/**
 * @name: js 折叠器collapse
 * @description: ##主要功能
 *1、支持点击收起-张开
 *2、支持点击张开所有
 *3、支持当前只能张开一栏
4、支持当前可以张开多栏
 * @author: 家永(809206619@qq.com | liejystephen@gmail.com)
 * @update: 2018-01-21 01:21
 */
class CollapseFor {
    constructor(container, options) {
        this.name = 'CollapseFor'
        this.currentIndex = 0
        this.eventType = ''
        this.options = options
        this.container = container
        this.collapse = {
            trigger: {},
            collapse: {}
        }
        this._init()
    }

    singleCollapse() {
        const {trigger, collapse} = this.collapse
        let index = this.currentIndex

        for (let i = 0; i < trigger.length; i++) {
            if (trigger[i] === trigger[index] || trigger[i] === trigger[index]) {
                this.toggleClass(trigger[i])
                this.toggle(collapse[i])
            } else {
                this.removeClass(trigger[i], this.options['activeCls'])	
                this.hide(collapse[i])
            }
        }
    }

    allCollapse() {
        const {collapse,trigger} = this.collapse
        let index = this.currentIndex
        this.toggleClass(trigger[index])
        this.toggle(collapse[index])
    }

    collapseMode() {
        if (this.options['mode'].single) {
            this.singleCollapse()
            return
        }

        if (this.options['mode'].all) {
            this.allCollapse()
            return
        }
        this.allCollapse()
    }

    event(e) {
        e = e || window.event
        let target = e.target || window.srcElement
        switch (e.type) {
            case 'touchstart':
                this.eventType = e.type
                this._getCurrentIndex(target)
                this.collapseMode()
                break;
            case 'click':
                if (this.eventType === 'touchstart') {
                    return
                }
                this._getCurrentIndex(target)
                this.collapseMode()
                break;
        }
    }

    listener() {
        this.container.addEventListener('touchstart', (e) => {
            this.event(e)
        }, false)
        this.container.addEventListener('click', (e) => {
            this.event(e)
        }, false)
    }

    show(el) {
        el.style.cssText = this.options['triggerStyle']
    }

    hide(el) {
        el.style.cssText = this.options['defaultStyle']
    }

    toggle(el) {
        if (el.style.display === 'block') {
            this.hide(el)
        } else {
            this.show(el)
        }
    }

    toggleClass(el) {
        const activeCls = this.options['activeCls']
        if (this.hasClass(el, activeCls)) {
            this.removeClass(el, activeCls)
	 }else{
            this.addClass(el, activeCls)
        }
    }

    hasClass(el, cls) {
        let reg = new RegExp(`(^|\\s)${cls}(\\s|$)`)
        return reg.test(el.className)
    }

    addClass(el, cls) {
        if (this.hasClass(el, cls)) {
            return
        }
        let newCls = el.className.split(' ')
        newCls.push(cls)
        el.className = newCls.join(' ')
    }

    removeClass(el, cls) {
        if (!this.hasClass(el, cls)) {
            return
        }
        let reg = new RegExp(`(^|\\s)${cls}(\\s|$)`)
        el.className = el.className.replace(reg, '')
    }

    _getCurrentIndex(target) {
        for (let i = 0; i < this.collapse.trigger.length; i++) {
            if (this.collapse.trigger[i] === target || this.collapse.trigger[i] === target.parentNode) {
                this.currentIndex = i
            }
        }
    }

    _initData() {
        const trigger = this.container.querySelectorAll(this.options['triggerCls']),
            collapse = this.container.querySelectorAll(this.options['collapseCls'])
        this.collapse = {trigger, collapse}
    }

    _extend() {
        const def = CollapseFor.DEFAULT_OPTIONS
        for (var key in def) {
            if (this.options[key]) {
                continue
            }
            this.options[key] = def[key]
        }
    }

    _init() {
        this._extend()
        this._initData()
        this.listener()

    }
}

CollapseFor.DEFAULT_OPTIONS = {
    collapseCls: '.collapse-item-content',
    triggerCls: '.collapse-item-title[data-trigger="collapse"]',
    activeCls: 'active',
    defaultStyle: ';transform-origin: top;transition:height .5s;height: 0;',
    triggerStyle: ';transform-origin: top;transition:height .5s;height:auto;',
    mode: {
        single: false,
        all: false
    }
}