<template>
  <div id="app">
    <NavBar />
    <div class="columns is-centered">

      <div class="column is-half">
        <SearchBar />
        <div class="columns is-centered is-size-3">
          <div class="column is-half">
            <KanjiCard id="result" />
          </div>
        </div>

        <div class="search-history is-size-4">
          <KanjiCard />
          <KanjiCard />
          <KanjiCard />
          <KanjiCard />
          <KanjiCard />
          <KanjiCard />
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
                results: []
            }
        },
        components: {
            NavBar,
            SearchBar,
            KanjiCard
        },
        methods: {
            updateResults(newKanji) {
                this.results.push(newKanji)
            }
        },
        computed: {
            mostRecentResult() {
                return this.results.slice(-1)[0]
            }
        }
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