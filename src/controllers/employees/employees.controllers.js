import { getConnection, sql} from "../../database";
import EmployeeModel from "../../models/employees.model";
import EmployeesFieldMapping from "../../mapping/employeesMapping";
import { employees_queries } from "../../database/querys/employeesQuerys";
import employeesMapping from "../../mapping/employeesMapping";

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



export const creatNewEmployee = async (req, res) => {
  // Capitaliza la primera letra de cada palabra en los campos del objeto req.body
  const capitalizedBody = {};
  for (const key in req.body) {
    if (typeof req.body[key] === 'string') {
      capitalizedBody[key] = req.body[key].replace(/\b\w/g, (match) => match.toUpperCase());
    } else {
      capitalizedBody[key] = req.body[key];
    }
  }

  const employeeModel = new EmployeeModel(capitalizedBody);

  try {
    const pool = await getConnection();
    const request = pool.request();

    const employeeMapping = EmployeesFieldMapping.getMappings();

    // Genera un nombre de usuario utilizando las primeras letras del nombre y apellidos
    const username = (
      (employeeModel.firstName ? employeeModel.firstName[0] : "") +
      (employeeModel.secondName ? employeeModel.secondName[0] : "") +
      (employeeModel.firstLastName ? employeeModel.firstLastName[0] : "") +
      (employeeModel.secondLastName ? employeeModel.secondLastName[0] : "")
    ).toUpperCase();

    // Genera un número aleatorio del 0 al 9
    const randomNumber = Math.floor(Math.random() * 10); // Corregido: 10 en lugar de 100

    // Combina el nombre de usuario y el número aleatorio
    const code = `${username}${randomNumber}`;

    // Agrega el campo 'code' al mapeo de campos y asigna el valor generado
    employeeMapping['code'] = sql.VarChar(15);
    request.input('code', employeeMapping['code'], code);

    // Agrega los otros campos al mapeo de campos
    for (const fieldEmployee in employeeMapping) {
      if (fieldEmployee !== 'code') {
        request.input(fieldEmployee, employeeMapping[fieldEmployee], employeeModel[fieldEmployee]);
      }
    }

    const result = await request.query(employees_queries.addNewEmployee);

    if (result && result.recordset && result.recordset[0] && result.recordset[0].Message) {
      const successMessage = result.recordset[0].Message;
      res.json({ message: successMessage }); // Enviar el mensaje de éxito al cliente
    } else {
      res.json(employeeModel); // Enviar el objeto roleModel si no hay mensaje de éxito
    }

  } catch (error) {
    if (error.originalError) {
      // Si hay un error original, muestra el mensaje personalizado
      const errorMessage = error.originalError.message || "Error al crear el empleado";
      console.error("Error al crear el empleado:", error);

      res.status(500).json({ error: errorMessage });
    } else {
      // Muestra un mensaje de error genérico en caso de otro tipo de error
      const errorMessage = error.message || "Error al crear el empleado";
      console.error("Error al crear el empleado:", error);
      res.status(500).json({
        error: errorMessage
      });
    }
  }
}

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
 * @function searchEmployee
 * @description Busca empleados en la base de datos que coincidan con un término de búsqueda y responde con los resultados en formato JSON.
 * @param {Object} req - Objeto de solicitud HTTP que debe contener el término de búsqueda en el cuerpo (req.body).
 * @param {Object} res - Objeto de respuesta HTTP.
 */

export const searchEmployee = async (req, res) => {
  try {
    // Obtén el término de búsqueda directamente del cuerpo de la solicitud (req.body)
    const { searchTerm } = req.body;
    // Obtiene una conexión del pool de conexiones a la base de datos
    const pool = await getConnection();
    // Ejecuta la consulta SQL con el término de búsqueda como parámetro
    const result = await pool
      .request()
      .input("searchTerm", sql.NVarChar(100), searchTerm)
      .query(employees_queries.searchEmployee);
    // Verifica si la consulta SQL tuvo éxito y si se encontraron resultados
    res.json(result.recordset);
  } catch (error) {
    if (error.originalError){
      const errorMessage = error.originalError.message || "Error en la búsqueda de empleado";
      console.error(error);
      res.status(500).json({ error : errorMessage });
    } else {
      const errorMessage = error.message || "Error en la búsqueda de empleado";
      console.error("Error en la búsqueda", error);
      res.status(500).json({
        error: errorMessage
      })
    }
  }
};


export const updateEmployee = async (req, res) => {
  const idEmployee = req.params.idEmployee;
  const updatedEmployeeData = req.body;

  try {
    const pool = await getConnection();
    const request = pool.request();

    const employeeMapping = EmployeesFieldMapping.getMappings();

    // Añade el campo idEmployee para identificar el empleado que se actualizará
    request.input("idEmployee", idEmployee);

    for (const fieldEmployee in updatedEmployeeData) {
      if (employeeMapping[fieldEmployee]) {
        request.input(
          fieldEmployee,
          employeeMapping[fieldEmployee],
          updatedEmployeeData[fieldEmployee]
        );
      }
    }

    const result = await request.query(employees_queries.updateEmployee);

    if (
      result &&
      result.recordset &&
      result.recordset[0] &&
      result.recordset[0].Message
    ) {
      const successMessage = result.recordset[0].Message;
      res.json({ message: successMessage }); // Enviar el mensaje de éxito al cliente
    } else {
      res.json({
        message:
          "La información del empleado ha sido actualizada en la base de datos.",
      });
    }
  } catch (error) {
    if (error.originalError) {
      const errorMessage =
        error.originalError.message || "Error al actualizar el empleado";
      console.error("Error al actualizar el empleado:", error);
      res.status(500).json({ error: errorMessage });
    } else {
      const errorMessage = error.message || "Error al actualizar el empleado";
      console.error("Error al actualizar el empleado:", error);
      res.status(500).json({ error: errorMessage });
    }
  }
};

/**
 * @function deleteEmployee
 * @description Elimina un empleado de la base de datos utilizando el procedimiento almacenado.
 */
export const deleteEmployee = async (req, res) => {
  try {
    // Obtiene el ID del empleado a eliminar del cuerpo de la solicitud (req.body)
    const { idEmployee } = req.params;
    
    // Obtiene una conexión del pool de conexiones a la base de datos
    const pool = await getConnection();

    // Ejecuta el procedimiento almacenado para eliminar el empleado
    const result = await pool
      .request()
      .input("idEmployee", sql.Int, idEmployee)
      .query(employees_queries.deleteEmployee);

      if (result && result.recordset && result.recordset[0] && result.recordset[0].Message) {
        const successMessage = result.recordset[0].Message;
        res.json({ message: successMessage }); // Enviar el mensaje de éxito al cliente
      } else {
        res.json("Error al eliminar el empleado:"); // Enviar el objeto roleModel si no hay mensaje de éxito
      }
  } catch (error) {
    // Maneja errores, registra el error en la consola y responde con un código de estado 500 y el mensaje de error
    console.error("Error al eliminar el empleado:", error);
    res.status(500).json({ error: "Error al eliminar el empleado: " + error.message });
  }
};


export const deactivateEmployee = async (req, res ) => {
  try {
    // Obtén el ID del empleado a desactivar desde la solicitud (req.params)
    const { idEmployee } = req.params;

    // Obtiene una conexión del pool de conexiones a la base de datos
    const pool = await getConnection();

    // Ejecuta el procedimiento almacenado para desactivar al empleado
    const result = await pool
      .request()
      .input('idEmployee', sql.Int, idEmployee)
      .query(employees_queries.deactivateEmployee);

    if (result && result.recordset && result.recordset[0] && result.recordset[0].Message) {
      const successMessage = result.recordset[0].Message;
      res.json({ message: successMessage }); // Enviar el mensaje de éxito al cliente
    } else {
      res.json('Error al desactivar al empleado.'); // Enviar un mensaje de error si no hay mensaje de éxito
    }
  } catch (error) {
    // Manejar errores, registrar el error en la consola y responder con un código de estado 500 y el mensaje de error
    console.error('Error al desactivar al empleado:', error);
    res.status(500).json({ error: 'Error al desactivar al empleado: ' + error.message });
  }
};

export const searchEmployeeRoutes = async (req, res) => {
  try {
    const {code} = req.body;
    const pool = await  getConnection();
    const result = await pool.request()
      .input("code", sql.NVarChar(15), code).query(employees_queries.searchEmployecampusRouts);

      res.json(result.recordset);
  } catch (error) {
    if (error.originalError){
      const errorMessage = error.originalError.message || "Error en la búsqueda de rutas de la sede";
      console.error(error);
      res.status(500).json({ error : errorMessage });
    } else {
      const errorMessage = error.message || "Error en la búsqueda de rutas de la sede";
      console.error("Error en la búsqueda", error);
      res.status(500).json({
        error: errorMessage
      })
    }
  }
}