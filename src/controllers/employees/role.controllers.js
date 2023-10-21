import { getConnection } from "../../database";
import { req, res } from "express";
import RoleModel from "../../models/role.model";
import RolesFieldsMappings from "../../mapping/roleMapping";
import { roles_queries } from "../../database/querys/rolesQuerys";
import sql from "mssql";

export const createRole = async (req, res) => {
  const roleModel = new RoleModel(req.body);

  try {
    const pool = await getConnection();
    const request = pool.request();

    const rolesMapping = RolesFieldsMappings.getMappings();

    for (const fieldsRole in rolesMapping) {
      request.input(fieldsRole, rolesMapping[fieldsRole], roleModel[fieldsRole]);
    }

    // Ejecutar el procedimiento almacenado y capturar el resultado
    const result = await request.query(roles_queries.createNewRole);

    // Verificar si el procedimiento almacenado generó un mensaje de éxito
    if (result && result.recordset && result.recordset[0] && result.recordset[0].Message) {
      const successMessage = result.recordset[0].Message;
      res.json({ message: successMessage }); // Enviar el mensaje de éxito al cliente
    } else {
      res.json(roleModel); // Enviar el objeto roleModel si no hay mensaje de éxito
    }

  } catch (error) {
    if (error.originalError) {
      // Si hay un error original, muestra el mensaje personalizado
      const errorMessage = error.originalError.message || "Error al crear el rol";
      console.error("Error al crear el rol:", error);

      res.status(500).json({ error: errorMessage });
    } else {
      // Muestra un mensaje de error genérico en caso de otro tipo de error
      const errorMessage = error.message || "Error al crear el rol";
      console.error("Error al crear el rol:", error);
      res.status(500).json({ error: errorMessage });
    }
  }
};
