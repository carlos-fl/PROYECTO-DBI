<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
})
</script>

<template>
  <div id="container">
    <div>
      <h2 id="title">{{ title }}</h2>
    </div> 
    <div id="buttons-container">
      <slot></slot>
    </div>
  </div>
</template>


<style scoped>
#container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 80vw;
}

#buttons-container {
  display: flex;
  justify-content: space-evenly;
}
</style>