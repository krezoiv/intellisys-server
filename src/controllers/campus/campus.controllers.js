import { getConnection, sql} from "../../database";
import { campus_queries } from "../../database/querys/campusQuerys";



/**
 * getCampus: Una función asíncrona que obtiene información sobre campus y responde con los datos obtenidos o un mensaje de error.
 * 
 * @param {object} req - El objeto de solicitud HTTP.
 * @param {object} res - El objeto de respuesta HTTP.
 */
export const geAllCampus = async (req, res) => {
   
    try {
        // Obtener una conexión a la base de datos.
        const pool = await getConnection();

        // Ejecutar la consulta para obtener información sobre campus.
        const resultCampus = await pool.request().query(campus_queries.getCampus);

        // Responder con los datos obtenidos en formato JSON.
        res.json(resultCampus.recordset);
    } catch (error) {
        // En caso de error, responder con un mensaje de error y el mensaje de error original.
        res.status(500).send("Error al obtener Sedes " + error.message);
        console.log(error)
    }
};
