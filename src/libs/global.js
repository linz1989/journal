/**
 * 全局的数据
 * */
exports.Global = {
    data: {
        baseWidth: null,                           // 页面加载时窗口初始宽度，用于计算页面 scale
        winWidth: null,                             // 页面内容容器的当前宽度--固定20rem
        winHeight: null,                            // 页面的高度
        winScale: 1,                                   // 页面当前的font scale
        userAgent: {                                  // 浏览器UA
            isWX: false,
            isiPhone: false
        }
    },
    init: function () {
        var ua = navigator.userAgent.toLowerCase()
        var _this = this
        var data = _this.data
        var userAgent = data.userAgent

        userAgent.isWX = /micromessenger/.test(ua)
        userAgent.isiPhone = /iPhone/i.test(ua)
    },
    // 设置页面标题
    setDocumentTitle: function (title) {
        var _this = this
        var doc = document
        var frame = null
        var ua = _this.data.userAgent

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
    }
}
