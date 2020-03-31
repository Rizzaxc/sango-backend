<template>
    <div class="searchbar">
        <div class="field has-addons">
            <div class="control is-expanded">
                <input 
                    class="input has-text-black" 
                    id="kanji-input" type="text" 
                    placeholder="Enter a Kanji"
                    @input="handleInput($event.target.value)"
                    @keyup.enter="lookup()"
                >
            </div>
            <div class="control">
                <a class="button is-info" @click="lookup()">
                    Lookup
                </a>
            </div>
        </div>
    </div>
</template>



<script>
    export default {
        name: 'SearchBar',
        props: {},
        data() {
            return {
                kanji: {
                    type: String,
                    default: ''
                }
            }
        },
        methods: {
            handleInput(input) {
                this.kanji = input
            },

            async lookup() {
                // const JishoApi = require('unofficial-jisho-api')
                // const jisho = new JishoApi()

                const HanVietScraper = require('../assets/js/han-viet-scraper.js')
                const scraper = new HanVietScraper()

                console.log(this.kanji)
                await scraper.lookup(this.kanji).then(amHanViet => {
                    console.log('Am Han Viet: ' + amHanViet)
                })

                // await jisho.searchForKanji(this.kanji).then(result => {
                //     console.log('Meaning: ' + result.meaning)
                //     console.log('Onyomi: ' + result.onyomi)
                //     console.log('Kunyomi: ' + result.kunyomi)
                // });

            }
        }
    }
</script>