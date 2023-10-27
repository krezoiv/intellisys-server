import { getConnection } from "../../database";
import RoutesModel from "../../models/routes.model";
import RoutesFieldsMappings from '../../mapping/routesMapping'
import { routes_queries } from "../../database/querys/routesQuery";


export const createRoute = async (req, res) => {
     // Capitaliza la primera letra de cada palabra en los campos del objeto req.body
  const capitalizedBody = {};
  for (const key in req.body) {
    if (typeof req.body[key] === 'string') {
      capitalizedBody[key] = req.body[key].replace(/\b\w/g, (match) => match.toUpperCase());
    } else {
      capitalizedBody[key] = req.body[key];
    }
  }
  const routeModel = new RoutesModel(capitalizedBody);
  
    try {
      const pool = await getConnection();
      const request = pool.request();
  
      const routesMapping = RoutesFieldsMappings.getMappings();
      for (const fieldsRoutes in routesMapping) {
        request.input(fieldsRoutes, routesMapping[fieldsRoutes], routeModel[fieldsRoutes]);
      }
  
      const result = await request.query(routes_queries.createNewRoute);
  
      if (result && result.recordset && result.recordset[0] && result.recordset[0].Message) {
        const successMessage = result.recordset[0].Message;
        res.json({
          success: true,
          message: successMessage,
        });
       
      } else {
        res.status(400).json({
          success: false,
          error: 'No se pudo crear la ruta',
        });
      }
    } catch (error) {
      if (error.originalError) {
        const errorMessage = error.originalError.message || 'Error al crear ruta';
        console.error('Error al crear ruta: ', error);
        res.status(500).json({
          success: false,
          error: errorMessage,
        });
      }
    }
  };