<template>
    <canvas width="664" height="390"></canvas>
</template>
<script>
    module.exports = {
        mounted: function () {
            var _this = this
            _this.$nextTick(function () {
                var ctx = _this.$el.getContext('2d')
                var allWidth = 664
                var allHeight = 390
                var rectWidth = 603
                var top = 26
                var left = (allWidth - rectWidth) / 2
                var right = allWidth - left
                var radius = 10
                var k
                var subHeight = 4
                var pi = Math.PI

                var gradient = ctx.createLinearGradient(0, 0, 0, allHeight)
                gradient.addColorStop(0, '#520145')
                gradient.addColorStop(1, '#dd68d2')

                ctx.strokeStyle = '#f00'
                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(left - radius, top, radius, 0, pi / 2)
                for (k = 1; k <= 14; k++) {
                    ctx.lineTo(left - radius, top + radius + (2 * radius + subHeight) * (k - 1) + subHeight)
                    ctx.arc(left - radius, top + (radius * 2 + subHeight) * k, radius, -pi / 2, pi / 2)
                }
                ctx.lineTo(left - radius, top + radius + (2 * radius + subHeight) * 14 + subHeight)
                ctx.arc(left - radius, top + (radius * 2 + subHeight) * 15, radius, -pi / 2, 0)

                var bottom = top + (2 * radius + subHeight) * 15
                ctx.lineTo(right, bottom)
                ctx.arc(right + radius, bottom, radius, pi, pi * 1.5)

                for (k = 1; k <= 14; k++) {
                    ctx.lineTo(right + radius, bottom - radius - (2 * radius + subHeight) * (k - 1) - subHeight)
                    ctx.arc(right + radius, bottom - (radius * 2 + subHeight) * k, radius, 0.5 * pi, pi * 1.5)
                }
                ctx.lineTo(right + radius, bottom - radius - (2 * radius + subHeight) * 14 - subHeight)
                ctx.arc(right + radius, bottom - (radius * 2 + subHeight) * 15, radius, 0.5 * pi, pi)

                ctx.lineTo(left, top)
                ctx.closePath()
                ctx.fill()

                left = 19
                right = allWidth - left
                top = 22
                ctx.beginPath()
                ctx.strokeStyle = 'rgba(0,0,0,0.6)'
                ctx.lineWidth = 28
                ctx.lineCap = 'round'

                ctx.shadowOffsetX = 4
                ctx.shadowOffsetY = 8
                ctx.shadowBlur = 14
                ctx.shadowColor = 'rgba(0,0,0,0.4)'

                ctx.moveTo(left, top)
                ctx.lineTo(right, top)
                ctx.stroke()
            })
        }
    }
</script>