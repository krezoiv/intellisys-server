import { getConnection, sql, employees_queries } from "../../database";
import EmployeeModel from "../../models/employees.model";
import EmployeesFieldMapping from "../../mapping/employeesMapping";

/**
 * @function getEmployees
 * @description Obtiene la lista de empleados desde la base de datos y responde con la lista en formato JSON.
 */
export const getEmployees = async (req, res) => {
  try {
    //* Obtiene una conexión del pool de conexiones a la base de datos
    const pool = await getConnection();
    //* Ejecuta una consulta SQL para obtener la lista de empleados
    const result = await pool.request().query(employees_queries.getEmployees);
    //* Responde con la lista de empleados en formato JSON
    res.json(result.recordset);
  } catch (error) {
    //* Maneja los errores y responde con un código de estado 500 y el mensaje de error
    res.status(500).send("Error al obtener empleados: " + error.message);
  }
};

/**
 ** controlador que crear un nuevo empleado, usa procedimiento alacenado
 */
export const creatNewEmployee = async (req, res) => {
  //*mandaa llamar al clase modelo EmployyeModel que serviran para el request body
  const employeeModel = new EmployeeModel(req.body);
  try {
    const pool = await getConnection();
    const request = pool.request();
    //* manda a llmar la clasee Mapping donde se encuetra el tipado de datos de los empleados
    const employeesMapping = EmployeesFieldMapping.getMappings();

    //*se declara la variable fieldname para hacer un recorrido del mapping
    for (const fieldName in employeesMapping) {
      //* el recorrido rellana los campos que se selicitan
      request.input(
        fieldName,
        employeesMapping[fieldName],
        employeeModel[fieldName]
      );
    }

    //* el query para insertar los datos a la base de datos , es lllamado el SP desde la clase employeesQuery
    await request.query(employees_queries.addNewEmployee);

    res.json(employeeModel);
  } catch (error) {
    res.status(500);
    res.send(error.message);
    console.log(error);
  }
};

/**
 * @function getEmployeesById
 * @description Obtiene un empleado por su código desde la base de datos y responde con los detalles del empleado en formato JSON.
 * @param {Object} req - Objeto de solicitud HTTP que debe contener el código del empleado en el cuerpo (req.body).
 * @param {Object} res - Objeto de respuesta HTTP.
 */
export const getEmployeesById = async (req, res) => {
  try {
    //* Obtén el código del empleado directamente del cuerpo de la solicitud (req.body)
    const { codigo } = req.body;

    //* Obtiene los mapeos de campos SQL para la consulta
    const employeesMapping = EmployeesFieldMapping.getMappings();

    //* Obtiene una conexión del pool de conexiones a la base de datos
    const pool = await getConnection();

    //* Ejecuta la consulta SQL con el código del empleado como parámetro
    const result = await pool
      .request()
      .input("codigo", employeesMapping.codigo, codigo)
      .query(employees_queries.getEmployeeById);

    //* Verifica si la consulta SQL tuvo éxito y si se encontraron resultados
    if (result.recordset.length > 0) {
      //* Responde con los detalles del empleado en formato JSON
      res.json(result.recordset);
    } else {
      //* Si no se encontró ningún empleado con el código dado, responde con un código de estado 404
      res.status(404).send("Empleado no encontrado");
    }
  } catch (error) {
    //* Maneja errores, registra el error en la consola y responde con un código de estado 500 y el mensaje de error
    console.error("Error al obtener empleado por código:", error);
    res.status(500).send("Error al obtener empleado por código: " + error.message);
  }
};
