import { getConnection, sql} from "../../database";
import EmployeeModel from "../../models/employees.model";
import EmployeesFieldMapping from "../../mapping/employeesMapping";
import { employees_queries } from "../../database/querys/employeesQuerys";

/**
 * @function getEmployees
 * @description Obtiene la lista de empleados desde la base de datos y responde con la lista en formato JSON.
 */
export const getEmployees = async (req, res) => {
  try {
    // Obtiene una conexión del pool de conexiones a la base de datos
    const pool = await getConnection();
    // Ejecuta una consulta SQL para obtener la lista de empleados
    const result = await pool.request().query(employees_queries.getEmployeesDetails);
    // Responde con la lista de empleados en formato JSON
    res.json(result.recordset);
  } catch (error) {
    // Maneja los errores y responde con un código de estado 500 y el mensaje de error
    res.status(500).send("Error al obtener empleados: " + error.message);
  }
};

/**
 * Controlador para crear un nuevo empleado.
 * @param {Object} req - El objeto de solicitud HTTP que contiene los datos del empleado.
 * @param {Object} res - El objeto de respuesta HTTP para enviar una respuesta al cliente.
 */
export const creatNewEmployee = async (req, res) => {
  // Crear una instancia de la clase modelo EmployeeModel utilizando los datos del cuerpo de la solicitud.
  const employeeModel = new EmployeeModel(req.body);
  try {
    // Establecer una conexión a la base de datos.
    const pool = await getConnection();
    const request = pool.request();

    // Obtener un mapeo de campos de empleado.
    const employeesMapping = EmployeesFieldMapping.getMappings();

    // Recorrer el mapeo y asignar los valores de los campos del modelo de empleado a la solicitud de base de datos.
    for (const fieldName in employeesMapping) {
      request.input(
        fieldName,
        employeesMapping[fieldName],
        employeeModel[fieldName]
      );
    }

    // Ejecutar una consulta para agregar un nuevo empleado a la base de datos utilizando un Stored Procedure (SP) llamado employees_queries.addNewEmployee.
    await request.query(employees_queries.addNewEmployee);

    // Responder a la solicitud HTTP con los datos del empleado creado.
    res.json(employeeModel);
  } catch (error) {
    // En caso de error, configurar el estado de respuesta en 500 (Error interno del servidor),
    // enviar un mensaje de error al cliente y registrar el error en la consola.
    
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
    // Obtén el código del empleado directamente del cuerpo de la solicitud (req.body)
    const { code } = req.body;
    // Obtiene los mapeos de campos SQL para la consulta
    const employeesMapping = EmployeesFieldMapping.getMappings();
    // Obtiene una conexión del pool de conexiones a la base de datos
    const pool = await getConnection();
    // Ejecuta la consulta SQL con el código del empleado como parámetro
    const result = await pool
      .request()
      .input("code", employeesMapping.code, code)
      .query(employees_queries.getEmployeeById);
    // Verifica si la consulta SQL tuvo éxito y si se encontraron resultados
    if (result.recordset.length > 0) {
      // Responde con los detalles del empleado en formato JSON
      res.json(result.recordset);
    } else {
      // Si no se encontró ningún empleado con el código dado, responde con un código de estado 404
      res.status(404).send("Empleado no encontrado");
    }
  } catch (error) {
    // Maneja errores, registra el error en la consola y responde con un código de estado 500 y el mensaje de error
    console.error("Error al obtener empleado por código:", error);
    res.status(500).send("Error al obtener empleado por código: " + error.message);
  }
};


/**
 * Actualiza un empleado en la base de datos.
 *
 * @param {Object} req - Objeto de solicitud HTTP que contiene los datos del empleado a actualizar.
 * @param {Object} res - Objeto de respuesta HTTP utilizado para enviar una respuesta al cliente.
 */
export const updateEmployee = async (req, res) => {
  try {
    // Obtener el código del empleado de la solicitud
    const { code } = req.body;

    // Establecer una conexión a la base de datos utilizando la función getConnection
    const pool = await getConnection();
    const request = pool.request();

    // Crear una instancia de EmployeeModel para mapear los campos de la solicitud
    const employeeModel = new EmployeeModel(req.body);

    // Obtener el mapeo de campos a parámetros desde EmployeesFieldMapping
    const employeesMapping = EmployeesFieldMapping.getMappings();

    // Recorrer y mapear los campos de la solicitud a los parámetros del procedimiento almacenado
    for (const fieldName in employeesMapping) {
      // Verificar si el campo existe en el modelo antes de mapearlo
      if (employeeModel.hasOwnProperty(fieldName)) {
        request.input(
          fieldName,
          employeesMapping[fieldName],
          employeeModel[fieldName]
        );
      }
    }

    // Ejecutar el procedimiento almacenado sp_UpdateEmployee utilizando la consulta definida en employees_queries
    await request.query(employees_queries.updateEmployee);

    // Enviar una respuesta exitosa al cliente
    res.status(200).json({ message: 'Empleado actualizado exitosamente' });
  } catch (error) {
    // Capturar y manejar cualquier error que ocurra durante la ejecución
    console.error('Error al actualizar empleado:', error);

    // Enviar una respuesta de error al cliente
    res.status(500).json({ message: 'Error al actualizar empleado' });
  }
};


