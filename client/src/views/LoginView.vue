<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import Form from "../components/Form.vue";
import FormHeader from "../components/FormHeader.vue";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import { BACKEND_URL } from '../config/data';

const router = useRouter()
const userValue = ref("");
const userPassword = ref("");

function getData() {
  const data = { user: userValue.value, password: userPassword.value };
  userValue.value = "";
  userPassword.value = "";
  return data;
}

function fetchData() {
  const data = getData();
  fetch(BACKEND_URL + "/gerente/login", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  })
    .then((res) => {
      res
        .json()
        .then((response) => {
          if (res.status == 200 && response.habilitado) {
            const urlPath = "/gerente" 
            router.push({ path: urlPath })
          }
          if (res.status == 401) alert(response.message)
        })
        .catch((err) => {
          console.log("an error has happend: ", err);
        });
    })
    .catch((err) => {
      console.log("error: ", err);
    });
}

function currentUserData(currentValue) {
  userValue.value = currentValue;
}

function currentUserPassword(currentValue) {
  userPassword.value = currentValue;
}
</script>

<template>
  <div id="form-login-container">
    <Form>
      <FormHeader text="Inicio de sesión"></FormHeader>
      <Input
        @currentValue="currentUserData"
        inputType="text"
        :inputValue="userValue"
        :maxLength="30"
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
#form-login-container {
  display: flex;
  justify-content: center;
}
</style>
