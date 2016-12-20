<template>
    <canvas class="snow" :width="global.winWidth" :height="global.winHeight"></canvas>
</template>
<script>
    import {Global} from '../../libs/global'

    module.exports = {
        data: function () {
            return {
                maxFlake: 50, // 最多片数
                flakeSize: 12,    // 最大大小
                fallSpeed: 1,    // 坠落速度
                status: 0,   // 0-初始化、1-开始下雪、2-停止下雪、3-暂停下雪、4-继续下雪
                loop: null,
                ctx: null,
                global: Global
            }
        },
        mounted: function () {
            var that = this
            // 兼容写法
            window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame
            window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame

            that.$nextTick(function () {
                that.start()
            })
        },
        methods: {
            start: function () {
                var that = this
                if (that.status == 1 || that.status == 4) {
                    // 已经在下雪则不作处理
                    return false
                }
                that.status = 1
                that.snowCanvas() // 创建画布
                that.createFlakes() // 创建雪花形状
                that.drawSnow()  // 画雪
            },
            stop: function () {
                var that = this
                if (that.status == 2 || that.status == 0) {
                    return false
                }
                // 停止动画循环
                that.pause()
                that.status = 2
            },
            pause: function () {
                var that = this
                if (that.status == 3) {
                    return false
                }
                that.status = 3
                cancelAnimationFrame(that.loop)
            },
            resume: function () {
                var that = this
                if (that.status == 3) {
                    that.status = 4
                    // 动画的计时控制
                    that.loop = requestAnimationFrame(function () {
                        that.drawSnow()
                    })
                }
            },
            snowCanvas: function () {
                var that = this
                that.ctx = that.$el.getContext('2d')

                // 雪运动对象
                function FlakeMove (canvas, canvasWidth, canvasHeight, flakeSize, fallSpeed) {
                    this.x = Math.floor(Math.random() * canvasWidth)    // x坐标
                    this.y = Math.floor(Math.random() * canvasHeight)    // y坐标
                    this.size = Math.random() * flakeSize + 2            // 形状
                    this.maxSize = flakeSize                             // 最大形状
                    this.speed = Math.random() * 1 + fallSpeed             // 坠落速度
                    this.fallSpeed = fallSpeed                          // 坠落速度
                    this.velY = this.speed                              // Y方向速度
                    this.velX = 0                                       // X方向速度
                    this.stepSize = Math.random() / 30                    // 步长
                    this.step = 0                                         // 步数
                    this.canvas = canvas
                }

                FlakeMove.prototype.update = function () {
                    // 左右摆动(余弦)
                    this.velX *= 0.98
                    if (this.velY <= this.speed) {
                        this.velY = this.speed
                    }
                    this.velX += Math.cos(this.step += 0.05) * this.stepSize

                    this.y += this.velY
                    this.x += this.velX
                    // 飞出边界的处理
                    if (this.x >= this.canvas.width || this.x <= 0 || this.y >= this.canvas.height || this.y <= 0) {
                        this.reset(this.canvas.width, this.canvas.height)
                    }
                }

                // 飞出边界-放置最顶端继续坠落
                FlakeMove.prototype.reset = function (width, height) {
                    this.x = Math.floor(Math.random() * width)
                    this.y = 0
                    this.size = Math.random() * this.maxSize + 2
                    this.speed = Math.random() * 1 + this.fallSpeed
                    this.velY = this.speed
                    this.velX = 0
                }

                // 渲染雪花-随机形状
                FlakeMove.prototype.render = function (ctx) {
                    var snowFlake = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
                    snowFlake.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
                    snowFlake.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)')
                    snowFlake.addColorStop(1, 'rgba(255, 255, 255, 0)')
                    ctx.save()
                    ctx.fillStyle = snowFlake
                    ctx.beginPath()
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                    ctx.fill()
                    ctx.restore()
                }

                window.FlakeMove = FlakeMove
            },
            createFlakes: function () {
                var that = this
                var maxFlake = that.maxFlake
                var flakes = that.flakes = []
                var canvas = that.$el
                for (var i = 0; i < maxFlake; i++) {
                    flakes.push(new window.FlakeMove(canvas, canvas.width, canvas.height, that.flakeSize, that.fallSpeed))
                }
            },
            drawSnow: function () {
                var that = this
                var maxFlake = that.maxFlake
                var flakes = that.flakes
                var ctx = that.ctx
                var canvas = that.$el
                // 清空雪花
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                for (var e = 0; e < maxFlake; e++) {
                    flakes[e].update()
                    flakes[e].render(ctx)
                }
                // 一帧一帧的画
                that.loop = requestAnimationFrame(function () {
                    that.drawSnow()
                })
            }
        }
    }
</script>