<template>
  <div id="app">
    <NavBar />
    <div class="columns is-centered">

      <div class="column is-half">
        <SearchBar />
        <div class="columns is-centered">
          <div class="column is-half">
            <KanjiCard 
                id="result"
                v-if="typeof mostRecent !== 'undefined'"
                v-bind:kanji="mostRecent"
            />
          </div>
        </div>

        <div class="search-history is-size-4">
            <KanjiCard             
                v-for="pastKanji in history.slice().reverse()"
                :key="pastKanji"
                v-bind:kanji="pastKanji"
            />


        </div>


      </div>

    </div>

  </div>
</template>

<script>
    import NavBar from './components/NavBar.vue'
    import SearchBar from './components/SearchBar.vue'
    import KanjiCard from './components/KanjiCard.vue'

    export default {
        name: 'App',
        created() {
            this.$root.$on('newKanjiFetched', this.updateResults)
        },
        beforeDestroy() {
            this.$root.$off('newKanjiFetched', this.updateResults)
        },
        data() {
            return {
                history: [],
                mostRecent: undefined
            }
        },
        components: {
            NavBar,
            SearchBar,
            KanjiCard
        },
        methods: {
            updateResults(newKanji) {
                this.history.push(this.mostRecent)
                this.mostRecent = newKanji
            }
        },
    }
</script>

<style scoped>
    #result {
        width: 100%
    }

    .search-history {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: space-evenly;
        height: 100%;
    }
</style>