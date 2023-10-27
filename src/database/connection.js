// Importar los módulos necesarios
import sql from "mssql";
import dotenv from "dotenv";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();
 
// Configuración de la conexión a la base de datos
const dbSettings = {
  user: "sa",// Nombre de usuario de la base de datos
  password: "krezoiv@1984", // Contraseña de la base de datos
  //server: "192.168.1.63",     // Servidor de la base de datos
  server: "192.168.1.71",     // Servidor de la base de datos
  database: "IntelliSys_DB", 
  port: 1433,// Nombre de la base de datos
  options: {
    encrypt: true,                  // Habilitar el cifrado de la conexión
    trustServerCertificate: true,    // Confiar en el certificado del servidor (seguro para desarrollo)
  },
};

// Función para obtener una conexión a la base de datos
export async function getConnection() {
  try {
    // Establecer una conexión a la base de datos utilizando la configuración proporcionada
    const pool = await sql.connect(dbSettings);
    return pool; // Devolver el objeto de la piscina de conexiones
  } catch (error) {
    console.log(error); // Registrar errores en la consola en caso de problemas de conexión
  }
}

// Exportar el módulo de sql para su uso en otras partes de la aplicación
export { sql };
