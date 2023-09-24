import { Router } from "express";
import { login, renewToken } from '../../controllers/users/auth.controllers';
import { validateJWT } from "../../middlewares/validateJWT";

const router = Router();

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para renovar el token
router.get('/login/renewtoken', validateJWT, renewToken);

export default router;
