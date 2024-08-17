<script setup>
import Form from '../components/Form.vue';
import FormHeader from '../components/FormHeader.vue';
import Select from '../components/Select.vue';
import Option from '../components/Option.vue';
import Button from '../components/Button.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';


const salas = ref([]);
const sucursales = ref([]);
const peliculas = ref([]);
const tiposProyecciones = ref([]);
const selectedSala = ref(null);
const selectedSucursal = ref(null);
const selectedPelicula = ref(null);
const selectedTipoProyeccion = ref(null);
const fechaProyeccion = ref('');
const isDub = ref(false); 
const isSub = ref(false); 

onMounted(async () => {
    try {
        const url = 'http://localhost:3000/api/proyecciones-data';
        console.log('Requesting data from URL:', url);  // Log the URL
        const response = await axios.get(url);
        console.log('API Response:', response.data);  // Log the response data
        salas.value = response.data.salas;
        sucursales.value = response.data.sucursales;
        peliculas.value = response.data.peliculas;
        tiposProyecciones.value = response.data.tiposProyecciones;
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
});

async function handleSubmit() {
    try {
        const [Fecha, Horario] = fechaProyeccion.value.split('T');

        console.log({
            idSala: selectedSala.value,
            idSucursal: selectedSucursal.value,
            idPelicula: selectedPelicula.value,
            idTipoProyeccion: selectedTipoProyeccion.value,
            Fecha: Fecha,
            Horario: Horario,
            Subtitulada: isSub.value,
            Doblada: isDub.value,
        });

        const response = await axios.post('http://localhost:3000/api/proyecciones', {
            idSala: selectedSala.value,
            idSucursal: selectedSucursal.value,
            idPelicula: selectedPelicula.value,
            idTipoProyeccion: selectedTipoProyeccion.value,
            Fecha: Fecha,            
            Horario: Horario,        
            Subtitulada: isSub.value,
            Doblada: isDub.value,
        });

        alert('Proyección guardada con éxito');
    } catch (error) {
        console.error('Failed to save projection:', error);
    }
}
</script>

<template>
  <Form>
    <FormHeader text="Agregar Proyección"></FormHeader>
    <input type="datetime-local" placeholder="Fecha y Hora de la Proyección" v-model="fechaProyeccion" />

    <div class="form-group">
      <label for="pelicula-select">Película</label>
      <select v-model="selectedPelicula" class="custom-select" id="pelicula-select">
        <option value="" disabled selected>None</option>
        <option v-for="pelicula in peliculas" :key="pelicula.ID" :value="pelicula.ID">
          {{ pelicula.Titulo }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="sucursal-select">Sucursal</label>
      <select v-model="selectedSucursal" class="custom-select" id="sucursal-select">
        <option value="" disabled selected>None</option>
        <option v-for="sucursal in sucursales" :key="sucursal.ID" :value="sucursal.ID">
          {{ sucursal.Nombre }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="sala-select">Sala</label>
      <select v-model="selectedSala" class="custom-select" id="sala-select">
        <option value="" disabled selected>None</option>
        <option v-for="sala in salas" :key="sala.ID" :value="sala.ID">
          {{ sala.Numero_Sala }}
        </option>
      </select>
    </div>
    
    <div class="form-group">
      <label for="tipo-proyeccion-select">Tipo de Proyección</label>
      <select v-model="selectedTipoProyeccion" class="custom-select" id="tipo-proyeccion-select">
        <option value="" disabled selected>None</option>
        <option v-for="tipo in tiposProyecciones" :key="tipo.ID" :value="tipo.ID">
          {{ tipo.Tipo }}
        </option>
      </select>
    </div>

    <label>
      <input type="checkbox" v-model="isDub" /> Doblada
    </label>
    <label>
      <input type="checkbox" v-model="isSub" /> Subtitulada
    </label>

    <Button text="Guardar" @handleClick="handleSubmit"></Button>
  </Form>
</template>

<style scoped>
form {
  background-color: #1d1d1f; /* Dark background color for the form */
  border-radius: 10px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  color: #ffffff; /* White text color */
}

input[type="text"], 
input[type="datetime-local"], 
select {
  width: calc(100% - 20px);
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #ced200; /* Light yellow-green border */
  background-color: #252525; /* Slightly lighter background for input fields */
  color: #ffffff; /* White text color */
}

input[type="checkbox"] {
  margin-right: 10px;
}

label {
  display: flex;
  align-items: center;
  color: #ced200; /* Light yellow-green text color */
  margin-bottom: 15px;
}

button {
  background-color: #252525; /* Button background similar to input fields */
  border: none;
  padding: 10px 20px;
  color: #ffffff; /* White text color */
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

button:hover {
  background-color: #3d3d3d; /* Slightly lighter on hover */
}

.FormHeader {
  color: #ced200; /* Light yellow-green color for header */
  text-align: center;
  margin-bottom: 20px;
}
</style>
