import { response } from "express";
import { getConnection, users_queries } from "../../database";
import UsersFieldMapping from "../../mapping/usersMapping";
import UsuariosModel from "../../models/users.model";
import { generateJWT } from "../../helpers/jwt";
require("dotenv").config(); // Carga las variables de entorno desde el archivo .env

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); //se requiere el servicio de jsonwebtoken

/**
 * Crea un nuevo usuario en la base de datos.
 * @param req - La solicitud HTTP que contiene los datos del nuevo usuario.
 * @param res - La respuesta HTTP que se enviará al cliente.
 */
/*export const newUser = async (req, res) => {
  // Crear una instancia del modelo de usuario con los datos de la solicitud.
  const userModel = new UsuariosModel(req.body);

  try {
    // Generar un hash de la contraseña del usuario con bcrypt.
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(userModel.password, saltRounds);

    // Actualizar el campo 'password' del modelo de usuario con el hash.
    userModel.password = hashedPassword;

    // Establecer una conexión con la base de datos.
    const pool = await getConnection();
    const request = pool.request();

    // Obtener el mapeo de campos de usuario.
    const usersMapping = UsersFieldMapping.getMappings();

    // Agregar cada campo de usuario como parámetro en la solicitud SQL.
    for (const fieldsUser in usersMapping) {
      request.input(fieldsUser, usersMapping[fieldsUser], userModel[fieldsUser] );
    }

    // Ejecutar la consulta SQL para crear el nuevo usuario en la base de datos.
    const result = await request.query(users_queries.newUser);

    if (result && result.recordset && result.recordset[0] && result.recordset[0].Message) {
      // Si la consulta SQL devuelve un mensaje de éxito, responder con ese mensaje.
      const successMessage = result.recordset[0].Message;
      res.json({
        message: successMessage,
      });
    } else {
      // Si no hay un mensaje de éxito, responder con los datos del usuario creado.
      res.json(userModel);
    }
  } catch (error) {
    if (error.originalError) {
      // Manejar errores con un mensaje personalizado si está disponible.
      const errorMessage =
        error.originalError.message || "Error al crear el usuario";
      console.error("Error al crear el usuario:", error);
      res.status(500).json({ error: errorMessage });
    } else {
      // Manejar errores con un mensaje genérico si no hay un mensaje personalizado.
      const errorMessage = error.message || "Error al crear el usuario";
      console.error("Error al crear el usuario:", error);
      res.status(500).json({
        error: errorMessage,
      });
    }
  }
};
*/


export const newUser = async (req, res) => {
  
  const userModel = new UsuariosModel(req.body);
  const idEmployee = req.body.idEmployee; // Asumiendo que tienes un campo idEmployee en la solicitud

  try {
    // Obtener firstName y firstLastName de la base de datos
    const pool = await getConnection();
    const request = pool.request();
    request.input('idEmployee', idEmployee);
    const employeeQuery = 'SELECT firstName, firstLastName FROM employee WHERE idEmployee = @idEmployee';
    const employeeResult = await request.query(employeeQuery);

    if (employeeResult.recordset.length > 0) {
      const firstName = employeeResult.recordset[0].firstName;
      const firstLastName = employeeResult.recordset[0].firstLastName;

      // Construir el valor de userName en mayúsculas
      const userName = `${firstName.charAt(0)}${firstLastName}`.toUpperCase();

      // Actualizar el campo 'userName' en el objeto userModel
      userModel.userName = userName;

      // Generar un hash de la contraseña del usuario con bcrypt.
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(userModel.password, saltRounds);

      // Actualizar el campo 'password' del modelo de usuario con el hash.
      userModel.password = hashedPassword;

      // Continuar con el proceso de inserción del usuario en la base de datos
      const usersMapping = UsersFieldMapping.getMappings();
      const pool = await getConnection();
      const request = pool.request();

      for (const fieldsUser in usersMapping) {
        request.input(fieldsUser, usersMapping[fieldsUser], userModel[fieldsUser]);
      }

      const result = await request.query(users_queries.newUser);

      if (result && result.recordset && result.recordset[0] && result.recordset[0].Message) {
        const successMessage = result.recordset[0].Message;
        res.json({
          message: successMessage,
        });
      } else {
        res.json(userModel);
      }
    } else {
      res.status(404).json({ error: 'Empleado no encontrado' });
    }
  } catch (error) {
    // Manejo de errores
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: error.message || "Error al crear el usuario" });
  }
};


/**
 * @function getUsers
 * @description Obtiene la lista de usuarios desde la base de datos y responde con la lista en formato JSON.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
export const getUsers = async (req, res) => {
  
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * from users');

    res.json(result.recordset);

  } catch (error) {
    res.status(500).send("Error al obtener lista de usuarios " + error.message);
    console.error("Error al obtener lista de usuarios " + error.message);
  }
};
