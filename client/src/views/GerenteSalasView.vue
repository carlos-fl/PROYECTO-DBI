<script setup>
import { onMounted, ref } from "vue";
import Form from '../components/Form.vue'
import FormHeader from '../components/FormHeader.vue'
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
import Select from '../components/Select.vue'
import Option from '../components/Option.vue'
import { BACKEND_URL } from "../config/data";

const salaNumber = ref(0)
const capacidad = ref(0)
const idSucursal = ref(0)
const sucursales = ref([])
const sucursal = ref(0)

const objs = {salaNumber, capacidad, idSucursal, sucursal }

async function fetchSucursales() {
  try {
    const res = await fetch(BACKEND_URL + "/peliculas/sucursales");
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log(err);
  }
}

sucursales.value = await fetchSucursales()

function getData(value, el) {
  objs[el].value = value
}

function getSucursal(e, el) {
  objs[el].value = e.target.value
}

async function saveData() {
  const data = { numeroSala: salaNumber.value, capacidad: capacidad.value, sucursal: sucursal.value }
  const res = await fetch(BACKEND_URL + "/salas/nuevo", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (res.status == 200) alert('Sala guardada correctamente')
  if (res.status == 500) alert('No se pudo guardar la sala. Intente nuevamente más tarde')
}

onMounted(async () => {
  await fetchSucursales()
})
</script>


<template>
  <div>
    <Form>
      <FormHeader text="Agregar sala"></FormHeader>
      <Input
        @current-value="(e) => getData(e, 'salaNumber')"
        input-type="number"
        max-length="30"
        min-length="1"
        placeholder="Numero de sala"
      ></Input>
      <Input
        @current-value="(e) => getData(e, 'capacidad')"
        input-type="number"
        max-length="250"
        min-length="85"
        placeholder="Capacidad"
      ></Input>
      <Select @handle-event="(e) => getSucursal(e, 'sucursal')">
        <Option text="Sucursal al cual pertenece la sala"></Option>
        <Option v-for="sucursal in sucursales" :key="sucursal.ID" :option-value="sucursal.ID" :text="sucursal.Nombre"></Option>
      </Select>
      <Button text="Guardar" @handle-click="saveData()"></Button>
    </Form>
  </div>
</template>
