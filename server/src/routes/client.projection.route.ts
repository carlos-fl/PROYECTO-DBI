import { Router } from 'express';
import sql from 'mssql';
import { sqlConfig } from '../config/db.config';

const clientProjectionRouter = Router();

clientProjectionRouter.get('/proyecciones/:sucursal/:name/:id', async (req, res) => {
    const { sucursal, name, id } = req.params;

    try {
        let pool = await sql.connect(sqlConfig);
        // Use the sucursal name to get the corresponding ID
        let sucursalResult = await pool.request()
            .input('SucursalName', sql.VarChar, decodeURIComponent(sucursal.toLowerCase()))
            .query(`SELECT ID FROM Sucursales WHERE LOWER(Nombre) = LOWER(@SucursalName)`);

        if (sucursalResult.recordset.length > 0) {
            const sucursalId = sucursalResult.recordset[0].ID;

            let result = await pool.request()
                .input('ID_Sucursal', sql.Int, sucursalId)
                .input('ID_Pelicula', sql.Int, id)
                .input('Titulo', sql.VarChar, decodeURIComponent(name.toLowerCase()))
                .query(`
                    SELECT 
                        p.ID,
                        CONVERT(VARCHAR, p.Fecha, 23) AS Fecha,
                        CONVERT(VARCHAR(5), p.Horario, 108) AS Horario,
                        p.ID_Tipo_Proyeccion,
                        p.ID_Pelicula,
                        p.ID_Sala,
                        p.ID_Sucursal,
                        p.Subtitulada,
                        p.Doblada,
                        pel.Titulo,
                        pel.Sinopsis,
                        pel.Poster,
                        STRING_AGG(CASE WHEN r.Director = 1 THEN r.Nombre + ' ' + r.Apellido ELSE '' END, ', ') AS Director,
                        STRING_AGG(CASE WHEN r.Actor = 1 THEN r.Nombre + ' ' + r.Apellido END, ', ') AS Cast
                    FROM Proyecciones p
                    INNER JOIN Peliculas pel ON p.ID_Pelicula = pel.ID
                    LEFT JOIN Pelicula_Cast pc ON pel.ID = pc.ID_Pelicula
                    LEFT JOIN Reparto r ON pc.ID_Reparto = r.ID
                    WHERE p.ID_Sucursal = @ID_Sucursal 
                    AND p.ID_Pelicula = @ID_Pelicula
                    AND LOWER(pel.Titulo) = @Titulo
                    GROUP BY 
                        p.ID, p.Fecha, p.Horario, p.ID_Tipo_Proyeccion, p.ID_Pelicula, 
                        p.ID_Sala, p.ID_Sucursal, p.Subtitulada, p.Doblada, 
                        pel.Titulo, pel.Sinopsis, pel.Poster
                `);

                if (result.recordset.length > 0) {
                    res.json(result.recordset);
                } else {
                    res.status(404).send('No existen proyecciones de esta pelicula en esta sucursal.');
                }
            } else {
                res.status(404).send('Sucursal no encontrada.');
            }
        } catch (err) {
            console.error('Error fetching projections:', err);
            res.status(500).send('Error fetching projections');
        }
    });

export { clientProjectionRouter };
