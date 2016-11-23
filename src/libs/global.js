/**
 * 全局的数据
 * */
import Vue from 'vue'

var wx = require('weixin-js-sdk')
console.dir(wx)

exports.Global = {
    journalId: '', // 电子期刊ID
    preview: false, // 是否预览
    likeStatus: 'like',
    pageParams: {},
    tip: null,
    indexPageHeader: null,
    pageHeader: null,
    slideArrow: null,
    swiperArr: [],
    aniEles: [], // 每个00swipe下的ani元素
    app: null, // 对app组件中this的引用
    swiper: null, // 对swiper的引用
    currSlideIndex: 0, // 当前滑动到的silde的index
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
        _this.journalId = _this.pageParams['id']
        _this.preview = _this.pageParams['preview'] == 'true'

        if (_this.localStorage('spa-journal-' + _this.journalId)) {
            _this.likeStatus = 'liked'
        }
        var currIndex = _this.sessionStorage('journal-slide-index-' + _this.journalId)
        if (currIndex) {
            _this.currSlideIndex = parseInt(currIndex)
        }
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
        _this.winWidth = _this.winWidth > 540 ? 540 : (_this.winWidth < 320 ? 320 : _this.winWidth)
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
    },
    sessionStorage: function (key, value) {
        if (value) sessionStorage.setItem(key, value)
        else return sessionStorage.getItem(key)
    },
    shareConfig: function (option) {
        var win = window
        var _this = this
        if (!wx) return
        option = option || {}
        if (wx['signReady']) {
            if (option.title) {
                wx.hideMenuItems({menuList: ['menuItem:copyUrl']})
                wx.showAllNonBaseMenuItem()
                wx.onMenuShareAppMessage(option) // 分享给朋友
                wx.onMenuShareTimeline(option) // 分享到朋友圈
                wx.onMenuShareQQ(option) // 分享到QQ
                wx.onMenuShareWeibo(option) // 分享到腾讯微博
                wx.onMenuShareQZone(option) // 分享到QQ空间
            } else {
                wx.hideAllNonBaseMenuItem() // 屏蔽分享菜单
            }
        } else {
            win['requestSignCount'] = 2
            _this.weiXinCfgSignature(option)
        }
    },

    weiXinCfgSignature: function (option) {
        var loc = location
        var signUrl = loc.origin + loc.pathname + loc.search
        var win = window
        var _this = this

        Vue.http.get('../api/v1/wx/sign', {
            params: {
                url: encodeURIComponent(signUrl),
                sessionType: '9358'
            }
        }).then(function (res) {
            res = res.body
            wx.config({
                debug: false,
                appId: res.appId,
                timestamp: res.timestamp,
                nonceStr: res.nonceStr,
                signature: res.signature,
                jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'hideMenuItems']
            })

            if (!win['wxError']) {
                win['wxError'] = true
                wx.error(function () { // 微信分享配置失败
                    wx['signReady'] = false
                    win['requestSignCount']--
                    if (win['requestSignCount'] !== 0) {
                        _this.weiXinCfgSignature()
                    }
                })
            }

            if (!win['wxReady']) {
                win['wxReady'] = true
                wx.ready(function () {
                    wx['signReady'] = true
                    _this.shareConfig(option)
                })
            }
        })
    }
}
