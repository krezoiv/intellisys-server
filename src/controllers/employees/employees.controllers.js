import { getConnection, sql, employees_queries } from "../../database";
import EmployeeModel from "../../models/employees.model";
import EmployeesFieldMappng from "../../mapping/employees/employeesMapping"


export const getEmployees = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(employees_queries.getEmployees);
    res.json(result.recordset);
  } catch (error) {
    res.status(500), res.send(error.message);
  }
};

/**
 * controlador que crear un nuevo empleado, usa procedimiento alacenado 
 */
export const creatNewEmployee = async (req, res) => {
   
  //mandaa llamar al clase modelo EmployyeModel que serviran para el request body
  const employeeModel = new EmployeeModel(req.body);
  try {
    const pool = await getConnection();
    const request = pool.request();
    // manda a llmar la clasee Mapping donde se encuetra el tipado de datos de los empleados
    const employeesMapping = EmployeesFieldMappng.getMappings();

    //se declara la variable fieldname para hacer un recorrido del mapping
    for(const fieldName in employeesMapping){
      //el recorrido rellana los campos que se selicitan
      request.input(fieldName, employeesMapping[fieldName], employeeModel[fieldName]);
    }

    //el query para insertar los datos a la base de datos , es lllamado el SP desde la clase employeesQuery
    await request.query(employees_queries.addNewEmployee);
    
    res.json(employeeModel);

  } catch (error) {
    res.status(500);
    res.send(error.message);
    console.log(error);
  }
};



export const getEmployeesById = async (req, res) => {
  try {
    const { codigo } = req.body;

    const pool = await getConnection();
    const result = await pool
      .request()
      .input("codigo", sql.VarChar, codigo)
      .query(employees_queries.getEmployeeById +  codigo);
    console.log(result);
    res.json(result.recordset);
  } catch (error) {
    res.status(500), res.send(error.message);
    console.log(error);
  }
};
