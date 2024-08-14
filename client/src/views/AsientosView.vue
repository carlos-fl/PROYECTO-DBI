<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Asientos from '../components/Asientos.vue';
import AsientosHeader from '../components/AsientosHeader.vue';
import AsientosProyeccionInfo from '../components/AsientosProyeccionInfo.vue';
import Header from '../components/Header.vue';
import { BACKEND_URL } from '../config/data';

const router = useRoute()
const idProyeccion = router.params.idProyeccion
const seats = ref([])
const seatsByRow = ref({})

async function fetchSeats() {
  const res = await fetch(BACKEND_URL + `/boletos/asientos/${idProyeccion}`)
  const data = await res.json()
  return data.data
}

async function fetchProyeccionData() {
  
}

seats.value = await fetchSeats()
console.log(seats.value)
onMounted(async () => {
  await fetchSeats()
})

seats.value.forEach(seat => {
  if (!seatsByRow.value[seat.Numero_Asiento[0]]) seatsByRow.value[seat.Numero_Asiento[0]] = []
  seatsByRow.value[seat.Numero_Asiento[0]].push(seat)
})

console.log(seatsByRow.value)
</script>


<template>
  <div>
    <AsientosProyeccionInfo></AsientosProyeccionInfo>
    <header>
      <Header title="CineFilia"></Header>
    </header>
    <h1>ASIENTOS</h1> 
    <AsientosHeader></AsientosHeader>
    <div id="seats" v-for="(value, key) in seatsByRow" :key="key">
      <Asientos v-for="(seat, index) in value" :key="index" :is-able=seat.Habilitado :is-taken=seat.Ocupado></Asientos>
    </div>
  </div>
</template>


<style scoped>
#seats {
  display: flex;
  justify-content: space-evenly;
}
</style>