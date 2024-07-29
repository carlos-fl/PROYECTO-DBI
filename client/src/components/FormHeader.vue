<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    text: String
  })
</script>


<template>
  <h4>{{ text }}</h4>
</template>


<style scoped>
  h4 {
    text-align: center;
  }
</style>