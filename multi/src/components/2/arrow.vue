<template>
    <canvas height="55" width="246"></canvas>
</template>
<script>
    module.exports = {
        mounted: function () {
            var that = this
            that.$nextTick(function () {
                var ctx = that.$el.getContext('2d')
                var allWidth = 246
                var allHeight = 55
                var centerY = allHeight / 2
                var arrowX = 22

                ctx.fillStyle = '#69ad36'
                ctx.moveTo(arrowX, 0)
                ctx.lineTo(allWidth, 0)
                ctx.lineTo(allWidth, allHeight)
                ctx.lineTo(arrowX, allHeight)
                ctx.lineTo(0, centerY)
                ctx.lineTo(arrowX, 0)
                ctx.fill()
                ctx.beginPath()
                ctx.fillStyle = '#fdecd2'
                ctx.arc(16, centerY, 4, 0, 2 * Math.PI)
                ctx.fill()
            })
        }
    }
</script>