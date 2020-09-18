import Vue from 'vue'
import router from '@/router'
Vue.prototype.$goBack = function (n) {
    if (window.history.length <= 1) {
        router.push({ path: '/' })
        setTimeout(() => {
            router.push({ path: '/' })
        }, 100)
        return false
    } else {
        if (n) {
            router.go(n)
        } else {
            router.back()
        }
    }
}
