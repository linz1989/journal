<template>
    <div>
        <label>{{ tipText[status] }}</label>
        <template v-if="status !='over' ">
            <b>{{ times[0] }}</b>天<b>{{ times[1] }}</b>时<b>{{ times[2] }}</b>分<b>{{ times[3] }}</b>秒<span>剩余{{ remainCount }}份</span>
        </template>
        <label v-else>活动已结束，欢迎下次抢购！</label>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                times: [0, 0, 0, 0],
                surplusMillSecond: 0, // 剩余的毫秒数
                timer: null
            }
        },
        props: {
            start: {
                type: Number,
                required: true
            },
            end: {
                type: Number,
                required: true
            },
            remainCount: {
                type: Number,
                default: 0
            },
            tipText: {
                type: Object,
                default: function () {
                    return {'notStarted': '距开始：', 'started': '距结束：', 'over': '已结束'}
                }
            }
        },
        computed: {
            status: function () {
                var currStatus = this.getStatus()
                this.$emit('status-change', currStatus)
                return currStatus
            },
            startTime: function () {
                return this.start
            },
            endTime: function () {
                return this.end
            }
        },
        mounted: function () {
            var _this = this
            if (_this.status != 'over') {
                _this.$nextTick(function () {
                    _this.times = _this.getFormatTime(_this.surplusMillSecond)
                    _this.doCount()
                })
            }
        },
        methods: {
            getStatus: function () {
                var _this = this
                var currTime = (+new Date())
                if (currTime < _this.startTime) {
                    _this.surplusMillSecond = _this.startTime - currTime
                    return 'notStarted' // 未开始
                } else if (currTime < _this.endTime) {
                    _this.surplusMillSecond = _this.endTime - currTime
                    return 'started' // 已开始
                } else {
                    return 'over' // 已结束
                }
            },
            getFormatTime: function (millSecond) {
                var floor = Math.floor
                var second = millSecond / 1000
                var sec = floor(second % 60)
                var min = floor(second / 60 % 60)
                var hour = floor(second / 3600 % 24)
                var day = floor(second / 3600 / 24)
                return [day, hour < 10 ? '0' + hour : hour, min < 10 ? '0' + min : min, sec < 10 ? '0' + sec : sec]
            },
            doCount: function () {
                var _this = this
                _this.timer = setTimeout(function () {
                    _this.surplusMillSecond -= 1000
                    if (_this.surplusMillSecond == 0) {
                        _this.status = _this.getStatus()
                        this.$emit('status-change', _this.status)
                    }
                    _this.times = _this.getFormatTime(_this.surplusMillSecond)
                    _this.doCount()
                }, 1000)
            }
        },
        beforeDestroy: function () {
            if (this.timer) {
                clearTimeout(this.timer)
            }
        }
    }
</script>