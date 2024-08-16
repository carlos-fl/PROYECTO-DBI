<script setup>
  import { useRoute } from "vue-router";
  import { ref, onMounted } from "vue";
  import Form from '../components/Form.vue'
  import FormHeader from '../components/FormHeader.vue'
  import Input from '../components/Input.vue'
  import Select from "../components/Select.vue";
  import Option from "../components/Option.vue";
  import Button from "../components/Button.vue";
  import { BACKEND_URL } from "../config/data";
  
 // components views
 import GerenteEmpleadoView from "./GerenteEmpleadoView.vue";
 import GerentePeliculasForm from "./GerentePeliculasForm.vue";

  const router = useRoute()
  const currentView = ref(router.params.feature) 

</script>


<template>
  <div>
    <div v-if="currentView == 'proyecciones'">
      <Form>
        <FormHeader text="Agregar proyección"></FormHeader>
        <Input></Input>
        <Input></Input>
        <Input></Input>
      </Form>
    </div>
    <div v-if="currentView == 'precios'">
      <Form>
        <FormHeader text="Agregar sala"></FormHeader>
        <Input></Input>
        <Input></Input>
        <Input></Input>
      </Form>
    </div>
    <div v-if="currentView == 'salas'">
      <Form>
        <FormHeader text="Agregar sala"></FormHeader>
        <Input input-type="number" max-length="30" min-length="1" placeholder="Numero de sala"></Input>
        <Input input-type="number" max-length="250" min-length="85" placeholder="Capacidad"></Input>
        <Button text="Guardar"></Button>
      </Form>
    </div>
    <div v-if="currentView == 'peliculas'">
      <GerentePeliculasForm></GerentePeliculasForm>
    </div>
    <div v-if="currentView == 'sucursales'">
      <Form>
        <FormHeader text="Agregar sala"></FormHeader>
        <Input></Input>
        <Input></Input>
        <Input></Input>
      </Form>
    </div>
    <div v-if="currentView == 'productos'">
      <Form>
        <FormHeader text="Agregar sala"></FormHeader>
        <Input></Input>
        <Input></Input>
        <Input></Input>
      </Form>
    </div>
    <div v-if="currentView == 'combos'">
      <Form>
        <FormHeader text="Agregar sala"></FormHeader>
        <Input></Input>
        <Input></Input>
        <Input></Input>
      </Form>
    </div>
    <div v-if="currentView == 'clasificaciones'">
      <Form>
        <FormHeader text="Agregar sala"></FormHeader>
        <Input></Input>
        <Input></Input>
        <Input></Input>
      </Form>
    </div>
    <div v-if="currentView == 'empleados'">
      <GerenteEmpleadoView></GerenteEmpleadoView>
    </div>
  </div>
</template>


<style scoped>
label {
  text-align: start;
}
</style>