import { Router } from "express";
import { addDlpAssignment } from "../../controllers/employees/dlpassignment.controllers";

const router = Router();

router.post('/dlpAssignment', addDlpAssignment)

export default router;