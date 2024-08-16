<script setup>
import { ref, onMounted } from "vue";
import Form from "../components/Form.vue";
import FormHeader from "../components/FormHeader.vue";
import Input from "../components/Input.vue";
import Select from "../components/Select.vue";
import Option from "../components/Option.vue";
import Button from "../components/Button.vue";
import { BACKEND_URL } from "../config/data";

const cargos = ref([]);
const jornadas = ref([]);
const sucursales = ref([]);

cargos.value = await fetchCargos("cargos");
jornadas.value = await fetchCargos("jornadas");
sucursales.value = await fetchSucursales();

const dni = ref("");
const name1 = ref("");
const name2 = ref("");
const lastName1 = ref("");
const lastName2 = ref("");
const email = ref("");
const position = ref("");
const contract = ref("");
const schedule = ref("");
const initialDate = ref("");
const finalDate = ref("");
const sucursal = ref("");
const salario = ref("");
const numeroEmpleado = ref("");
const user = ref("");
const password = ref("");

const objs = {
  dni,
  name1,
  name2,
  lastName1,
  lastName2,
  email,
  initialDate,
  finalDate,
  position,
  contract,
  schedule,
  sucursal,
  salario,
  numeroEmpleado,
  user,
  password,
};

async function fetchCargos(method) {
  const res = await fetch(BACKEND_URL + `/gerente/${method}`);
  const data = await res.json();
  return data.data;
}

async function fetchSucursales() {
  try {
    const res = await fetch(BACKEND_URL + "/peliculas/sucursales");
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log(err);
  }
}

async function sendData() {
  const lastDate = finalDate.value == "" ? null : finalDate.value;
  const data = {
    isAdmin: position.value,
    persona: {
      DNI: dni.value,
      Nombre1: name1.value,
      Nombre2: name2.value,
      Apellido1: lastName1.value,
      Apellido2: lastName2.value,
      Correo: email.value,
    },
    contrato: {
      tipoContrato: contract.value,
      fechaInicio: initialDate.value,
      fechaFin: lastDate,
    },
    empleado: {
      ID_Cargo: position.value,
      ID_Sucursal: sucursal.value,
      Salario: salario.value,
      ID_Jornada: schedule.value,
      Numero_Empleado: numeroEmpleado.value,
      Habilitado: 1,
    },
    admin: {
      Usuario: user.value,
      Contrasena: password.value,
      Habilitado: 1,
    },
  };
  const res = await fetch(BACKEND_URL + "/gerente/nuevo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataFetched = await res.json();
  alert(JSON.stringify(dataFetched.message));
}

onMounted(async (name) => {
  await fetchCargos(name);
  await fetchSucursales();
});

function getData(value, el) {
  objs[el].value = value;
  console.log(value);
}

function getSelectData(e, el) {
  objs[el].value = e.target.value;
  console.log(e.target.value);
}
</script>

<template>
  <div>
    <Form>
      <FormHeader text="Agregar empleado"></FormHeader>
      <Input
        @current-value="(e) => getData(e, 'dni')"
        input-type="text"
        :max-length="13"
        :min-length="13"
        placeholder="DNI"
      ></Input>
      <Input
        @current-value="(e) => getData(e, 'name1')"
        input-type="text"
        :max-length="23"
        :min-length="3"
        placeholder="Primer Nombre"
      ></Input>
      <Input
        @current-value="(e) => getData(e, 'name2')"
        input-type="text"
        :max-length="23"
        :min-length="3"
        placeholder="Segundo Nombre"
      ></Input>
      <Input
        @current-value="(e) => getData(e, 'lastName1')"
        input-type="text"
        :max-length="23"
        :min-length="3"
        placeholder="Primer Apellido"
      ></Input>
      <Input
        @current-value="(e) => getData(e, 'lastName2')"
        input-type="text"
        :max-length="23"
        :min-length="3"
        placeholder="Segundo Apellido"
      ></Input>
      <Input
        @current-value="(e) => getData(e, 'email')"
        input-type="email"
        :max-length="30"
        :min-length="12"
        placeholder="Correo"
      ></Input>
      <!-- DONE: fetch data from backend to bring all data in table cargos -->
      <Select @handle-event="(e) => getSelectData(e, 'position')">
        <Option text="Escoja cargo del empleado"></Option>
        <Option
          v-for="(cargo, index) in cargos"
          :key="index"
          :option-value="cargo.ID"
          :text="cargo.Cargo"
        ></Option>
      </Select>
      <!-- DONE: fetch data from backend to bring data in table jornadas -->
      <Select @handle-event="(e) => getSelectData(e, 'schedule')">
        <Option text="Escoja jornada del empleado"></Option>
        <Option
          v-for="jornada in jornadas"
          :option-value="jornada.ID"
          :text="jornada.Jornada"
          :key="jornada.ID"
        ></Option>
      </Select>
      <!-- sucursales -->
      <Select @handle-event="(e) => getSelectData(e, 'sucursal')">
        <Option text="Escoja sucursal del empleado"></Option>
        <Option
          v-for="sucursal in sucursales"
          :option-value="sucursal.ID"
          :text="sucursal.Nombre"
          :key="sucursal.ID"
        ></Option>
      </Select>
      <!-- contracts are already defined -->
      <Select @handle-event="(e) => getSelectData(e, 'contract')">
        <Option text="Escoja tipo contrato del empleado"></Option>
        <Option option-value="Permanente" text="Permanente"></Option>
        <Option option-value="Definido" text="Definido"></Option>
      </Select>
      <label>Fecha contratación</label>
      <Input
        input-type="date"
        placeholder="Fecha contratación"
        @current-value="(e) => getData(e, 'initialDate')"
      ></Input>
      <label>Fecha finalización contrato</label>
      <Input
        @current-value="(e) => getData(e, 'finalDate')"
        input-type="date"
        placeholder="Fecha finalización contrato"
      ></Input>
      <Input
        @current-value="(e) => getData(e, 'salario')"
        input-type="number"
        placeholder="Salario del empleado"
      ></Input>
      <Input
        @current-value="(e) => getData(e, 'numeroEmpleado')"
        input-type="number"
        placeholder="Numero de empleado"
      ></Input>
      <div v-if="position == 1">
        <Input
          @current-value="(e) => getData(e, 'user')"
          input-type="text"
          placeholder="Usuario para administrador"
        ></Input>
        <Input
          @current-value="(e) => getData(e, 'password')"
          input-type="password"
          placeholder="Contraseña de administrador"
        ></Input>
      </div>
      <Button text="Guardar" @handle-click="sendData"></Button>
    </Form>
  </div>
</template>

<style scoped></style>
