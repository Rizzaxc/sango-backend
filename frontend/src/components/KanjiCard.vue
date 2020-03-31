<template>
    <div class="card">
        <div class="card-content">
            <div class="columns">
                <div class="column is-one-quarter" id="big-kanji">
                    <a>{{kanji.writing}}</a>
                </div>
    
                <div class="column" id="kanji-info">
                    <div class="han-viet">
                        Han Viet: {{kanji.hanViet}}
                    </div>
    
                    <div class="meaning">
                        Meaning: {{kanji.meaning}}
                    </div>
    
                    <div class="onyomi">
                        Onyomi: {{kanji.onyomi}}
                    </div>
    
                    <div class="kunyomi">
                        Kunyomi: {{kanji.kunyomi}}
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
                onyomi: String,
                kunyomi: String,
                meaning: String,
                writing: String,
                hanViet: String
            }
        }
    }
</script>


<style scoped>
    .card {
        width: 50%
    }
</style>