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
      const result = await sql.query(`
                      select distinct Tipos_Asientos.Nombre, Tipos_Asientos.Valor_Agregado, Precios.Precio, Rango_Edades.Tipo  from Proyecciones
                      join Salas on Proyecciones.ID_Sala = Salas.ID
                      join Asientos on Salas.ID = Asientos.ID_Sala
                      join Tipos_Asientos on Asientos.ID_Tipo_Asiento = Tipos_Asientos.ID
                      join Precios on Proyecciones.ID_Tipo_Proyeccion = Precios.ID_Tipo_Proyeccion
                      join Rango_Edades on Precios.ID_Rango_Edades = Rango_Edades.ID
                      where Proyecciones.ID = ${id}
                    `);

      res.status(200).json({
        message: "successfull",
        data: result.recordset,
      });
    } catch (err) {
      res.status(500).json({
        message: "error while getting tickets",
      });
    }
  }
);

ticketsRouter.get("/proyecciones/:id", async (req: Request, res: Response) => {
  const proyeccionID = parseInt(req.params.id);
  try {
    const result = await sql.query(`select Salas.Numero_Sala from Proyecciones
                                    join Salas on Proyecciones.ID_Sala = Salas.ID
                                    where Proyecciones.ID = ${proyeccionID}
                                  `);
    return res.status(200).json({
      message: "success",
      data: result.recordset[0],
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error while handling proyecciones" });
  }
});


ticketsRouter.get('/proyecciones/:id/info', async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const result = await sql.query(`select Peliculas.Poster, Peliculas.Titulo, Proyecciones.Fecha, Proyecciones.Horario, Clasificacion.TIPO, Proyecciones.Doblada from Proyecciones
                                    join Peliculas on Proyecciones.ID_Pelicula = Peliculas.ID
                                    join Clasificacion on Peliculas.ID_Clasificacion = Clasificacion.ID
                                    where Proyecciones.ID = ${id}
                                  `)
    return res.status(200).json({
      message: 'sucessful',
      data: result.recordset[0]
    })
  } catch(err) {
    return res.status(500).json({ message: "error while handling proyeccion info" })
  }
})

ticketsRouter.get('/asientos/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const result = await sql.query(`select Asientos_Proyecciones_Salas.Ocupado, Asientos.Habilitado, Asientos.Numero_Asiento, Asientos.ID, Tipos_Asientos.Nombre from Proyecciones
                                    join Asientos_Proyecciones_Salas on Proyecciones.ID = Asientos_Proyecciones_Salas.ID_Proyeccion
                                    join Asientos on Asientos_Proyecciones_Salas.ID_Asiento = Asientos.ID
                                    join Tipos_Asientos on Asientos.ID_Tipo_Asiento = Tipos_Asientos.ID
                                    where Proyecciones.ID = ${id}
                                  `)
    return res.status(200).json({
      message: 'success',
      data: result.recordset
    })
  } catch(err) {
    return res.status(500)
  }
})

ticketsRouter.get('/combos',async (req: Request, res: Response) => {
  try {
    const result = await sql.query(`SELECT * FROM Combos WHERE Habilitado = ${1}`)
    return res.status(200).json({ message: 'success', data: result.recordset })
  } catch (error) {
    return res.status(500)
  }
})

ticketsRouter.post('/generar/factura',async (req: Request, res: Response) => {
  try {
    const { dni } = req.params
    const subTotalPurchase: number = Number(req.params.totalPurchase)
    console.log(subTotalPurchase)
    const lastReceipt = await sql.query(`SELECT TOP 1 * FROM Facturas ORDER BY Fecha_hora_emision DESC;`)
    if (lastReceipt.recordset.length == 0){
        lastReceipt.recordset[0].Numero_Correlativo = 0
    }
    const numCurrentReceipt: number = lastReceipt.recordset[0].Numero_Correlativo + 1
    const ISV15: number = subTotalPurchase * 0.15
    const ISV18: number = 0.00
    const totalNewReceipt: number = subTotalPurchase + ISV15

    //consulta a las tablas Personas,Clientes y Membresias
    const resultCustomer = await sql.query(`SELECT * FROM Personas 
      JOIN Clientes ON Personas.ID = Clientes.ID_Persona 
      JOIN Membresias ON Clientes.ID_Membresia = Membresias.ID 
      WHERE DNI = ${dni};`)
    const currentCustomer = resultCustomer.recordset[0]

    //ingresa nuevo registro a Detalle_Factura
    const newDetailReceiptResult = await sql.query(`INSERT INTO Detalle_Factura 
      (Numero_Factura,Subtotal, ISV15,ISV18,Total_Factura,ID_Membresia,Total_Impuesto) 
      VALUES (${numCurrentReceipt},${subTotalPurchase}, ${ISV15}, ${ISV18}, 
      ${totalNewReceipt}, ${currentCustomer.ID_Membresia},${ISV15+ISV18});`)

    const newDetailReceipt = newDetailReceiptResult.recordset[0]

    //consulta a la tabla SAR para determinar el rango inicial y final 
    //de los numeros de factura que se pueden emitir
    const requestSAR = await sql.query(`SELECT * FROM SAR;`)
    const SARInfo = requestSAR.recordset[0]

    //consulta a la tabla Empleados para conocer el ID del empleado
    const requestEmpleados = await sql.query(`SELECT * FROM Empleados WHERE Habilitado = ${1}`)
    //toma un empleado al azar, solo es de prueba
    const EmpleadosInfo = requestEmpleados.recordset[ Math.floor(Math.random() * requestEmpleados.recordset.length) ]

    //consulta a la tabla cajas
    const requestCajas = await sql.query(`SELECT * FROM Empleados WHERE Habilitado = ${1}`)
    //toma un empleado al azar, solo es de prueba
    const CajasInfo = requestEmpleados.recordset[ Math.floor(Math.random() * requestEmpleados.recordset.length) ]
    //si el numero de factura actual se encuentra dentro del rango de emision aceptado
    if (numCurrentReceipt >= SARInfo.Rango_Inicial && numCurrentReceipt <= SARInfo.Rango_Final){
      const currentDate = new Date()
      const formattedDate: String = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
      const formattedTime: String = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
      
      //ingresa un nuevo registro a Factura
      const newReceipt = await sql.query(`INSERT INTO Facturas 
      (Numero_Correlativo,ID_SAR,ID_Empleado,ID_Caja,ID_Cliente,ID_Detalle_Factura,Fecha_hora_emision) 
      VALUES (${numCurrentReceipt}, ${SARInfo.ID},${EmpleadosInfo.ID},${CajasInfo},${currentCustomer.ID},${newDetailReceipt.ID},${formattedDate + ' ' + formattedTime})`)
      
      //descontar de inventario los productos que fueron comprados
      res.status(200).json({ message: 'compra realizada con exito' })
    }
    //
    return res.status(501).json({ message: 'Numero de factura fuera del rango de emision disponible' })
  } catch (error) {
    
  }
})