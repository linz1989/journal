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
            <header class="page-header" ref="pageHeader">
                <div class="logo"></div>
                <div class="info">
                    <div class="title">皇朝休闲会所</div>
                    <div class="static">
                        <div class="view">2201</div>
                        <div class="like">4545</div>
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
                        <div class="ani">这是活动标题，活动标题一</div>
                    </div>
                </swiper-slide>
                <slide v-for="(item,index) in slideData" :slide-obj="item" :is-over="index==slideData.length-1"></slide>
            </swiper>
            <div class="slide-arrow" ref="slideArrow"></div>
            <share :share-url="shareUrl"></share>
        </template>
        <div v-show="loadError" class="page-error">404<br/><span>页面已无法访问！</span></div>
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
                shareUrl: 'http://wwww',
                slideData: [
                    { category: 'new-tech', type: '', title: '闪亮新人' },
                    { category: 'service-item', type: '', title: '最新项目' },
                    { category: 'tech-list', type: '', title: '服务之星' },
                    { category: 'tech-pics', type: '', title: '女神日常' },
                    { category: 'video', type: '', title: '我们的美女主播' },
                    { category: 'act', type: 'service-item', title: '贵宾福利' },
                    { category: 'act', type: 'one-yuan', title: '贵宾福利' },
                    { category: 'act', type: 'coupon', title: '贵宾福利' },
                    { category: 'health', type: '', title: '养身频道' }
                ],
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
                            for (k = 0; k < previousAniEles.length; k++) {
                                previousAniEles[k].classList.add('endAni')
                                previousAniEles[k].classList.remove('act')
                            }
                        }

                        if (currPageAniEles && currPageAniEles.length > 0 && !currPageAniEles[0].classList.contains('act')) {
                            for (k = 0; k < currPageAniEles.length; k++) {
                                currPageAniEles[k].classList.add('act')
                            }
                            if (currSwiper.classList.contains('one-yuan')) {
                                console.log('one-yuan-count width')
                                document.querySelector('#one-yuan-count').style.width = '60%'
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

                setTimeout(function () {
                    _this.loading = false
                }, 2000)

                global.app = _this
                global.pageHeader = _this.$refs.pageHeader
                global.slideArrow = _this.$refs.slideArrow
                _this.drawCanvas()

                // 浏览数+1
                // _this.$http.get('../api/v2/user/journal/view/count', {params: { journalId: global.journalId }})
            })
        },
        methods: {
            init: function () { // init index page
                document.body.style.backgroundImage = 'url(./images/01.jpg)'
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
                    document.querySelector('div.common-slide.service-item>div.wrap>div.info-wrap').style.marginTop = marginRem + 'rem'
                }

                // 分享配置
                global.shareConfig({
                    title: '',
                    desc: '',
                    link: '',
                    imgUrl: '',
                    success: function () {
                        // 分享+1
                        _this.$http.get('api/v2/user/journal/share/count', {params: { journalId: global.journalId }})
                    }
                })
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
                var textStr = '限时优惠大抢购'

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
            }
        }
    }
</script>