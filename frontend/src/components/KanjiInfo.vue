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
    showFull: Boolean
  },
  computed: {
    // Only show 2 items per line if card doesn't require full
    managedPayload() {
      if (this.payload.length > 2 && !this.showFull) return this.payload.slice(0,2)
      return this.payload
    }
  }
}
</script>

<style scoped>

</style>
