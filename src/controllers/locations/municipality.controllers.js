import { getConnection, sql } from "../../database";

export const getListMunicipality = async (req, res) =>{
    try {
        const pool = await getConnection();
        const resultMunicipality = await pool.request().query('SELECT * FROM municipality');

        res.json(resultMunicipality.recordset);
    } catch (error) {
        res.status(500).send("Error al obtener Sedes " + error.message);
        console.log(error)
    }
}

export const getMunicipalitiesByIdDepartment = async (req, res) => {

    const idDepartment = req.params.idDepartment;
    try {
        const pool = await getConnection();
        const result = await pool.request().input('idDepartment', sql.Int, idDepartment)
        .query('SELECT * FROM municipality  WHERE idDepartment = @idDepartment');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error al obtner lista de Municipios'});
    }
}