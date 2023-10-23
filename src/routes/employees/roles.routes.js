import { Router } from "express";
import { createRole, getRoles } from "../../controllers/employees/role.controllers";


const router = Router();

router.get('/roles', getRoles);
router.post('/roles', createRole);

export default router;