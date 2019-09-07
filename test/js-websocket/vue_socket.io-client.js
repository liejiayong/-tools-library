import IO from 'socket.io-client'

export default {
    install(Vue, connection = '', options = {}) {
        let socket = null

        if (connection != null && typeof connection === 'object') {
            socket = connection
        } else {
            socket = IO(connection, options)
        }
        socket.on('tess', function(msg) {
            console.log('socket connection:', connection, options)
            socket.emit('test', 'liejiayong')
        })
        // // 1. 添加全局方法或属性
        // Vue.close = function() {
        // }

        // // 2. 添加全局资源
        // Vue.directive('', {
        //     bind(el, binding, vnode, oldVnode) {}
        // })

        // // 3. 注入组件
        // Vue.mixin({})

        // 4. 添加实例方法
        Vue.prototype.$socket = socket
    }
}
