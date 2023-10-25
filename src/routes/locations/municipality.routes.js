import { Router } from "express";
import { getListMunicipality, getMunicipalitiesByIdDepartment, getMunicipalityById } from "../../controllers/locations/municipality.controllers";


const router = Router();



router.get('/municipalities', getListMunicipality);
router.get('/municipality/:idMunicipality', getMunicipalityById);
router.get('/municipalities/:idDepartment', getMunicipalitiesByIdDepartment);

export default router;