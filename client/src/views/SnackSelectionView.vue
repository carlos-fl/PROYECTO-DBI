<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SnackCard from '../components/SnackCard.vue'
import { BACKEND_URL } from '../config/data';
import Button from '../components/Button.vue'

const combos = ref([ ])
const total = ref(0)
const route = useRoute();
const router = useRouter();

async function fetchCombos (){
    try {
        const res = await fetch(BACKEND_URL + '/boletos/combos')
        const combosInfo = await res.json()
        console.log(combosInfo.data)
        combos.value = combosInfo.data
    } catch (error) {
        console.log(error)
    }
}

function  updateTotal() {
    let selectValues = [];
    let sum = 0;
    Array.from(document.querySelectorAll("select")).map((item) => {
        selectValues.push(parseInt(item.value));
    })

    combos.value.forEach((item, index) => {
        sum += item.Precio*selectValues[index]
    })

    total.value = sum 
};

function retrieveInfo (){
    let productsInfo = []
    // localStorage.setItem("total",total.value)
    Array.from(document.querySelectorAll("select")).forEach((item, index) => {
        let product = { id: combos.value[index].ID , quantity: parseInt(item.value), price: combos.value[index].Precio }
        productsInfo.push(product);
    })
    return productsInfo;
}

function redirect (){
    let productsInfo = retrieveInfo()
    // const NEXT_URL = `/facturacion`;
    // router.push({ path: NEXT_URL })
    router.push({ name: 'Facturacion', params: { data: productsInfo, dni: localStorage.getItem("id"), totalPurchase: total.value } })
}


onMounted(async () => {
    await fetchCombos()
})


</script>

<template>
    <div id="mainContainer">
        <h3 v-if="combos.length == 0"> No existen combos </h3>
        <SnackCard class="Snack-card" v-for="combo in combos" :id="combo.ID" :imagePath="combo.Imagen" :name="combo.Nombre" :price="combo.Precio.toFixed(2)" @totalPerCard="updateTotal"></SnackCard>
    </div>
    <footer>
        <div id="total-button">
            <h4>Total: L {{ total.toFixed(2) }}</h4>
            <Button :text="'Continuar'" @click="redirect"></Button>
        </div>
    </footer>
</template>

<style scoped>
    #mainContainer{
        display: grid;
        height: 108vh;
        width: 100%;
        grid-template-columns: 1fr;
        grid-auto-flow: row;
        gap: 0.8rem;
        justify-items: center;
        margin-bottom: 7rem;
    }
    footer,#total-button {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    footer{
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100vw;
        height: 5vh;
        background-color: #E1F387;
        padding: 20px;
        font-size: 18px;
    }

    #total-button {
        gap: 6rem;
    }
    h4{
        color: #1D1D1F;
    }
    Button{
        transition: box-shadow 0.3s ease;
    }
    .Snack-card {
        transition: box-shadow 0.3s ease;
        transition: transform 0.3s ease;
    }

    Button:hover,
    .Snack-card:hover {
        box-shadow: 0 4px 8px rgba(100, 108, 255, 0.5);
    }

    .Snack-card:hover {
        transform: scale(1.02);
    }

</style>