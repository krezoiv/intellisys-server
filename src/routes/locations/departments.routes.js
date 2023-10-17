import { Router } from "express";
import { getListDepartments } from "../../controllers/locations/department.controllers";


const router = Router();

router.get('/departments', getListDepartments);



export default router;