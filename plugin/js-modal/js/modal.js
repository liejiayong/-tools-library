class Modal {
    constructor(container, options) {
        this.name = 'Modal'
        this.container = container
        this.options = options
        this.DOM = {
            mask: {},
            close: {},
            popBtn: {}
        }
        this._init()
    }

    listener() {
        const {DOM, container} = this
        const {mask, close, popBtn} = DOM
        const actions = {
            hidden() {
                DOM.mask.style.display = 'none'
                container.style.display = 'none'
            },
            show() {
                DOM.mask.style.display = 'block'
                container.style.display = 'block'
            }
        }

        document.addEventListener('click', function (e) {
            e = e || window.event
            let target = e.target || window.srcElement

            switch (target) {
                case mask:
                    actions.hidden()
                    break;
                case close:
                    actions.hidden()
                    break;
                case popBtn:
                    actions.show()
                    break;
            }
        }, false);

        window.addEventListener('resize', () => {
            this.options['deviceClientWidth'] = document.documentElement.clientWidth || body.clientWidth
            this._setDOMStyle()
        })
    }

    _initDOM() {
        const {container, options} = this
        if (!document.querySelector(options['maskCls']) || !container.querySelector(options['closeCls'])) {
            console.log("错误警告：来自Modal-Plugin--请书写正确配置DOM")
            return
        }

        if (document.querySelector(options['modalPopCls'])) {
            this.DOM.popBtn = document.querySelector(options['modalPopCls'])
        }

        this.DOM.mask = document.querySelector(options['maskCls'])
        this.DOM.close = container.querySelector(options['closeCls'])

    }

    _setDOMStyle() {
        const {container, options} = this
        if ((options['modelWidth'] || options['modelHeight']) && options['deviceClientWidth'] > options['breakPoint']) {
            container.style.cssText = `;width:${options['modelWidth']};height:${options['modelHeight']};`
        } else {
            container.style.cssText = ""
        }
    }

    _extend() {
        const def = Modal.DEFAULT_OPTIONS
        for (var key in def) {
            if (this.options[key]) {
                continue
            }
            this.options[key] = def[key]
        }
    }

    _init() {
        this._extend()
        this._initDOM()
        this._setDOMStyle()
        this.listener()
    }
}

Modal.DEFAULT_OPTIONS = {
    maskCls: '.modal-mask',
    closeCls: '.close',
    modalPopCls: '.model-pop',
    breakPoint: '600',
    modelWidth: '',
    modelHeight: '',
    deviceClientWidth: document.documentElement.clientWidth || body.clientWidth,
    containerStyle: ''
}