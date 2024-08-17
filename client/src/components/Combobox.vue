<template>
  <div class="combo-box">
    <div class="selected-options" @click="focusInput">
      <span v-for="(option, index) in selectedOptions" :key="index" class="selected-option">
        {{ option.Nombre }}
        <span @click.stop="removeOption(option)" class="remove-option">&times;</span>
      </span>
      <input
        type="text"
        v-model="inputValue"
        @input="onInput"
        @focus="showOptions = true"
        @blur="hideOptions"
        :placeholder="placeholder"
        class="combo-input"
      />
    </div>
    <ul v-if="showOptions && filteredOptions.length" class="combo-options">
      <li
        v-for="option in filteredOptions"
        :key="option.ID"
        @mousedown.prevent="toggleOption(option)"
        class="combo-option"
      >
        {{ option.Nombre }}
        <span v-if="selectedOptions.includes(option)" class="selected-mark">&#10003;</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Define component props
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Type to filter',
  },
});

// State variables
const inputValue = ref('');
const showOptions = ref(false);
const selectedOptions = ref([]);

// Computed property to filter options based on the input value
const filteredOptions = computed(() =>
  props.options.filter(
    (option) =>
      option.Nombre.toLowerCase().includes(inputValue.value.toLowerCase()) &&
      !selectedOptions.value.some(selected => selected.ID === option.ID)
  )
);

// Method to handle input changes
const onInput = () => {
  showOptions.value = true;
};
const emits = defineEmits(['handleEvent'])
// Method to handle option selection
const toggleOption = (option) => {
  const index = selectedOptions.value.findIndex(selected => selected.ID === option.ID);
  if (index !== -1) {
    selectedOptions.value.splice(index, 1);
  } else {
    selectedOptions.value.push(option);
  }
  inputValue.value = '';
  emits('handleEvent', selectedOptions.value)
};

// Method to remove a selected option
const removeOption = (option) => {
  selectedOptions.value = selectedOptions.value.filter(selected => selected.ID !== option.ID);
};

// Method to handle hiding the options
const hideOptions = () => {
  setTimeout(() => {
    showOptions.value = false;
  }, 100);
};

// Method to focus the input when the selected options div is clicked
const focusInput = () => {
  showOptions.value = true;
};
</script>

<style scoped>
.combo-box {
  position: relative;
  font-family: Arial, sans-serif;
  background-color: #1d1d1f;
  border: 1px solid #e1f387;
  border-radius: 4px;
  padding: 4px;
  color: #ffffff;
}

.selected-options {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 4px;
  box-sizing: border-box;
  cursor: text;
}

.selected-option {
  background-color: #e1f387;
  color: #1d1d1f;
  padding: 4px 8px;
  margin: 2px;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.remove-option {
  margin-left: 4px;
  cursor: pointer;
  color: #1d1d1f;
}

.combo-input {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 4px;
  color: #ffffff;
  background-color: #1d1d1f;
}

.combo-options {
  position: absolute;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background-color: #1d1d1f;
  border: 1px solid #e1f387;
  border-top: none;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1000;
}

.combo-option {
  padding: 8px;
  cursor: pointer;
  color: #ffffff;
}

.combo-option:hover {
  background-color: #e1f387;
  color: #1d1d1f;
}

.selected-mark {
  float: right;
  color: #1d1d1f;
}
</style>

