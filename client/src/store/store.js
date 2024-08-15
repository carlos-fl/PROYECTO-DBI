import { reactive } from 'vue'

export const store = reactive({
  params: {
    totalTickets: 0
  },
  // save tickets in arrays: [tipo_asiento, cantidad], example: tickets: [[Child-Premium, 2], [Teen-Premium, 1]]
  tickets: [],
  // save seats in arrays: [idSeat, htmlElement, Numero_Silla, type]
  seats: []
})

export function getTicketsInfo() {
  return store.tickets
}

export function saveTicketsInfo(arrayInfo) {
  store.tickets = arrayInfo
}

export function getTotalTickets() {
  return store.params.totalTickets
}

export function saveTotalTikects(total) {
  store.params.totalTickets = total
} 

export function saveTickets(tickets) {
  tickets.forEach(ticket => {
    store.tickets.push(ticket)
  }) 
}

// save a seat id in array
export function addSeat(arrayInfo) {
  let idSeat = arrayInfo[0]
  let idFound = false
  store.seats.every(el => {
    if (el[0] == idSeat)
      idFound = true
  })

  if (!idFound) 
    store.seats.push(arrayInfo)
    //store.seats.push(arrayInfo)
}
 
export function removeSeat(type) {
  for (let i = 0; i < store.seats.length; i++) {
    if (store.seats[i][store.seats[i].length - 1] == type) {
      const swap = store.seats[i]
      store.seats[i] = store.seats[0]
      store.seats[0] = swap
      return store.seats.shift()
    }
  }
  return []
}

export function isInSeats(tag) {
  let isIn = false
  store.seats.forEach(el => {
    if (el[1] == tag) isIn = true
  })
  return isIn
}

export function getSeats() {
  return store.seats
}