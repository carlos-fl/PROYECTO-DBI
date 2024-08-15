<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Asientos from '../components/Asientos.vue';
import AsientosHeader from '../components/AsientosHeader.vue';
import AsientosProyeccionInfo from '../components/AsientosProyeccionInfo.vue';
import Header from '../components/Header.vue';
import Button from '../components/Button.vue';
import { getTotalTickets, getSeats } from '../store/store';
import { BACKEND_URL } from '../config/data';

const router = useRoute()
const idProyeccion = router.params.idProyeccion
const seats = ref([])
const seatsByRow = ref({})
const info = ref({})
const totalTicketsToBeSelected = ref(getTotalTickets())
const seatsSelected = ref(getSeats())
const seatsByType = ref({})

async function fetchSeats() {
  const res = await fetch(BACKEND_URL + `/boletos/asientos/${idProyeccion}`)
  const data = await res.json()
  return data.data
}

async function fetchProyeccionData() {
  const res = await fetch(BACKEND_URL + `/boletos/proyecciones/${idProyeccion}/info`)
  const data = await res.json()
  return data.data
}

info.value = await fetchProyeccionData()

seats.value = await fetchSeats()
onMounted(async () => {
  await fetchSeats()
  await fetchProyeccionData()
})

seats.value.forEach(seat => {
  // getting seats by row
  if (!seatsByRow.value[seat.Numero_Asiento[0]]) seatsByRow.value[seat.Numero_Asiento[0]] = []
  seatsByRow.value[seat.Numero_Asiento[0]].push(seat)

  // getting seats by type
  seatsByType.value[seat.Nombre] = 0
})

function updateQuantityOfTickets() {
  totalTicketsToBeSelected.value = totalTicketsToBeSelected.value - 1
}
/*
const ticketsByTypeAndQuantity = getTicketsInfo()
// calculate the amount of seats by type
function amountSeatsAble(type) {
  let seatAmount = 0
  ticketsByTypeAndQuantity.forEach(el => {
    if (type == el[0].split('-')[1])
      seatAmount = el[1]
  })
  if (seatsByType.value[type] == seatAmount) return true
  seatsByType.value[type] = seatsByType.value[type] + 1
  return false
}
*/


const colorsBySeatType = ref({
  Standard: 'estandar',
  VIP: 'vip',
  IMAX: 'imax',
  Recliner: 'recliner',
  DBOX: 'dbox',
  Premium: 'premium' 
})

// select quantity corresponding to types of seats selected

/* ticketsByTypeAndQuantity.forEach(ticket => {
  const seatType = (ticket[0].split('-'))[1]
  ticketsQuantity.value[seatType] = ticket[1]
})
 */
</script>


<template>
  <div>
    <header>
      <Header title="CineFilia">
      </Header>
    </header>
      <AsientosProyeccionInfo :poster="info.Poster" :titulo="info.Titulo" :fecha="info.Fecha" :horario="info.Horario" :clasificacion="info.TIPO" :doblada="info.Doblada"></AsientosProyeccionInfo>
    <AsientosHeader></AsientosHeader>
    <div id="seats" v-for="(value, key) in seatsByRow" :key="key">
      <Asientos :total-Tickets=totalTicketsToBeSelected v-for="(seat, index) in value" :seat-type="seat.Nombre" :seat-number="seat.Numero_Asiento" :seat-id=seat.ID :key="index" :is-able=seat.Habilitado :is-taken=seat.Ocupado></Asientos>
    </div>
    <div>
      <div id="info-container">
        <div class="info">
          <div class="tomado"></div>
          <h4>Ocupado</h4>
        </div>
        <div class="info">
          <div class="seleccionado"></div>
          <h4>Su selección</h4>
        </div>
        <div class="info">
          <div class="malestado"></div>
          <h4>mal estado</h4>
        </div>
        <div class="info" v-for="(value, key) in colorsBySeatType" :key="key">
          <div :class="value"></div>
          <h4>{{ value }}</h4>
        </div>
      </div>
      <div id="asientos-info">
        <h2>Asientos: </h2>
        <h3 v-for="(seat, index) in seatsSelected" :key="index">{{ seat[2] }} <span> </span></h3>
      </div>
    </div>
    <Button text="Siguiente"></Button>
  </div>
</template>


<style scoped>
.asientos-info {
  margin-bottom: 35px;
}

.info > div {
  width: 40px;
  height: 10px;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 6px;
}

#info-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
}

.seleccionado {
  background-color: orange;
}
.tomado {
  background-color: red;
}

.malestado {
  background-color: gray;
}

header {
  background-color: #1D1D1F;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  color: #E1F387;
}

.estandar {
  background-color: blue;
}

.vip {
  background-color:cornflowerblue
}

.recliner {
  background-color:teal;
}

.imax {
  background-color:darkolivegreen
}

.dbox {
  background-color:darkorchid
}

.premium {
  background-color:darkturquoise
}

#seats {
  display: flex;
  justify-content: space-evenly;
}

h2, h3 {
  display: inline;
}

</style>