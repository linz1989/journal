/**
 * 全局的数据
 * */
exports.Global = {
    journalId: '', // 电子期刊ID
    pageParams: {},
    tip: null,
    pageHeader: null,
    slideArrow: null,
    swiperArr: [],
    aniEles: [], // 每个swipe下的ani元素
    app: null, // 对app组件中this的引用
    swiper: null, // 对swiper的引用
    baseWidth: null,                           // 页面加载时窗口初始宽度，用于计算页面 scale
    winWidth: null,                             // 页面内容容器的当前宽度--固定20rem
    winHeight: null,                            // 页面的高度
    winScale: 1,                                   // 页面当前的font scale
    userAgent: {                                  // 浏览器UA
        isWX: false,
        isiPhone: false
    },
    init: function () {
        var ua = navigator.userAgent.toLowerCase()
        var _this = this
        var userAgent = _this.userAgent

        window.addEventListener('resize', function () {
            _this.resizeWin()
        })
        _this.resizeWin()

        userAgent.isWX = /micromessenger/.test(ua)
        userAgent.isiPhone = /iPhone/i.test(ua)
        // console.dir(_this.pageHeader)
        _this.tip = document.querySelector('#app-tip')

        var url = location.href.split('?')
        if (url[1]) {
            var tempArr = url[1].split('&')
            var paramArr
            for (var k = 0; k < tempArr.length; k++) {
                paramArr = tempArr[k].split('=')
                if (paramArr.length === 2) {
                    _this.pageParams[paramArr[0]] = paramArr[1]
                }
            }
        }
        _this.journalId = _this.pageParams['journalId']
    },
    // 设置页面标题
    setDocumentTitle: function (title) {
        var _this = this
        var doc = document
        var frame = null
        var ua = _this.userAgent

        document.title = title
        if (ua.isWX || ua.isiPhone) {
            frame = doc.createElement('iframe')
            frame.style.display = 'none'
            frame.onload = function () {
                frame.onload = null
                setTimeout(function () {
                    doc.body.removeChild(frame)
                }, 0)
            }
            frame.src = ''
            doc.body.appendChild(frame)
        }
    },
    resizeWin: function () {
        var _this = this
        var win = window
        var doc = document
        var htmlEl = doc.documentElement
        if (!_this.baseWidth) {
            _this.baseWidth = doc.body.clientWidth || 320
        }
        _this.winWidth = htmlEl.clientWidth || win.innerWidth || doc.body.clientWidth
        _this.winHeight = htmlEl.clientHeight || win.innerHeight
        _this.winWidth = _this.winWidth > 600 ? 600 : (_this.winWidth < 320 ? 320 : _this.winWidth)
        _this.winScale = _this.winWidth / _this.baseWidth
        htmlEl.style.fontSize = _this.winScale * 16 + 'px'
        htmlEl.style.backgroundColor = '#f0f0f0'
    },
    tipShow: function (content, time) {
        var _tip = this.tip
        if (!_tip) {
            _tip = this.tip = document.querySelector('#app-tip')
        }
        _tip.children[0].innerHTML = content
        _tip.classList.add('active')
        setTimeout(function () {
            _tip.classList.remove('active')
        }, (time || 3000))
    },
    localStorage: function (key, value) {
        if (value) localStorage.setItem(key, value)
        else return localStorage.getItem(key)
    }
}
