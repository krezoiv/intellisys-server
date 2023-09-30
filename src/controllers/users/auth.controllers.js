import { token } from "morgan";
import { getConnection, users_queries } from "../../database";
import UsersMapping from "../../mapping/usersMapping";
require("dotenv").config(); // Carga las variables de entorno desde el archivo .env

const usersMapping = UsersMapping.getMappings();
const bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken"; // Importa la librería jsonwebtoken
import { response } from "express";
import { generateJWT } from "../../helpers/jwt";

/**
 * @function login
 * @description Maneja el inicio de sesión de usuarios utilizando un nombre de usuario y contraseña.
 * @param {Object} req - Objeto de solicitud de Express que contiene los datos del usuario (usuario y contraseña).
 * @param {Object} res - Objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 */
export const login = async (req, res) => {
  try {
    // Obtiene los datos del usuario (nombre de usuario y contraseña) desde la solicitud
    const { userName, password } = req.body;

    // Obtiene una conexión a la base de datos
    const pool = await getConnection();

    // Realiza una consulta SQL para obtener el hash de la contraseña almacenada en la base de datos
    const resultLogin = await pool
      .request()
      .input("userName", userName)
      .query("SELECT password FROM users WHERE userName = @userName");

    // Verifica si se encontró un usuario válido en la consulta
    if (resultLogin.recordset && resultLogin.recordset.length > 0) {
      // Obtiene el hash de la contraseña almacenada en la base de datos
      const hashedPasswordFromDB = resultLogin.recordset[0].password;

      // Compara la contraseña proporcionada con el hash almacenado en la base de datos
      if (bcrypt.compareSync(password, hashedPasswordFromDB)) {
        // La contraseña es válida

        // Genera un token JWT con los datos del usuario (puedes personalizar los datos incluidos)
        const token = jwt.sign({ userName: userName }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });

        // Responde con el token JWT y un mensaje de inicio de sesión exitoso
        res.json({
          userName,
          message: "Inicio de sesión exitoso",
          token: token,
        });
      } else {
        // Responde con un código de estado 401 (No autorizado)
        res.status(401).json({ error: "Credenciales incorrectas" + token });
      }
    } else {
      // No se encontró un usuario con el nombre de usuario proporcionado

      // Responde con un código de estado 401 (No autorizado)
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  } catch (error) {
    // Maneja cualquier error que ocurra durante el proceso de inicio de sesión

    console.error("Error en el inicio de sesión:", error);

    // Responde con un código de estado 500 (Error interno del servidor)
    res.status(500).json({ error: "Error en el inicio de sesión" });
  }
};

/**
 * Renueva un token de autenticación para un usuario autenticado.
 * @param {Request} req - Objeto de solicitud HTTP que debe contener la información del usuario autenticado en `req.usuario`.
 * @param {Response} res - Objeto de respuesta HTTP que se utilizará para enviar la respuesta JSON con el nuevo token.
 * @returns {Promise<void>} - Una promesa que resuelve cuando se completa la renovación del token.
 */
export const renewToken = async (req, res = response) => {
  try {
    // Obtener el usuario autenticado desde la solicitud (req.usuario)
    const usuario = req.usuario;

    // Generar un nuevo token JWT para el usuario
    const token = await generateJWT(usuario);

    // Enviar una respuesta JSON con el nuevo token
    res.json({
      ok: true,
      token
    });
  } catch (error) {
    // Manejar errores de generación de token
    console.error('Error al renovar el token:', error);

    // Responder con un estado de error y un mensaje de error
    res.status(500).json({
      ok: false,
      message: 'Error al renovar el token'
    });
  }
};
