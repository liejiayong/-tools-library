import DialogComponent from './dialog.vue'

const Dialog = {}

let instance = null

// 注册Dialog
Dialog.install = function (Vue, options) {

    Vue.component('jy-dialog', DialogComponent)

    Vue.prototype.$jyDialog = function ({ title = '', content = '', footer = '', okText = '', cancelText = '', style = '', onOk = () => { }, onCancel = () => { }, afterClose = () => { }, overlay = true, maskClosable = false, className = '' }) {
        if (!instance) {
            const Constructor = Vue.extend(DialogComponent)
            instance = new Constructor()
            // 将这个实例挂载在我创建的div上
            instance.$mount()
            // instance.$mount(instance.$el)
            document.body.appendChild(instance.$el)
        }

        instance.value = true
        instance.isPlugin = true
        instance.overlay = overlay
        instance.maskClosable = maskClosable
        instance.className = className
        instance.title = title
        instance.content = content
        instance.footer = footer
        instance.okText = okText
        instance.cancelText = cancelText
        instance.onOk = onOk
        instance.onCancel = onCancel
        instance.styles = style
        instance.afterClose = afterClose
    }
}

export default Dialog
