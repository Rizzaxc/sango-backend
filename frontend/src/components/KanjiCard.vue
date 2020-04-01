<template>
    <div class="card">
        <div class="card-content">
            <div class="columns is-3">
                <div class="column is-size-1 is-one-quarter">
                    <a id="big-writing">{{kanji.writing}}</a>
                </div>
    
                <div class="column" id="kanji-info">
                    <div class="info">
                        <div class="columns">
                            <div class="column is-one-fourth">
                                <span class="tag is-large">Hán Việt</span>
                            </div>
                            <div class="column">
                                <div class="tags">
                                    <span class="tag is-warning is-medium" v-for="(hanViet, index) in kanji.hanViet"
                                        :key="index">
                                        {{hanViet}}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                

                    <div class="info">
                        <div class="columns">
                            <div class="column is-one-fourth">
                                <span class="tag is-large">Meaning</span>
                            </div>
                            <div class="column">
                                <div class="tags">
                                    <span class="tag is-warning is-medium" v-for="(meaning, index) in kanji.meaning"
                                        :key="index">
                                        {{meaning}}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="info">
                        <div class="columns">
                            <div class="column is-one-fourth">
                                <span class="tag is-large">Onyomi</span>
                            </div>
                            <div class="column">
                                <div class="tags">
                                    <span class="tag is-warning is-medium" v-for="(onyomi, index) in kanji.onyomi"
                                        :key="index">
                                        {{onyomi}}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="info">
                        <div class="columns">
                            <div class="column is-one-fourth">
                                <span class="tag is-large">Kunyomi</span>
                            </div>
                            <div class="column">
                                <div class="tags">
                                    <span class="tag is-warning is-medium" v-for="(kunyomi, index) in kanji.kunyomi"
                                        :key="index">
                                        {{kunyomi}}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    </div>
</template>



<script>
    export default {
        name: 'KanjiCard',
        props: {
            kanji: {
                type: Object,
                required: true,
                onyomi: Array,
                kunyomi: Array,
                meaning: Array,
                hanViet: Array,
                writing: String
                
            }
        }
    }
</script>


<style scoped>
    span {
        float: left
    }
    .big-writing {

    }

    .card {
        width: 50%
    }
</style>