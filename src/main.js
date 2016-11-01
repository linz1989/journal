import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './app'
import { Global } from './libs/global'

Global.init()
Vue.use(VueResource)
Vue.use(VueRouter)
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

var pageRouterList = {
    'home': '',
    'test': ''
}
var optionItem
var pageRouterOption = [] // 构造router

for (var pageName in pageRouterList) {
    optionItem = {
        path: '/' + pageName,
        component: (function (p) {
            return function (resolve) {
                require(['./views/' + p + '.vue'], resolve)
            }
        })(pageName)
    }
    pageRouterOption.push(optionItem)
}

console.log('pageRouterOption:')
console.dir(pageRouterOption)

var pageRouterOptionSecond = [
    {
        path: '/home',
        component: function (resolve) {
            require(['./views/home.vue'], resolve)
        }
    },
    {
        path: '/test',
        component: function (resolve) {
            require(['./views/test.vue'], resolve)
        }
    }
]

console.log('pageRouterOptionSecond:')
console.dir(pageRouterOptionSecond)

// 路由配置
var router = new VueRouter({
    linkActiveClass: 'active',
    routes: pageRouterOption
})

/* eslint-disable no-new */
new Vue({router, render: h => h(App)}).$mount('#app')
// new Vue({el: '#app', render: h => h(App)})
