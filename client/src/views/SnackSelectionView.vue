<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import SnackCard from '../components/SnackCard.vue'
import { BACKEND_URL } from '../config/data';
import Button from '../components/Button.vue'

const paths = ref([ ])
const names = ref([ ])
const prices = ref([ ])
const combos = ref([ ])
const total = ref(0)


//hacer el fetch

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

function  updateTotal(id,totalPerProduct) {
    // const result = parseInt(value)*parseInt(price) 
    let selectValues = [];
    let sum = 0;

    Array.from(document.querySelectorAll("select")).map((item) => {
        selectValues.push(parseInt(item.value));
    })
    console.log("combos.precio: " + combos.value[0].Precio)

    for (let i=0; i < combos.value.length; i++){
        console.log(combos.value[i].Precio);
        sum += parseInt(combos.value[i].Precio)*selectValues[i]
    }
    total.value = sum 
    console.log("valor:  " + total.value.toFixed(2) + " id: " + id)
};



onMounted(async () => {
    await fetchCombos()
})


</script>

<template>
    <div id="mainContainer">
        <h3 v-if="combos.length == 0"> No existen combos </h3>
        <SnackCard v-for="combo in combos" :id="combo.ID" :imagePath="combo.Imagen" :name="combo.Nombre" :price="combo.Precio.toFixed(2)" @totalPerCard="updateTotal"></SnackCard>
    </div>
    <footer>
        <div id="total-button">
            <h4>Total: L {{ total.toFixed(2) }}</h4>
            <Button :text="'Continuar'" @click=""></Button>
        </div>
    </footer>
</template>

<style scoped>
    #mainContainer{
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-flow: row;
        gap: 0.7rem;
        justify-items: center;
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
        height: 8vh;
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
    Button:hover {
        box-shadow: 0 4px 8px rgba(100, 108, 255, 0.5);
    }
</style>