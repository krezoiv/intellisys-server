import { Router } from 'express';
import { getListEmployeeType } from '../../controllers/employees/employeeType.controllers';

const router = Router();


router.get('/employeeType', getListEmployeeType);



export default router; 