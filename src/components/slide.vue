<template>
    <swiper-slide class="common-slide" :class="slideCls">
        <div class="wrap">
            <div class="page-title ani"><page-title :title="slideObj.title"></page-title></div>
            <template v-if="slideObj.category=='new-tech'"><!-- 闪亮新人 -->
                <div class="info-wrap tech-info opacity-ani ani">
                    <div class="tech-header ani"><div v-if="slideObj.avatarUrl" :style="{ 'background-image' : 'url('+slideObj.avatarUrl+')' }"></div></div>
                    <div class="shadow-btn chat-btn ani" @click="doClickChatBtn()"></div>
                    <div class="name-wrap ani">
                        <div class="tech-name">{{ slideObj.techName }}&nbsp;<span v-show="slideObj.techNo">[{{ slideObj.techNo }}号]</span></div>
                        <div class="tip">最好的服务都在我这里啦！</div>
                        <div class="service-list"><div v-for="service in slideObj.serviceItems" class="item-btn left">{{ service }}</div></div>
                    </div>
                </div>
            </template>
            <template v-if="slideObj.category=='service-item'"><!-- 最新项目 -->
                <div class="info-wrap service left ani" v-if="slideObj.leftService">
                    <div class="service-img ani" :style="{ 'background-image' : 'url('+slideObj.leftService.imageUrl+')' }"></div>
                    <div class="text-wrap ani">
                        <div>{{ slideObj.leftService.name }}</div>
                        <div><strong>{{ slideObj.leftService.price }}元</strong>/{{ slideObj.leftService.unit }}{{ slideObj.leftService.durationUnit }}</div>
                        <div>{{ slideObj.leftService.description }}</div>
                    </div>
                </div>
                <div class="info-wrap service right ani" v-if="slideObj.rightService">
                    <div class="service-img ani" :style="{ 'background-image' : 'url('+slideObj.rightService.imageUrl+')' }"></div>
                    <div class="text-wrap ani">
                        <div>{{ slideObj.rightService.name }}</div>
                        <div><strong>{{ slideObj.rightService.price }}元</strong>/{{ slideObj.rightService.unit }}{{ slideObj.rightService.durationUnit }}</div>
                        <div>{{ slideObj.rightService.description }}</div>
                    </div>
                </div>
            </template>
            <template v-if="slideObj.category=='tech-list'"><!-- 服务之星 -->
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
            </template>
            <template v-if="slideObj.category=='tech-pics'"><!-- 视频 -->
                <swiper :options="picSwiperOption" class="pic-wrap scale-ani ani">
                    <swiper-slide v-for="item in techPics"><div :class="'pic-item-'+item"></div></swiper-slide>
                </swiper>
            </template>
            <template v-if="slideObj.category=='video'"><!-- 视频 -->
                <div class="info-wrap scale-ani ani">
                    <video class="video-js vjs-default-skin" controls preload="meta" width="100%" height="100%" data-setup="{}">
                        <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
                        <source src="http://vjs.zencdn.net/v/oceans.webm" type="video/webm">
                        <source src="http://vjs.zencdn.net/v/oceans.ogv" type="video/ogg">
                    </video>
                </div>
            </template>
            <template v-if="slideObj.category=='act' && slideObj.type=='service-item'"><!-- 活动 -抢项目-->
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
            </template>
            <template v-if="slideObj.category=='act' && slideObj.type=='one-yuan'"><!-- 活动 -一元抢-->
                <div class="info-wrap opacity-ani ani">
                    <div class="ani"></div>
                    <div class="text-wrap ani">
                        <div><b>泰式按摩</b>(第二期)</div>
                        <div><div class="ani" id="one-yuan-count"></div></div>
                        <div>已抢：<span>247/500</span></div>
                    </div>
                    <div class="shadow-btn grab-btn ani"></div>
                </div>
            </template>
            <template v-if="slideObj.category=='act' && slideObj.type=='coupon'"><!-- 活动 -优惠券-->
                <div class="info-wrap scale-ani ani">
                    <div class="coupon ani">
                        <coupon-bg></coupon-bg>
                        <div>泰式按摩券<span>现金券</span></div>
                        <div><b>￥</b><strong>500</strong>满500元可用</div>
                        <div>有效时间：客人购买后60天有效</div>
                    </div>
                    <div class="shadow-btn grab-btn ani"></div>
                </div>
            </template>
            <template v-if="slideObj.category=='health'"><!-- 养身频道-->
                <div class="info-wrap ani">
                    <h3>标题一</h3>
                    <p>本活动需要支付，最低元起，每支付块钱获得需要支付。</p>
                    <h3>标题二</h3>
                    <p>本活动需要支付，最低元起，每支付块钱获得需要支付。</p>
                </div>
            </template>
        </div>
        <worm-button category="like"></worm-button>
        <worm-button category="share" v-if="slideObj.category=='health'"></worm-button>
        <div v-if="isOver" class="over-tip">—更多精彩去网上会所看看—</div>
    </swiper-slide>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import PageTitle from './pageTitle'
    import WormButton from './wormButton'
    import CouponBg from './couponBg'

    module.exports = {
        components: {
            'swiper': swiper,
            'swiper-slide': swiperSlide,
            'page-title': PageTitle,
            'worm-button': WormButton,
            'coupon-bg': CouponBg
        },
        data: function () {
            return {
                techPics: [1, 2, 3, 4],
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
        computed: {
            slideCls: function () {
                var thisData = this.slideObj
                return thisData.category + '-slide' + (thisData.type ? ' ' + thisData.type : '')
            }
        },
        props: {
            slideObj: {
                type: Object,
                required: true
            },
            isOver: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            doClickChatBtn: function () { // 点击点我聊聊按钮
                var loc = location
                var slideObj = this.slideObj
                loc.href = loc.host + loc.pathname + 'spa2/?club=' + slideObj.clubId + '#chat&techId=' + slideObj.techId
                loc.reload(true)
            }
        }
    }
</script>