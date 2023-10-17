import { Router } from "express";
import { getListMunicipality, getMunicipalitiesByIdDepartment } from "../../controllers/locations/municipality.controllers";


const router = Router();



router.get('/municipalities', getListMunicipality);
router.get('/municipalities/:idDepartment', getMunicipalitiesByIdDepartment);

export default router;