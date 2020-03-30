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
            lookup() {
                this.kanji = document.getElementById('kanji-input').value
                console.log(this.kanji)
            }
        }
    }
</script>