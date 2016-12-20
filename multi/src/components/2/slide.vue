<template>
    <swiper-slide class="common-slide" :class="slideCls">
        <div v-if="isIndex">
            <!--左侧的圣诞树-->
            <div class="left-tree ani"></div>
            <!--右侧的圣诞树-->
            <div class="right-tree ani"></div>
            <!--中间的圣诞树-->
            <div class="main-tree ani" ref="mainTree"></div>
            <!--统计数据：点赞数 浏览数-->
            <div class="statistic-data ani">
                <div>{{ global.journalData.likeCount }}</div>
                <div>{{ global.journalData.viewCount }}</div>
            </div>
            <!--圣诞老人-->
            <div class="santa ani" ref="santaMan">
                <div>{{ global.journalData.title }}</div>
                <div>{{ global.journalData.subTitle }}</div>
            </div>
        </div>
        <div v-else class="wrap" :style="{ height : wrapHeight+'rem', 'margin-top' : -(wrapHeight/2+1.5)+'rem' }">
            <div v-if="!isOver" class="page-title" :style="{ 'margin-bottom' : pageTitleMarginBottom+'rem' }">{{ slideObj.title }}</div>
            <last-title v-else class="page-end-title"></last-title>
            <template v-if="slideObj.category=='new-tech'"><!-- 闪亮新人 -->
                <div class="red-zebra-wrap tech-info decorate-bottom-snow" :style="{'margin-top' : 0.7+marginRem+'rem'}">
                    <div class="tech-header" v-if="slideObj.avatarUrl" :style="{ 'background-image' : 'url('+slideObj.avatarUrl+')' }" @click="doClickChatBtn(slideObj.techId)"></div>
                    <div class="tech-name">{{ slideObj.techName }}&nbsp;<span v-show="slideObj.techNo">[{{ slideObj.techNo }}号]</span></div>
                    <div class="tech-desc">{{ slideObj.description || '最好的服务都在我这里啦！'}}</div>
                    <div v-if="slideObj.serviceItems.length>0" class="service-list"><div v-for="service in slideObj.serviceItems">{{ service }}</div></div>
                    <div class="chat-btn"></div>
                </div>
            </template>
            <template v-if="slideObj.category=='service-item'"><!-- 最新项目 -->
                <div class="service-item-wrap" v-if="slideObj.leftService" :style="{'margin-top' : 0.5+marginRem+'rem'}">
                    <div class="service-img" :style="slideObj.leftService.styleObj" @click="doClickServiceItem(slideObj.leftService.id)"></div>
                    <div class="text-wrap">
                        <div>{{ slideObj.leftService.name }}</div>
                        <div><arrow></arrow><strong>{{ slideObj.leftService.price }}</strong>元/{{ slideObj.leftService.duration }}{{ slideObj.leftService.durationUnit }}</div>
                       <!-- <div>加钟：30元/10分钟</div>-->
                    </div>
                    <div class="service-desc">{{ slideObj.leftService.description }}</div>
                </div>
            </template>
            <template v-if="slideObj.category=='tech-list'"><!-- 服务之星 -->
                <div class="tech-info-wrap" v-for="(tech,index) in slideObj.techs" :class="'t'+index+(tech.serviceItems.length>0 ? '' : ' no-item')">
                    <div class="default-img-bg" :style="tech.imgStyle" @click="doClickChatBtn(tech.techId)"><div class=""></div></div>
                    <div>{{ tech.techName }}<span v-show="tech.techNo">[{{ tech.techNo }}号]</span></div>
                    <div>{{ tech.description || '这个技师很懒，未写介绍...'}}</div>
                    <div>客人印象:<span v-for="imp in tech.impressions" v-show="imp && imp!='null'">#{{ imp }}</span></div>
                    <div v-if="tech.serviceItems.length>0">{{ tech.serviceItems[0] }}</div>
                </div>
            </template>
            <template v-if="slideObj.category=='video'"><!-- 视频 -->
                <div class="video-wrap decorate-bottom-snow decorate-top-snow">
                    <video ref="techVideo" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="metadata" width="100%" height="100%" :poster="slideObj.poster" data-setup="{}">
                        <source :src="slideObj.video" type="video/mp4" />
                    </video>
                </div>
            </template>
            <template v-if="slideObj.category=='act' && slideObj.type=='timeLimit'"><!-- 活动 -抢项目-->
                <div class="act-wrap time-limit-wrap decorate-top-snow" :style="{ 'margin-top' : (pageTitleMarginBottom>0.9 ? 0.9 : pageTitleMarginBottom) +'rem' }">
                    <div class="default-img-bg" :style="slideObj.imgStyle"></div>
                    <div class="text-wrap">
                        <div>{{ slideObj.data.actName }}</div>
                        <div><strong>{{ slideObj.data.actAmount }}</strong><span>元</span><span v-show="slideObj.data.actCredit">（或<b>{{ slideObj.data.actCredit }}</b>积分）</span></div>
                        <div>原价：{{ slideObj.data.actPrice }}元</div>
                        <counter :remain-count="slideObj.data.remainCount" :start="slideObj.data.startDate" :end="slideObj.data.endDate" v-show="timeLimitActStatus != 'over'" @status-change="doTimeLimitActStatusChange"></counter>
                    </div>
                    <div class="grab-btn" @click="doClickBtnOfTimeLimitAct()">马上抢</div>
                </div>
            </template>
            <template v-if="slideObj.category=='act' && slideObj.type=='coupon'"><!-- 活动 -优惠券-->
                <div class="act-wrap coupon-wrap decorate-top-snow" :style="{ 'margin-top' : (pageTitleMarginBottom>0.9 ? 0.9 : pageTitleMarginBottom) +'rem' }">
                    <div class="coupon">
                        <coupon-bg :coupon-type="slideObj.data.couponType"></coupon-bg>
                        <div>{{ slideObj.data.actName }}</div>
                        <div>￥{{ slideObj.data.actValue }}</div>
                        <div>{{ slideObj.data.consumeMoneyDescription }}</div>
                        <div>有效时间：{{ slideObj.data.couponPeriod }}</div>
                    </div>
                    <div class="grab-btn" @click="doClickBtnOfCouponAct()">马上抢</div>
                </div>
            </template>
            <template v-if="slideObj.category=='act' && (slideObj.type=='oneYuan' || slideObj.type=='plumFlower')"><!-- 活动 -一元抢-->
                <div class="act-wrap one-yuan-wrap decorate-top-snow" :style="{ 'margin-top' : (pageTitleMarginBottom>0.9 ? 0.9 : pageTitleMarginBottom) +'rem' }">
                    <div class="default-img-bg" :style="slideObj.imgStyle"></div>
                    <div class="text-wrap">
                        <div>{{ slideObj.data.actName }}</div>
                        <div><div class="one-yuan-count" :progress="slideObj.data.actPaidAmount/slideObj.data.actPrice*100"></div></div>
                        <div>已抢：<span>{{ slideObj.data.actPaidAmount }}/{{ slideObj.data.actPrice }}</span></div>
                    </div>
                    <div class="grab-btn" @click="doClickBtnOfOneYuanAct()">马上抢</div>
                </div>
            </template>
            <template v-if="slideObj.category=='health'"><!-- 养身频道-->
                <div class="health-wrap" v-html="slideObj.content" ref="healthContent" @touchmove="doTouchMoveContent($event)"></div>
            </template>
            <template v-if="slideObj.category=='actDesc'"><!--活动文字-->
                <div class="red-zebra-wrap decorate-bottom-snow" v-html="slideObj.content" ref="actDescContent" @touchmove="doTouchMoveContent($event)" :style="{'margin-top' : 0.7+marginRem+'rem'}"></div>
                <div class="act-time" v-show="slideObj.actTime">{{ slideObj.actTime }}</div>
            </template>
            <template v-if="slideObj.category=='end'">
                <div class="qr-code"><img :src="qrCodeImgUrl"/></div>
                <div class="attention-tip">长按识别二维码关注</div>
            </template>
        </div>
        <like-button v-if="!isIndex" :category="isOver ? 'club' : global.likeStatus" :class="{ 'over': isOver }" :club-id="slideObj.clubId"></like-button>
        <like-button category="share" v-if="isOver"></like-button>
        <template v-if="slideObj.category=='tech-pics'"><!-- 技师相册 -->
            <swiper :options="picSwiperOption" class="pic-wrap" v-if="slideObj.pics.length>0">
                <swiper-slide v-for="pic in slideObj.pics"><div class="swiper-zoom-container"><img :src="pic"/></div></swiper-slide>
            </swiper>
        </template>
    </swiper-slide>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import { Global } from '../../libs/global'
    import Arrow from './arrow'
    import Counter from '../counter'
    import CouponBg from './couponBg'
    import LastTitle from './lastTitle'
    import LikeButton from './likeButton'

    module.exports = {
        components: {
            'swiper': swiper,
            'swiper-slide': swiperSlide,
            'arrow': Arrow,
            'counter': Counter,
            'coupon-bg': CouponBg,
            'last-title': LastTitle,
            'like-button': LikeButton
        },
        data: function () {
            return {
                global: Global,
                clubUrl: '',
                qrCodeImgUrl: '', // 关注公众号二维码图片地址
                getCodeImgMaxCount: 2,
                needScrollWrap: false,
                wrapHeight: 22,
                marginRem: 0,
                pageTitleMarginBottom: 0,
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
                if (this.isIndex) {
                    return ''
                } else {
                    return 'common-slide ' + thisData.category + '-slide' + (thisData.type ? ' ' + thisData.type : '')
                }
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
            },
            isIndex: {
                type: Boolean,
                default: false
            }
        },
        mounted: function () {
            var that = this
            var slideObj = that.slideObj
            var global = that.global

            if (slideObj.clubId) {
                that.clubUrl = 'http://' + location.host + (/spa-manager/.test(location.pathname) ? '/spa-manager' : '') + '/spa2/?club=' + slideObj.clubId
            }

            that.$nextTick(function () {
                // 调整页面 info-wrap与page-title的间距
                var winHeightRem = global.winHeight / (16 * global.winScale)

                if (winHeightRem > 28.889) {
                    var marginRem = winHeightRem - 28.889
                    if (marginRem > 1.5) {
                        marginRem = 1.5
                    }
                    that.marginRem = marginRem
                    that.wrapHeight = that.wrapHeight + marginRem
                    if (slideObj.category == 'act') {
                        that.pageTitleMarginBottom = marginRem * 0.5
                    }
                    if (slideObj.category == 'tech-list') {
                        that.pageTitleMarginBottom = marginRem * 0.1
                    }
                }

                if (slideObj.category == 'video') {
                    var techVideoEle = that.$refs.techVideo
                    var player = videojs(techVideoEle)

                    var music = document.querySelector('#bgAudio')
                    var musicIcon = document.querySelector('.music-icon')
                    if (music) {
                        player.on('play', function () { // console.log('开始/恢复播放,暂停音乐')
                            if (musicIcon.getAttribute('paused') != 1) {
                                music.pause()
                                musicIcon.classList.remove('act')
                            }
                        })
                        player.on('ended', function () { // console.log('播放结束')
                            music.play()
                            musicIcon.classList.add('act')
                        })
                        player.on('pause', function () { // console.log('播放暂停')
                            music.play()
                            musicIcon.classList.add('act')
                        })
                    }
                } else if (slideObj.category == 'end') {
                    that.wrapHeight = 21
                    that.getClubQrCodeImg()
                } else if (slideObj.category == 'actDesc') {
                    var actDescContent = that.$refs.actDescContent
                    if (actDescContent.scrollHeight > actDescContent.offsetHeight) {
                        that.needScrollWrap = true // 滑动的时候需要滑动内容
                    }
                } else if (slideObj.category == 'health') {
                    var healthContent = that.$refs.healthContent
                    if (healthContent.scrollHeight > healthContent.offsetHeight) {
                        that.needScrollWrap = true
                    }
                }

                if (that.isIndex) {
                    that.$refs.mainTree.style.backgroundImage = 'url(./images/2/7.png)'
                    that.$refs.santaMan.style.backgroundImage = 'url(./images/2/8.png)'
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
            doClickServiceItem: function (serviceItemId) { // 点击项目，跳转到项目详情页
                location.href = this.clubUrl + '#serviceItem&id=' + serviceItemId
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
            },
            doTouchMoveContent: function (e) {
                var that = this
                if (that.needScrollWrap) {
                    e.stopPropagation()
                }
            }
        }
    }
</script>