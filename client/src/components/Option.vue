<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  optionValue: String,
  text: String,
})

</script>

<template>
  <option :value="optionValue">{{ text }}</option>
</template>

