<template>
    <div class="searchbar">
        <div class="field has-addons">
            <div class="control is-expanded">
                <input class="input has-text-black" type="text" placeholder="Enter a Kanji">
            </div>
            <div class="control">
                <a class="button is-info" @click="lookup(安)" @keydown.enter="lookup(安)">
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
                kanji: null
            }
        },
        methods: {
            lookup(kanji) {
                return kanji
            }
        }
    }
</script>