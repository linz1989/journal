<template>
    <canvas width="538" height="349"></canvas>
</template>
<script>
    module.exports = {
        mounted: function () {
            var _this = this
            _this.$nextTick(function () {
                var ctx = _this.$el.getContext('2d')
                var allWidth = 538
                var allHeight = 349
                var radius = 8
                var borderRadius = 8
                var topHeight = 86
                var deltX = 9
                var pi = Math.PI

                ctx.fillStyle = '#ef9603'
                ctx.moveTo(allWidth, borderRadius)
                ctx.arcTo(allWidth, 0, allWidth - borderRadius, 0, borderRadius)
                var currX = allWidth - borderRadius - 3

                for (var k = 0; k < 21; k++) {
                    ctx.lineTo(currX, 0)
                    ctx.arc(currX - radius, 0, radius, 0, pi)
                    currX = currX - 2 * radius
                    ctx.lineTo(currX, 0)
                    currX = currX - deltX
                }
                ctx.arcTo(0, 0, 0, borderRadius, borderRadius)
                ctx.lineTo(0, topHeight)
                ctx.lineTo(allWidth, topHeight)
                ctx.lineTo(allWidth, borderRadius)
                ctx.fill()

                ctx.beginPath()
                ctx.fillStyle = '#f7e8b0'
                ctx.moveTo(0, topHeight)
                ctx.lineTo(0, allHeight - borderRadius)
                ctx.arcTo(0, allHeight, borderRadius, allHeight, borderRadius)
                ctx.lineTo(allWidth - borderRadius, allHeight)
                ctx.arcTo(allWidth, allHeight, allWidth, allHeight - borderRadius, borderRadius)
                ctx.lineTo(allWidth, topHeight)
                ctx.lineTo(0, topHeight)
                ctx.closePath()
                ctx.fill()

                ctx.beginPath()
                ctx.strokeStyle = '#fe9603'
                ctx.lineWidth = 1
                ctx.moveTo(13, topHeight + 22)
                ctx.lineTo(allWidth - 13, topHeight + 22)
                ctx.lineTo(allWidth - 13, allHeight - 21)
                ctx.lineTo(13, allHeight - 21)
                ctx.lineTo(13, topHeight + 22)
                ctx.closePath()
                ctx.stroke()
            })
        }
    }
</script>