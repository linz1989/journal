<style>
    @import './styles/index.css';
</style>
<template>
    <router-view></router-view>
    <!--<swiper :options='swiperOption'>
        <swiper-slide v-for='item in list' :class="'item'+item">
            <div></div>
        </swiper-slide>
    </swiper>-->
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
            var _this = this

            // 依据窗口的宽度调整
            window.addEventListener('resize', function () {
                _this.initWindowWidth()
            })
            _this.initWindowWidth()
        },
        mounted: function () {

        },
        methods: {
            initWindowWidth: function () {
                var global = this.global
                var win = window
                var doc = document
                var htmlEl = doc.documentElement
                if (!global.baseWidth) {
                    global.baseWidth = doc.body.clientWidth || 320
                }
                global.winWidth = htmlEl.clientWidth || win.innerWidth || doc.body.clientWidth
                global.winHeight = htmlEl.clientHeight || win.innerHeight
                global.winWidth = global.winWidth > 720 ? 720 : (global.winWidth < 320 ? 320 : global.winWidth)
                global.winScale = global.winWidth / global.baseWidth
                htmlEl.style.fontSize = global.winScale * 16 + 'px'
            }
        }
    }
</script>