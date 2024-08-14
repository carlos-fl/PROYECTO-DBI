<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  isAble: Boolean,
  isTaken: Boolean 
})

const emits = defineEmits(['handle-click'])

function selectSeat(e) {
  emits('handle-click', e.target)
}


const seatState = computed(() => {
  if (!props.isAble) return 'unavailable'
  return props.isTaken ? 'taken' : 'available'
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

.available {
  color: #E1F387; 
  height: 50px;
}
.unavailable {
  color: gray; 
  height: 50px;
}
</style>