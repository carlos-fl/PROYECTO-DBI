import { Router, Request, Response } from "express";
import sql from 'mssql'

export const ticketsRouter: Router = Router()


ticketsRouter.get('/precios', async (req: Request, res: Response) => {
  try {
    const result = await sql.query('SELECT * FROM PRECIOS_GENERALES')
    const tickets = result.recordset
    res.status(200).json({
      message: 'successfull',
      data: tickets
    })
  } catch(err) {
    res.status(500).json({ message: 'error while getting prices' })
  }
})

ticketsRouter.get('/precios/:idProyeccion', async (req: Request, res: Response) => {
  const id: number = Number(req.params.idProyeccion)
  try {
    const result = await sql.query(`SELECT * FROM PRECIOS_GENERALES WHERE ID_TIPO_PROYECCION = ${id}`)
    const tickets = result.recordset
    
    res.status(200).json({
      message: 'successfull',
      data: tickets
    })
  } catch(err) {
    res.status(500).json({
      message: 'error while getting tickets'
    })
  }
})