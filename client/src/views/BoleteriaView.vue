<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router'
import BoleteriaHeader from "../components/BoleteriaHeader.vue";
import Boleteria from '../components/Boleteria.vue'
import Total from '../components/Total.vue'
import Button from '../components/Button.vue'

import { BACKEND_URL } from '../config/data'

const totalTickets = ref({})
const totalOfTickets = ref(0)
const total = ref(0.00)
const tickets = ref([])
const ticketsByChair = ref({})

function updateTotalOfTickets(ticket, type, price) {
  (totalTickets.value)[type] = [parseInt(ticket.value), price]

  totalOfTickets.value = 0
  Object.keys(totalTickets.value).forEach(key => {
    totalOfTickets.value += (totalTickets.value)[key]
  })

  getTotalToPay()
}

function getTotalToPay() {
  total.value = 0.00
  Object.keys(totalTickets.value).forEach(key => {
    total.value += parseFloat((totalTickets.value)[key][1] * (totalTickets.value)[key][0])
  })
}

async function fetchTickets() {
  try {
    const route = useRoute()
    const idParam = route.params.id
    const res = await fetch(BACKEND_URL + `/boletos/precios/${idParam}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application-json'
      }
    })
    const tickets = await res.json()
    return tickets
  } catch(err) {
    console.log('error while getting tickets')
  }
}

const data = await fetchTickets()
tickets.value = data?.data

console.log('proyeccion: ', data?.proyeccion)
console.log(tickets.value)

tickets.value.forEach(el => {
  if (!ticketsByChair.value[el.ID_Asiento]) ticketsByChair.value[el.ID_Asiento] = []

  ticketsByChair.value[el.ID_Asiento].push(el)
})

const regularChair = ref(ticketsByChair.value[1])
const dboxChair = ref(ticketsByChair.value[2])
const thirdChair = ref(ticketsByChair.value[3])
const desChair = ref(ticketsByChair.value[4])
const fourthChair = ref(ticketsByChair.value[5])
const premierChair = ref(ticketsByChair.value[6])

console.log('REGULAR CHAIR', regularChair.value)
console.log(dboxChair.value)
console.log(premierChair.value)

onMounted(async () => {
  await fetchTickets()
})
</script>

<template>
  <div id="container">
    <div>
      <div>
        <BoleteriaHeader title="SILLA GENERAL"></BoleteriaHeader>
        <Boleteria v-for="ticket in regularChair" :key="ticket.ID" :precio="ticket.PRECIO" :tipo="ticket.RANGO" @handleFunction="(event) => updateTotalOfTickets(event, ticket.RANGO, ticket.PRECIO)"></Boleteria>
      </div>
      <div v-if="premierChair">
        <BoleteriaHeader  title="SILLA PREMIER"></BoleteriaHeader>
        <Boleteria v-for="ticket in premierChair" :key="ticket.ID" :precio="ticket.PRECIO" :tipo="ticket.RANGO" @handleFunction="(event) => updateTotalOfTickets(event, ticket.RANGO, ticket.PRECIO)"></Boleteria>
      </div>
      <div v-if="dboxChair">
        <BoleteriaHeader  title="SILLA PREMIER"></BoleteriaHeader>
        <Boleteria v-for="ticket in dboxChair" :key="ticket.ID" :precio="ticket.PRECIO" :tipo="ticket.RANGO" @handleFunction="(event) => updateTotalOfTickets(event, ticket.RANGO, ticket.PRECIO)"></Boleteria>
      </div>
      <div v-if="premierChair">
        <BoleteriaHeader  title="SILLA PREMIER"></BoleteriaHeader>
        <Boleteria v-for="ticket in tickets" :key="ticket.ID" :precio="ticket.PRECIO" :tipo="ticket.RANGO" @handleFunction="(event) => updateTotalOfTickets(event, ticket.RANGO, ticket.PRECIO)"></Boleteria>
      </div>
      <div v-if="premierChair">
        <BoleteriaHeader  title="SILLA PREMIER"></BoleteriaHeader>
        <Boleteria v-for="ticket in tickets" :key="ticket.ID" :precio="ticket.PRECIO" :tipo="ticket.RANGO" @handleFunction="(event) => updateTotalOfTickets(event, ticket.RANGO, ticket.PRECIO)"></Boleteria>
      </div>
     <!--  <Boleteria precio="85.00" tipo="niños" @handleFunction="(event) => updateTotalOfTickets(event, 'niños', 85.00)"></Boleteria>
      <Boleteria precio="60.00" tipo="estudiantes" @handleFunction="(event) => updateTotalOfTickets(event, 'estudiantes', 60.00)"></Boleteria>
      <Boleteria precio="50.00" tipo="tercera edad" @handleFunction="(event) => updateTotalOfTickets(event, 'tercera edad', 50.00)"></Boleteria> -->
    </div>
    <div id="footer">
      <Total :total="total"></Total>
      <Button text="CONTINUAR"></Button>
    </div>
  </div>
</template>

<style scoped>
#container {
  width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#footer {
  display: flex;
  justify-content: space-between;
  width: 70%;
  padding: 10px;
}
</style>
