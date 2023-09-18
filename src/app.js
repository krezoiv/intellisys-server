import express from "express";
import config from './config'
const app = express();

import employeesRoute from './routes/employees/employees.routes';

//settings
app.set('port', config.port);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(employeesRoute);
export default app;