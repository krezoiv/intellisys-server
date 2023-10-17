import { getConnection, sql } from "../../database"; 
import { employeesType_queries } from "../../database/querys/employeesTypeQuerys";

export const getListEmployeeType = async (req, res) => {
    try {
        const pool = await getConnection();
        const resultDepartments = await pool.request().query(employeesType_queries.getListEmployeeType);
        res.json(resultDepartments.recordset);
    } catch (error) {
        res.status(500).send("Error al obtener Departamentos " + error.message);
        console.log(error)
    }
}