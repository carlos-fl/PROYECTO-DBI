<script setup></script>

<template>
  <form @submit.prevent="SubmitEvent">
    <slot></slot>
  </form>
</template>

<style scoped>
slot {
  margin-bottom: 5px;
}

form {
  background-color: #1d1d1f; /* Dark background color for the form */
  border-radius: 10px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  color: #ffffff; /* White text color */
}
</style>
