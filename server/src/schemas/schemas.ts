import z from 'zod'

export const salaSchema = z.object({
  numeroSala: z.number(),
  capacidad: z.number() 
})


export const personaSchema = z.object({
  DNI: z.string(),
  Nombre1: z.string(),
  Nombre2: z.string(),
  Apellido1: z.string(),
  Apellido2: z.string(),
  Correo: z.string()
})

export const empleadoSchema = z.object({
  ID_Persona: z.number(),
  ID_Sucursal: z.number(),
  ID_Cargo: z.number(),
  ID_Jornada: z.number(),
  ID_Contrato: z.number(),
  Salario: z.number(),
  NumeroEmpleado: z.string()
})


export const adminSchema = z.object({
  Usuario: z.string(),
  Contrasena: z.string(),
  Habilitado: z.boolean(),
  ID_Empleado: z.number()
})

export const contratoSchema = z.object({
  TipoContrato: z.string(),
  fechaInicio: z.string(),
  fechaFin: z.string()
})
