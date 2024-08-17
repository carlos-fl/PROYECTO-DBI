<script setup>
import Form from '../components/Form.vue'
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
import { useRouter, useRoute } from 'vue-router';
import { BACKEND_URL } from '../config/data';
import { ref } from 'vue';

const cardNumber = ref()
const securityNumber = ref()
const expirationDate = ref()

const route = useRoute();
const router = useRouter();

const patterns = {
    cardNumber: "(\\d{4}){4}",
    securityNumber: "\\d{3,4}",
    expirationDate: "\\d{4}-\\d{2}-\\d{2}"
}

function validateInputData(){
    const inputData = {
        cardNumber: cardNumber.value,
        securityNumber: securityNumber.value,
        expirationDate: expirationDate.value
    }
    let flag = true;
    for (let key in inputData){
        console.log(`comparing ${inputData[key]} with pattern: ${patterns[key]}...`);
        let inputRegexp = new RegExp(patterns[key]);
        if (!inputRegexp.test(inputData[key])){
            console.log(`${inputData[key]} doesnt match the pattern ${patterns[key]}`)
            flag = false;
            break;
        }
    }
    return flag;
}

function currentCardNumber(currentValue){
    cardNumber.value = currentValue
}

function currentExpirationDate(currentValue){
    expirationDate.value = currentValue
    
}

function currentSecurityNumber(currentValue){
    securityNumber.value = currentValue

}

function redirectPreviousView(){
    router.go(-1)
}

function payment(){
    if (validateInputData()){
        fetch(BACKEND_URL + '/boletos/generar/factura',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(route.params.data)
        })
        .then((res) => {
            res.json()
            .then((response) => {
                if (response.status == 200){
                    console.log(response.message);
                    alert("Pago exitoso")
                }
            })
            .catch((err) => {
                console.log("Ha ocurrido un error: ", err);
            });
        })
        .catch((err) => {
            console.log("Error: ",err);
        })
    }
}

</script>

<template>
    <div id="main-container">
        <Form>
            <Input @currentValue="currentCardNumber" :type="'text'" :placeholder="'Número de Tarjeta'" :minlength="16" :maxlength="16"></Input>
            <Input @currentValue="currentExpirationDate" :type="'date'" :placeholder="'Fecha de Expiración'" ></Input>
            <Input @currentValue="currentSecurityNumber" :type="'text'" :placeholder="'Código de Seguridad'" :minlength="3" :maxlength="4"></Input>
            <Button :text="'Volver'" @handleClick="redirectPreviousView"></Button>
            <Button :text="'Pagar'"  @handleClick="payment"></Button>
        </Form>
    </div>
</template>

<style scoped>
    #main-container {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    Input:invalid{
        border-color: #fd6161;
        box-shadow: inset 0px 0px 8px 0px #fd6161;
    }

    Input:focus:valid{
        border-color: #646cff;
    }
    Button:nth-last-child(2){
        margin-right: 1.5rem;
    }
</style>