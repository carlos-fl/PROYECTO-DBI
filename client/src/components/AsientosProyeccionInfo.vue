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

const getDate = computed(() => {
  return (props.fecha.split('T',2))[0]
})

const getSchedule = computed(() => {
  return (props.horario.split('T', 2))[1].substring(0, 5)
})
</script>


<template>
  <div id="proyeccion-container">
    <div id="proyeccion-container-img">
      <img :src="poster" :alt="titulo">
    </div> 
    <div id="proyeccion-container-info">
      <h2>{{ titulo }} {{visualization }}</h2>
      <h3>{{ getDate }}, {{ getSchedule }}</h3>
      <h3>Clasificación: <span>{{ clasificacion }}</span></h3>
    </div>
  </div>
</template>


<style scoped>
img {
  width: 130px;
}

#proyeccion-container {
  display: flex;
  justify-content: space-around;
  margin-top: 60px;
}

span {
  font-size: 15px;
  font-weight: 900;
}
</style>