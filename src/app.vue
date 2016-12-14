<style>
    @import './styles/index.css';
</style>
<template>
    <div @transitionend="doHandlerTransitionEnd($event)" class="journal-page">
        <div v-show="loading && !loadError" class="spinner">
            <div class="spinner-container container1">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
            <div class="spinner-container container2">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
            <div class="spinner-container container3">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
        </div>
        <template v-show="!loading && !loadError">
            <header class="page-header" ref="indexPageHeader" @click="doGoToClub()">
                <div v-if="clubImgUrl" class="logo" :style="{ 'background-image' : 'url('+clubImgUrl+')' }"></div>
                <div class="info">
                    <div class="title">{{ clubName }}</div>
                    <div class="static">
                        <div class="view">{{ viewCount }}</div>
                        <div class="like">{{ likeCount }}</div>
                    </div>
                </div>
            </header>
            <header class="page-header common" ref="pageHeader" @click="doGoToClub()">
                <div v-if="clubImgUrl" class="logo" :style="{ 'background-image' : 'url('+clubImgUrl+')' }"></div>
                <div class="info">
                    <div class="title">{{ clubName }}</div>
                </div>
                <div class="right-arrow"></div>
            </header>
            <swiper :options='swiperOption' class="page-content">
                <swiper-slide class="index-slide">
                    <div class="center-circle ani">
                        <canvas ref="bigCircle" width="464" height="464"></canvas>
                        <canvas ref="lineTop" class="line-top ani" width="162" height="107"></canvas>
                        <canvas ref="lineBottom" class="line-bottom ani" width="114" height="74"></canvas>
                        <div class="circle small ani"></div>
                        <div class="circle mid ani"></div>
                        <div class="circle big ani"></div>
                    </div>
                    <div class="text">
                        <canvas ref="titleText" class="ani" width="586" height="200"></canvas>
                        <div class="ani" v-show="subTitle">{{ subTitle }}</div>
                    </div>
                </swiper-slide>
                <slide v-for="(item,index) in slideData" :slide-obj="item" :is-over="index==slideData.length-1"></slide>
            </swiper>
            <div class="slide-arrow" ref="slideArrow"></div>
            <share :share-url="shareUrl"></share>
        </template>
        <div v-if="loadError && errorId" class="page-error">404<br/><span>您访问的页面不存在！</span></div>
        <div v-if="loadError && !errorId" class="page-redirect">
            <div :class="{club: !newJournalId}">
                <div></div>
                <div @click="doRedirect()">{{ newJournalId ? '查看最新' : '去看看' }}</div>
            </div>
        </div>
        <audio autoplay="autoplay" loop="loop" ref="bgAudio"></audio>
    </div>
</template>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import { Global } from './libs/global'
    import Share from './components/share'
    import Slide from './components/slide'

    module.exports = {
        components: {
            'swiper': swiper,
            'swiper-slide': swiperSlide,
            'share': Share,
            'slide': Slide
        },
        data: function () {
            return {
                // dataUrl: './data.json',
                dataUrl: '../api/v2/user/journal/detail',
                clubName: '', // 会所名
                clubId: '', // 会所ID
                clubImgUrl: '', // 会所logo
                title: '', // 主标题
                subTitle: '', // 子标题
                viewCount: '', // 浏览量
                likeCount: '', // 点赞量
                shareUrl: location.href,
                slideData: [],
                loading: true,
                loadError: false,
                errorId: false,
                newJournalId: '', // 最新的期刊ID
                audioSrc: './audio/1.mp3', // 音频地址
                swiperOption: {
                    direction: 'vertical',
                    observeParents: true,
                    // mousewheelControl: true,
                    onInit: function (swiper) {
                        var global = Global
                        if (global.app && !global.app.loading) {
                            global.swiper = swiper
                            global.app.init()
                        } else {
                            var waitMounted = setInterval(function () {
                                if (global.app && !global.app.loading) {
                                    clearInterval(waitMounted)
                                    global.swiper = swiper
                                    global.app.init()
                                }
                            }, 100)
                        }
                    },
                    onSlideChangeStart: function (swiper) {
                        // console.log('swiper change start...' + swiper.activeIndex + '---' + swiper.previousIndex)
                        var global = Global
                        var activeIndex = swiper.activeIndex
                        var previousIndex = swiper.previousIndex
                        var thisEl = document.body
                        var pageHeaderCls = global.pageHeader.classList
                        var indexPageHeaderCls = global.indexPageHeader.classList
                        var swiperArr = global.swiperArr
                        var aniEles = global.aniEles
                        var previousAniEles // 前一个页面的ani元素
                        var k = 0

                        if (activeIndex == 0) {
                            pageHeaderCls.remove('act')
                            indexPageHeaderCls.add('act')
                            thisEl.style.backgroundPositionY = '0%'
                        } else {
                            pageHeaderCls.add('act')
                            indexPageHeaderCls.remove('act')
                            thisEl.style.backgroundPositionY = swiper.isEnd ? '0%' : '100%'
                        }

                        if (swiperArr.length == 0) {
                            swiperArr = document.querySelectorAll('div.page-content>div.swiper-wrapper>div.swiper-slide')
                        }

                        // console.dir(currPageAniEles)
                        if (!aniEles[previousIndex]) {
                            aniEles[previousIndex] = swiperArr[previousIndex].querySelectorAll('.ani')
                        }
                        previousAniEles = aniEles[previousIndex]

                        if (previousAniEles && previousAniEles.length > 0) {
                            // console.log('previousAniEles.length：' + previousAniEles.length)
                            var oldAniElCls
                            for (k = 0; k < previousAniEles.length; k++) {
                                oldAniElCls = previousAniEles[k].classList
                                oldAniElCls.add('endAni')
                                oldAniElCls.remove('act')
                            }
                        }
                    },
                    onSlideChangeEnd: function (swiper) {
                        // console.log('swiper change end...' + swiper.activeIndex + '---' + swiper.previousIndex)
                        var global = Global
                        var activeIndex = swiper.activeIndex
                        var previousIndex = swiper.previousIndex
                        var slideArrowCls = global.slideArrow.classList
                        var swiperArr = global.swiperArr
                        var aniEles = global.aniEles
                        var previousAniEles // 前一个页面的ani元素
                        var currSwiper
                        var k = 0

                        if (swiperArr.length === 0) {
                            swiperArr = document.querySelectorAll('div.page-content>div.swiper-wrapper>div.swiper-slide')
                        }

                        currSwiper = swiperArr[activeIndex]
                        if (!aniEles[activeIndex]) {
                            aniEles[activeIndex] = currSwiper.querySelectorAll('.ani')
                        }
                        var currPageAniEles = aniEles[activeIndex] // 当前页面的ani元素

                        if (currPageAniEles && currPageAniEles.length > 0 && !currPageAniEles[0].classList.contains('act')) {
                            for (k = 0; k < currPageAniEles.length; k++) {
                                currPageAniEles[k].classList.add('act')
                            }
                            if (currSwiper.classList.contains('oneYuan') || currSwiper.classList.contains('plumFlower')) {
                                // console.log('one-yuan-count width')
                                var pro = currSwiper.querySelector('div.one-yuan-count')
                                pro.style.width = pro.getAttribute('progress') + '%'
                            }
                        }

                        // 确保前面slide的动画元素的endAni被删除
                        setTimeout(function () {
                            previousAniEles = aniEles[previousIndex]
                            if (previousAniEles && previousAniEles.length > 0) {
                                for (k = 0; k < previousAniEles.length; k++) {
                                    previousAniEles[k].classList.remove('endAni')
                                }
                            }
                        }, 50)

                        if (swiper.isEnd) { // 是否是最后一个slide
                            slideArrowCls.remove('act')
                        } else {
                            slideArrowCls.add('act')
                        }

                        global.currSlideIndex = activeIndex
                        global.sessionStorage('journal-slide-index-' + global.journalId, activeIndex)
                    }
                }
            }
        },
        mounted: function () {
            var _this = this
            var global = Global
            _this.$nextTick(function () {
                if (!global.journalId) {
                    _this.loadError = true
                    return
                }
                var bgImgLoadStatus = false
                var dataLoadStatus = false

                var bgImg = new Image()
                bgImg.onload = function () {
                    bgImgLoadStatus = true
                    if (dataLoadStatus) {
                        _this.loading = false
                    }
                }
                bgImg.src = './images/01.jpg'

                // bgImg onload事件不触发时
                setTimeout(function () {
                    bgImgLoadStatus = true
                    if (dataLoadStatus) {
                        _this.loading = false
                    }
                }, 1500)

                // 请求数据
                var localData = global.sessionStorage('journal-data-' + global.journalId)
                if (localData) { // 从sessionStorage获取数据
                    _this.doHandlerData(JSON.parse(localData))
                    dataLoadStatus = true
                    if (bgImgLoadStatus) {
                        _this.loading = false
                    }
                } else {
                    _this.$http.get(_this.dataUrl, {params: {journalId: global.journalId, preview: global.preview ? 1 : 0}}).then(function (res) {
                        res = res.body
                        if (res.statusCode == 200) {
                            res = res.respData
                            if (res.title) {
                                // global.sessionStorage('journal-data-' + global.journalId, JSON.stringify(res)) // ========是否增加session storage
                                _this.doHandlerData(res)
                                dataLoadStatus = true

                                if (bgImgLoadStatus) {
                                    _this.loading = false
                                }
                            } else {
                                _this.loadError = true
                                _this.newJournalId = res.journalId
                                _this.clubId = res.clubId
                            }
                        } else {
                            _this.loadError = true
                            _this.errorId = true
                        }
                    }, function () {
                        _this.loadError = true
                        _this.errorId = true
                    })

                    // 浏览数+1
                    _this.$http.get('../api/v2/user/journal/view/count', {params: { journalId: global.journalId }})
                }
            })
        },
        methods: {
            init: function () { // init index page
                var doc = document
                var global = Global
                var _this = this
                doc.body.style.backgroundImage = 'url(./images/01.jpg)' // 设置背景
                global.swiperArr = doc.querySelectorAll('div.page-content>div.swiper-wrapper>div.swiper-slide')
                var aniEles = global.swiperArr[0].querySelectorAll('.ani')
                global.aniEles[0] = aniEles
                for (var k = 0; k < aniEles.length; k++) {
                    aniEles[k].classList.add('act')
                }
                global.indexPageHeader.classList.add('act')
                setTimeout(function () {
                    if (global.swiperArr.length > 1) {
                        global.slideArrow.classList.add('act')
                    }
                    doc.querySelector('#bg').classList.add('act')
                }, 4500)

                // 分享配置
                global.shareConfig({
                    title: _this.title,
                    desc: _this.subTitle,
                    link: location.href,
                    imgUrl: _this.clubImgUrl,
                    success: function () {
                        // 分享+1
                        _this.$http.get('../api/v2/user/journal/share/count', {params: { journalId: global.journalId }})
                    }
                })

                // console.log('goto slide index:' + global.currSlideIndex)
                // global.swiper.slideTo(global.currSlideIndex, 0)

                // 添加音乐
                /* var bgAudio = _this.$refs.bgAudio
                bgAudio.addEventListener('loadeddata', function () {
                    bgAudio.play()
                })
                bgAudio.src = _this.audioSrc */
            },
            doHandlerData: function (res) {
                var _this = this
                var global = Global

                _this.clubName = res.clubName
                _this.clubId = res.clubId
                _this.viewCount = res.viewCount + 1
                _this.likeCount = res.likeCount
                _this.title = res.title
                _this.subTitle = res.subTitle
                _this.clubImgUrl = res.clubImgUrl

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
                        playUrl: 'http://vdev.xiaomodo.com/journal/601939365819588608_c3f5c837bd0f91da527464badc8a6c30.mp4',
                        coverUrl: './images/oceans.png'
                    }
                }) */

               /* items.push({ // 活动文字测试
                    itemKey: '08',
                    title: '活动文字测试',
                    details: {
                        content: '合适的说法健身房第三部宣传买买买石豆仨搜索',
                        startTime: '2016-05-01',
                        endTime: '2016-05-06'
                    }
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
                            itemObj.clubId = _this.clubId
                            itemObj.description = subItemData.description
                            itemObj.avatarUrl = subItemData.avatarUrl || _this.clubImgUrl
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
                            itemObj.clubId = _this.clubId
                            itemObj.leftService = subItemData
                            itemObj.leftService.styleObj = {}
                            if (subItemData.imageUrl) {
                                itemObj.leftService.styleObj['background-image'] = 'url(' + subItemData.imageUrl + ')'
                            }
                            if (subItemData.description) {
                                itemObj.leftService.description = subItemData.description.replace(/<(.*)>/g, '').replace(/\s+/g, '')
                            }
                            k++
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
                            }
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
                                clubId: _this.clubId,
                                title: itemData.title,
                                techs: []
                            }
                            subItemData = itemData.details[k]
                            subItemData.imgStyle = (subItemData.avatarUrl || _this.clubImgUrl) ? {'background-image': 'url(' + (subItemData.avatarUrl || _this.clubImgUrl) + ')'} : {}
                            itemObj.techs.push(subItemData)
                            k++
                            if (k < itemData.details.length) {
                                subItemData = itemData.details[k]
                                subItemData.imgStyle = (subItemData.avatarUrl || _this.clubImgUrl) ? {'background-image': 'url(' + (subItemData.avatarUrl || _this.clubImgUrl) + ')'} : {}
                                itemObj.techs.push(subItemData)
                                k++
                                if (k < itemData.details.length) {
                                    subItemData = itemData.details[k]
                                    subItemData.imgStyle = (subItemData.avatarUrl || _this.clubImgUrl) ? {'background-image': 'url(' + (subItemData.avatarUrl || _this.clubImgUrl) + ')'} : {}
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
                            itemObj.clubId = _this.clubId
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
                            poster: itemData.details.coverUrl || ''
                        })
                    } else if (itemData.itemKey == '07') { // 文章
                        slideData.push({
                            category: 'health',
                            title: itemData.title,
                            content: itemData.details.content
                        })
                    } else if (itemData.itemKey == '08') { // 活动文字
                        subItemData = itemData.details
                        var actTime = ''
                        if (subItemData.startTime && subItemData.endTime) {
                            actTime = subItemData.startTime.replace(/-/g, '.') + '-' + subItemData.endTime.replace(/-/g, '.')
                        }
                        slideData.push({
                            category: 'actDesc',
                            title: itemData.title,
                            content: subItemData.content,
                            actTime: actTime || ''
                        })
                    }
                }

                // 增加最后一页
                slideData.push({category: 'end', clubId: _this.clubId})

                _this.slideData = slideData
                global.indexPageHeader = _this.$refs.indexPageHeader
                global.pageHeader = _this.$refs.pageHeader
                global.slideArrow = _this.$refs.slideArrow
                _this.drawCanvas()
                Global.setDocumentTitle(_this.title, _this.clubImgUrl)
                global.app = _this
            },
            drawCanvas: function () {
                var _this = this
                // 绘制canvas bigCircle
                var bigCircleCtx = _this.$refs.bigCircle.getContext('2d')
                var unitDeg = Math.PI / 180
                var centerX = 232
                var centerY = 232
                var radius = 224
                bigCircleCtx.strokeStyle = '#00f1cf'
                bigCircleCtx.lineCap = 'round'
                bigCircleCtx.lineWidth = 6
                bigCircleCtx.arc(centerX, centerY, radius, 138 * unitDeg, 278 * unitDeg)

                bigCircleCtx.moveTo(centerX + Math.cos(286 * unitDeg) * radius, centerY + Math.sin(286 * unitDeg) * radius)
                bigCircleCtx.arc(centerX, centerY, radius, 286 * unitDeg, 290 * unitDeg)

                bigCircleCtx.moveTo(centerX + Math.cos(293 * unitDeg) * radius, centerY + Math.sin(293 * unitDeg) * radius)
                bigCircleCtx.arc(centerX, centerY, radius, 293 * unitDeg, 120 * unitDeg)

                bigCircleCtx.moveTo(centerX + Math.cos(126 * unitDeg) * radius, centerY + Math.sin(126 * unitDeg) * radius)
                bigCircleCtx.arc(centerX, centerY, radius, 126 * unitDeg, 134 * unitDeg)

                bigCircleCtx.stroke()

                // 绘制canvas lineTop
                var lineTopCtx = _this.$refs.lineTop.getContext('2d')
                lineTopCtx.strokeStyle = '#00f1cf'
                lineTopCtx.lineCap = 'round'
                lineTopCtx.lineWidth = 6

                lineTopCtx.moveTo(9, 66)
                lineTopCtx.lineTo(62, 20)
                lineTopCtx.moveTo(6, 100)
                lineTopCtx.lineTo(57, 54)
                lineTopCtx.moveTo(68, 45)
                lineTopCtx.lineTo(74, 40)

                lineTopCtx.moveTo(68, 81)
                lineTopCtx.lineTo(153, 5)
                lineTopCtx.stroke()

                // 绘制canvas lineBottom
                var lineBottomCtx = _this.$refs.lineBottom.getContext('2d')
                lineBottomCtx.strokeStyle = '#00f1cf'
                lineBottomCtx.lineCap = 'round'
                lineBottomCtx.lineWidth = 6

                lineBottomCtx.moveTo(4, 67)
                lineBottomCtx.lineTo(75, 4)
                lineBottomCtx.moveTo(52, 68)
                lineBottomCtx.lineTo(56, 64)
                lineBottomCtx.moveTo(62, 56)
                lineBottomCtx.lineTo(108, 13)
                lineBottomCtx.stroke()

                var titleTextCtx = _this.$refs.titleText.getContext('2d')
                var textStr = _this.title

                titleTextCtx.fillStyle = '#ffe90a'
                titleTextCtx.textAlign = 'center'
                titleTextCtx.textBaseline = 'middle'
                titleTextCtx.strokeStyle = '#5616a3'
                titleTextCtx.lineWidth = 18
                titleTextCtx.lineCap = 'round'
                titleTextCtx.lineJoin = 'round'
                titleTextCtx.font = 'normal 80px 微软雅黑'
                titleTextCtx.strokeText(textStr, 586 / 2, 100)
                titleTextCtx.fillText(textStr, 586 / 2, 100)
            },
            doHandlerTransitionEnd: function (event) {
                var target = event.target
                var targetCls = target.classList
                if (targetCls.contains('endAni')) {
                    targetCls.remove('endAni')
                }
            },
            doGoToClub: function () {
                var loc = location
                loc.href = loc.origin + (/spa-manager/.test(loc.pathname) ? '/spa-manager' : '') + '/spa2/?club=' + this.clubId
            },
            doRedirect: function () {
                var that = this
                var loc = location
                if (that.newJournalId) {
                    loc.href = loc.origin + '/spa-manager/journal?id=' + that.newJournalId
                } else {
                    loc.href = loc.origin + '/spa-manager/spa2/?club=' + that.clubId
                }
            }
        }
    }
</script>