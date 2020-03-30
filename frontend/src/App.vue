<template>
  <div id="app">
    <NavBar />
    <div class="columns is-centered">

      <div class="column is-half is-size-4">
          <SearchBar />
        <div class="search-results">
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
    components: {
      NavBar,
      SearchBar,
      KanjiCard
    }
  }
</script>

<style scoped>
  .search-results {

  }
</style>