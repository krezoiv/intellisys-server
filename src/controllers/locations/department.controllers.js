import { getConnection } from "../../database"
import { department_queries } from "../../database/querys/locationsQuerys";

export const getListDepartments = async (req, res) => {
    try {
        const pool = await getConnection();
        const resultDepartments = await pool.request().query(department_queries.getListDepartments);
        res.json(resultDepartments.recordset);
    } catch (error) {
        res.status(500).send("Error al obtener Departamentos " + error.message);
        console.log(error)
    }
}