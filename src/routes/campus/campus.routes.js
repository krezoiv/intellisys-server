import { Router } from "express";
import { geAllCampus } from "../../controllers/campus/campus.controllers";

const router = Router();


router.get('/campus', geAllCampus)

export default router;