<template>
    <div class="card">
        <div class="card-content">
            <div class="columns">
                <div class="column is-size-1 is-one-quarter">
                    <a id="big-writing">{{kanji.writing}}</a>
                </div>
    
                <div class="column" id="kanji-info">
                    <div class="han-viet">
                        <KanjiInfo name="Hán Việt" :mostRecent="this.mostRecent" :payload="kanji.hanViet" />
                    </div>

                    <div class="meaning">
                        <KanjiInfo name="Meaning" :mostRecent="this.mostRecent" :payload="kanji.meaning" />
                    </div>

                    <div class="onyomi">
                        <KanjiInfo name="Onyomi" :mostRecent="this.mostRecent" :payload="kanji.onyomi" />
                    </div>

                    <div class="kunyomi">
                        <KanjiInfo name="Kunyomi" :mostRecent="this.mostRecent" :payload="kanji.kunyomi" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
    import KanjiInfo from "./KanjiInfo.vue"
    export default {
        name: 'KanjiCard',
        components: {
            KanjiInfo
        },
        props: {
            kanji: {
                type: Object,
                required: true,
                onyomi: Array,
                kunyomi: Array,
                meaning: Array,
                hanViet: Array,
                writing: String
            },
            mostRecent: {
                type: Boolean,
                required: true
            }
        }
    }
</script>


<style scoped>
    .big-writing {
        width: 100%;
        height: 100%;
    }

    .card {
        width: 49%
    }
</style>