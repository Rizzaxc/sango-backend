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
              v-if="numberofQueries > 0"
              v-bind:kanji="mostRecent"
            />
          </div>
        </div>

        <div class="search-history">
          <KanjiCard
            v-for="(pastKanji, index) in searchHistory"
            :key="index"
            v-bind:kanji="pastKanji"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import SearchBar from "./components/SearchBar.vue";
import KanjiCard from "./components/KanjiCard.vue";

export default {
  name: "App",
  created() {
    this.$root.$on("newKanjiFetched", this.updateResults);
  },
  beforeDestroy() {
    this.$root.$off("newKanjiFetched", this.updateResults);
  },
  data() {
    return {
      allQueries: []
    };
  },
  components: {
    NavBar,
    SearchBar,
    KanjiCard
  },
  methods: {
    updateResults(newKanji) {
      this.allQueries.unshift(newKanji);
    }
  },
  computed: {
    
    numberofQueries() {
      return this.allQueries.length;
    },
    mostRecent() {
      if (this.numberofQueries > 0) {
        return this.allQueries[0];
      } else {
        return null;
      }
    },
    searchHistory() {
        return this.allQueries.slice(1)
    }
    
  }
};
</script>

<style scoped>
#result {
  width: 100%;
}

.search-history {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-evenly;
  height: 100%;
}
</style>
