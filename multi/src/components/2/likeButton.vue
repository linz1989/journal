<template>
    <div @click="doClickBtn()" :class="elCls">
        <canvas :width="width" :height="height" ref="canvas"></canvas>
        {{ buttonText[category] }}
    </div>
</template>
<script>
    import { Global } from '../../libs/global'
    import { eventHub } from '../../libs/hub'

    module.exports = {
        data: function () {
            return {
                width: 340,
                height: 104,
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
                var cls = 'bottom-btn ' + this.category + '-btn'
                if (this.$el && this.$el.classList.contains('act')) {
                    cls += ' act'
                }
                return cls
            }
        },
        mounted: function () {
            var that = this
            if (that.category == 'like' || that.category == 'liked') {
                that.width = 340
                that.height = 104
            } else {
                that.width = 246
                that.height = 76
            }

            that.$nextTick(function () {
                var ctx = that.$refs.canvas.getContext('2d')
                var delt = 6
                if (that.category == 'like' || that.category == 'liked') {
                    that.drawRoundRect({ctx: ctx, top: 0, left: 0, width: 340, height: 104, radius: 52, fillStyle: '#fff'})
                    that.drawRoundRect({ctx: ctx, top: delt, left: delt, width: 340 - 2 * delt, height: 104 - 2 * delt, radius: 47, strokeStyle: '#ddd'})
                    delt = 14
                    that.drawRoundRect({ctx: ctx, top: delt, left: delt, width: 340 - 2 * delt, height: 104 - 2 * delt, radius: 41, fillStyle: '#fe3918'})
                    delt = 20
                    that.drawRoundRect({ctx: ctx, top: delt, left: delt, width: 340 - 2 * delt, height: 104 - 2 * delt, radius: 32, fillStyle: '#ff724c'})
                    that.drawRoundRect({ctx: ctx, top: delt, left: delt, width: 340 - 2 * delt, height: 104 - 2 * delt - 4, radius: 32, fillStyle: '#e12f19'})
                } else {
                    var colors = ['#fe3918', '#ff724c', '#e13019', '#9e0c0a']
                    if (that.category == 'share') {
                        colors = ['#ffb40c', '#ff724c', '#ffe601', '#febd00']
                    }
                    that.drawRoundRect({ctx: ctx, top: 0, left: 0, width: 246, height: 76, radius: 41, fillStyle: colors[0]})
                    that.drawRoundRect({ctx: ctx, top: delt, left: delt, width: 246 - 2 * delt, height: 76 - 2 * delt, radius: 35, fillStyle: colors[1]})
                    var gradient = ctx.createLinearGradient(0, 0, 0, 76 - 2 * delt - 5)
                    gradient.addColorStop(0, colors[2])
                    gradient.addColorStop(1, colors[3])
                    that.drawRoundRect({ctx: ctx, top: delt, left: delt, width: 246 - 2 * delt, height: 76 - 2 * delt - 5, radius: 31, fillStyle: gradient})
                    ctx.lineCap = 'round'
                    ctx.lineJoin = 'round'
                    ctx.lineWidth = 4
                    ctx.strokeStyle = '#fff'
                    ctx.beginPath()
                    ctx.moveTo(196, 6)
                    ctx.lineTo(199, 6)

                    var radius = 32
                    ctx.moveTo(213, 6)
                    ctx.arcTo(240, 6, 240, 6 + radius, radius)
                    ctx.stroke()
                }
            })
        },
        methods: {
            drawRoundRect: function (option) {
                var ctx = option.ctx
                var top = option.top
                var left = option.left
                var radius = option.radius
                var rectW = option.width
                var rectH = option.height
                var right = left + rectW
                var bottom = top + rectH

                ctx.beginPath()
                if (option.strokeStyle) {
                    ctx.strokeStyle = option.strokeStyle
                }
                if (option.fillStyle) {
                    ctx.fillStyle = option.fillStyle
                }
                ctx.moveTo(left, top + radius)
                ctx.arcTo(left, top, left + radius, top, radius)
                ctx.lineTo(right - radius, top)
                ctx.arcTo(right, top, right, top + radius, radius)

                ctx.arcTo(right, bottom, right - radius, bottom, radius)
                ctx.lineTo(left + radius, bottom)
                ctx.arcTo(left, bottom, left, bottom - radius, radius)
                ctx.lineTo(left, top + radius)
                ctx.closePath()

                if (option.strokeStyle) {
                    ctx.stroke()
                }
                if (option.fillStyle) {
                    ctx.fill()
                }
            },
            doClickBtn: function () {
                var _this = this
                var global = Global
                if (_this.category == 'liked') {
                    return global.tipShow('您已点过赞了！')
                } else if (_this.category == 'like') {
                    global.localStorage('spa-journal-' + global.journalId, 1)
                    global.likeStatus = 'liked'
                    var likeCounter = document.querySelector('div.statistic-data>div:nth-of-type(1)')
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