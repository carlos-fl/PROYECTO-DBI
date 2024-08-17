import { Router } from 'express';
import sql, { IResult } from 'mssql';
import { sqlConfig } from '../config/db.config';

const proyeccionesRouter = Router();

proyeccionesRouter.get('/proyecciones-data', async (req, res) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result: IResult<any> = await pool.request().query(`
            SELECT * FROM Salas; 
            SELECT * FROM Sucursales; 
            SELECT * FROM Peliculas; 
            SELECT * FROM Tipo_Proyeccion
        `);

        if (Array.isArray(result.recordsets)) {
            res.json({
                salas: result.recordsets[0],
                sucursales: result.recordsets[1],
                peliculas: result.recordsets[2],
                tiposProyecciones: result.recordsets[3],
            });
        } else {
            res.status(500).send("Unexpected result structure.");
        }
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error fetching data:', err.message);
            res.status(500).send(err.message);
        } else {
            console.error('Unknown error:', err);
            res.status(500).send("An unknown error occurred.");
        }
    }
});

proyeccionesRouter.post('/proyecciones', async (req, res) => {
    console.log('Received Data:', req.body);  // Log the request data

    
    const { idSala, idSucursal, idPelicula, idTipoProyeccion, Fecha, Horario, Subtitulada, Doblada } = req.body;

    try {
        let pool = await sql.connect(sqlConfig);
        await pool.request()
        .input('ID_Sala', sql.Int, idSala)  
        .input('ID_Sucursal', sql.Int, idSucursal)  
            .input('ID_Pelicula', sql.Int, idPelicula)  
            .input('ID_Tipo_Proyeccion', sql.Int, idTipoProyeccion)  
            .input('Fecha', sql.Date, Fecha)
            .input('Horario', sql.VarChar, Horario)
            .input('Subtitulada', sql.Bit, Subtitulada)
            .input('Doblada', sql.Bit, Doblada)
            .query(`
                INSERT INTO Proyecciones (ID_Sala, ID_Sucursal, ID_Pelicula, ID_Tipo_Proyeccion, Fecha, Horario, Subtitulada, Doblada)
                VALUES (@ID_Sala, @ID_Sucursal, @ID_Pelicula, @ID_Tipo_Proyeccion, @Fecha, CONVERT(TIME, @Horario, 120), @Subtitulada, @Doblada)
            `);
        res.status(201).send('Proyección guardada con éxito');
    } catch (err) {
        console.error('Error saving projection:', err);
        res.status(500).send('Error saving projection');
    }
});


export { proyeccionesRouter };
