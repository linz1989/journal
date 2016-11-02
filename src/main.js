import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './app'
import { Global } from './libs/global'
import 'video.js'

Global.init()
Vue.use(VueResource)
Vue.http.options.emulateJSON = true

// 设置vue-resource的inteceptor
Vue.http.interceptors.push(function (request, next) {
    // 设置全局的请求参
    if (request.method.toLowerCase() === 'get') {
        request.params['_'] = (+new Date()) // 时间戳
    }

    // 回调响应函数之前的处理
    next(function (response) {
        return response
    })
})

/* eslint-disable no-new */
new Vue({el: '#app', render: h => h(App)})
