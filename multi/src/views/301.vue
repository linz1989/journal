<!--期刊已下架，删除，可重定向的情况-->
<template>
    <div class="page-redirect">
        <div :class="{club: !newJournalId}">
            <div></div>
            <div @click="doRedirect()">{{ newJournalId ? '查看最新' : '去看看' }}</div>
        </div>
    </div>
</template>
<script>
    import { Global } from '../libs/global'
    module.exports = {
        mounted: function () {
            Global.loading = false
        },
        methods: {
            doRedirect: function () {
                var loc = location
                var data = Global.journalData
                if (data.newJournalId) {
                    loc.href = loc.origin + '/spa-manager/journal?id=' + data.newJournalId
                } else {
                    loc.href = loc.origin + '/spa-manager/spa2/?club=' + data.clubId
                }
            }
        }
    }
</script>