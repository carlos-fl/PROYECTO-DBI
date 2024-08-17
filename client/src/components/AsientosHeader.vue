<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { BACKEND_URL } from '../config/data';

const sala = ref(0)
const router = useRoute()

const idProyeccion = router.params.idProyeccion

async function fetchProyeccion() {
  try {
    const res = await fetch(BACKEND_URL + `/boletos/proyecciones/${idProyeccion}`)
    const data = await res.json()
    return data.data
  } catch(err) {
    console.log(err)
  }
}

const info = await fetchProyeccion()
sala.value = info.Numero_Sala

onMounted(async () => {
  await fetchProyeccion()
})

</script>


<template>
  <div>
    <h2>SALA {{ sala }}</h2>
    <div>
      <svg _ngcontent-pvs-c146="" id="screen" preserveAspectRatio="xMidYMin slice" viewBox="0 0 350 120"><path _ngcontent-pvs-c146="" d="m 20 5 a 310 30 0 0 1 310 0 l -17 10 a 276 25 0 0 0 -276 0" fill="#ebeced"></path></svg> 
    </div>
  </div>
</template>


<style scoped>
#screen {
  width: 100%;
}
</style>