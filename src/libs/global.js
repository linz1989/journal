/**
 * 全局的数据
 * */
import Vue from 'vue'

var wx = require('weixin-js-sdk')
// console.dir(wx)

exports.Global = {
    journalId: '', // 电子期刊ID
    journalData: null, // 电子期刊数据
    dataUrl: '../api/v2/user/journal/detail', // 获取数据URL
    preview: false, // 是否预览
    likeStatus: 'like', // 点赞的状态
    pageParams: {},
    pageQuery: {},
    pageName: '',
    tip: null,  // tip show元素
    loading: true,
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
        var that = this
        var userAgent = that.userAgent

        window.addEventListener('resize', function () {
            that.resizeWin()
        })
        that.resizeWin()

        userAgent.isWX = /micromessenger/.test(ua)
        userAgent.isiPhone = /iPhone/i.test(ua)
        that.tip = document.querySelector('#app-tip')

        var url = location.href.split('?')
        var params = that.pageParams
        if (url.length > 1) {
            var tempArr = url[url.length - 1].split('&')
            var paramArr
            for (var k = 0; k < tempArr.length; k++) {
                paramArr = tempArr[k].split('=')
                if (paramArr.length === 2) {
                    params[paramArr[0]] = paramArr[1]
                }
            }
        }
        that.journalId = params['id']
        that.preview = params['preview'] == 'true'

        if (that.localStorage('spa-journal-' + that.journalId)) {
            that.likeStatus = 'liked'
        }
    },
    getData: function () {
        var that = this
        return new Promise(function (resolve) {
            if (that.journalData) {
                resolve(that.journalData)
            } else {
                var journalData = that.journalData = {}
                Vue.http.get(that.dataUrl, {params: {journalId: that.journalId, preview: that.preview ? 1 : 0}}).then(function (res) {
                    res = res.body
                    if (res.statusCode == 200) {
                        res = res.respData
                        if (res.title) {
                            journalData = that.journalData = that.doHandlerJournalData(res)
                            resolve(journalData)
                        } else { // 可重定向页面或者error 404
                            journalData.status = (res.journalId || res.clubId) ? 'redirect' : 'error'
                            journalData.newJournalId = res.journalId
                            journalData.clubId = res.clubId
                            resolve(journalData)
                        }
                    } else {
                        journalData.status = 'error' // 404 error
                        resolve(journalData)
                    }
                }, function () {
                    journalData.status = 'error' // 404 error
                    resolve(journalData)
                })
            }
        })
    },
    doHandlerJournalData: function (res) {
        var journalData = {
            status: 'ok', // 期刊数据获取成功
            clubName: res.clubName,
            clubId: res.clubId,
            viewCount: res.viewCount + 1,
            likeCount: res.likeCount,
            title: res.title,
            subTitle: res.subTitle,
            clubImgUrl: res.clubImgUrl
        }
        // 处理slide 数组
        var items = res.items
        var itemData
        var subItemData
        var slideData = []
        var itemObj
        var k

        /* items.push({ // 视频测试
            itemKey: '05',
            title: '我的视频',
            details: {
                playUrl: 'http://vdev.xiaomodo.com/journal/601939365819588608_c3f5c837bd0f91da527464badc8a6c30.mp4'
                // coverUrl: './images/oceans.png'
            }
        }) */

        /* items.push({ // 养身频道
            itemKey: '07',
            title: '养身频道',
            details: {
                content: '养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道养身频道'
            }
        }) */

        /* items.push({
            itemKey: '06',
            title: '优惠活动',
            details: [{
                actAmount: 158,
                actCredit: 0,
                actId: '809645267476312064',
                actImgUrl: 'http://sdcm162.stonebean.com:8489/s/group00/M00/04/48/ooYBAFeMhZ-AOLA0AAA1r61sXVk238.jpg?st=NKy7jqqU1TFcIiwGVSgVTA&e=1482487114',
                actName: '足浴＋推背 销量：10998',
                actPrice: '198',
                actType: 'timeLimit',
                endDate: 1483196400000,
                endTime: '',
                remainCount: 20,
                startDate: 1481817600000,
                startTime: ''
            }]
        }) */

        /* items.push({ // 活动文字测试
            itemKey: '08',
            title: '活动文字测试',
            details: {
                content: '反对大反对大反对大反对大反对大反对大反对大反对大反对大反对大反对大反对大反对大反对大反对大\n城镇\n女孩\n琵琶\n琵琶\n琵琶\n城镇\n女孩\n琵琶\n琵琶\n琵琶\n城镇\n女孩\n琵琶\n琵琶\n琵琶\n城镇\n女孩\n琵琶\n琵琶\n琵琶\n城镇\n女孩\n琵琶\n琵琶\n琵琶\n城镇\n女孩\n琵琶\n琵琶\n琵琶\n城镇\n女孩\n琵琶\n琵琶\n琵琶\n城镇\n女孩\n琵琶\n琵琶\n琵琶\n城镇\n女孩\n琵琶\n琵琶\n琵琶',
                startTime: '2016-05-01',
                endTime: '2016-05-06'
            }
        }) */

        /* items.push({ // 优惠券
            itemKey: '06',
            title: '优惠券',
            details: [
                {
                    actId: '761087924807671808',
                    actName: '20元现金券',
                    actType: 'coupon',
                    actValue: 20,
                    consumeMoneyDescription: '满100元可用',
                    couponPeriod: '领取后当天生效，至长期有效！',
                    couponType: '现金券'
                }
            ]
        }) */

        /* items.push({
            itemKey: '03',
            title: '诡异的相册',
            details: [
                'http://sdcm210:8489/s/group00/M00/00/79/oIYBAFg4Ha6APBMgAAHF65tmdTs364.jpg?st=5vxKyynkAfBQWgOPBaVnsQ&e=1482481199',
                'http://sdcm210:8489/s/group00/M00/00/79/oIYBAFg4JfCAO9TGAALO19GxovE822.jpg?st=Cn3cnoRxcxmfUhkIcrNCKw&e=1482481199',
                'http://sdcm210:8489/s/group00/M00/00/79/oIYBAFg4JXOAA6EtAAHOFsAnvTY506.jpg?st=i2RHUCDKeSxMv0jxCOHY9g&e=1482481199'
            ]
        }) */

        for (var i = 0; i < items.length; i++) {
            itemData = items[i]
            if (itemData.itemKey == '01') { // 闪亮新人页面
                for (k = 0; k < itemData.details.length; k++) {
                    subItemData = itemData.details[k]
                    itemObj = {}
                    itemObj.category = 'new-tech'
                    itemObj.title = itemData.title
                    itemObj.techId = subItemData.techId
                    itemObj.techName = subItemData.techName
                    itemObj.techNo = subItemData.techNo
                    itemObj.clubId = res.clubId
                    itemObj.description = subItemData.description
                    itemObj.avatarUrl = subItemData.avatarUrl || res.clubImgUrl
                    itemObj.serviceItems = subItemData.serviceItems
                    if (itemObj.serviceItems && itemObj.serviceItems.length > 3) {
                        itemObj.serviceItems = itemObj.serviceItems.slice(0, 3)
                    }
                    slideData.push(itemObj)
                }
            } else if (itemData.itemKey == '02') { // 最新项目页面
                for (k = 0; k < itemData.details.length; k++) {
                    subItemData = itemData.details[k]
                    itemObj = {}
                    itemObj.category = 'service-item'
                    itemObj.title = itemData.title
                    itemObj.clubId = res.clubId
                    itemObj.leftService = subItemData
                    itemObj.leftService.styleObj = {}
                    if (subItemData.imageUrl) {
                        itemObj.leftService.styleObj['background-image'] = 'url(' + subItemData.imageUrl + ')'
                    }
                    if (subItemData.description) {
                        itemObj.leftService.description = subItemData.description.replace(/<(.*)>/g, '').replace(/\s+/g, '')
                    }
                   /* k++
                    if (k < itemData.details.length) { // 一个页面最多显示2个项目，如果多于两个，则另起一页显示
                        subItemData = itemData.details[k]
                        itemObj.rightService = subItemData
                        itemObj.rightService.styleObj = {}
                        if (subItemData.imageUrl) {
                            itemObj.rightService.styleObj['background-image'] = 'url(' + subItemData.imageUrl + ')'
                        }
                        if (subItemData.description) {
                            itemObj.rightService.description = subItemData.description.replace(/<(.*)>/g, '').replace(/\s+/g, '')
                        }
                    } */
                    slideData.push(itemObj)
                }
            } else if (itemData.itemKey == '03') { // 女神风采
                itemObj = {
                    category: 'tech-pics',
                    title: itemData.title,
                    pics: []
                }
                for (k = 0; k < itemData.details.length; k++) {
                    itemObj.pics.push(itemData.details[k])
                }
                slideData.push(itemObj)
            } else if (itemData.itemKey == '04') { // 服务之星
                for (k = 0; k < itemData.details.length; k++) {
                    itemObj = {
                        category: 'tech-list',
                        clubId: res.clubId,
                        title: itemData.title,
                        techs: []
                    }
                    subItemData = itemData.details[k]
                    subItemData.imgStyle = (subItemData.avatarUrl || res.clubImgUrl) ? {'background-image': 'url(' + (subItemData.avatarUrl || res.clubImgUrl) + ')'} : {}
                    itemObj.techs.push(subItemData)
                    k++
                    if (k < itemData.details.length) {
                        subItemData = itemData.details[k]
                        subItemData.imgStyle = (subItemData.avatarUrl || res.clubImgUrl) ? {'background-image': 'url(' + (subItemData.avatarUrl || res.clubImgUrl) + ')'} : {}
                        itemObj.techs.push(subItemData)
                        k++
                        if (k < itemData.details.length) {
                            subItemData = itemData.details[k]
                            subItemData.imgStyle = (subItemData.avatarUrl || res.clubImgUrl) ? {'background-image': 'url(' + (subItemData.avatarUrl || res.clubImgUrl) + ')'} : {}
                            itemObj.techs.push(subItemData)
                        }
                    }
                    slideData.push(itemObj)
                }
            } else if (itemData.itemKey == '06') { // 优惠活动
                for (k = 0; k < itemData.details.length; k++) {
                    subItemData = itemData.details[k]
                    itemObj = {}
                    itemObj.category = 'act'
                    itemObj.title = itemData.title
                    itemObj.type = subItemData.actType
                    itemObj.data = subItemData
                    itemObj.clubId = res.clubId
                    if (itemObj.type == 'timeLimit' || itemObj.type == 'oneYuan' || itemObj.type == 'plumFlower') {
                        itemObj.imgStyle = subItemData.actImgUrl ? { 'background-image': 'url(' + subItemData.actImgUrl + ')' } : {}
                    }
                    slideData.push(itemObj)
                }
            } else if (itemData.itemKey == '05') { // 视频
                slideData.push({
                    category: 'video',
                    title: itemData.title,
                    video: itemData.details.playUrl,
                    poster: itemData.details.coverUrl || './images/video-poster.jpg'
                })
            } else if (itemData.itemKey == '07') { // 文章
                slideData.push({
                    category: 'health',
                    title: itemData.title,
                    content: itemData.details ? itemData.details.content : ''
                })
            } else if (itemData.itemKey == '08') { // 活动文字
                subItemData = itemData.details
                var actTime = ''
                if (subItemData.startTime == 'null') {
                    subItemData.startTime = ''
                }
                if (subItemData.endTime == 'null') {
                    subItemData.endTime = ''
                }
                if (subItemData.startTime && subItemData.endTime) {
                    actTime = subItemData.startTime.replace(/-/g, '.') + '-' + subItemData.endTime.replace(/-/g, '.')
                } else if (subItemData.startTime) {
                    actTime = '从' + subItemData.startTime.replace(/-/g, '.') + '起'
                } else if (subItemData.endTime) {
                    actTime = '截止至：' + subItemData.endTime.replace(/-/g, '.')
                }
                slideData.push({
                    category: 'actDesc',
                    title: itemData.title,
                    content: subItemData.content.replace(/\n/g, '<p>'),
                    actTime: actTime || ''
                })
            }
        }

        // 增加最后一页
        slideData.push({category: 'end', clubId: res.clubId})
        journalData.slideData = slideData
        return journalData
    },
    resizeWin: function () {
        var that = this
        var win = window
        var doc = document
        var htmlEl = doc.documentElement
        if (!that.baseWidth) {
            that.baseWidth = doc.body.clientWidth || 320
        }
        that.winWidth = htmlEl.clientWidth || win.innerWidth || doc.body.clientWidth
        that.winHeight = htmlEl.clientHeight || win.innerHeight
        that.winWidth = that.winWidth > 540 ? 540 : (that.winWidth < 320 ? 320 : that.winWidth)
        that.winScale = that.winWidth / that.baseWidth
        htmlEl.style.fontSize = that.winScale * 16 + 'px'
        // htmlEl.style.backgroundColor = '#f0f0f0'
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
        var that = this
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
            that.weiXinCfgSignature(option)
        }
    },
    weiXinCfgSignature: function (option) {
        var loc = location
        var signUrl = loc.origin + loc.pathname + loc.search
        var win = window
        var that = this

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
                jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
            })

            if (!win['wxError']) {
                win['wxError'] = true
                wx.error(function () { // 微信分享配置失败
                    wx['signReady'] = false
                    win['requestSignCount']--
                    if (win['requestSignCount'] !== 0) {
                        that.weiXinCfgSignature()
                    }
                })
            }

            if (!win['wxReady']) {
                win['wxReady'] = true
                wx.ready(function () {
                    wx['signReady'] = true
                    that.shareConfig(option)
                })
            }
        })
    },

    // 设置页面标题
    setDocumentTitle: function (title, logoUrl) {
        document.title = title
        var that = this
        var doc = document
        var frame = null
        var ua = that.userAgent
        if (ua.isWX || ua.isiPhone) {
            frame = doc.createElement('iframe')
            frame.style.display = 'none'
            frame.onload = function () {
                frame.onload = null
                setTimeout(function () {
                    doc.body.removeChild(frame)
                }, 0)
            }
            frame.src = logoUrl
            doc.body.appendChild(frame)
        }
    }
}
