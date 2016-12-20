<template>
    <canvas class="center-circle" height="768" width="768"></canvas>
</template>
<script>
    module.exports = {
        mounted: function () {
            var that = this
            that.$nextTick(function () {
                var ctx = that.$el.getContext('2d')
                var pi = Math.PI
                var center = 768 / 2
                var gradient = ctx.createLinearGradient(0, 0, 0, 768)

                gradient.addColorStop(0, 'rgba(254,121,22,0.8)')
                gradient.addColorStop(1, 'rgba(226,58,31,0.85)')
                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(center, center, 768 / 2, 0, 2 * pi)
                ctx.closePath()
                ctx.fill()

                gradient = ctx.createLinearGradient(0, 0, 0, 536)
                gradient.addColorStop(0, '#fb8b0f')
                gradient.addColorStop(0.5, '#f27415')
                gradient.addColorStop(1, '#e4511f')
                ctx.fillStyle = gradient

                ctx.beginPath()
                ctx.arc(center, center, 536 / 2, 0, 2 * pi)
                ctx.closePath()
                ctx.fill()
            })
        }
    }
</script>