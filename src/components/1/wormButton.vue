<template>
    <div @click="doClickBtn()" :class="elCls">{{ buttonText[category] }}</div>
</template>
<script>
    import { Global } from '../../libs/global'
    import { eventHub } from '../../libs/hub'

    module.exports = {
        data: function () {
            return {
                buttonText: {
                    like: '很赞',
                    liked: '已赞',
                    share: '分享',
                    club: '会所'
                }
            }
        },
        props: {
            category: {
                type: String,
                required: true
            },
            clubId: {
                type: String
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
                    var likeCounter = document.querySelector('header.page-header div.like')
                    likeCounter.innerHTML = parseInt(likeCounter.innerHTML) + 1
                    _this.$http.get('../api/v2/user/journal/like/count', {params: { journalId: global.journalId }})
                } else if (_this.category == 'share') {
                    eventHub.$emit('change-share-pop', true)
                } else if (_this.category == 'club') {
                    location.href = location.origin + '/spa-manager/spa2/?club=' + _this.clubId
                }
            }
        }
    }
</script>