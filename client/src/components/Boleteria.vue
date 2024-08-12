<script setup>
import {defineProps, defineEmits } from "vue";
const props = defineProps({
  tipo: String,
  precio: Number,
});

const MAXTICKETSTOBUY = ref(10)
const ticketsSelected = ref(0)

const emits = defineEmits(['handleFunction'])

function getValueSelected(e) {
  emits('handleFunction', e.target)
}
</script>

<template>
  <div id="container">
    <div id="boletos-container">
      <div id="info-container">
        <span>{{ tipo }}</span>
        <span>L.{{ precio }}</span>
      </div>
      <div>
        <select @change="getValueSelected">
          <option v-for="i in MAXTICKETSTOBUY - ticketsSelected" :key="i" :value="i">{{ i }}</option>
        </select>
      </div>
    </div>
    <hr>
  </div>
</template>

<style scoped>
hr {
  width: 100%;
}
#boletos-container {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  text-align: center;
}

#info-container {
  display: flex;
  width: 51%;
  justify-content: space-between;
}

</style>
