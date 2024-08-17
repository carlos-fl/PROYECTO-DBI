<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { addSeat, removeSeat, getTicketsInfo, getSeats, isInSeats } from '../store/store';

const props = defineProps({
  seatType: String,
  seatId: Number,
  seatNumber: String,
  totalByType: Number,
  totalTickets: Number,
  isAble: Boolean,
  isTaken: Boolean 
})

function countSeatsByType(type, arr) {
  let total = 0
  arr.forEach(el => {
    if (el[el.length - 1] == type) total++
  })
  return total
}

const colorsBySeatType = {
  Standard: 'Standar',
  VIP: 'VIP',
  IMAX: 'IMAX',
  Recliner: 'Recliner',
  DBOX: 'DBOX',
  Premium: 'PREMIUM'
}

const tickets = getTicketsInfo()

const seatTypes = []
tickets.forEach(el => {
  const type = el[0].split('-')[1]
  seatTypes.push(type)
})

const canSelect = seatTypes.includes(props.seatType)
const emits = defineEmits(['handle-click'])
function selectSeat(e) {
  if (!props.isTaken && props.isAble && canSelect && !isInSeats(e.target)) {
    const seats = getSeats()
    const max = countSeatsByType(props.seatType, seats)
    if (max > props.totalByType - 1) {
      const seat = (removeSeat(props.seatType))[1]
      seat.classList.remove('selected')
      seat.classList.add(colorsBySeatType[props.seatType])
    }
    e.target.classList.remove(colorsBySeatType[props.seatType])
    e.target.classList.add('selected')
    addSeat([props.seatId, e.target, props.seatNumber, props.seatType])
  } 
}


const seatState = computed(() => {
  if (!props.isAble) return 'unavailable'
  return props.isTaken ? 'taken' : colorsBySeatType[props.seatType] 
})


</script>

<template>
  <div :class="seatState"  @click="selectSeat">
    <i class="fa-solid fa-box-tissue"></i>
  </div>
</template>


<style scoped>

.taken {
  color: red
}

.selected {
  color: orange;
}

.available {
  color: #E1F387; 
  height: 50px;
}
.unavailable {
  color: gray; 
  height: 50px;
}

.Standar {
  color: blue;
}

.PREMIUM {
  color:darkturquoise
}

.VIP {
  color:cornflowerblue
}

.Recliner {
  color:teal;
}

.IMAX {
  color:darkolivegreen
}

.DBOX {
  color:darkorchid
}

</style>