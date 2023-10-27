import { Router } from 'express';
import { createRoute } from '../../controllers/locations/routes.controllers';


const router = Router();

router.post('/route', createRoute);

export default router;