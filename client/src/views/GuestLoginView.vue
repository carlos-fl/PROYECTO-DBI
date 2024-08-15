<script setup>
    import  Button  from '../components/Button.vue';
    import  Input  from '../components/Input.vue';
    import  Form  from '../components/Form.vue';
    import  FormHeader  from '../components/FormHeader.vue';
    import { ref } from 'vue';
    import { BACKEND_URL } from '../config/data';

    const patterns = {
        id: "(\\d{4}-?){2}\\d{5}",
        firstName: "[a-zA-Z]{3,10}",
        middleName: "[a-zA-Z]{3,10}",
        firstSurname: "[a-zA-Z]{3,10}",
        secondSurname: "[a-zA-Z]{3,10}",
        phoneNumber: "(3[1-3]|8[7-9]|9[3-9])\\d{6}",
        email: "[\\w\\.-]+@[a-zA-Z\\d\\.-]+\\.[a-zA-Z]{2,}"
    }
    const userID = ref("");
    const userFirstName = ref("");
    const userMiddleName = ref("");
    const userFirstSurname = ref("");
    const userSecondSurname = ref("");
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
                            firstName: userFirstName.value, 
                            middleName: userMiddleName.value, 
                            firstSurname: userFirstSurname.value, 
                            secondSurname: userSecondSurname.value, 
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

    function currentUserFirstName(currentValue) {
        userFirstName.value = currentValue.trim();
    }
    function currentUserMiddleName(currentValue) {
        userMiddleName.value = currentValue.trim();
    }
    function currentUserFirstSurname(currentValue) {
        userFirstSurname.value = currentValue.trim();
    }
    function currentUserSecondSurname(currentValue) {
        userSecondSurname.value = currentValue.trim();
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
        <Input @currentValue="currentUserFirstName" id="firstName" inputType="text" minLength=3 maxLength=10  placeholder="Primer Nombre"></Input>
        <Input @currentValue="currentUserMiddleName" id="middleName" inputType="text" minLength=3 maxLength=10  placeholder="Segundo Nombre"></Input>
        <Input @currentValue="currentUserFirstSurname" id="firstSurname" inputType="text" minLength=3 maxLength=10  placeholder="Primer Apellido"></Input>
        <Input @currentValue="currentUserSecondSurname" id="secondSurname" inputType="text" minLength=3 maxLength=10  placeholder="Segundo Apellido"></Input>
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