

class UsuariosModel {
    constructor({
      idUsuario,
      codigo,
      usuario,
      password,
      idRol,
      idStatus
    }) {
      // Asigna las propiedades directamente desde los argumentos usando desestructuración
      Object.assign(this, {
        idUsuario,
        codigo,
        usuario,
        password,
        idRol,
        idStatus
      });
    }
  }
  
  export default UsuariosModel;