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
            <header class="page-header" ref="pageHeader" @click="doGoToClub()">
                <div v-if="clubImgUrl" class="logo" :style="{ 'background-image' : 'url('+clubImgUrl+')' }"></div>
                <div class="info">
                    <div class="title">{{ clubName }}</div>
                    <div class="static">
                        <div class="view">{{ viewCount }}</div>
                        <div class="like">{{ likeCount }}</div>
                    </div>
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
        <div v-show="loadError" class="page-error">404<br/><span>页面无法访问！</span></div>
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
                    onSlideChangeEnd: function (swiper) {
                        console.log('swiper change end...' + swiper.activeIndex + '---' + swiper.previousIndex)
                        var global = Global
                        var activeIndex = swiper.activeIndex
                        var previousIndex = swiper.previousIndex
                        var pageHeaderCls = global.pageHeader.classList
                        var slideArrowCls = global.slideArrow.classList
                        var swiperArr = global.swiperArr
                        var aniEles = global.aniEles
                        var currSwiper
                        var k = 0
                        var previousAniEles // 前一个页面的ani元素
                        var thisEl = document.body
                        global.currSlideIndex = activeIndex
                        global.sessionStorage('journal-slide-index-' + global.journalId, activeIndex)
                        if (activeIndex === 0) {
                            pageHeaderCls.remove('common')
                            thisEl.style.backgroundPositionY = '0%'
                        } else {
                            pageHeaderCls.add('common')
                            thisEl.style.backgroundPositionY = '100%'
                        }

                        if (swiperArr.length === 0) {
                            swiperArr = document.querySelectorAll('div.page-content>div.swiper-wrapper>div.swiper-slide')
                        }

                        currSwiper = swiperArr[activeIndex]
                        if (!aniEles[activeIndex]) {
                            aniEles[activeIndex] = currSwiper.querySelectorAll('.ani')
                        }
                        var currPageAniEles = aniEles[activeIndex] // 当前页面的ani元素

                        // console.dir(currPageAniEles)
                        if (swiperArr[previousIndex]) {
                            if (!aniEles[previousIndex]) {
                                aniEles[previousIndex] = swiperArr[previousIndex].querySelectorAll('.ani')
                            }
                            previousAniEles = aniEles[previousIndex]
                        }
                        // console.dir(previousAniEles)

                        if (previousAniEles && previousAniEles.length > 0) {
                            // console.log('previousAniEles.length：' + previousAniEles.length)
                            var oldAniElCls
                            for (k = 0; k < previousAniEles.length; k++) {
                                oldAniElCls = previousAniEles[k].classList
                                oldAniElCls.add('endAni')
                                oldAniElCls.remove('act')
                            }
                        }

                        if (currPageAniEles && currPageAniEles.length > 0 && !currPageAniEles[0].classList.contains('act')) {
                            for (k = 0; k < currPageAniEles.length; k++) {
                                currPageAniEles[k].classList.add('act')
                            }
                            if (currSwiper.classList.contains('oneYuan')) {
                                console.log('one-yuan-count width')
                                var pro = document.querySelector('#one-yuan-count')
                                pro.style.width = pro.getAttribute('progress') + '%'
                            }
                        }

                        if (swiper.isEnd) { // 是否是最后一个slide
                            slideArrowCls.remove('act')
                        } else {
                            slideArrowCls.add('act')
                        }
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
                var preDataLoadCount = 0
                var bgImg = new Image()
                bgImg.onload = function () {
                    preDataLoadCount++
                    if (preDataLoadCount === 2) {
                        console.log(preDataLoadCount)
                        _this.loading = false
                    }
                }
                bgImg.src = './images/01.jpg'

                // 请求数据
                var localData = global.sessionStorage('journal-data-' + global.journalId)
                if (localData) { // 从sessionStorage获取数据
                    _this.doHandlerData(JSON.parse(localData))
                    preDataLoadCount++
                    if (preDataLoadCount == 2) {
                        _this.loading = false
                    }
                } else {
                    _this.$http.get(_this.dataUrl, {params: {id: global.journalId, preview: global.preview ? 1 : 0}}).then(function (res) {
                        res = res.body
                        if (res.statusCode == 200) {
                            res = res.respData
                            // global.sessionStorage('journal-data-' + global.journalId, JSON.stringify(res)) // ========是否增加session storage
                            _this.doHandlerData(res)
                            preDataLoadCount++
                            if (preDataLoadCount == 2) {
                                _this.loading = false
                            }
                        } else {
                            _this.loadError = true
                        }
                    }, function () {
                        _this.loadError = true
                    })

                    // 浏览数+1
                    _this.$http.get('../api/v2/user/journal/view/count', {params: { journalId: global.journalId }})
                }
            })
        },
        methods: {
            init: function () { // init index page
                document.body.style.backgroundImage = 'url(./images/01.jpg)' // 设置背景
                var global = Global
                var _this = this
                global.swiperArr = document.querySelectorAll('div.page-content>div.swiper-wrapper>div.swiper-slide')
                var aniEles = global.swiperArr[0].querySelectorAll('.ani')
                global.aniEles[0] = aniEles
                for (var k = 0; k < aniEles.length; k++) {
                    aniEles[k].classList.add('act')
                }
                global.pageHeader.classList.add('act')
                setTimeout(function () {
                    global.slideArrow.classList.add('act')
                    document.querySelector('#bg').classList.add('act')
                }, 4500)

                // 调整贵宾福利 抢项目页面 info-wrap与page-title的间距
                var winHeightRem = global.winHeight / (16 * global.winScale)
                if (winHeightRem > 28.889) {
                    var marginRem = winHeightRem - 28.889
                    if (marginRem > 0.9) {
                        marginRem = 0.9
                    }
                    var actSlide = document.querySelector('div.common-slide.timeLimit>div.wrap>div.info-wrap')
                    if (actSlide) {
                        actSlide.style.marginTop = marginRem + 'rem'
                    }
                }

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
            },
            doHandlerData: function (res) {
                var _this = this
                var global = Global

                _this.clubName = res.clubName
                _this.clubId = res.clubId
                _this.viewCount = res.viewCount + 1
                _this.likeCount = res.likeCount
                _this.title = res.title || '限时优惠大抢购'
                _this.subTitle = res.subTitle
                _this.clubImgUrl = res.clubImgUrl

                // 处理slide 数组
                var items = res.items
                var itemData
                var subItemData
                var slideData = []
                var itemObj
                var k
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
                            itemObj.avatarUrl = subItemData.avatarUrl
                            itemObj.serviceItems = subItemData.serviceItems
                            slideData.push(itemObj)
                        }
                    } else if (itemData.itemKey == '02') { // 最新项目页面
                        for (k = 0; k < itemData.details.length; k++) {
                            subItemData = itemData.details[k]
                            itemObj = {}
                            itemObj.category = 'service-item'
                            itemObj.title = itemData.title
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
                        itemObj = {
                            category: 'tech-list',
                            title: itemData.title,
                            techs: []
                        }
                        for (k = 0; k < itemData.details.length; k++) {
                            subItemData = itemData.details[k]
                            subItemData.imgStyle = subItemData.avatarUrl ? {'background-image': 'url(' + subItemData.avatarUrl + ')'} : {}
                            itemObj.techs.push(subItemData)
                        }
                        slideData.push(itemObj)
                    } else if (itemData.itemKey == '06') { // 优惠活动
                        for (k = 0; k < itemData.details.length; k++) {
                            subItemData = itemData.details[k]
                            itemObj = {}
                            itemObj.category = 'act'
                            itemObj.title = itemData.title
                            itemObj.type = subItemData.actType
                            itemObj.data = subItemData
                            itemObj.clubId = _this.clubId
                            if (itemObj.type == 'timeLimit' || itemObj.type == 'oneYuan') {
                                itemObj.imgStyle = subItemData.actImageUrl ? { 'background-image': 'url(' + subItemData.actImageUrl + ')' } : {}
                            }
                            slideData.push(itemObj)
                        }
                    } else if (itemData.itemKey == '05') { // 视频
                        slideData.push({
                            category: 'video',
                            title: itemData.title,
                            video: itemData.details
                        })
                    } else if (itemData.itemKey == '07') { // 文章
                        slideData.push({
                            category: 'health',
                            title: itemData.title,
                            content: itemData.details
                        })
                    }
                }

                _this.slideData = slideData
                global.pageHeader = _this.$refs.pageHeader
                global.slideArrow = _this.$refs.slideArrow
                _this.drawCanvas()
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
                loc.href = 'http://' + loc.host + (/spa-manager/.test(loc.pathname) ? '/spa-manager' : '') + '/spa2/?club=' + this.clubId
            }
        }
    }
</script>