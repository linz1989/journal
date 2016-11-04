/**
 * 全局的数据
 * */
exports.Global = {
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

        userAgent.isWX = /micromessenger/.test(ua)
        userAgent.isiPhone = /iPhone/i.test(ua)

        _this.pageHeader = document.querySelector('#page-header')
        _this.slideArrow = document.querySelector('#slide-arrow')
        // console.dir(_this.pageHeader)
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
    }
}
