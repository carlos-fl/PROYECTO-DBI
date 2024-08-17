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
 import GerenteSalasView from './GerenteSalasView.vue'
 

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
      <GerenteSalasView></GerenteSalasView>
    </div>
    <div v-if="currentView == 'peliculas'">
      <GerentePeliculasForm></GerentePeliculasForm>
    </div>
    <div v-if="currentView == 'sucursales'">
      <Form>
        <FormHeader text="Agregar Sucursal"></FormHeader>
        <Input placeholder="Nombre de la sucursal" v-model="nombre" />
        <Input placeholder="Dirección" v-model="direccion" />
        <Input placeholder="Teléfono" v-model="telefono" />
        <Button text="Guardar" @click="saveSucursal"></Button>
      </Form>
    </div>
    <div v-if="currentView == 'productos'">
      <Form>
        <FormHeader text="Agregar Producto"></FormHeader>
        <Input placeholder="Nombre del producto" v-model="nombre" />
        <Input placeholder="Descripción" v-model="descripcion" />
        <Input placeholder="Precio" v-model="precio" type="number" />
        <Button text="Guardar" @click="saveProducto"></Button>
      </Form>
    </div>
    <div v-if="currentView == 'combos'">
      <Form>
        <FormHeader text="Agregar Combo"></FormHeader>
        <Input placeholder="Nombre del combo" v-model="nombre" />
        <Input placeholder="Items incluidos" v-model="items" />
        <Input placeholder="Precio del combo" v-model="precio" type="number" />
        <Button text="Guardar" @click="saveCombo"></Button>
      </Form>
    </div>
    <div v-if="currentView == 'clasificaciones'">
      <Form>
        <FormHeader text="Agregar Clasificación"></FormHeader>
        <Input placeholder="Tipo de clasificación" v-model="tipo" />
        <Input placeholder="Descripción" v-model="descripcion" />
        <Button text="Guardar" @click="saveClasificacion"></Button>
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

function saveSucursal() {

  console.log('Saving sucursal:', { nombre: nombre.value, direccion: direccion.value, telefono: telefono.value });
}

function saveProducto() {
  console.log('Saving producto:', { nombre: nombre.value, descripcion: descripcion.value, precio: precio.value });
}

function saveCombo() {
  console.log('Saving combo:', { nombre: nombre.value, items: items.value, precio: precio.value });
}

function saveClasificacion() {
  console.log('Saving clasificacion:', { tipo: tipo.value, descripcion: descripcion.value });
}

</script>


<style scoped>
label {
  text-align: start;
}
</style>