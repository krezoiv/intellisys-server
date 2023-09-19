
import { response } from 'express';
import { getConnection, users_queries } from '../../database';
import UsersMapping from "../../mapping/usersMapping";
const usersMapping = UsersMapping.getMappings();
const bcrypt = require ('bcryptjs');
/*
export const login = async (req, res)=>{


    try {

        
        res.json({
            ok: true,
            msg: 'hola mundo'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error Inesperado, hable con el administrador'
        })
    }
}*/


export const login = async (req, res) => {
    
    try {
        // Obtiene los datos del usuario (nombre de usuario y contraseña) desde la solicitud
        const { usuario, password } = req.body;
    
        // Obtiene una conexión a la base de datos
        const pool = await getConnection();
    
        // Realiza una consulta SQL para obtener el hash de la contraseña almacenada en la base de datos
        const resultLogin = await pool
          .request()
          .input('usuario', usuario)
          .query('SELECT password FROM usuario WHERE usuario = @usuario');
    
        // Verifica si se encontró un usuario válido en la consulta
        if (resultLogin.recordset && resultLogin.recordset.length > 0) {
          // Obtiene el hash de la contraseña almacenada en la base de datos
          const hashedPasswordFromDB = resultLogin.recordset[0].password;
    
          // Compara la contraseña proporcionada con el hash almacenado en la base de datos
          if (bcrypt.compareSync(password, hashedPasswordFromDB)) {
            // La contraseña es válida, puedes generar un token JWT aquí si lo deseas
    
            // Responde con un mensaje de inicio de sesión exitoso y los datos del usuario
            res.json({ message: 'Inicio de sesión exitoso', usuario: usuario });
          } else {
            // Responde con un código de estado 401 (No autorizado) si las credenciales son incorrectas
            res.status(401).json({ error: 'Credenciales incorrectas' });
          }
        } else {
          // Responde con un código de estado 401 (No autorizado) si las credenciales son incorrectas
          res.status(401).json({ error: 'Credenciales incorrectas' });
        }
      } catch (error) {
        // Maneja cualquier error que ocurra durante el proceso de inicio de sesión
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error en el inicio de sesión' });
      }
  };