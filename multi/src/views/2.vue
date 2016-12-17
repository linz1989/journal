<!--模板样式二-->
<template>
    <div class="tmp-second-page">
        <template v-show="!global.loading">
            <!--头部会所logo和名称-->
            <header ref="indexPageHeader" @click="goToClub()" class="act">
                <div v-if="data.clubImgUrl" :style="{ 'background-image' : 'url('+data.clubImgUrl+')' }"></div>
                <div>{{ data.clubName }}</div>
            </header>
            <header class="common" ref="pageHeader" @click="goToClub()">
                <div v-if="data.clubImgUrl" :style="{ 'background-image' : 'url('+data.clubImgUrl+')' }"></div>
                <div>{{ data.clubName }}</div>
            </header>

            <swiper :options='swiperOption' class="page-content">
                <swiper-slide>
                    <!--统计数据：点赞数 浏览数-->
                    <div class="statistic-data"><div>104</div><div>111</div></div>
                    <!--左侧的圣诞树-->
                    <div class="left-tree"></div>
                    <!--右侧的圣诞树-->
                    <div class="right-tree"></div>
                    <!--中间的圣诞树-->
                    <div class="main-tree"></div>
                    <!--圣诞老人-->
                    <div class="santa">
                        <div>限时优惠大抢购</div>
                        <div>副标题副标题副标题副标题副标题</div>
                    </div>
                </swiper-slide>
                <slide v-for="(item,index) in data.slideData" :slide-obj="item" :is-over="index==data.slideData.length-1"></slide>
            </swiper>
            <div class="slide-arrow act" ref="slideArrow"></div>
        </template>
    </div>
</template>
<script>
    import { Global } from '../libs/global'
    import Slide from '../components/2/slide'

    var pageHeader = null
    var indexPageHeader = null

    module.exports = {
        components: {
            'slide': Slide
        },
        data: function () {
            return {
                global: Global,
                data: {
                    slideData: []
                },
                swiperOption: {
                    direction: 'vertical',
                    observeParents: true,
                    onInit: function () {
                        console.log('swiper init')
                    }
                },
                shareUrl: location.href, // 分享的url
                audioSrc: './audio/1.mp3' // 音频地址
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
                    that.$http.get('../api/v2/user/journal/view/count', {params: { journalId: global.journalId }}) // 浏览数+1
                    Global.setDocumentTitle(data.title, data.clubImgUrl)

                    that.$nextTick(function () {
                        // 初始化变量
                        var refs = that.$refs
                        pageHeader = refs.pageHeader
                        indexPageHeader = refs.indexPageHeader

                        console.dir(pageHeader)
                        console.dir(indexPageHeader)
                        global.loading = false
                    })
                } else if (data.status == 'error') {
                    that.$router.push({name: '404'})
                } else {
                    that.$router.push({name: 'redirect'})
                }
            })
        },
        methods: {
            goToClub: function () {
                var loc = location
                loc.href = loc.origin + (/spa-manager/.test(loc.pathname) ? '/spa-manager' : '') + '/spa2/?club=' + this.data.clubId
            }
        }
    }
</script>