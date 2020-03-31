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
                },
                isSearching: false
            }
        },
        methods: {
            handleInput(input) {
                this.kanji = input
            },

            async lookup() {
                // if (this.isSearching) {
                //     return
                // }
                // this.isSearching = true
                const axios = require('axios').default
                let jishoUrl = encodeURI("http://localhost:8000/jisho/" + this.kanji)
                let hanVietUrl = encodeURI("http://localhost:8000/han-viet/" + this.kanji)

                axios.get(jishoUrl).then(jishoResponse => {
                    let resultBundle = jishoResponse.data
                    axios.get(hanVietUrl).then(hanVietResponse => {
                        resultBundle.hanViet = hanVietResponse.data.amHanViet

                        this.$root.$emit('newKanjiFetched', resultBundle)
                    }).catch(error => {
                        console.log(error)
                    })
                }).catch(error => {
                    console.log(error)
                })

                this.isSearching = false
            }
        }
    }
</script>