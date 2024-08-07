<script setup>
import { ref, defineProps, defineEmits } from "vue";
const props = defineProps({
  tipo: String,
  precio: Number,
});

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
          <option value="0" selected>0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
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
