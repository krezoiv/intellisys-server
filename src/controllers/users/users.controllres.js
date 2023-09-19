import { response } from "express";
import { getConnection, users_queries } from "../../database";
import UsersFieldMapping from "../../mapping/usersMapping";
import UsuariosModel from "../../models/users.model";
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const bcrypt = require ('bcryptjs');
const jwt = require("jsonwebtoken"); //se requiere el servicio de jsonwebtoken


export const newUser = async (req, res = response) => {
  try {
    const usuarioModel = new UsuariosModel(req.body);

    // Genera un hash seguro para la contraseña
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(usuarioModel.password, saltRounds);

    // Actualiza la contraseña en el modelo con el hash
    usuarioModel.password = hashedPassword;

    const pool = await getConnection();
    const request = pool.request();

    const usuarioMapping = UsersFieldMapping.getMappings();

    for (const fieldName in usuarioMapping) {
      // El recorrido rellena los campos que se solicitan
      request.input(
        fieldName,
        usuarioMapping[fieldName],
        usuarioModel[fieldName]
      );
    }

    await request.query(users_queries.newUser);
    res.json(usuarioModel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Error Inesperado, hable con el administrador' });
  }
}


/**
 * @function getUsers
 * @description Obtiene la lista de usuarios desde la base de datos y responde con la lista en formato JSON.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
export const getUsers = async (req, res) => {
  try {
    // Obtiene una conexión del pool de conexiones a la base de datos
    const pool = await getConnection();

    // Ejecuta una consulta SQL para obtener la lista de usuarios
    const result = await pool.request().query(users_queries.getUsers);

    // Responde con la lista de usuarios en formato JSON
    res.json(result.recordset);
  } catch (error) {
    // Maneja errores específicos de SQL Server y responde con un código de estado 500 y el mensaje de error
    console.error("Error al obtener usuarios:", error);
    res.status(500).send("Error al obtener usuarios: " + error.message);
  }
};


/*/**
 * @function singin
 * @description Maneja el inicio de sesión de usuarios utilizando un nombre de usuario y contraseña.
 * @param {Object} req - Objeto de solicitud de Express que contiene los datos del usuario.
 * @param {Object} res - Objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 */
/*
export const singin = async (req, res) => {
  
  try {
    // Obtiene los datos del usuario (nombre de usuario y contraseña) desde la solicitud
    const { usuario, password } = req.body;

    // Obtiene una conexión a la base de datos
    const pool = await getConnection();

    // Realiza una consulta SQL para verificar las credenciales del usuario
    const resultLogin = await pool
      .request()
      .input("usuario", usersMapping.usuario, usuario)
      .input("password", usersMapping.usuario, password)
      .query(users_queries.userLogin);

    // Verifica si se encontró un usuario válido en la consulta
    if (resultLogin.recordset && resultLogin.recordset.length > 0) {
      // Obtiene los datos del usuario autenticado
      const user = resultLogin.recordset[0];
      // Genera un token JWT con los datos del usuario (puedes personalizar los datos incluidos)
      const token = generateJWT(bue)

      // Responde con un mensaje de inicio de sesión exitoso y los datos del usuario
      res.json({ message: "Inicio de sesión exitoso", token, usuario: user });
    } else {
      // Responde con un código de estado 401 (No autorizado) si las credenciales son incorrectas
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  } catch (error) {
    // Maneja cualquier error que ocurra durante el proceso de inicio de sesión
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ error: "Error en el inicio de sesión" });
  }
};

*/

