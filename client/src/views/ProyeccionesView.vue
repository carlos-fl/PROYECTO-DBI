<template>
  <div class="projection-card" v-if="projections.length > 0">
    <h3>Proyecciones para {{ projections[0].Titulo }} en la sucursal {{ route.params.sucursal }}</h3>
    <div v-for="projection in projections" :key="projection.id" class="projection-details">
      <div class="projection-datetime">{{ formatDate(projection.Fecha) }} a las {{ formatTime(projection.Horario) }}</div>
      <p><strong>Sala:</strong> {{ projection.ID_Sala }}</p>
      <p><strong>Sucursal:</strong> {{ projection.ID_Sucursal }}</p>
      <p><strong>Subtitulada:</strong> {{ projection.Subtitulada ? 'Sí' : 'No' }}</p>
      <p><strong>Doblada:</strong> {{ projection.Doblada ? 'Sí' : 'No' }}</p>
    </div>
  </div>
  <div v-else>
    <p>No se encontraron proyecciones para la película seleccionada en esta sucursal.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const projections = ref([]);

const fetchProjections = async () => {
  const sucursalId = route.params.sucursal;
  const movieId = route.params.id;

  try {
    const response = await fetch(`http://localhost:3000/api/proyecciones/${sucursalId}/${encodeURIComponent(route.params.name)}/${movieId}`);

    if (response.status === 404) {
      console.error("No projections found");
      projections.value = [];
    } else {
      const data = await response.json();
      projections.value = data;
    }
  } catch (error) {
    console.error("Failed to fetch projections:", error);
  }
};

const formatDate = (dateStr) => {
    try {
        // Directly create a Date object using the date string
        const dateObj = new Date(dateStr);
        
        // Check if the date object is valid
        if (isNaN(dateObj.getTime())) {
            return 'Fecha Inválida';
        }

        // Format the date to the desired format
        return dateObj.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    } catch (error) {
        console.error("Error formatting date:", error);
        return 'Fecha Inválida';
    }
};


const formatTime = (timeStr) => {
    try {
        const [hours, minutes] = timeStr.split(':');
        console.log(`${hours}:${minutes}`);
        return `${hours}:${minutes}`;
    } catch (error) {
        console.error("Error formatting time:", error);
        return 'Hora Inválida';
    }
};


onMounted(fetchProjections);
</script>

<style scoped>
.projection-card {
  background-color: #1d1d1f;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 20px auto;
  color: #ffffff;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.projection-details {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #292929;
}

.projection-datetime {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>