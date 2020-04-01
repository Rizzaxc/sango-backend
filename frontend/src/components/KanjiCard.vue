<template>
    <div class="card">
        <div class="card-content">
            <div class="columns">
                <div class="column is-size-1 is-one-quarter">
                    <a id="big-writing">{{kanji.writing}}</a>
                </div>
    
                <div class="column" id="kanji-info">
                    <div class="han-viet">
                        <span class="tag">Hán Việt</span> {{kanji.hanViet}}
                    </div>
    
                    <div class="meaning">
                        <span class="tag">Meaning</span> {{kanji.meaning}}
                    </div>
    
                    <div class="onyomi">
                        <span class="tag">Onyomi</span> {{kanji.onyomi}}
                    </div>
    
                    <div class="kunyomi">
                        <span class="tag">Kunyomi</span> {{kanji.kunyomi}}
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
    .big-writing {

    }

    .card {
        width: 50%
    }
</style>