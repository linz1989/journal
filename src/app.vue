<style>
    @import './styles/index.css';
</style>
<template>
    <div @transitionend="doHandlerTransitionEnd($event)" class="journal-page">
        <div v-show="loading" class="spinner">
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
        <header v-show="!loading" class="page-header" ref="pageHeader">
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
        <swiper v-show="!loading" :options='swiperOption' class="page-content">
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
            <swiper-slide class="new-tech-slide common-slide">
                <div class="wrap">
                    <div class="page-title ani"></div>
                    <div class="info-wrap tech-info opacity-ani ani">
                        <div class="tech-header ani"><div></div></div>
                        <div class="shadow-btn chat-btn ani"></div>
                        <div class="name-wrap ani">
                            <div class="tech-name">黄晶晶&nbsp;[&nbsp;6号&nbsp;]</div>
                            <div class="tip">最好的服务都在我这里啦！</div>
                            <div class="service-list"><div class="item-btn left">足浴项目</div><div class="item-btn left">中医推拿</div><div class="item-btn left">美容理疗</div></div>
                        </div>
                    </div>
                </div>
                <div class="bottom-btn like-btn ani">很赞</div>
            </swiper-slide>
            <swiper-slide class="service-item-slide common-slide">
                <div class="wrap">
                    <div class="page-title ani"></div>
                    <div class="info-wrap service left ani">
                        <div class="service-img ani"></div>
                        <div class="text-wrap ani">
                            <div>面部SPA</div>
                            <div><strong>98元</strong>/60分钟</div>
                            <div>最好的服务都在我这里啦最好的服务都在我这里啦</div>
                        </div>
                    </div>
                    <div class="info-wrap service right ani">
                        <div class="service-img ani"></div>
                        <div class="text-wrap ani">
                            <div>面部SPA2</div>
                            <div><strong>98元</strong>/60分钟</div>
                            <div>最好的服务都在我这里啦最好的服务都在我这里啦</div>
                        </div>
                    </div>
                </div>
                <div class="bottom-btn like-btn ani">很赞</div>
            </swiper-slide>
            <swiper-slide class="tech-list-slide common-slide">
                <div class="wrap">
                    <div class="page-title ani"></div>
                    <div class="info-wrap tech t1 ani">
                        <div class="ani"></div>
                        <div>张得好[66号]</div>
                        <div>擅长最专业的泰式按摩</div>
                        <div>客人印象:<span>#美白</span><span>#美白</span><span>#美白</span></div>
                        <div class="item-btn right ani">足浴项目</div>
                    </div>
                    <div class="info-wrap tech t2 ani">
                        <div class="ani"></div>
                        <div>张得好[66号]</div>
                        <div>擅长最专业的泰式按摩</div>
                        <div>客人印象:<span>#美白</span><span>#美白</span><span>#美白</span></div>
                        <div class="item-btn right ani">足浴项目</div>
                    </div>
                    <div class="info-wrap tech t3 ani">
                        <div class="ani"></div>
                        <div>张得好[66号]</div>
                        <div>擅长最专业的泰式按摩</div>
                        <div>客人印象:<span>#美白</span><span>#美白</span><span>#美白</span></div>
                        <div class="item-btn right ani">足浴项目</div>
                    </div>
                </div>
                <div class="bottom-btn like-btn ani">很赞</div>
            </swiper-slide>
            <swiper-slide class="common-slide tech-pics-slide">
                <div class="wrap">
                    <div class="page-title ani"></div>
                    <swiper :options="picSwiperOption" class="pic-wrap scale-ani ani">
                        <swiper-slide v-for="item in techPics"><div :class="'pic-item-'+item"></div></swiper-slide>
                    </swiper>
                </div>
                <div class="bottom-btn like-btn ani">很赞</div>
            </swiper-slide>
            <swiper-slide class="common-slide video-slide">
                <div class="wrap">
                    <div class="page-title ani"></div>
                    <div class="info-wrap scale-ani ani">
                        <video class="video-js vjs-default-skin" controls preload="meta" width="100%" height="100%" data-setup="{}">
                            <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
                            <source src="http://vjs.zencdn.net/v/oceans.webm" type="video/webm">
                            <source src="http://vjs.zencdn.net/v/oceans.ogv" type="video/ogg">
                        </video>
                    </div>
                </div>
                <div class="bottom-btn like-btn ani">很赞</div>
            </swiper-slide>
            <swiper-slide class="act-slide common-slide service-item">
                <div class="wrap">
                    <div class="page-title ani"></div>
                    <div class="info-wrap opacity-ani ani">
                        <div class="ani"></div>
                        <div class="text-wrap ani">
                            <div>花样泰式按摩</div>
                            <div><strong>155</strong><span>元</span>（或<b>1000</b>积分）</div>
                            <div>原价：300元</div>
                            <div>距结束：<b>11</b>时<b>05</b>分<b>21</b>秒<span>剩余22份</span></div>
                        </div>
                        <div class="shadow-btn grab-btn ani"></div>
                    </div>
                </div>
                <div class="bottom-btn like-btn ani">很赞</div>
            </swiper-slide>
            <swiper-slide class="act-slide common-slide one-yuan">
                <div class="wrap">
                    <div class="page-title ani"></div>
                    <div class="info-wrap opacity-ani ani">
                        <div class="ani"></div>
                        <div class="text-wrap ani">
                            <div><b>泰式按摩</b>(第二期)</div>
                            <div><div class="ani" id="one-yuan-count"></div></div>
                            <div>已抢：<span>247/500</span></div>
                        </div>
                        <div class="shadow-btn grab-btn ani"></div>
                    </div>
                </div>
                <div class="bottom-btn like-btn ani">很赞</div>
            </swiper-slide>
            <swiper-slide class="act-slide common-slide coupon">
                <div class="wrap">
                    <div class="page-title ani"></div>
                    <div class="info-wrap scale-ani ani">
                        <div class="coupon ani">
                            <div>泰式按摩券<span>现金券</span></div>
                            <div><b>￥</b><strong>500</strong>满500元可用</div>
                            <div>有效时间：客人购买后60天有效</div>
                        </div>
                        <div class="shadow-btn grab-btn ani"></div>
                    </div>
                </div>
                <div class="bottom-btn like-btn ani">很赞</div>
            </swiper-slide>
            <swiper-slide class="health-slide common-slide">
                <div class="wrap">
                    <div class="page-title ani"></div>
                    <div class="info-wrap ani">
                        <h3>标题一</h3>
                        <p>本活动需要支付，最低元起，每支付块钱获得需要支付。</p>
                        <h3>标题二</h3>
                        <p>本活动需要支付，最低元起，每支付块钱获得需要支付。</p>
                    </div>
                </div>
                <div class="bottom-btn like-btn ani">很赞</div>
                <div class="bottom-btn share-btn ani">分享</div>
                <div class="over-tip">—更多精彩去网上会所看看—</div>
            </swiper-slide>
        </swiper>
        <div v-show="!loading" class="slide-arrow" ref="slideArrow"></div>
    </div>
</template>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import { Global } from './libs/global'

    module.exports = {
        components: {
            'swiper': swiper,
            'swiper-slide': swiperSlide
        },
        data: function () {
            return {
                techPics: [1, 2, 3, 4],
                loading: true,
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
                },
                picSwiperOption: {
                    effect: 'coverflow',
                    slidesPerView: 2,
                    centeredSlides: true,
                    observeParents: true,
                    loop: true,
                    coverflow: {
                        rotate: 30,
                        stretch: 15,
                        depth: 60,
                        modifier: 2,
                        slideShadows: true
                    },
                    onInit: function (swiper) {
                        setTimeout(function () {
                            swiper.reLoop()
                            swiper.slideNext(null, 0)
                        }, 500)
                    }
                }
            }
        },
        created: function () {
            window.addEventListener('resize', function () {
                Global.resizeWin()
            })
            Global.resizeWin()
        },
        mounted: function () {
            var _this = this
            var global = Global
            _this.$nextTick(function () {
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
            })
        },
        methods: {
            init: function () { // init index page
                document.body.style.backgroundImage = 'url(./images/01.jpg)'
                var global = Global
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