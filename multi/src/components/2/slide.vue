<template>
    <swiper-slide class="common-slide" :class="slideCls">
        <div class="wrap" :style="{ height : wrapHeight+'rem', 'margin-top' : -(wrapHeight/2+1.5)+'rem' }">
            <div v-if="!isOver" class="page-title" :style="{ 'margin-bottom' : pageTitleMarginBottom+'rem' }">{{ slideObj.title }}</div>
            <div v-else class="page-end-title ani">更多精彩去网上会所看看吧</div>
            <template v-if="slideObj.category=='new-tech'"><!-- 闪亮新人 -->
                <div class="red-zebra-wrap tech-info" :style="{'margin-top' : 0.7+marginRem+'rem'}">
                    <div class="tech-header" v-if="slideObj.avatarUrl" :style="{ 'background-image' : 'url('+slideObj.avatarUrl+')' }" @click="doClickChatBtn(slideObj.techId)"></div>
                    <div class="tech-name">{{ slideObj.techName }}&nbsp;<span v-show="slideObj.techNo">[{{ slideObj.techNo }}号]</span></div>
                    <div class="tech-desc">{{ slideObj.description || '最好的服务都在我这里啦！'}}</div>
                    <div v-if="slideObj.serviceItems.length>0" class="service-list"><div v-for="service in slideObj.serviceItems">{{ service }}</div></div>
                    <div class="chat-btn"></div>
                </div>
            </template>
        </div>
    </swiper-slide>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import { Global } from '../../libs/global'

    module.exports = {
        components: {
            'swiper': swiper,
            'swiper-slide': swiperSlide
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
                pageTitleMarginBottom: 0
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
            var global = that.global

            if (slideObj.clubId) {
                that.clubUrl = 'http://' + location.host + (/spa-manager/.test(location.pathname) ? '/spa-manager' : '') + '/spa2/?club=' + slideObj.clubId
            }

            that.$nextTick(function () {
                // 调整页面 info-wrap与page-title的间距
                var winHeightRem = global.winHeight / (16 * global.winScale)

                console.log('winHeightRem：' + winHeightRem)

                if (winHeightRem > 28.889) {
                    var marginRem = winHeightRem - 28.889
                    if (marginRem > 1.5) {
                        marginRem = 1.5
                    }
                    that.marginRem = marginRem
                    that.wrapHeight = that.wrapHeight + marginRem
                    console.log('marginRem：' + marginRem)
                    if (slideObj.category == 'tech-list' || (slideObj.category == 'act' && (slideObj.type == 'coupon' || slideObj.type == 'timeLimit'))) {
                        that.pageTitleMarginBottom = marginRem * 0.7
                    }
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