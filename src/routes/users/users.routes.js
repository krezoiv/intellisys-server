import { Router } from "express";
import { getUsers, newUser } from "../../controllers/users/users.controllres";

const router = Router();

router.get('/users', getUsers);
router.post('/users', newUser);
//router.post('/singin', singin);


export default router;