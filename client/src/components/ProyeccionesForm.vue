<script>
import Form from '../components/Form.vue';
import FormHeader from '../components/FormHeader.vue';
import Input from '../components/Input.vue';
import Select from '../components/Select.vue';
import Option from '../components/Option.vue';
import Button from '../components/Button.vue';

export default {
  components: {
    Form,
    FormHeader,
    Input,
    Select,
    Button,
  },

  data() {
    return {
      projectionName: '',
      projectionDate: '',
      projectionTime: '',
      projectionRoom: '',
      projectionSucursal: '',
      projectionMovie: '',
      projectionType: '',
      rooms: [],
      sucursales: [],
      movies: [],
      projectionTypes: [],
    };
  },
  mounted() {
    /*
    this.fetchRooms();
    this.fetchSucursales();
    this.fetchMovies();
    this.fetchProjectionTypes();
  Voy a simular la data*/

  this.rooms = [
    { id: 1, numero_sala: 'Sala 1' },
    { id: 2, numero_sala: 'Sala 2' },
    { id: 3, numero_sala: 'Sala 3' },
  ];

  // Simulate data for sucursales
  this.sucursales = [
    { id: 1, nombre: 'Sucursal A' },
    { id: 2, nombre: 'Sucursal B' },
  ];

  // Simulate data for movies
  this.movies = [
    { id: 1, titulo: 'Pelicula 1' },
    { id: 2, titulo: 'Pelicula 2' },
  ];

  // Simulate data for projection types
  this.projectionTypes = [
    { id: 1, tipo: '2D' },
    { id: 2, tipo: '3D' },
  ];
    },
  methods: {
    handleSubmit() {
      // Luego veo que pedo con como guardarlo
      console.log('Proyección guardada:', {
        name: this.projectionName,
        date: this.projectionDate,
        time: this.projectionTime,
        room: this.projectionRoom,
        sucursal: this.projectionSucursal,
        movie: this.projectionMovie,
        type: this.projectionType,
      });
      // Logic to send the data to the server or handle it locally
    },
  },
};
</script>

<template>
  <Form>
    <FormHeader text="Agregar Proyección"></FormHeader>
    <Input input-type="text" placeholder="Nombre de la Proyección" v-model="projectionName" />
    <Input input-type="date" placeholder="Fecha de la Proyección" v-model="projectionDate" />
    <Input input-type="time" placeholder="Hora de la Proyección" v-model="projectionTime" />

    <Select v-model="projectionRoom">
      <Option text="Seleccione la Sala" option-value="" />
      <Option v-for="room in rooms" :key="room.id" :option-value="room.id" :text="room.numero_sala" />
    </Select>

    <Select v-model="projectionSucursal">
      <Option text="Seleccione la Sucursal" option-value="" />
      <Option v-for="sucursal in sucursales" :key="sucursal.id" :option-value="sucursal.id" :text="sucursal.nombre" />
    </Select>

    <Select v-model="projectionMovie">
      <Option text="Seleccione la Película" option-value="" />
      <Option v-for="movie in movies" :key="movie.id" :option-value="movie.id" :text="movie.titulo" />
    </Select>

    <Select v-model="projectionType">
      <Option text="Seleccione el Tipo de Proyección" option-value="" />
      <Option v-for="type in projectionTypes" :key="type.id" :option-value="type.id" :text="type.tipo" />
    </Select>

    <Button text="Guardar" @handleClick="handleSubmit"></Button>
  </Form>
</template>

<style scoped>
slot {
  margin-bottom: 5px;
}

form {
  background-color: #1d1d1f; /* Dark background color for the form */
  border-radius: 10px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  color: #ffffff; /* White text color */
}
</style>
