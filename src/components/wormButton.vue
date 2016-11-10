<template>
    <div @click="doClickBtn()" class="bottom-btn ani" :class="type+'-btn'">{{ type=='like' ? '很赞' : type=='liked' ? '已赞' : '分享' }}</div>
</template>
<script>
    import { Global } from '../libs/global'
    import { eventHub } from '../libs/hub'

    module.exports = {
        props: {
            category: {
                type: String,
                required: true
            }
        },
        computed: {
            type: function () {
                return this.category
            }
        },
        mounted: function () {
            var global = Global
            if (this.type === 'like' && global.localStorage('spa-journal-' + global.journalId)) {
                this.type = 'liked'
            }
        },
        methods: {
            doClickBtn: function () {
                var _this = this
                var global = Global
                if (_this.type === 'liked') {
                    return global.tipShow('您已点过赞了！')
                } else if (_this.type === 'like') {
                    _this.$http.get('../api/v2/user/journal/share/count', {params: { journalId: global.journalId }}).then(function () {
                        _this.type = 'liked'
                        global.localStorage('spa-journal-' + global.journalId, 1)
                    })
                } else {
                    eventHub.$emit('change-share-pop', true)
                }
            }
        }
    }
</script>