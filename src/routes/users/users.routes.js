import { Router } from "express";
import { getUsers, singin } from "../../controllers/users/users.controllres";

const router = Router();

router.get('/users', getUsers);
//router.post('/singin', singin);


export default router;