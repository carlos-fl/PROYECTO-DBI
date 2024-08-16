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
      <Form>
        <FormHeader text="Agregar película"></FormHeader>
        <Input input-type="text" maxLength="50" minLength="2" placeholder="Titulo de pelicula"></Input>
        <Input input-type="text" maxLength="200" minLength="10" placeholder="Sinopsis de pelicula"></Input>
        <Input input-type="number" maxLength="250" minLength="45" placeholder="Duración en minutos"></Input>
        <label>Fecha de estreno</label>
        <Input input-type="date" placeholder="Duración en minutos"></Input>
        <label>Poster de la película</label>
        <Input input-type="file" accept="image/png, image/jpg"></Input>
        <Select>
          <Option text="Idioma original"></Option>
          <Option option-value="1" text="Inglés"></Option>
        </Select>
        <!-- 
        TODO: todas las películas son proximamente cuando se ingresan al sistema
        <Select>
          <Option text="Estado de la película"></Option>
          <Option option-value="1" text="próximamente"></Option>
        </Select> 
        -->
        <Select>
          <Option text="Clasificación"></Option>
          <Option option-value="1" text="Mayores de 13 años"></Option>
        </Select>
        <Button text="Guardar"></Button>
      </Form>
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