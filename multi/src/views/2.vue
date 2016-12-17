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
            <!--统计数据：点赞数 浏览数-->
            <div class="statistic-data"><div>1045</div><div>1111</div></div>
            <!--底部的雪-->
            <div class="bottom-snow"></div>
            <!--中间的圣诞树-->
            <div class="main-tree"></div>
        </template>
    </div>
</template>
<script>
    import { Global } from '../libs/global'

    var pageHeader = null
    var indexPageHeader = null

    module.exports = {
        data: function () {
            return {
                global: Global,
                data: {
                    slideData: []
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