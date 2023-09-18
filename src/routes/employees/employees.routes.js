import { Router } from "express";
import { creatNewEmployee, getEmployees, getEmployeesById} from "../../controllers/employees/employees.controllers";

const router = Router();

router.get('/employees', getEmployees);
router.post('/employees', creatNewEmployee);
router.post('/employeesById', getEmployeesById);
//router.delete('/employees', getEmployees);
//router.put('/employees', getEmployees);


export default router;