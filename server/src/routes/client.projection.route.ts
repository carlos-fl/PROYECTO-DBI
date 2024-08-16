import { Router } from 'express';
import sql from 'mssql';
import { sqlConfig } from '../config/db.config';

const clientProjectionRouter = Router();

clientProjectionRouter.get('/proyecciones/:sucursal/:name/:id', async (req, res) => {
    const { sucursal, name, id } = req.params;

    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
            .input('ID_Sucursal', sql.Int, sucursal)
            .input('ID_Pelicula', sql.Int, id)
            .input('Titulo', sql.VarChar, decodeURIComponent(name.toLowerCase()))
            .query(`
                SELECT 
                    p.ID,
                    CONVERT(VARCHAR, p.Fecha, 23) AS Fecha,  -- Format Fecha as YYYY-MM-DD
                    CONVERT(VARCHAR(5), p.Horario, 108) AS Horario, -- Format Horario as HH:MM
                    p.ID_Tipo_Proyeccion,
                    p.ID_Pelicula,
                    p.ID_Sala,
                    p.ID_Sucursal,
                    p.Subtitulada,
                    p.Doblada,
                    pel.Titulo
                FROM Proyecciones p
                INNER JOIN Peliculas pel ON p.ID_Pelicula = pel.ID
                WHERE p.ID_Sucursal = @ID_Sucursal 
                AND p.ID_Pelicula = @ID_Pelicula
                AND LOWER(pel.Titulo) = @Titulo
            `);

             // Log the results to verify the changes
        console.log('Formatted SQL Query Result:', result.recordset);

        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).send('No existen proyecciones de esta pelicula en esta sucursal.');
        }
    } catch (err) {
        console.error('Error fetching projections:', err);
        res.status(500).send('Error fetching projections');
    }
});

export { clientProjectionRouter };
