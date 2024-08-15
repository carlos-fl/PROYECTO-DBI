<script setup>
    import  Button  from '../components/Button.vue';
    import  Input  from '../components/Input.vue';
    import  Form  from '../components/Form.vue';
    import  FormHeader  from '../components/FormHeader.vue';
    import { ref } from 'vue';
    import { BACKEND_URL } from '../config/data';

    const patterns = {
        id: "(\\d{4}-?){2}\\d{5}",
        name: "[a-zA-Z]{3,10}",
        surname: "[a-zA-Z]{3,10}", 
        phoneNumber: "(3[1-3]|8[7-9]|9[3-9])\\d{6}",
        email: "[\\w\\.-]+@[a-zA-Z\\d\\.-]+\\.[a-zA-Z]{2,}"
    }
    const userID = ref("");
    const userName = ref("");
    const userSurname = ref("");
    const userPhoneNumber = ref("");
    const userEmail = ref("");

    function validateInputs(inputData){
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
    };

    function register(){
        const inputData = { id: userID.value, 
                            name: userName.value, 
                            surname: userSurname.value, 
                            phoneNumber: userPhoneNumber.value, 
                            email: userEmail.value 
                        }
        if (validateInputs(inputData)){
            fetch(BACKEND_URL + '/peliculas/registro',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputData)
            })
            .then((res) => {
                res.json()
                .then((response) => {
                    if (response.status == 200){
                        console.log("Usuario creado correctamente");
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



    function currentUserId(currentValue) {;
        userID.value = currentValue.trim();
    }

    function currentUserName(currentValue) {
        userName.value = currentValue.trim();
    }
    function currentUserSurname(currentValue) {
        userSurname.value = currentValue.trim();
    }
    function currentUserPhoneNumber(currentValue) {
        userPhoneNumber.value = currentValue.trim();
    }
    function currentUserEmail(currentValue) {
        userEmail.value = currentValue.trim();
    }

</script>


<template>
    <Form>
        <FormHeader text="Inicio Sesión Invitado"></FormHeader>
        <Input @currentValue="currentUserId" id="id" inputType="text" minLength=13 maxLength=13  placeholder="DNI" ></Input>
        <Input @currentValue="currentUserName" id="name" inputType="text" minLength=3 maxLength=10  placeholder="Nombre"></Input>
        <Input @currentValue="currentUserSurname" id="surname" inputType="text" minLength=3 maxLength=10  placeholder="Apellido"></Input>
        <Input @currentValue="currentUserPhoneNumber" id="email" inputType="text" minLength=8 maxLength=8  placeholder="Telefono"></Input>
        <Input @currentValue="currentUserEmail" id="phoneNumber" inputType="email" minLength=10 maxLength=30  placeholder="Correo"></Input>
        <Button text="Continuar" @handleClick="register"></Button>
    </Form>
</template>

<style scoped>
    Input:invalid{
        border-color: #fd6161;
        box-shadow: inset 0px 0px 8px 0px #fd6161;
    }

    Input:focus:valid{
        border-color: #646cff;
    }
</style>