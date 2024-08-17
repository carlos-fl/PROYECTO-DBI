<script setup>
import Select from './Select.vue'
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
    id: Number,
    imagePath: String,
    name: String,
    price: Number,
    membershipDiscount: Number
})

const emits = defineEmits(['totalPerCard'])

function emitTotalPerCard (amount, id, price) {
    const totalPerProduct = parseInt(price) * parseInt(amount)
    emits('totalPerCard', id , totalPerProduct);
}

const MAXCOMBOSTOBUY = 10;


</script>

<template>
    <div class="card">
        <img :src="imagePath" alt="">
        <div class="description-container">
            <h4 class="titulo">{{ name }}</h4>
            <p class="precio"><strong>L {{ price }}</strong></p>
        </div>
        <Select class="select-component" @handleEvent="(e) => emitTotalPerCard(e.target.value, props.id, props.price)">
            <option v-for="i in MAXCOMBOSTOBUY + 1" :key="i" :value="i - 1">{{ i - 1 }}</option>
        </Select>
    </div>

</template>
<style scoped>
    .card{
        display: flex;
        position: relative;
        border-left: 8px solid #E1F387;
        gap: 2rem;
        padding: 0.8rem 1rem 0.8rem 1rem;
        border-radius: 1rem 1rem 1rem 1rem;
        transition: border-color 0.3s ease-in-out 0.1s; 
        padding: 0.8rem;
        width: 50%;
    }

    .card:hover {
        border-color: #646cff;
        cursor: pointer;
    }

    img{
        width: 150px;
        height: 150px;
    }

    .select-component {
        position: absolute;
        top: 1rem;
        right: 0.8rem;
        width: 4.5rem;
        height: 2rem;
    }

    h4 {
        margin: 0px;
    }
    .description-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>