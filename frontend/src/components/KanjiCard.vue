<template>
    <div class="card">
        <div class="modal" id="full-card" v-if="showFull === false">
            <div class="modal-background" @click="closeModal()"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Detailed Kanji View</p>
                    <button class="delete" aria-label="close" @click="closeModal()"></button>
                </header>

                <section class="modal-card-body">
                    <KanjiCard :kanji="this.kanji" :showFull="true" />
                </section>
            </div>

        </div>

        <div class="card-content">
            <div class="columns">
                <div class="column is-size-1 is-one-quarter">
                    <a  @click="launchModal()" id="big-writing">{{kanji.writing}}</a>
                </div>
    
                <div class="column" id="kanji-info">
                    <div class="han-viet">
                        <KanjiInfo name="Hán Việt" :showFull="this.showFull" :payload="kanji.hanViet" />
                    </div>

                    <div class="meaning">
                        <KanjiInfo name="Meaning" :showFull="this.showFull" :payload="kanji.meaning" />
                    </div>

                    <div class="onyomi">
                        <KanjiInfo name="Onyomi" :showFull="this.showFull" :payload="kanji.onyomi" />
                    </div>

                    <div class="kunyomi">
                        <KanjiInfo name="Kunyomi" :showFull="this.showFull" :payload="kanji.kunyomi" />
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
            showFull: {
                type: Boolean,
                required: true
            }
        },
        methods: {
            launchModal() {
                console.log(this.showFull)
                if (this.showFull === false) {
                    document.getElementById('full-card').classList.add('is-active')
                }
            },

            closeModal() {
                if (this.showFull === false) {
                    document.getElementById('full-card').classList.remove('is-active')
                }
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
        width: 100%
    }
</style>