import { Router, Request, Response } from "express";
import sql from "mssql";

export const ticketsRouter: Router = Router();

ticketsRouter.get("/precios", async (req: Request, res: Response) => {
  try {
    const result = await sql.query("SELECT * FROM PRECIOS_GENERALES");
    const tickets = result.recordset;
    res.status(200).json({
      message: "successfull",
      data: tickets,
    });
  } catch (err) {
    res.status(500).json({ message: "error while getting prices" });
  }
});

ticketsRouter.get(
  "/precios/:idProyeccion",
  async (req: Request, res: Response) => {
    const id: number = Number(req.params.idProyeccion);
    try {
      const result = await sql.query(
        `SELECT * FROM Proyecciones WHERE ID = ${id}`
      );
      const salaId = result.recordset[0].ID_Sala;
      const chairResult =
        await sql.query(`SELECT * FROM (((Asientos_Salas JOIN Salas ON Asientos_Salas.ID_Sala = Salas.ID)
JOIN Asientos ON Asientos_Salas.ID_Asiento = Asientos.ID)
JOIN Tipos_Asientos ON Asientos.ID_Tipo_Asiento = Tipos_Asientos.ID) WHERE ID_Sala = ${salaId};
`);
      
      const prices = await sql.query(`SELECT * FROM Precios WHERE ID_Tipo_Proyeccion = ${result.recordset[0].ID_Tipo_Proyeccion}`)
      const tickets = chairResult.recordset;

      res.status(200).json({
        message: "successfull",
        proyeccion: result.recordset[0],
        precios: prices.recordset[0],
        data: tickets,
      });
    } catch (err) {
      res.status(500).json({
        message: "error while getting tickets",
      });
    }
  }
);
