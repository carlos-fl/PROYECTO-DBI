<template>
    <div>
      <h3>Proyecciones para {{ route.params.name }}</h3>
      <ul>
        <li v-for="projection in projections" :key="projection.id">
          <div>
            <h4>{{ projection.Horario }}</h4>
            <p>Sala: {{ projection.ID_Sala }}</p>
            <p>Sucursal: {{ projection.ID_Sucursal }}</p>
            <p>Subtitulada: {{ projection.Subtitulada ? 'Sí' : 'No' }}</p>
            <p>Doblada: {{ projection.Doblada ? 'Sí' : 'No' }}</p>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const projections = ref([]);
  
  const fetchProjections = async () => {
    const movieId = route.params.id;
    try {
      const response = await fetch(`your_backend_url/proyecciones/${movieId}`);
      const data = await response.json();
      projections.value = data.proyecciones;
    } catch (error) {
      console.error("Failed to fetch projections:", error);
    }
  };
  
  onMounted(fetchProjections);
  </script>
  