<template>
    <div @click="doClickBtn()" :class="elCls">{{ category=='like' ? '很赞' : (category=='liked' ? '已赞' : '分享') }}</div>
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
            elCls: function () {
                var cls = 'bottom-btn ani ' + this.category + '-btn'
                if (this.$el && this.$el.classList.contains('act')) {
                    cls += ' act'
                }
                return cls
            }
        },
        methods: {
            doClickBtn: function () {
                var _this = this
                var global = Global
                if (_this.category == 'liked') {
                    return global.tipShow('您已点过赞了！')
                } else if (_this.category == 'like') {
                    global.localStorage('spa-journal-' + global.journalId, 1)
                    global.likeStatus = 'liked'
                    global.likeCount ++
                    _this.$http.get('../api/v2/user/journal/share/count', {params: { journalId: global.journalId }})
                } else {
                    eventHub.$emit('change-share-pop', true)
                }
            }
        }
    }
</script>