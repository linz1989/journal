<!--模板样式二-->
<template>
    <div class="tmp-second-page" :class="{ common: isCommonSlide }" @transitionend="doHandlerTransitionEnd($event)" @touchstart="doTouchPage()" v-show="!global.loading">
        <!--头部会所logo和名称-->
        <header ref="indexPageHeader" @click="goToClub()" :class="{ act : !isCommonSlide, show: !global.loading }">
            <div v-if="data.clubImgUrl" :style="{ 'background-image' : 'url('+data.clubImgUrl+')' }"></div>
            <div>{{ data.clubName }}</div>
        </header>
        <header class="common" ref="pageHeader" @click="goToClub()" :class="{ act : isCommonSlide, show: !global.loading }">
            <div v-if="data.clubImgUrl" :style="{ 'background-image' : 'url('+data.clubImgUrl+')' }"></div>
            <div>{{ data.clubName }}</div>
        </header>
        <div ref="musicIcon" class="music-icon" @click="doClickMusicIcon($event)"></div>
        <audio loop="loop" preload="auto" autoplay id="bgAudio" ref="bgAudio" :src='audioSrc' @loadeddata="doLoadedMusic()"></audio>
        <center-circle v-show="!isCommonSlide"></center-circle>
        <snow></snow>
        <swiper :options='swiperOption' class="page-content">
            <slide v-for="(item,index) in slideData" :slide-obj="item" :is-over="index==slideData.length-1" :is-index="index==0"></slide>
        </swiper>
        <div class="slide-arrow" ref="slideArrow"></div>
        <share :share-url="shareUrl"></share>
    </div>
</template>
<script>
    import { Global } from '../libs/global'
    import Slide from '../components/2/slide'
    import Share from '../components/share'
    import CenterCircle from '../components/2/centerCircle'
    import Snow from '../components/2/snow'

    // 额外的变量定义
    var swiperArr = []
    var slideArrow = null
    var app = null
    var aniEles = []

    module.exports = {
        components: {
            'slide': Slide,
            'share': Share,
            'center-circle': CenterCircle,
            'snow': Snow
        },
        data: function () {
            return {
                global: Global,
                resourceLoaded: false,
                slideData: [],
                data: {},
                swiperOption: {
                    direction: 'vertical',
                    observeParents: true,
                    onInit: function () {
                        if (app && app.resourceLoaded) {
                            app.init()
                        } else {
                            var waitMounted = setInterval(function () {
                                if (app && app.resourceLoaded) {
                                    clearInterval(waitMounted)
                                    app.init()
                                }
                            }, 100)
                        }
                    },
                    onSlideChangeStart: function (swiper) {
                        var activeIndex = swiper.activeIndex
                        var previousIndex = swiper.previousIndex
                        var previousAniEles // 前一个页面的ani元素
                        var k = 0
                        var body = document.body

                        if (activeIndex == 0) {
                            body.classList.remove('common')
                            app.isCommonSlide = false
                        } else {
                            body.classList.add('common')
                            app.isCommonSlide = true
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
                },
                shareUrl: location.href, // 分享的url
                audioSrc: './audio/2.mp3', // 音频地址
                needTouchStartMusic: false, // 第一次触摸屏幕之后启动音乐
                bgImgLoadStatus: false,
                dataLoadStatus: false,
                isCommonSlide: false
            }
        },
        mounted: function () {
            var that = this
            var global = that.global

            if (!global.journalId) {
                that.$router.push({name: '404'})
                return
            }
            if (!global.pageQuery.id) {
                that.$router.replace({name: 'tmp_2', query: global.pageParams})
            }

            global.getData().then(function (data) {
                if (data.status == 'ok') {
                    that.data = data
                    var slideDataArr = []
                    slideDataArr.push({})
                    for (var i = 0; i < data.slideData.length; i++) {
                        slideDataArr.push(data.slideData[i])
                    }
                    that.slideData = slideDataArr
                    that.$http.get('../api/v2/user/journal/view/count', {params: { journalId: global.journalId }}) // 浏览数+1
                    Global.setDocumentTitle(data.title, data.clubImgUrl)

                    that.$nextTick(function () {
                        // 初始化变量
                        var refs = that.$refs
                        slideArrow = refs.slideArrow
                        app = that

                        that.dataLoadStatus = true
                        if (that.bgImgLoadStatus) {
                            that.resourceLoaded = true
                        }
                    })
                } else if (data.status == 'error') {
                    that.$router.push({name: '404'})
                } else {
                    that.$router.push({name: 'redirect'})
                }
            })

            // 图片与数据的加载标志
            that.loadBgImg()
        },
        methods: {
            init: function () { // init index page
                var that = this
                var doc = document
                var global = Global
                var data = that.data

                // 设置背景图片
                that.$el.style.backgroundImage = 'url(./images/2/5.png)'
                global.loading = false

                swiperArr = doc.querySelectorAll('div.page-content>div.swiper-wrapper>div.swiper-slide')
                var homePageAniEles = swiperArr[0].querySelectorAll('.ani')
                aniEles[0] = homePageAniEles
                setTimeout(function () {
                    if (swiperArr.length > 1) {
                        slideArrow.classList.add('act')
                    }
                }, 1000)

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
                setTimeout(function () {
                    doc.querySelector('.center-circle').classList.add('act')
                    for (var k = 0; k < homePageAniEles.length; k++) {
                        homePageAniEles[k].classList.add('act')
                    }
                }, 400)
                // alert(global.winHeight + '--' + global.winWidth)
            },
            goToClub: function () {
                var loc = location
                loc.href = loc.origin + (/spa-manager/.test(loc.pathname) ? '/spa-manager' : '') + '/spa2/?club=' + this.data.clubId
            },
            loadBgImg: function () {
                var that = this
                var loadCount = 0
                var santaMan = new Image()
                santaMan.onload = function () {
                    loadCount++
                    that.loadedImg(loadCount)
                }
                santaMan.src = './images/2/8.png'

                var bottomSnow = new Image()
                bottomSnow.onload = function () {
                    loadCount++
                    that.loadedImg(loadCount)
                }
                bottomSnow.src = './images/2/5.png'

                var tree = new Image()
                tree.onload = function () {
                    loadCount++
                    that.loadedImg(loadCount)
                }
                tree.src = './images/2/7.png'

                setTimeout(function () {
                    that.loadedImg(3)
                }, 4000)
            },
            loadedImg: function (count) {
                var that = this
                if (count >= 3) {
                    that.bgImgLoadStatus = true
                    if (that.dataLoadStatus) {
                        that.resourceLoaded = true
                    }
                }
            },
            doHandlerTransitionEnd: function (event) {
                var target = event.target
                var targetCls = target.classList
                if (targetCls.contains('endAni')) {
                    targetCls.remove('endAni')
                }
            },
            doLoadedMusic: function () {
                var that = this
                var bgAudio = that.$refs.bgAudio
                var musicIcon = that.$refs.musicIcon

                setTimeout(function () {
                    if (bgAudio.paused) {
                        musicIcon.setAttribute('paused', '1') // 暂停状态
                        that.needTouchStartMusic = true
                    } else {
                        musicIcon.style.display = 'block'
                        musicIcon.classList.add('act')
                    }
                }, 200)
            },
            doClickMusicIcon: function (event) {
                var that = this
                var musicIcon = that.$refs.musicIcon
                var bgAudio = that.$refs.bgAudio
                if (musicIcon.getAttribute('paused')) {
                    bgAudio.play()
                    musicIcon.removeAttribute('paused')
                    musicIcon.classList.add('act')
                } else {
                    bgAudio.pause()
                    musicIcon.setAttribute('paused', '1')
                    musicIcon.classList.remove('act')
                }
                if (event) {
                    event.stopPropagation()
                }
            },
            doTouchPage: function () {
                var that = this
                var bgAudio = that.$refs.bgAudio
                var musicIcon = that.$refs.musicIcon
                if (that.needTouchStartMusic) {
                    that.needTouchStartMusic = false
                    if (bgAudio.paused) {
                        musicIcon.style.display = 'block'
                        musicIcon.classList.add('act')
                        that.doClickMusicIcon()
                    }
                }
            }
        }
    }
</script>