<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  poster: String,
  titulo: String,
  fecha: String,
  horario: String,
  clasificacion: String,
  doblada: Boolean,
})

const visualization = computed(() => {
  return props.doblada ? 'DOB' : 'SUB'
})
</script>


<template>
  <div id="proyeccion-container">
    <div id="proyeccion-container-img">
      <img :src="poster" :alt="titulo">
    </div> 
    <div id="proyeccion-container-info">
      <h2>{{ titulo }} {{visualization }}</h2>
      <h3>{{ fecha }}, {{ hora }}</h3>
      <h3>Clasificación: <span>{{ clasificacion }}</span></h3>
    </div>
  </div>
</template>


<style scoped>

#proyeccion-container {
  display: flex;
}

span {
  font-size: 15px;
  font-weight: 900;
}
</style>