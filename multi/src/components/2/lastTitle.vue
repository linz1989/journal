<template>
    <canvas height="110" width="590"></canvas>
</template>
<script>
    module.exports = {
        mounted: function () {
            var that = this
            that.$nextTick(function () {
                var ctx = that.$el.getContext('2d')
                var allHeight = 110
                var pi = Math.PI
                var cloudArr = [
                    {x: 17, y: allHeight - 20, a: 17, b: 41 / 2},
                    {x: 62, y: allHeight - 16, a: 48, b: 13},
                    {x: 112, y: allHeight - 16, a: 28, b: 16},
                    {x: 153, y: allHeight - 15, a: 32, b: 12},
                    {x: 188, y: allHeight - 15, a: 23, b: 12},
                    {x: 221, y: allHeight - 17, a: 23, b: 16},
                    {x: 269, y: allHeight - 17, a: 40, b: 10},
                    {x: 335, y: allHeight - 17, a: 51, b: 15},
                    {x: 389, y: allHeight - 17, a: 25, b: 13},
                    {x: 435, y: allHeight - 17, a: 41, b: 10},
                    {x: 480, y: allHeight - 17, a: 31, b: 17},
                    {x: 515, y: allHeight - 17, a: 19, b: 13},
                    {x: 556, y: allHeight - 17, a: 34, b: 17}
                ]

                ctx.fillStyle = '#fff'
                for (var k = 0; k < cloudArr.length; k++) {
                    that.ellipse(ctx, cloudArr[k].x, cloudArr[k].y, cloudArr[k].a, cloudArr[k].b)
                }

                var rectW = 563
                var rectH = 84
                var radius = 10
                var left = 21
                var top = 2

                ctx.beginPath()
                ctx.strokeStyle = '#07572d'
                ctx.lineWidth = 3
                ctx.lineJoin = 'round'
                ctx.lineCap = 'round'
                ctx.moveTo(left + radius, top + rectH)
                ctx.arcTo(left, top + rectH, left, rectH - radius, radius)
                ctx.lineTo(left, radius)
                ctx.arcTo(left, top, left + radius, top, radius)
                ctx.lineTo(left + rectW - radius, top)
                ctx.arcTo(left + rectW, top, left + rectW, top + radius, radius)
                ctx.closePath()
                ctx.stroke()

                ctx.beginPath()
                ctx.fillStyle = '#0b8645'
                top = top + 2
                rectW = rectW + 2

                ctx.moveTo(left, top + radius)
                ctx.arcTo(left, top, left + radius, top, radius)
                ctx.lineTo(left + rectW - radius, top)
                ctx.arcTo(left + rectW, top, left + rectW, top + radius, radius)
                ctx.lineTo(left + rectW, top + rectH - radius)
                ctx.arcTo(left + rectW, top + rectH, left + rectW - radius, top + rectH, radius)
                ctx.lineTo(left + radius, top + rectH)
                ctx.arcTo(left, top + rectH, left, top + rectH - radius, radius)
                ctx.lineTo(left, top + radius)
                ctx.closePath()
                ctx.fill()

                // two circle
                var circleTop = 6
                var circleLeft = 22
                var circleRadius = 7
                ctx.fillStyle = '#07572d'
                ctx.beginPath()
                ctx.arc(left + circleLeft + circleRadius, top + circleTop + circleRadius, circleRadius, 0, 2 * pi)
                ctx.closePath()
                ctx.fill()

                ctx.beginPath()
                ctx.arc(left + rectW - circleLeft - circleRadius, top + circleTop + circleRadius, circleRadius, 0, 2 * pi)
                ctx.closePath()
                ctx.fill()

                // text
                ctx.fillStyle = '#fff'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.font = 'normal 42px 微软雅黑'
                ctx.fillText('更多精彩去网上会所看看吧', left + rectW / 2, top + rectH / 2)
            })
        },
        methods: {
            ellipse: function (context, x, y, a, b) {
                context.save()
                var r = (a > b) ? a : b
                var ratioX = a / r
                var ratioY = b / r
                context.scale(ratioX, ratioY)
                context.beginPath()
                context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI)
                context.closePath()
                context.restore()
                context.fill()
            }
        }
    }
</script>