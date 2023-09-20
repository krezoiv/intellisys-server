const jwt = require('jsonwebtoken');
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env


/**
 * Middleware de validación de token JWT.
 * Verifica si se proporciona un token JWT válido en el encabezado de la solicitud.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {function} next - Función para pasar la solicitud al siguiente middleware.
 */
export const validateJWT = (req, res, next) => {
  // Obtener el token del encabezado de la solicitud
  const token = req.header('jwt');

  // Comprobar si se proporcionó un token
  if (!token) {
    return res.status(401).json({ msg: 'No se ha proporcionado token' });
  }

  try {
    // Verificar y decodificar el token utilizando la clave secreta
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Asignar el usuario decodificado a la solicitud para su posterior uso
    req.usuario = decodedToken.usuario;
    
    // Continuar con la solicitud
    next();
  } catch (error) {
    // Manejar errores de token no válido
    return res.status(401).json({ msg: 'Token no válido' });
  }
};

  