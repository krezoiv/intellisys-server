
// Importa la biblioteca 'jsonwebtoken' para trabajar con tokens JWT
const jwt = require('jsonwebtoken');

// Carga las variables de entorno desde el archivo .env
require('dotenv').config();

/**
 * @function generateJWT
 * @description Genera un token JWT (JSON Web Token) con la información del usuario proporcionada.
 * @param {Object} usuario - Los datos del usuario que se incluirán en el token JWT.
 * @returns {Promise<string>} Una promesa que resuelve en el token JWT generado.
 * @throws {string} Un mensaje de error si no se puede generar el JWT.
 */
export const generateJWT = (usuario) => {
  return new Promise((resolve, reject) => {
    // Crea un objeto 'payload' que contiene la información del usuario a incluir en el token
    const payload = {
      usuario,
      // Puedes agregar más información del usuario aquí si es necesario
    };

    // Genera el token JWT con el 'payload', la clave secreta y un tiempo de expiración de 1 hora
    jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '1h',
    }, (err, token) => {
      if (err) {
        // Si ocurre un error al generar el token, rechaza la promesa con un mensaje de error
        console.error(err);
        reject('No se pudo generar el JWT');
      } else {
        // Si se genera el token con éxito, resuelve la promesa con el token generado
        resolve(token);
      }
    });
  });
};
