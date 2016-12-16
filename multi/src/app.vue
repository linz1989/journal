<style>
    @import './styles/index.css';
</style>
<template>
    <div class="journal-page">
        <div v-show="global.loading" class="spinner">
            <div class="spinner-container container1">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
            <div class="spinner-container container2">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
            <div class="spinner-container container3">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    import { Global } from './libs/global'

    module.exports = {
        data: function () {
            return {
                global: Global
            }
        },
        created: function () {
            this.global.loading = true
        }
    }
</script>