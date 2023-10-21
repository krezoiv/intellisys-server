import { Router } from "express";
import { createRole } from "../../controllers/employees/role.controllers";


const router = Router();


router.post('/roles', createRole);

export default router;