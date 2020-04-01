<template>
  <div class="tags">
    <span class="tag is-large">{{name}}</span>
    <span 
      class="tag is-warning is-medium"
      v-for="(entry, index) in payload"
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
    payload: Array

  }
}
</script>

<style scoped>

</style>
