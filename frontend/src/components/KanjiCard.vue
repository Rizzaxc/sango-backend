<template>
    <div class="card">
        <div class="card-content">
            <div class="columns">
                <div class="column is-one-quarter" id="big-kanji">
                    <a>安</a>
                </div>
    
                <div class="column" id="kanji-info">
                    <div class="han-viet">
                        Han Viet: An
                    </div>
    
                    <div class="meaning">
                        Meaning: peace
                    </div>
    
                    <div class="onyomi">
                        Onyomi: あん
                    </div>
    
                    <div class="kunyomi">
                        Kunyomi: やす
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
                required: false, // TODO: mark true
                writing: String,
                onyomi: String,
                kunyomi: String,
                meaning: String,
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