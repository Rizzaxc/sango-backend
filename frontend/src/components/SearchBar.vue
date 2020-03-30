<template>
    <div class="searchbar">
        <div class="field has-addons">
            <div class="control is-expanded">
                <input class="input has-text-black" id="kanji-input" type="text" placeholder="Enter a Kanji">
            </div>
            <div class="control">
                <a class="button is-info" @click="lookup()" @keyup.enter="lookup()">
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
            }
        },
        methods: {
            async lookup() {
                // const JishoApi = require('unofficial-jisho-api')
                // const jisho = new JishoApi()

                const HanVietScraper = require('../assets/js/han-viet-scraper.js')
                const scraper = new HanVietScraper()

                this.kanji = document.getElementById('kanji-input').value

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