import { getConnection, sql } from "../../database";
import { municipalities_queries } from "../../database/querys/locationsQuerys";

/**
 * Controlador getListMunicipality
 * 
 * Este controlador obtiene una lista de municipios desde la base de datos y responde con los datos obtenidos en formato JSON.
 * 
 * @param {object} req - El objeto de solicitud HTTP.
 * @param {object} res - El objeto de respuesta HTTP.
 */
export const getListMunicipality = async (req, res) => {
    try {
        const pool = await getConnection();
        const resultMunicipality = await pool.request().query(municipalities_queries.getListMunicipalities);

        res.json(resultMunicipality.recordset);
    } catch (error) {
        res.status(500).send("Error al obtener Sedes " + error.message);
        console.error(error);
    }
}

/**
 * Controlador getMunicipalitiesByIdDepartment
 * 
 * Este controlador obtiene una lista de municipios por ID de departamento desde la base de datos y responde con los datos obtenidos en formato JSON.
 * 
 * @param {object} req - El objeto de solicitud HTTP que puede contener parámetros, como 'idDepartment'.
 * @param {object} res - El objeto de respuesta HTTP.
 */
export const getMunicipalitiesByIdDepartment = async (req, res) => {
    const idDepartment = req.params.idDepartment;
    try {
        const pool = await getConnection();
        const result = await pool.request().input('idDepartment', sql.Int, idDepartment)
            .query(municipalities_queries.getMunicipalitiesListByDepartments);
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener lista de Municipios' });
    }
}
