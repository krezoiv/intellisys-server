

class UsuariosModel {
    constructor({
      idUser,
      userName,
      password,
      idRole,
      idStatus,
      idEmployee,
    }) {
      // Asigna las propiedades directamente desde los argumentos usando desestructuración
      Object.assign(this, {
        idUser,
        userName,
        password,
        idRole,
        idStatus,
        idEmployee
      });
    }
  }
  
  export default UsuariosModel;