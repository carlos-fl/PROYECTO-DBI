<script setup>
import { onMounted, ref } from 'vue';
import Form from '../components/Form.vue';
import FormHeader from '../components/FormHeader.vue';
import Input from '../components/Input.vue';
import InputFile from '../components/InputFile.vue'
import Button from '../components/Button.vue';
import Select from '../components/Select.vue';
import Option from '../components/Option.vue';
import Combobox from '../components/Combobox.vue';
import { BACKEND_URL } from '../config/data';

const sucursales = ref([])
const sucursalesSelected = ref([])
const cast = ref([])
const castSelected = ref([])
const languages = ref([])
const clasificaciones = ref([])
const title = ref('')
const sinopsis = ref('')
const duration = ref(0)
const date = ref('')
const poster = ref({})
const languageSelected = ref(0)
const clasificacionSelected = ref(0)
const estados = ref([])
const estadoSelected = ref(0)

const objs = { title, sinopsis, duration, date, poster, languageSelected, clasificacionSelected, estadoSelected}

function updateData(value, el) {
  objs[el].value = value
}

function getSelectValues(e, el) {
  objs[el].value = e.target.value
}

async function fetchData(method) {
  const res = await fetch(BACKEND_URL + `/gerente/${method}`);
  const data = await res.json();
  return data.data;
}

function getSucursalesSelected(branches) {
  sucursalesSelected.value = []
  branches.forEach(el => {
    sucursalesSelected.value.push(el.ID) 
  })
}

function getCastSelected(reparto) {
  castSelected.value = []
  reparto.forEach(el => {
    castSelected.value.push(el.ID) 
  })
}

async function fetchSucursales() {
  try {
    const res = await fetch(BACKEND_URL + "/peliculas/sucursales");
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log(err);
  }
}

languages.value = await fetchData('idiomas')
clasificaciones.value = await fetchData('clasificaciones')
estados.value = await fetchData('estados')
sucursales.value = await fetchSucursales()
cast.value = await fetchData('cast')

async function saveData() {
  const formData = new FormData()
  formData.append('titulo',title.value)
  formData.append('sinopsis', sinopsis.value)
  formData.append('sucursales', JSON.stringify(sucursalesSelected.value))
  formData.append('duracion', duration.value)
  formData.append('poster', poster.value.target.files[0])
  formData.append('fechaEstreno', date.value)
  formData.append('idioma', languageSelected.value)
  formData.append('estado', estadoSelected.value)
  formData.append('clasificacion', clasificacionSelected.value)
  formData.append('cast', JSON.stringify(castSelected.value))
  const res = await fetch(BACKEND_URL + "/gerente/peliculas/nuevo", {
    method: "POST",
    body: formData 
  })
  const dataRes = await res.json()
  alert(dataRes.message)
}

onMounted(async (name) => {
  await fetchSucursales()
  await fetchData(name)
})

</script>


<template>
  <div>
    <Form enctype="multipart/form-data">
      <FormHeader text="Agregar película"></FormHeader>
      <Input
        @current-value="(e) => updateData(e, 'title')"
        input-type="text"
        maxLength="50"
        minLength="2"
        placeholder="Titulo de pelicula"
      ></Input>
      <Input
        @current-value="(e) => updateData(e, 'sinopsis')"
        input-type="text"
        maxLength="200"
        minLength="10"
        placeholder="Sinopsis de pelicula"
      ></Input>
      <Input
        @current-value="(e) => updateData(e, 'duration')"
        input-type="number"
        maxLength="250"
        minLength="45"
        placeholder="Duración en minutos"
      ></Input>
      <label>Fecha de estreno</label>
      <Input input-type="date"
        @current-value="(e) => updateData(e, 'date')"
      ></Input>
      <label>Poster de la película</label>
      <InputFile input-type="file" accept="image/png, image/jpg, image/jpge"
        @current-value="(e) => updateData(e, 'poster')"
      ></InputFile>
      <!-- fetch data from backend -->
      <Select @handle-event="(e) => getSelectValues(e, 'languageSelected')">
        <Option text="Idioma original"></Option>
        <Option v-for="idioma in languages" :key="idioma.ID" :option-value="idioma.ID" :text="idioma.Idioma"></Option>
      </Select>
      <!-- 
        TODO: todas las películas son proximamente cuando se ingresan al sistema
        <Select>
          <Option text="Estado de la película"></Option>
          <Option option-value="1" text="próximamente"></Option>
        </Select> 
        -->
        <!-- fetch data from backend -->
      <Select @handle-event="(e) => getSelectValues(e, 'clasificacionSelected')">
        <Option text="Clasificación"></Option>
        <Option v-for="clasificacion in clasificaciones" :key="clasificacion.ID" :option-value="clasificacion.ID" :text="clasificacion.TIPO"></Option>
      </Select>
      <Select @handle-event="(e) => getSelectValues(e, 'estadoSelected')">
        <Option text="Estado"></Option>
        <Option v-for="estado in estados" :key="estado.ID" :option-value="estado.ID" :text="estado.estado"></Option>
      </Select>
      <!-- prueba para seleccionar a qué sucursales estará la pelicula y su cast -->
      <Combobox :options="sucursales" placeholder="sucursales" @handle-event="getSucursalesSelected"></Combobox> 
      <Combobox :options="cast" placeholder="cast" @handle-event="getCastSelected"></Combobox> 
      <Button text="Guardar" @handle-click="saveData"></Button>
    </Form>
  </div>
</template>
