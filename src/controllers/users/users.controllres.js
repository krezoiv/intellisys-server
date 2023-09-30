import { response } from "express";
import { getConnection, users_queries } from "../../database";
import UsersFieldMapping from "../../mapping/usersMapping";
import UsuariosModel from "../../models/users.model";
import { generateJWT } from "../../helpers/jwt";
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
};



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
    res.json({recordset:result.recordset, usuario: req.usuario});
  } catch (error) {
    // Maneja errores específicos de SQL Server y responde con un código de estado 500 y el mensaje de error
    console.error("Error al obtener usuarios:", error);
    res.status(500).send("Error al obtener usuarios: " + error.message);
  }
};


