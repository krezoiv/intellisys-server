import { Router } from "express";
import { getUsers, newUser } from "../../controllers/users/users.controllres";
import { validateJWT } from "../../middlewares/validateJWT";

const router = Router();

router.get('/users', validateJWT, getUsers);
router.post('/users', newUser);
//router.post('/singin', singin);


export default router;