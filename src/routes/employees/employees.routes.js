import { Router } from "express";
import { creatNewEmployee, getEmployees, getEmployeesById } from "../../controllers/employees/employees.controllers";
import {authenticateToken} from "../../middlewares/authenticateToken"
// Crea un enrutador Express
const router = Router();

/**
 * @route GET /api/employees/employees
 * @description Ruta para obtener la lista de empleados.
 */
router.get('/employees', authenticateToken, getEmployees);

/**
 * @route POST /api/employees/employees
 * @description Ruta para crear un nuevo empleado.
 */
router.post('/employees', creatNewEmployee);

/**
 * @route POST /api/employees/employeesById
 * @description Ruta para obtener un empleado por su ID.
 */
router.post('/employeesById', getEmployeesById);

export default router;
