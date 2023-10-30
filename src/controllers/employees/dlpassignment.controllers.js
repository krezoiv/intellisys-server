import { getConnection, sql } from "../../database";
import { dlpAssignment_queries } from "../../database/querys/dlpAssignmentQuerys";


export const addDlpAssignment = async(req, res) => {
    const { idRoute, idEmployee } = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();
        const result = await request
        .input("idRoute", sql.Int, idRoute)
        .input("idEmployee", sql.Int, idEmployee)
        .query(dlpAssignment_queries.dlpAssignment);

        if (result && result.recordset && result.recordset[0] && result.recordset[0].Message) {
            const successMessage = result.recordset[0].Message;
            res.json({ message: successMessage }); // Enviar el mensaje de éxito al cliente
          } else {
            res.json(result); // Enviar el objeto roleModel si no hay mensaje de éxito
          }

    } catch (error) {
        if (error.originalError) {
            // Si hay un error original, muestra el mensaje personalizado
            const errorMessage = error.originalError.message || "Error al asignar ruta";
            console.error("Error al asignar ruta:", error);
      
            res.status(500).json({ error: errorMessage });
          } else {
            // Muestra un mensaje de error genérico en caso de otro tipo de error
            const errorMessage = error.message || "Error al asignar ruta";
            console.error("Error al asignar ruta:", error);
            res.status(500).json({ 
              error: errorMessage
             });
          }
    }
}