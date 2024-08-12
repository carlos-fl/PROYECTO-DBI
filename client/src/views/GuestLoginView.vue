<script setup>
    import  Button  from '../components/Button.vue';
    import  Input  from '../components/Input.vue';
    import  Form  from '../components/Form.vue';
    import  FormHeader  from '../components/FormHeader.vue';

    // const patterns = {
    //     id: "(\d{4}-?){2}\d{5}",
    //     name: "[a-zA-Z]{3,10}",
    //     surname: "[a-zA-Z]{3,10}", 
    //     email: "[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}",
    //     phoneNumber: "(3[1-3]|8[7-9]|9[3-9])\d{6}"
    // }

    // export default{
    //     methods: {
    //         validityCheck(continueButton,patterns){
    //             let inputs = this;
    //             let flag = true;
    //             for (let input of inputs){
    //                 let currentPattern = new RegExp( patterns[input.id] );
    //                 if (!currentPattern.test(input.value)){
    //                     flag = false;
    //                     break;
    //                 }
    //             }
    //             continueButton.disabled = !flag;
    //         }
    //     }
    // } 

    // function validityCheck(continueButton,patterns){
    //     let inputs = this;
    //     let flag = true;
    //     for (let input of inputs){
    //         let currentPattern = new RegExp( patterns[input.id] );
    //         if (!currentPattern.test(input.value)){
    //             flag = false;
    //             break;
    //         }
    //     }
    //     continueButton.disabled = !flag;
    // }

    // const inputFields = document.querySelectorAll("input");
    // const continueButton = document.querySelector("button");
    // for (let input of inputFields){
    //     input.addEventListener("keyup",validityCheck.bind(inputFields,continueButton,patterns));
    // }
    const userID = ref("");
    const userName = ref("");
    const userSurname = ref("");
    const userPhoneNumber = ref("");
    const userEmail = ref("");

    function register(){
        const inputData = { id: userID.value, 
                            name: userName.value, 
                            surname: userSurname.value, 
                            phoneNumber: userPhoneNumber.value, 
                            email: user.email.value 
                        }
        fetch(BACKEND_URL + '/invitado/registro',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
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

    function currentUserId(currentValue) {
        userID.value = currentValue;
    }

    function currentUserName(currentValue) {
        userName.value = currentValue;
    }
    function currentUserSurname(currentValue) {
        userSurname.value = currentValue;
    }
    function currentUserPhoneNumber(currentValue) {
        userPhoneNumber.value = currentValue;
    }
    function currentUserEmail(currentValue) {
        userEmail.value = currentValue;
    }

</script>


<template>
    <!-- hacerlo asincrono -->
    <Form>
        <FormHeader text="Inicio Sesión Invitado"></FormHeader>
        <Input @currentValue="currentUserId" id="id" inputType="text" minLength=13 maxLength=13  placeholder="DNI" ></Input>
        <Input @currentValue="currentUserName" id="name" inputType="text" minLength=3 maxLength=10  placeholder="Nombre"></Input>
        <Input @currentValue="currentUserSurname" id="surname" inputType="text" minLength=3 maxLength=10  placeholder="Apellido"></Input>
        <Input @currentValue="currentUserEmail" id="email" inputType="text" minLength=8 maxLength=8  placeholder="Telefono"></Input>
        <Input @currentValue="currentUserPhoneNumber" id="phoneNumber" inputType="email" minLength=10 maxLength=30  placeholder="Correo"></Input>
        <Button text="Continuar" @handleClick=""></Button>
        <div><a href="http://">Iniciar Sesion con mi cuenta</a></div>
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

    /* Button:enabled:hover {
        background-color: #646cff;
    }  */
</style>