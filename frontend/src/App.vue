<template>
  <div id="app">
    <NavBar />
    <div class="columns is-centered">
      <div class="column is-half">
        <SearchBar />

        <KanjiCard
            id="result"
            v-if="numberOfQueries > 0"
            :kanji="mostRecent"
            :mostRecent="true"/>

        <div class="search-history"
            v-if="numberOfQueries > 1"
        >
          <KanjiCard
            v-for="(pastKanji, index) in searchHistory"
            :key="index"
            :kanji="pastKanji"
            :mostRecent="false"/>
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
      if (this.numberOfQueries > 7) {
          this.allQueries.pop()
      }
    }
  },
  computed: {
    
    numberOfQueries() {
      return this.allQueries.length;
    },
    mostRecent() {
      if (this.numberOfQueries > 0) {
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
  justify-content: space-between;
  height: 80%;
  margin-top: 2px;
}
</style>
