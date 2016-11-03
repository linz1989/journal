<style>
    @import './styles/index.css';
</style>
<template>
    <swiper :options='swiperOption' class="journal-page">
        <swiper-slide class="index-slide">
            <div class="center-circle">
                <div class="line-top"></div>
                <div class="line-bottom"></div>
                <div class="circle small"></div>
                <div class="circle mid"></div>
                <div class="circle big"></div>
            </div>
            <div class="text"><div>这是活动标题，活动标题一</div></div>
        </swiper-slide>
        <swiper-slide class="new-tech-slide common-slide">
            <div class="wrap">
                <div class="page-title"></div>
                <div class="info-wrap tech-info">
                    <div class="tech-header"></div>
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
                <div class="page-title"></div>
                <div class="info-wrap service left">
                    <div class="service-img"></div>
                    <div>面部SPA</div>
                    <div><strong>98元</strong>/60分钟</div>
                    <div>最好的服务都在我这里啦最好的服务都在我这里啦</div>
                </div>
                <div class="info-wrap service right">
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
                <div class="page-title"></div>
                <div class="info-wrap tech">
                    <div></div>
                    <div>张得好[66号]</div>
                    <div>擅长最专业的泰式按摩</div>
                    <div>客人印象:<span>#美白</span><span>#美白</span><span>#美白</span></div>
                    <div class="item-btn right">足浴项目</div>
                </div>
                <div class="info-wrap tech"></div>
                <div class="info-wrap tech"></div>
            </div>
            <div class="bottom-btn like-btn">很赞</div>
        </swiper-slide>
        <swiper-slide class="common-slide tech-pics-slide">
            <div class="wrap">
                <div class="page-title"></div>
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
                <div class="page-title"></div>
                <div class="info-wrap">
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
                <div class="page-title"></div>
                <div class="info-wrap">
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
                <div class="page-title"></div>
                <div class="info-wrap">
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
                <div class="page-title"></div>
                <div class="info-wrap">
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
                <div class="page-title"></div>
                <div class="info-wrap">
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
                        console.dir(swiper)
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
        },
        mounted: function () {

        },
        methods: { }
    }
</script>