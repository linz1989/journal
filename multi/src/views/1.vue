<!--模板样式一-->
<template>
    <div @transitionend="doHandlerTransitionEnd($event)" class="tmp-first-page">
        <div class="stars" ref="stars"><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <div ref="musicIcon" class="music-icon" @click="doClickMusicIcon()"></div>
        <audio loop="loop" id="bgAudio" ref="bgAudio" @loadeddata="doLoadedMusic()"></audio>
        <template v-show="!global.loading">
            <header class="page-header" ref="indexPageHeader" @click="doGoToClub()">
                <div v-if="data.clubImgUrl" class="logo" :style="{ 'background-image' : 'url('+data.clubImgUrl+')' }"></div>
                <div class="info">
                    <div class="title">{{ data.clubName }}</div>
                    <div class="static">
                        <div class="view">{{ data.viewCount }}</div>
                        <div class="like">{{ data.likeCount }}</div>
                    </div>
                </div>
            </header>
            <header class="page-header common" ref="pageHeader" @click="doGoToClub()">
                <div v-if="data.clubImgUrl" class="logo" :style="{ 'background-image' : 'url('+data.clubImgUrl+')' }"></div>
                <div class="info"><div class="title">{{ data.clubName }}</div></div>
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
                        <div class="ani" v-show="data.subTitle">{{ data.subTitle }}</div>
                    </div>
                </swiper-slide>
                <slide v-for="(item,index) in data.slideData" :slide-obj="item" :is-over="index==data.slideData.length-1"></slide>
            </swiper>

            <div class="slide-arrow" ref="slideArrow"></div>
            <share :share-url="shareUrl"></share>
        </template>
    </div>
</template>
<script>
    import { Global } from '../libs/global'
    import Share from '../components/1/share'
    import Slide from '../components/1/slide'

    // 额外的变量定义
    var swiperArr = []
    var pageHeader = null
    var indexPageHeader = null
    var slideArrow = null
    var app = null
    var aniEles = []

    module.exports = {
        components: {
            'share': Share,
            'slide': Slide
        },
        data: function () {
            return {
                global: Global,
                data: {
                    slideData: []
                },
                shareUrl: location.href, // 分享的url
                audioSrc: './audio/1.mp3', // 音频地址
                swiperOption: {
                    direction: 'vertical',
                    observeParents: true,
                    onInit: function () {
                        var global = Global
                        if (app && !global.loading) {
                            app.init()
                        } else {
                            var waitMounted = setInterval(function () {
                                if (app && !global.loading) {
                                    clearInterval(waitMounted)
                                    app.init()
                                }
                            }, 100)
                        }
                    },
                    onSlideChangeStart: function (swiper) {
                        // console.log('swiper change start...' + swiper.activeIndex + '---' + swiper.previousIndex)
                        var activeIndex = swiper.activeIndex
                        var previousIndex = swiper.previousIndex
                        var thisEl = document.body
                        var pageHeaderCls = pageHeader.classList
                        var indexPageHeaderCls = indexPageHeader.classList
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
                        var activeIndex = swiper.activeIndex
                        var previousIndex = swiper.previousIndex
                        var slideArrowCls = slideArrow.classList
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
                    }
                }
            }
        },
        mounted: function () {
            var that = this
            var global = Global
            if (!global.journalId) {
                that.$router.push({name: '404'})
                return
            }

            if (!global.pageQuery.id) {
                that.$router.replace({name: 'tmp_1', query: global.pageParams})
            }

            var bgImgLoadStatus = false
            var dataLoadStatus = false

            var bgImg = new Image()
            bgImg.onload = function () {
                bgImgLoadStatus = true
                if (dataLoadStatus) {
                    global.loading = false
                }
            }
            bgImg.src = './images/01.jpg'

            // bgImg onload事件不触发时
            setTimeout(function () {
                bgImgLoadStatus = true
                if (dataLoadStatus) {
                    global.loading = false
                }
            }, 1500)

            global.getData().then(function (data) {
                if (data.status == 'ok') {
                    that.data = data
                    that.$http.get('../api/v2/user/journal/view/count', {params: { journalId: global.journalId }}) // 浏览数+1
                    Global.setDocumentTitle(data.title, data.clubImgUrl)

                    that.$nextTick(function () {
                        // 初始化变量
                        var refs = that.$refs
                        pageHeader = refs.pageHeader
                        indexPageHeader = refs.indexPageHeader
                        slideArrow = refs.slideArrow
                        app = that

                        that.drawCanvas()
                        dataLoadStatus = true
                        if (bgImgLoadStatus) {
                            global.loading = false
                        }
                    })
                } else if (data.status == 'error') {
                    that.$router.push({name: '404'})
                } else {
                    that.$router.push({name: 'redirect'})
                }
            })
        },
        methods: {
            init: function () { // init index page
                var that = this
                var doc = document
                var global = Global
                var data = that.data

                doc.body.style.backgroundImage = 'url(./images/01.jpg)' // 设置背景
                swiperArr = doc.querySelectorAll('div.page-content>div.swiper-wrapper>div.swiper-slide')
                var homePageAniEles = swiperArr[0].querySelectorAll('.ani')
                aniEles[0] = homePageAniEles
                for (var k = 0; k < homePageAniEles.length; k++) {
                    homePageAniEles[k].classList.add('act')
                }
                indexPageHeader.classList.add('act')
                setTimeout(function () {
                    if (swiperArr.length > 1) {
                        slideArrow.classList.add('act')
                    }
                    that.$refs.stars.classList.add('act')
                }, 4500)

                // 分享配置
                global.shareConfig({
                    title: data.title,
                    desc: data.subTitle,
                    link: location.href,
                    imgUrl: data.clubImgUrl,
                    success: function () {
                        that.$http.get('../api/v2/user/journal/share/count', {params: { journalId: global.journalId }}) // 分享+1
                    }
                })

                // 添加音乐
                that.$refs.bgAudio.src = that.audioSrc
            },
            drawCanvas: function () {
                var that = this
                // 绘制canvas bigCircle
                var bigCircleCtx = that.$refs.bigCircle.getContext('2d')
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
                var lineTopCtx = that.$refs.lineTop.getContext('2d')
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
                var lineBottomCtx = that.$refs.lineBottom.getContext('2d')
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

                var titleTextCtx = that.$refs.titleText.getContext('2d')
                var textStr = that.data.title

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
                loc.href = loc.origin + (/spa-manager/.test(loc.pathname) ? '/spa-manager' : '') + '/spa2/?club=' + this.data.clubId
            },
            doLoadedMusic: function () {
                // var that = this
                var refs = this.$refs
                var bgAudio = refs.bgAudio
                var musicIcon = refs.musicIcon
                bgAudio.play()
                musicIcon.style.display = 'block'
                musicIcon.classList.add('act')
                setTimeout(function () {
                    // alert('bgAudio.paused：' + bgAudio.paused)
                    if (bgAudio.paused) {
                        // need play...
                    }
                }, 200)
            },
            doClickMusicIcon: function () {
                var refs = this.$refs
                var musicIcon = refs.musicIcon
                var bgAudio = refs.bgAudio
                if (musicIcon.getAttribute('paused')) {
                    bgAudio.play()
                    musicIcon.classList.add('act')
                    musicIcon.removeAttribute('paused')
                } else {
                    bgAudio.pause()
                    musicIcon.classList.remove('act')
                    musicIcon.setAttribute('paused', '1')
                }
            }
        }
    }
</script>