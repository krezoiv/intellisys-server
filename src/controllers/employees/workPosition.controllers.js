import { getConnection, sql} from "../../database";
import { workPosition_queries } from "../../database/querys/workPositionQuerys";

/**
 * Controlador getListWorkPosition
 * 
 * Este controlador maneja la solicitud para obtener una lista de posiciones de trabajo.
 * Responde con la lista de posiciones de trabajo en formato JSON o un mensaje de error en caso de fallo.
 * 
 * @param {object} req - El objeto de solicitud HTTP.
 * @param {object} res - El objeto de respuesta HTTP.
 */
export const getListWorkPosition = async (req, res) => {
    try {
        // Obtener una conexión a la base de datos.
        const pool = await getConnection();

        // Ejecutar la consulta para obtener la lista de posiciones de trabajo.
        const resultListWorkPosition = await pool.request().query(workPosition_queries.getListWorkPosition);

        // Responder con los datos obtenidos en formato JSON.
        res.json(resultListWorkPosition.recordset);
    } catch (error) {
        // En caso de error, responder con un mensaje de error y el mensaje de error original.
        res.status(500).send("Error al obtener Cargo " + error.message);
        console.log(error);
    }
}


export const getWorkPositionByEmployeesType = async ( req, res ) => {
    const idEmployeeType = req.params.idEmployeeType;

    try {
        const pool = await getConnection();
        const result = await pool.request().input('idEmployeeType', sql.Int, idEmployeeType)
        .query(workPosition_queries.getWorkPositionByEmployee);

        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error al obtner lista de puestos'
        });
    }
}

export const getWorkPositionById = async (req, res) => {
    const idWorkposition = req.params.idWorkposition;

    try {
        const pool = await getConnection();
        const result = await pool.request().input('idWorkposition', sql.Int, idWorkposition)
            .query(workPosition_queries.getWorkPositionById);

            res.json(result.recordset);
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener lista de puestos de trabajo' });
    }
}