<style>
    @import './styles/index.css';
</style>
<template>
    <swiper :options='swiperOption' class="journal-page">
        <swiper-slide class="index-slide">
            <div class="center-circle ani">
                <div class="line-top ani"></div>
                <div class="line-bottom ani"></div>
                <div class="circle small ani"></div>
                <div class="circle mid ani"></div>
                <div class="circle big ani"></div>
            </div>
            <div class="text ani"><div class="ani">这是活动标题，活动标题一</div></div>
        </swiper-slide>
        <swiper-slide class="new-tech-slide common-slide">
            <div class="wrap">
                <div class="page-title ani"></div>
                <div class="info-wrap tech-info opacity-ani ani">
                    <div class="tech-header ani"><div></div></div>
                    <div class="shadow-btn chat-btn"></div>
                    <div class="tech-name">黄晶晶&nbsp;[&nbsp;6号&nbsp;]</div>
                    <div class="tip">最好的服务都在我这里啦！</div>
                    <div class="service-list"><div class="item-btn left">足浴项目</div><div class="item-btn left">中医推拿</div><div class="item-btn left">美容理疗</div></div>
                </div>
            </div>
            <div class="bottom-btn like-btn">很赞</div>
        </swiper-slide>
        <swiper-slide class="service-item-slide common-slide">
            <div class="wrap">
                <div class="page-title ani"></div>
                <div class="info-wrap service left ani">
                    <div class="service-img"></div>
                    <div>面部SPA</div>
                    <div><strong>98元</strong>/60分钟</div>
                    <div>最好的服务都在我这里啦最好的服务都在我这里啦</div>
                </div>
                <div class="info-wrap service right ani">
                    <div class="service-img"></div>
                    <div>面部SPA2</div>
                    <div><strong>98元</strong>/60分钟</div>
                    <div>最好的服务都在我这里啦最好的服务都在我这里啦</div>
                </div>
            </div>
            <div class="bottom-btn like-btn">很赞</div>
        </swiper-slide>
        <swiper-slide class="tech-list-slide common-slide">
            <div class="wrap">
                <div class="page-title ani"></div>
                <div class="info-wrap tech t1 ani">
                    <div></div>
                    <div>张得好[66号]</div>
                    <div>擅长最专业的泰式按摩</div>
                    <div>客人印象:<span>#美白</span><span>#美白</span><span>#美白</span></div>
                    <div class="item-btn right">足浴项目</div>
                </div>
                <div class="info-wrap tech t2 ani">
                    <div></div>
                    <div>张得好[66号]</div>
                    <div>擅长最专业的泰式按摩</div>
                    <div>客人印象:<span>#美白</span><span>#美白</span><span>#美白</span></div>
                    <div class="item-btn right">足浴项目</div>
                </div>
                <div class="info-wrap tech t3 ani">
                    <div></div>
                    <div>张得好[66号]</div>
                    <div>擅长最专业的泰式按摩</div>
                    <div>客人印象:<span>#美白</span><span>#美白</span><span>#美白</span></div>
                    <div class="item-btn right">足浴项目</div>
                </div>
            </div>
            <div class="bottom-btn like-btn">很赞</div>
        </swiper-slide>
        <swiper-slide class="common-slide tech-pics-slide">
            <div class="wrap">
                <div class="page-title ani"></div>
                <swiper :options="picSwiperOption" class="pics-swiper">
                    <swiper-slide class="s1"></swiper-slide>
                    <swiper-slide class="s2"></swiper-slide>
                    <swiper-slide class="s3"></swiper-slide>
                </swiper>
            </div>
            <div class="bottom-btn like-btn">很赞</div>
        </swiper-slide>
        <swiper-slide class="common-slide video-slide">
            <div class="wrap">
                <div class="page-title ani"></div>
                <div class="info-wrap opacity-ani ani">
                    <video class="video-js vjs-default-skin" controls preload="auto" width="100%" height="100%" data-setup="{}">
                        <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
                        <source src="http://vjs.zencdn.net/v/oceans.webm" type="video/webm">
                        <source src="http://vjs.zencdn.net/v/oceans.ogv" type="video/ogg">
                    </video>
                </div>
            </div>
            <div class="bottom-btn like-btn">很赞</div>
        </swiper-slide>
        <swiper-slide class="act-slide common-slide service-item">
            <div class="wrap">
                <div class="page-title ani"></div>
                <div class="info-wrap opacity-ani ani">
                    <div></div>
                    <div>花样泰式按摩</div>
                    <div><strong>155</strong><span>元</span>（或<b>1000</b>积分）</div>
                    <div>原价：300元</div>
                    <div>距结束：<b>11</b>时<b>05</b>分<b>21</b>秒<span>剩余22份</span></div>
                    <div class="shadow-btn grab-btn"></div>
                </div>
            </div>
            <div class="bottom-btn like-btn">很赞</div>
        </swiper-slide>
        <swiper-slide class="act-slide common-slide one-yuan">
            <div class="wrap">
                <div class="page-title ani"></div>
                <div class="info-wrap opacity-ani ani">
                    <div></div>
                    <div><b>泰式按摩</b>(第二期)</div>
                    <div><div style="width:60%"></div></div>
                    <div>已抢：<span>247/500</span></div>
                    <div class="shadow-btn grab-btn"></div>
                </div>
            </div>
            <div class="bottom-btn like-btn">很赞</div>
        </swiper-slide>
        <swiper-slide class="act-slide common-slide coupon">
            <div class="wrap">
                <div class="page-title ani"></div>
                <div class="info-wrap opacity-ani ani">
                    <div class="coupon">
                        <div>泰式按摩券<span>现金券</span></div>
                        <div><b>￥</b><strong>500</strong>满500元可用</div>
                        <div>有效时间：客人购买后60天有效</div>
                    </div>
                    <div class="shadow-btn grab-btn"></div>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide class="health-slide common-slide">
            <div class="wrap">
                <div class="page-title ani"></div>
                <div class="info-wrap opacity-ani ani">
                    <h3>标题一</h3>
                    <p>本活动需要支付，最低元起，每支付块钱获得需要支付。</p>
                    <h3>标题二</h3>
                    <p>本活动需要支付，最低元起，每支付块钱获得需要支付。</p>
                </div>
            </div>
            <div class="bottom-btn like-btn">很赞</div>
            <div class="bottom-btn share-btn">分享</div>
            <div class="over-tip">—更多精彩去网上会所看看—</div>
        </swiper-slide>
    </swiper>
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
                global: Global.data,
                list: [1, 2, 3],
                swiperOption: {
                    direction: 'vertical',
                    observeParents: true,
                    onInit: function (swiper) {
                        var global = Global
                        if (global.app) {
                            global.swiper = swiper
                            global.app.init()
                        } else {
                            var waitMounted = setInterval(function () {
                                if (global.app) {
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
                        var swiperArr = global.swiperArr
                        var aniEles = global.aniEles
                        var currSwiper = swiperArr[activeIndex]
                        var previousAniEles // 前一个页面的ani元素

                        if (activeIndex === 0) {
                            pageHeaderCls.remove('common')
                        } else {
                            pageHeaderCls.add('common')
                        }

                        if (swiperArr.length === 0) {
                            swiperArr = document.querySelectorAll('div.journal-page>div.swiper-wrapper>div.swiper-slide')
                        }

                        if (!currSwiper) {
                            currSwiper = swiperArr[activeIndex]
                        }
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
                            previousAniEles.forEach(function (el) {
                                el.classList.remove('act')
                            })
                        }

                        if (currPageAniEles && currPageAniEles.length > 0) {
                            currPageAniEles.forEach(function (el) {
                                el.classList.add('act')
                            })
                        }
                    }
                },
                picSwiperOption: {
                    effect: 'cube',
                    grabCursor: true,
                    cube: {
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94
                    }
                }
            }
        },
        created: function () {
            window.addEventListener('resize', function () {
                Global.resizeWin()
            })
            Global.resizeWin()
            console.log('created....')
        },
        mounted: function () {
            var _this = this
            _this.$nextTick(function () {
                Global.app = _this
            })
        },
        methods: {
            init: function () {
                console.log('app init first page')
                Global.swiperArr = document.querySelectorAll('div.journal-page>div.swiper-wrapper>div.swiper-slide')
                var aniEles = Global.swiperArr[0].querySelectorAll('.ani')
                Global.aniEles[0] = aniEles
                aniEles.forEach(function (el) {
                    el.classList.add('act')
                })
            }
        }
    }
</script>