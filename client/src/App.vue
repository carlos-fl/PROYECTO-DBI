<script setup>
import Input from "./components/Input.vue";
import Form from "./components/Form.vue";
import Button from "./components/Button.vue";
import FormHeader from "./components/FormHeader.vue";
</script>

<template>
  <div>
    <Form>
      <FormHeader text="Iniciar sesión"></FormHeader>
      <Input
        inputType="text"
        :maxLength="10"
        :minLength="3"
        placeholder="usuario"
      ></Input>
      <Input
        inputType="password"
        :maxLength="30"
        :minLength="8"
        placeholder="contraseña"
      ></Input>
      <Button text="Iniciar sesión"></Button>
    </Form>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
