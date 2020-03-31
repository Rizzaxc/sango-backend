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
                console.log(this.kanji)
                const axios = require('axios').default
                let kanjiUrl = encodeURI("http://localhost:8000/jisho/" + this.kanji)
                axios.get(kanjiUrl).then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>