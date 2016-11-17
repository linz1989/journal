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
                    <div class="service-img default-img-bg ani" :style="slideObj.leftService.styleObj"></div>
                    <div class="text-wrap ani">
                        <div>{{ slideObj.leftService.name }}</div>
                        <div><strong>{{ slideObj.leftService.price }}元</strong>/{{ slideObj.leftService.duration }}{{ slideObj.leftService.durationUnit }}</div>
                        <div>{{ slideObj.leftService.description }}</div>
                    </div>
                </div>
                <div class="info-wrap service right ani" v-if="slideObj.rightService">
                    <div class="service-img default-img-bg ani" :style="slideObj.rightService.styleObj"></div>
                    <div class="text-wrap ani">
                        <div>{{ slideObj.rightService.name }}</div>
                        <div><strong>{{ slideObj.rightService.price }}元</strong>/{{ slideObj.rightService.duration }}{{ slideObj.rightService.durationUnit }}</div>
                        <div>{{ slideObj.rightService.description }}</div>
                    </div>
                </div>
            </template>
            <template v-if="slideObj.category=='tech-list'"><!-- 服务之星 -->
                <div class="info-wrap tech ani" v-for="(tech,index) in slideObj.techs" :class="'t'+index">
                    <div class="default-img-bg ani" :style="tech.imgStyle"></div>
                    <div>{{ tech.techName }}<span v-show="tech.techNo">[{{ tech.techNo }}号]</span></div>
                    <div>{{ tech.description || '这个技师很懒，未写介绍...'}}</div>
                    <div>客人印象:<span v-for="imp in tech.impressions">#{{ imp }}</span></div>
                    <div class="item-btn right ani" v-if="tech.serviceItems.length>0">{{ tech.serviceItems[0] }}</div>
                </div>
            </template>
            <template v-if="slideObj.category=='video'"><!-- 视频 -->
                <div class="info-wrap scale-ani ani">
                    <video class="video-js vjs-default-skin" controls preload="meta" width="100%" height="100%" data-setup="{}">
                        <source :src="slideObj.video" type="video/mp4"/>
                    </video>
                </div>
            </template>
            <template v-if="slideObj.category=='act' && slideObj.type=='timeLimit'"><!-- 活动 -抢项目-->
                <div class="info-wrap opacity-ani ani">
                    <div class="default-img-bg ani" :style="slideObj.imgStyle"></div>
                    <div class="text-wrap ani">
                        <div>{{ slideObj.data.actName }}</div>
                        <div><strong>{{ slideObj.data.actAmount }}</strong><span>元</span><span v-show="slideObj.data.actCredit">（或<b>{{ slideObj.data.actCredit }}</b>积分）</span></div>
                        <div>原价：{{ slideObj.data.actPrice }}元</div>
                        <counter :remain-count="slideObj.data.remainCount" :start="slideObj.data.startDate" :end="slideObj.data.endDate" v-show="timeLimitActStatus != 'over'" @status-change="doTimeLimitActStatusChange"></counter>
                    </div>
                    <div class="shadow-btn grab-btn ani" @click="doClickBtnOfTimeLimitAct()"></div>
                </div>
            </template>
            <template v-if="slideObj.category=='act' && slideObj.type=='oneYuan'"><!-- 活动 -一元抢-->
                <div class="info-wrap opacity-ani ani">
                    <div class="default-img-bg ani" :style="slideObj.imgStyle"></div>
                    <div class="text-wrap ani">
                        <div><b>{{ slideObj.data.actName }}</b></div>
                        <div><div class="ani" id="one-yuan-count" :progress="slideObj.data.actPaidAmount/slideObj.data.actPrice*100"></div></div>
                        <div>已抢：<span>{{ slideObj.data.actPaidAmount }}/{{ slideObj.data.actPrice }}</span></div>
                    </div>
                    <div class="shadow-btn grab-btn ani" @click="doClickBtnOfOneYuanAct()"></div>
                </div>
            </template>
            <template v-if="slideObj.category=='act' && slideObj.type=='coupon'"><!-- 活动 -优惠券-->
                <div class="info-wrap scale-ani ani">
                    <div class="coupon ani">
                        <coupon-bg></coupon-bg>
                        <div>{{ slideObj.data.actName }}<span>{{ slideObj.data.couponType }}</span></div>
                        <div><b>￥</b><strong>{{ slideObj.data.actValue }}</strong>{{ slideObj.data.consumeMoneyDescription }}</div>
                        <div>有效时间：{{ slideObj.data.couponPeriod }}</div>
                    </div>
                    <div class="shadow-btn grab-btn ani" @click="doClickBtnOfCouponAct()"></div>
                </div>
            </template>
            <template v-if="slideObj.category=='health'"><!-- 养身频道-->
                <div class="info-wrap ani" v-html="slideObj.content"></div>
            </template>
        </div>
        <worm-button :category="global.likeStatus" :class="{ 'over': isOver }"></worm-button>
        <worm-button category="share" v-if="isOver"></worm-button>
        <div v-if="isOver" class="over-tip">—更多精彩去网上会所看看—</div>
        <template v-if="slideObj.category=='tech-pics'"><!-- 技师相册 -->
            <swiper :options="picSwiperOption" class="pic-wrap scale-ani ani" v-if="slideObj.pics.length>0">
                <swiper-slide v-for="pic in slideObj.pics"><div class="swiper-zoom-container"><img :src="pic"/></div></swiper-slide>
            </swiper>
        </template>
    </swiper-slide>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import PageTitle from './pageTitle'
    import WormButton from './wormButton'
    import CouponBg from './couponBg'
    import Counter from './counter'
    import { Global } from '../libs/global'

    module.exports = {
        components: {
            'swiper': swiper,
            'swiper-slide': swiperSlide,
            'page-title': PageTitle,
            'worm-button': WormButton,
            'coupon-bg': CouponBg,
            'counter': Counter
        },
        data: function () {
            return {
                global: Global,
                clubUrl: '',
                timeLimitActStatus: 'over',
                picSwiperOption: {
                    effect: 'coverflow',
                    slidesPerView: 2,
                    centeredSlides: true,
                    observeParents: true,
                    loop: true,
                    zoom: true,
                    zoomMax: 2,
                    coverflow: {
                        rotate: 30,
                        stretch: 15,
                        depth: 60,
                        modifier: 2,
                        slideShadows: false
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
        mounted: function () {
            var slideObj = this.slideObj
            if (slideObj.clubId) {
                this.clubUrl = 'http://' + location.host + (/spa-manager/.test(location.pathname) ? '/spa-manager' : '') + '/spa2/?club=' + slideObj.clubId
                console.log('clubUrl：' + this.clubUrl)
            }
        },
        methods: {
            doClickChatBtn: function () { // 点击点我聊聊按钮
                location.href = this.clubUrl + '#chat&techId=' + this.slideObj.techId
            },
            doClickBtnOfTimeLimitAct: function () { // 点击立即抢购按钮，限时抢活动
                location.href = this.clubUrl + '#robProjectDetail&robProjectId=' + this.slideObj.data.actId
            },
            doClickBtnOfOneYuanAct: function () { // 跳转到一元抢页面
                location.href = this.clubUrl + '#plumflowers&id=' + this.slideObj.data.actId + '&chanel=link'
            },
            doClickBtnOfCouponAct: function () { // 跳转到会所活动页面
                location.href = this.clubUrl + '#promotions'
            },
            doTimeLimitActStatusChange: function (status) { // 限时抢活动状态的变化
                console.log('限时抢活动状态的变化....' + status)
                this.timeLimitActStatus = status
            }
        }
    }
</script>