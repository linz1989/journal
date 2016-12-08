<template>
    <swiper-slide class="common-slide" :class="slideCls">
        <div class="wrap" :style="{ height : wrapHeight+'rem', 'margin-top' : -(wrapHeight/2+1.5)+'rem' }">
            <div v-if="!isOver" class="page-title ani" :style="{ 'margin-bottom' : pageTitleMarginBottom+'rem' }"><page-title :title="slideObj.title"></page-title></div>
            <div v-else class="page-end-title">更多精彩去网上会所看看吧</div>
            <template v-if="slideObj.category=='new-tech'"><!-- 闪亮新人 -->
                <div class="info-wrap tech-info opacity-ani ani" :style="{'margin-top' : 1+marginRem*0.3+'rem'}" :class="{'no-item' : slideObj.serviceItems.length==0 }">
                    <div class="tech-header ani" v-if="slideObj.avatarUrl" :style="{ 'background-image' : 'url('+slideObj.avatarUrl+')' }" @click="doClickChatBtn(slideObj.techId)"></div>
                    <div class="tech-name ani">{{ slideObj.techName }}&nbsp;<span v-show="slideObj.techNo">[{{ slideObj.techNo }}号]</span></div>
                    <div class="tech-desc ani">{{ slideObj.description || '最好的服务都在我这里啦！'}}</div>
                    <div class="service-list ani"><div v-for="service in slideObj.serviceItems">{{ service }}</div></div>
                </div>
            </template>
            <template v-if="slideObj.category=='service-item'"><!-- 最新项目 -->
                <div class="info-wrap service left ani" v-if="slideObj.leftService" :class="{ single: !slideObj.rightService }">
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
                    <div class="default-img-bg ani" :style="tech.imgStyle" @click="doClickChatBtn(tech.techId)"></div>
                    <div>{{ tech.techName }}<span v-show="tech.techNo">[{{ tech.techNo }}号]</span></div>
                    <div>{{ tech.description || '这个技师很懒，未写介绍...'}}</div>
                    <div>客人印象:<span v-for="imp in tech.impressions">#{{ imp }}</span></div>
                    <div class="item-btn right ani" v-if="tech.serviceItems.length>0">{{ tech.serviceItems[0] }}</div>
                </div>
            </template>
            <template v-if="slideObj.category=='video'"><!-- 视频 -->
                <div class="info-wrap scale-ani scale-ani-all ani">
                    <video ref="techVideo" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="100%" height="100%" :poster="slideObj.poster" data-setup="{}">
                        <source :src="slideObj.video" type="video/mp4" />
                    </video>
                </div>
            </template>
            <template v-if="slideObj.category=='act' && slideObj.type=='timeLimit'"><!-- 活动 -抢项目-->
                <div class="info-wrap opacity-ani ani" :style="{ 'margin-top' : (pageTitleMarginBottom>0.9 ? 0.9 : pageTitleMarginBottom) +'rem' }">
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
            <template v-if="slideObj.category=='act' && (slideObj.type=='oneYuan' || slideObj.type=='plumFlower')"><!-- 活动 -一元抢-->
                <div class="info-wrap opacity-ani ani">
                    <div class="default-img-bg ani" :style="slideObj.imgStyle"></div>
                    <div class="text-wrap ani">
                        <div><b>{{ slideObj.data.actName }}</b></div>
                        <div><div class="ani one-yuan-count" :progress="slideObj.data.actPaidAmount/slideObj.data.actPrice*100"></div></div>
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
            <template v-if="slideObj.category=='end'">
                <div class="qr-code">
                    <canvas ref="qrCodeBorder" width="375" height="396"></canvas>
                    <div><img :src="qrCodeImgUrl"/></div>
                </div>
                <div class="attention-tip">

                </div>
            </template>
        </div>
        <worm-button :category="isOver ? 'club' : global.likeStatus" :class="{ 'over': isOver }" :club-id="slideObj.clubId"></worm-button>
        <worm-button category="share" v-if="isOver"></worm-button>
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
    import videojs from 'video.js'

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
                wrapHeight: 22,
                marginRem: 0,
                pageTitleMarginBottom: 0,
                qrCodeImgUrl: '', // 关注公众号二维码图片地址
                getCodeImgMaxCount: 2,
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
                            swiper.slideNext(null, 1)
                            setTimeout(function () {
                                swiper.slidePrev(null, 1)
                            }, 500)
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
            var that = this
            var slideObj = that.slideObj
            var global = Global
            if (slideObj.clubId) {
                this.clubUrl = 'http://' + location.host + (/spa-manager/.test(location.pathname) ? '/spa-manager' : '') + '/spa2/?club=' + slideObj.clubId
            }

            that.$nextTick(function () {
                // 调整贵宾福利 抢项目页面 info-wrap与page-title的间距
                var winHeightRem = global.winHeight / (16 * global.winScale)
                // console.log('winHeightRem：' + winHeightRem)
                if (winHeightRem > 28.889) {
                    var marginRem = winHeightRem - 28.889
                    if (marginRem > 1.5) {
                        marginRem = 1.5
                    }
                    that.marginRem = marginRem
                    that.wrapHeight = that.wrapHeight + marginRem
                    if (slideObj.category == 'tech-list' || (slideObj.category == 'act' && (slideObj.type == 'coupon' || slideObj.type == 'timeLimit'))) {
                        that.pageTitleMarginBottom = marginRem * 0.7
                    }

                    /* var actSlide = doc.querySelector('div.common-slide.timeLimit>div.wrap>div.info-wrap')
                    if (actSlide) {
                        actSlide.style.marginTop = marginRem + 'rem'
                    } */
                }

                if (slideObj.category == 'video') {
                    var techVideoEle = that.$refs.techVideo
                    var player = videojs(techVideoEle)
                    player.on('play', function () {
                        // console.log('开始/恢复播放')
                    })
                } else if (slideObj.category == 'end') {
                    that.drawBgOfEndSlide()
                    that.getClubQrCodeImg()
                }
            })
        },
        methods: {
            doClickChatBtn: function (techId) { // 点击点我聊聊按钮
                location.href = this.clubUrl + '#chat&techId=' + techId
            },
            doClickBtnOfTimeLimitAct: function () { // 点击立即抢购按钮，限时抢活动
                location.href = this.clubUrl + '#robProjectDetail&robProjectId=' + this.slideObj.data.actId
            },
            doClickBtnOfOneYuanAct: function () { // 跳转到一元抢页面
                var that = this
                var slideObj = that.slideObj
                if (slideObj.type == 'oneYuan') {
                    location.href = that.clubUrl + '#oneYuanDetail&oneYuanId=' + slideObj.data.actId
                } else {
                    location.href = that.clubUrl + '#plumflowers&id=' + slideObj.data.actId + '&chanel=link'
                }
            },
            doClickBtnOfCouponAct: function () { // 跳转到会所活动页面
                location.href = this.clubUrl + '#promotions'
            },
            doTimeLimitActStatusChange: function (status) { // 限时抢活动状态的变化
                // console.log('限时抢活动状态的变化....' + status)
                this.timeLimitActStatus = status
            },
            drawBgOfEndSlide: function () {
                var that = this
                var ctx = that.$refs.qrCodeBorder.getContext('2d')

                // 绘制二维码边框
                ctx.strokeStyle = '#00f5dd'
                ctx.lineWidth = 6
                ctx.lineCap = 'round'
                var allWidth = 375
                var allHeight = 396
                var top = 3
                var left = 3
                var bottom = allHeight - top
                var right = allWidth - left
                var borderRadius = 30
                ctx.moveTo(left + borderRadius, top)
                ctx.lineTo(right - borderRadius, top)
                ctx.arcTo(right, top, allWidth - left, top + borderRadius, borderRadius)
                ctx.lineTo(right, top + borderRadius + 20)
                ctx.moveTo(right, top + borderRadius + 40)
                ctx.lineTo(right, top + borderRadius + 70)
                ctx.moveTo(right, top + borderRadius + 90)
                ctx.lineTo(right, bottom - borderRadius)
                ctx.arcTo(right, bottom, right - borderRadius, bottom, borderRadius)
                ctx.lineTo(left + borderRadius, bottom)
                ctx.arcTo(left, bottom, left, bottom - borderRadius, borderRadius)
                ctx.lineTo(left, bottom - borderRadius - 20)
                ctx.moveTo(left, bottom - borderRadius - 40)
                ctx.lineTo(left, bottom - borderRadius - 70)
                ctx.moveTo(left, bottom - borderRadius - 90)
                ctx.lineTo(left, top + borderRadius)
                ctx.arcTo(left, top, left + borderRadius, top, borderRadius)
                ctx.stroke()
            },
            getClubQrCodeImg: function () {
                var that = this
                that.getCodeImgMaxCount--
                that.$http.get('../api/v1/wx/club/param_qrcode', {params: {clubId: that.slideObj.clubId}}).then(function (res) {
                    res = res.body
                    if (res.statusCode == 200) {
                        if (res.respData == 'N') {
                            if (that.getCodeImgMaxCount != 0) {
                                that.getClubQrCodeImg()
                            }
                        } else {
                            that.qrCodeImgUrl = res.respData
                        }
                    }
                })
            }
        }
    }
</script>