<template>
  <div class="movie-view">
    <div class="movie-header">
      <img :src="posterPath" alt="Movie Poster" class="movie-poster" />
      <div class="movie-details">
        <h1>{{ projections[0]?.Titulo }}</h1>
        <p><strong>Director:</strong> {{ director }}</p>
        <p><strong>Reparto:</strong> {{ cast.join(', ') }}</p>
        <p><strong>Sinopsis:</strong> {{ synopsis }}</p>
      </div>
    </div>

     <div class="projection-list">
      <h2>Proyecciones en la sucursal {{ route.params.sucursal }}</h2>
      <div v-for="dateGroup in groupedProjections" :key="dateGroup.date" class="projection-group">
        <h3>{{ formatDate(dateGroup.date) }}</h3>
        <div v-for="projection in dateGroup.projections" :key="projection.id" class="projection-detail">
          <span class="projection-format">{{ projectionFormat(projection) }}</span>
          <span class="projection-time">{{ formatTime(projection.Horario) }}</span>
          <span class="projection-room">Sala: {{ projection.ID_Sala }}</span>
          <span class="projection-dub">{{ projection.Doblada ? 'Doblada' : '' }}</span>
          <span class="projection-sub">{{ projection.Subtitulada ? 'Subtitulada' : '' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const projections = ref([]);
const rawPosterPath = ref(''); 
const director = ref('');
const cast = ref([]);
const synopsis = ref('');
const groupedProjections = ref([]);

const posterPath = computed(() => {
  if (!rawPosterPath.value) return '';
  const img = rawPosterPath.value.split(/[/\\]/);  
  return `/public/${img[img.length - 1]}`; 
});

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
      groupProjectionsByDate();

      // Fetch and set movie details
      const movieDetails = data[0]; // assuming all projections belong to the same movie
      rawPosterPath.value = movieDetails.Poster || '';
      director.value = movieDetails.Director || '';
      cast.value = movieDetails.Cast ? movieDetails.Cast.split(',') : [];
      synopsis.value = movieDetails.Sinopsis || '';
    }
  } catch (error) {
    console.error("Failed to fetch projections:", error);
  }
};

const groupProjectionsByDate = () => {
  const groups = {};
  projections.value.forEach(projection => {
    const date = projection.Fecha;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(projection);
  });

  groupedProjections.value = Object.keys(groups).map(date => ({
    date,
    projections: groups[date],
  }));
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
};

const formatTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(':');
  return `${hours}:${minutes}`;
};

const projectionFormat = (projection) => {
  const formats = [];
  formats.push(projection.ID_Tipo_Proyeccion === 1 ? '2D' : '3D');
  return formats.join(' ');
};

onMounted(fetchProjections);
</script>

<style scoped>
.movie-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.movie-header {
  display: flex;
  margin-bottom: 20px;
}

.movie-poster {
  width: 300px;
  margin-right: 20px;
}

.movie-details {
  max-width: 600px;
}

.projection-list {
  margin-top: 20px;
}

.projection-group {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #292929;
}

.projection-detail {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.projection-format, .projection-time, .projection-room {
  font-size: 16px;
  margin-right: 10px;
}

.projection-dub, .projection-sub {
  color: #ffcc00;
  font-weight: bold;
}
</style>