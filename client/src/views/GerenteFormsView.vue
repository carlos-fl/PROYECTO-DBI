<script setup>
  import { useRoute } from "vue-router";
  import { ref, onMounted } from "vue";
  import Form from '../components/Form.vue'
  import FormHeader from '../components/FormHeader.vue'
  import Input from '../components/Input.vue'
  import Select from "../components/Select.vue";
  import Option from "../components/Option.vue";
  import Button from "../components/Button.vue";
  import ProyeccionesForm from "../components/ProyeccionesForm.vue"; //Creo que hare un formulario mas especifico y que llame dinamicamente campos
  
 // components views
 import GerenteEmpleadoView from "./GerenteEmpleadoView.vue";
 import GerentePeliculasForm from "./GerentePeliculasForm.vue";
 import GerenteSalasView from './GerenteSalasView.vue'
 

  const router = useRoute()
  const currentView = ref(router.params.feature) 

</script>

<template>
  <div>
    <!-- Form for managing projections -->
    <div v-if="currentView == 'proyecciones'">
      <ProyeccionesForm></ProyeccionesForm>
    </div>
    <!-- Other forms remain unchanged -->
    <div v-if="currentView == 'precios'">
      <Form>
        <FormHeader text="Agregar Precio"></FormHeader>
        <Input placeholder="Nombre del Precio"></Input>
        <Input placeholder="Valor"></Input>
        <Button text="Guardar" @handleClick="handleSavePrice"></Button>
      </Form>
    </div>
    <div v-if="currentView == 'salas'">
      <GerenteSalasView></GerenteSalasView>
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

<script>
function handleSaveProjection() {
  
}

function handleSavePrice() {
  
}

function handleSaveRoom() {
  
}
</script>


<style scoped>
label {
  text-align: start;
}
</style>