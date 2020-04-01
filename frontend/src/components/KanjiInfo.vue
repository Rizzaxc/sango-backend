<template>
  <div class="tags">
    <span class="tag is-large">{{name}}</span>
    <span 
      class="tag is-warning is-medium"
      v-for="(entry, index) in managedPayload"
      :key="index"
    >
      {{entry}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'KanjiInfo',
  props: {
    name: String,
    payload: Array,
    mostRecent: Boolean
  },
  computed: {
    // If the query is not the most recent, only show 2 items per line
    managedPayload() {
      if (this.payload.length > 2 && !this.mostRecent) return this.payload.slice(0,2)
      return this.payload
    }
  }
}
</script>

<style scoped>

</style>
