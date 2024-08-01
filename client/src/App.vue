<script setup>
import { ref } from "vue";

import Input from "./components/Input.vue";
import Form from "./components/Form.vue";
import Button from "./components/Button.vue";
import FormHeader from "./components/FormHeader.vue";

import { BACKEND_URL } from './config/data'

const userValue = ref('')
const userPassword = ref('')

function getData() {
  const data = { user: userValue.value, password: userPassword.value }
  userValue.value = ''
  userPassword.value = ''
  return data
}

function fetchData() {
  const data = getData()
  console.log('data: ', data)
  fetch(BACKEND_URL + "/gerente/login", {
    method: 'POST',
    headers: {
      "Content-Type": 'Application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  }).then(res => {
    res.json().then((response) => {
      if (res.status == 200) {
        console.log('YOU HAVE AN ACCOUNT IN THIS CINEMA', response.data)
      }
    }).catch(err => {
      console.log('an error has happend: ', err)
    })
  }).catch(err => {
    console.log('error: ', err)
  })
}

function currentUserData(currentValue) {
  userValue.value = currentValue
}

function currentUserPassword(currentValue) {
  userPassword.value = currentValue
}

</script>

<template>
  <div>
    <Form>
      <FormHeader text="Iniciar sesión"></FormHeader>
      <Input
        @currentValue="currentUserData"
        inputType="text"
        :inputValue="userValue"
        :maxLength="10"
        :minLength="3"
        placeholder="usuario"
      ></Input>
      <Input
        @currentValue="currentUserPassword"
        inputType="password"
        :inputValue="userPassword"
        :maxLength="30"
        :minLength="8"
        placeholder="contraseña"
      ></Input>
      <Button text="Iniciar sesión" @handleClick="fetchData"></Button>
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
