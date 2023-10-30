import express from "express";
import config from './config'
import cors from "cors"; // Agrega esta línea
const app = express();

import employeesRoute from './routes/employees/employees.routes';
import workPositionRoute from './routes/employees/workPosition.routes';
import employeeType from './routes/employees/employeesType.routes';
import dlpAssignment from './routes/employees/dlpAssignment.routes'
import roleRoute from './routes/employees/roles.routes'
import usersRoute from './routes/users/users.routes';
import campusRoute from './routes/locations/campus.routes';
import routesRoute from './routes/locations/routes.routes';
import authRoute from './routes/users/auth.routes';
import municipalityRoute from './routes/locations/municipality.routes';
import departmentRoute from './routes/locations/departments.routes';


//settings
app.set('port', config.port);

//middlewares
app.use(cors()); // Agrega esta línea para habilitar CORS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(employeesRoute);
app.use(workPositionRoute);
app.use(employeeType);
app.use(dlpAssignment);
app.use(roleRoute);
app.use(usersRoute);
app.use(authRoute);
app.use(campusRoute);
app.use(routesRoute);
app.use(municipalityRoute);
app.use(departmentRoute);


export default app;