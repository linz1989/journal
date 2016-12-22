import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import AwesomeSwiper from 'vue-awesome-swiper'
import App from './app'
import { Global } from './libs/global'

// 全局插件
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(AwesomeSwiper)

window['_g'] = Global
Vue.http.options.emulateJSON = true
var global = Global

// 设置vue-resource拦截
Vue.http.interceptors.push(function (request, next) {
    // 设置全局的请求参数
    if (request.method.toLowerCase() == 'get') {
        request.params['_'] = (+new Date()) // 时间戳
    }

    // 回调响应函数之前的处理
    next(function (response) {
        return response
    })
})

global.init()
var routerOption = [
    {
        path: '/1',
        name: 'tmp_1',
        component: function (resolve) {
            require(['./views/1.vue'], resolve)
        }
    },
    {
        path: '/2',
        name: 'tmp_2',
        component: function (resolve) {
            require(['./views/2.vue'], resolve)
        }
    },
    {
        path: '/301',
        name: 'redirect',
        component: function (resolve) {
            require(['./views/301.vue'], resolve)
        }
    },
    {
        path: '/404',
        name: '404',
        component: function (resolve) {
            require(['./views/404.vue'], resolve)
        }
    },
    {
        path: '/', redirect: { name: 'tmp_2' }
    },
    {
        path: '*', redirect: { name: '404' }
    }
]

// 路由配置
var router = new VueRouter({
    linkActiveClass: 'active',
    routes: routerOption
})

// 加载页面之前
router.beforeEach(function (to, from, next) {
    global.pageQuery = to.query
    var body = document.body
    if (/^tmp_/.test(to.name)) {
        body.className = to.name
    } else if (to.name) {
        body.className = 'page_404'
    } else {
        body.className = ''
    }
    next()
})

/* eslint-disable no-new */
new Vue({router, render: h => h(App)}).$mount('#app')
