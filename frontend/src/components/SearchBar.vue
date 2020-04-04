<template>
    <div class="searchbar">
        <div class="field has-addons"  v-if="!isSearching">
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
                <a
                    class="button is-info" @click="lookup()">
                    Lookup
                </a>


            </div>

        </div>
        <progress v-else class="progress is-large is-info" max="100">60%</progress>

    </div>
</template>



<script>

    export default {
        name: 'SearchBar',
        components: {
        },
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
                // Empty input
                this.isSearching = true
                const axios = require('axios').default
                let jishoUrl = encodeURI("http://localhost:8000/jisho/" + this.kanji)
                let hanVietUrl = encodeURI("http://localhost:8000/han-viet/" + this.kanji)
                document.getElementById("kanji-input").value = null

                axios.get(jishoUrl).then(jishoResponse => {
                    let resultBundle = jishoResponse.data
                    axios.get(hanVietUrl).then(hanVietResponse => {
                        resultBundle.hanViet = hanVietResponse.data.amHanViet
                        this.isSearching = false

                        this.$root.$emit('newKanjiFetched', resultBundle)
                    }).catch(error => {
                        console.log(error)
                        this.isSearching = false

                    })
                }).catch(error => {
                    console.log(error)
                    this.isSearching = false

                })

            }
        }
    }
</script>