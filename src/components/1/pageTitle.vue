<template>
    <canvas width="680" height="64"></canvas>
</template>
<script>
    module.exports = {
        props: {
            title: {
                type: String,
                required: true
            }
        },
        mounted: function () {
            var _this = this
            _this.$nextTick(function () {
                // 绘制文本
                var ctx = _this.$el.getContext('2d')
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillStyle = '#fff'
                ctx.font = 'bold 48px 微软雅黑'
                ctx.shadowOffsetX = 3
                ctx.shadowOffsetY = 3
                ctx.shadowBlur = 10
                ctx.shadowColor = 'rgba(255,255,255,0.8)'
                ctx.fillText(_this.title, 340, 32)

                var lineWidth = (680 - ctx.measureText(_this.title).width - 80) / 2
                var left = 4
                ctx.lineWidth = 3
                ctx.strokeStyle = '#c857b0'
                ctx.lineJoin = 'round'
                ctx.lineCap = 'round'
                ctx.moveTo(left, 45)
                ctx.lineTo(10, 45)
                ctx.moveTo(7, 45)
                ctx.arcTo(7, 30, 12, 30, 6)
                ctx.lineTo(12 + lineWidth, 30)
                ctx.arcTo(17 + lineWidth, 30, 17 + lineWidth, 45, 6)
                ctx.lineTo(17 + lineWidth, 45)
                ctx.moveTo(14 + lineWidth, 45)
                ctx.lineTo(20 + lineWidth, 45)

                var right = 680 - left
                var pos = right - lineWidth
                ctx.moveTo(right, 45)
                ctx.lineTo(right - 6, 45)
                ctx.moveTo(right - 3, 45)
                ctx.arcTo(right - 3, 30, right - 8, 30, 6)
                ctx.lineTo(pos - 8, 30)
                ctx.arcTo(pos - 13, 30, pos - 13, 45, 6)
                ctx.lineTo(pos - 13, 45)
                ctx.moveTo(pos - 16, 45)
                ctx.lineTo(pos - 10, 45)

                ctx.stroke()
            })
        }
    }
</script>