import express from "express";
import config from './config'
import cors from "cors"; // Agrega esta línea
const app = express();

import employeesRoute from './routes/employees/employees.routes';
import usersRoute from './routes/users/users.routes';
import authRoute from './routes/users/auth.routes'

//settings
app.set('port', config.port);

//middlewares
app.use(cors()); // Agrega esta línea para habilitar CORS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(employeesRoute);
app.use(usersRoute);
app.use(authRoute);
export default app;