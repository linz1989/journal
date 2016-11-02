<style>
    @import './styles/index.css';
</style>
<template>
    <swiper :options='swiperOption'>
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
        <swiper-slide class="tech-slide common-slide">
            <div class="wrap">
                <div class="page-title"></div>
                <div class="tech-info">
                    <div class="tech-header"></div>
                    <div class="chat-btn"></div>
                </div>
            </div>
            <div class="like-btn">很赞</div>
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