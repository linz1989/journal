<!--期刊ID错误，无法重定向的情况下-->
<template>
    <div class="page-error">404<br/><span>您访问的页面不存在！</span></div>
</template>
<script>
    import { Global } from '../libs/global'
    module.exports = {
        mounted: function () {
            Global.loading = false
        }
    }
</script>