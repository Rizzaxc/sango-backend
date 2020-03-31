<template>
  <div id="app">
    <NavBar />
    <div class="columns is-centered">

      <div class="column is-half">
        <SearchBar />
        <div class="columns is-centered is-size-3">
          <div class="column is-half">
            <KanjiCard id="result"></KanjiCard>
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
    components: {
      NavBar,
      SearchBar,
      KanjiCard
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