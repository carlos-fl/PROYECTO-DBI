import { Router, Request, Response } from "express";
import sql from "mssql";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { empleadoSchema, personaSchema, adminSchema, contratoSchema } from "../schemas/schemas";
import { verifyToken } from "../middlewares/authMiddleware";

export const gerenteRouter: Router = Router();

gerenteRouter.post("/login", async (req: Request, res: Response) => {
  const user: string = req.body.user;
  if (!user) return res.status(400).json({ message: "Missing parameters" });
  try {
    const dbRes = await sql.query(
      `SELECT * FROM Administradores WHERE Usuario LIKE '${user}'`
    );
    const userResult = dbRes.recordset[0];
    if (!userResult)
      return res.status(401).json({ message: "User not found", data: {} });

    const password: string = req.body.password;
    const isMatchPass = bcrypt.compareSync(password, userResult.contrasena)
    if (!isMatchPass)
      return res.status(401).json({ message: "Invalid credentials", data: {} });

    const dbWorkerRes = await sql.query(
      `SELECT * FROM EMPLEADOS WHERE ID = ${userResult.ID_Empleado}`
    );
    const worker = dbWorkerRes.recordset[0];

    const payload = {
      idGerente: userResult.ID,
      empleado: worker,
    };
    const SECRET_KEY: string = process.env.SECRET_KEY || "";
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .cookie("access_token", token, {
        sameSite: "lax",
        //httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60,
      })
      .json({
        message: "login successfully",
        data: worker,
        habilitado: userResult.habilitado,
        token: token
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error while login" });
  }
});

gerenteRouter.get('/logout', (req: Request, res: Response) => {
  return res.clearCookie('access_token').status(200).json({ message: 'log out successfully' })
})

gerenteRouter.get("/gerente", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "GERENTE VIEW",
  });
});


gerenteRouter.post('/nuevo', async (req: Request, res: Response) => {
  const persona = req.body.persona
  const empleado = req.body.empleado
  const admin = req.body.admin
  const contract = req.body.contrato
  const isAdmin: number = req.body.isAdmin

  if (!personaSchema.safeParse(persona) || !empleadoSchema.safeParse(empleado) || !adminSchema.safeParse(admin) || !contratoSchema.safeParse(contract))
    return res.status(401).json({ message: 'Invalid credentials' })

  try {
    if (isAdmin == 1) {
      const SALTS: number = Number(process.env.SALTS) || 10
      // creation of persona record
      const encryptedPassword: string = bcrypt.hashSync(admin.Contrasena, SALTS)
      await sql.query(`insert into Personas values ('${persona.DNI}', '${persona.Nombre1}', '${persona.Nombre2}', '${persona.Apellido1}', '${persona.Apellido2}', '${persona.Correo}')`)
      // creation of contract record
      let contractRes;
      if (contract.fechaFin) {
        await sql.query(`insert into Contratos values ('${contract.TipoContrato}', '${contract.fechaInicio}', '${contract.fechaFin}')`)
        contractRes = (await sql.query(`select * from Contratos where Tipo_Contrato like '${contract.TipoContrato}' and Fecha_Inicio like '${contract.fechaInicio}' and Fecha_Finalizacion like '${contract.fechaFin}'`)).recordset[0]
      } else{
        await sql.query(`insert into Contratos values ('${contract.TipoContrato}', '${contract.fechaInicio}', NULL})`)
        contractRes = (await sql.query(`select * from Contratos where Tipo_Contrato like '${contract.TipoContrato}' and Fecha_Inicio like '${contract.fechaInicio}' and Fecha_Finalizacion is ${contract.fechaFin}`)).recordset[0]
      }
      // creation of empleado record
      const personaCreated = (await sql.query(`select ID from Personas where DNI like '${persona.DNI}'`)).recordset[0]
      await sql.query(`insert into Empleados values (${personaCreated.ID}, ${empleado.ID_Cargo}, ${empleado.ID_Sucursal}, ${contractRes.ID}, ${empleado.Salario}, ${empleado.ID_Jornada}, ${empleado.Numero_Empleado}, 1)`)
      // creation of admin record
      const empleadoCreated = (await sql.query(`select ID from Empleados where ID_Persona = ${personaCreated.ID}`)).recordset[0]
      await sql.query(`insert into Administradores values ('${admin.Usuario}', '${encryptedPassword}', 1, ${empleadoCreated.ID})`)
      const adminCreated = await sql.query(`select * from Administradores where ID_Empleado = ${empleadoCreated.ID}`)
  
      return res.status(200).json({
        message: 'created successfully',
        data: [personaCreated, empleadoCreated, adminCreated]
      })
    } else {
      // record in table Personas
      await sql.query(`insert into Personas values ('${persona.DNI}', '${persona.Nombre1}', '${persona.Nombre2}', '${persona.Apellido1}', '${persona.Apellido2}', '${persona.Correo}')`)
      const personaCreated = (await sql.query(`select ID from Personas where DNI like '${persona.DNI}'`)).recordset[0]
      // record in table Contratos
      let contractRes
      if (contract.fechaFin) {
        await sql.query(`insert into Contratos values ('${contract.TipoContrato}', '${contract.fechaInicio}', '${contract.fechaFin}')`)
        contractRes = (await sql.query(`select * from Contratos where Tipo_Contrato like '${contract.TipoContrato}' and Fecha_Inicio like '${contract.fechaInicio}' and Fecha_Finalizacion like '${contract.fechaFin}'`)).recordset[0]
      } else {
        await sql.query(`insert into Contratos values ('${contract.TipoContrato}', '${contract.fechaInicio}', NULL)`)
        contractRes = (await sql.query(`select * from Contratos where Tipo_Contrato like '${contract.TipoContrato}' and Fecha_Inicio like '${contract.fechaInicio}' and Fecha_Finalizacion like '${contract.fechaFin}'`)).recordset[0]
      }
      // record in table Empleados
      await sql.query(`insert into Empleados values (${personaCreated.ID}, ${empleado.ID_Cargo}, ${empleado.ID_Sucursal}, ${contractRes.ID}, ${empleado.Salario}, ${empleado.ID_Jornada}, ${empleado.Numero_Empleado}, 1)`)
      const empleadoCreated = (await sql.query(`select ID from Empleados where ID_Persona = ${personaCreated.ID}`)).recordset[0]     
      
      return res.status(200).json({
        message: 'successful',
        data: [personaCreated, empleadoCreated, contractRes]
      })
    }
  } catch(err) {
    return res.status(500).json({ message: 'Error while saving data', err: err })
  }
})


gerenteRouter.get('/cargos', async (req: Request, res: Response) => {
  try {
    const result = await sql.query("select * from Cargos")
    return res.status(200).json({
      message: 'success',
      data: result.recordset
    })
  } catch(err) {
    return res.status(500).json({ message: 'Could not handle data' })
  }
})

gerenteRouter.get('/jornadas', async (req: Request, res: Response) => {
  try {
    const result = await sql.query("select * from Jornadas")
    return res.status(200).json({
      message: 'success',
      data: result.recordset
    })
  } catch(err) {
    return res.status(500).json({ message: 'Could not handle data' })
  }
})