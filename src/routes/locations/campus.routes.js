import { Router } from "express";
import { geAllCampus, getCampusByEmployee } from "../../controllers/locations/campus.controllers";

const router = Router();

/**
 * Rutas de las sedes
 */

// Ruta GET para obtener una lista de las sedes
router.get('/campus', geAllCampus)
router.post('/employeesByCodeCampus', getCampusByEmployee)

// Exportar el enrutador para su uso en otras partes de la aplicación
export default router;
