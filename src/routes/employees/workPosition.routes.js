import { Router } from 'express';
import { getListWorkPosition } from '../../controllers/employees/workPosition.controllers';

// Crear una instancia del enrutador Express
const router = Router();

/**
 * Rutas de Posiciones de Trabajo
 */

// Ruta GET para obtener una lista de posiciones de trabajo
router.get('/workPosition', getListWorkPosition);

// Exportar el enrutador para su uso en otras partes de la aplicación
export default router;
