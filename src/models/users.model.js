

class UsuariosModel {
    constructor({
      idUser,
      userName,
      password,
      idRole,
      idStatus,
      idEmployee,
      userCode,
    }) {
      // Asigna las propiedades directamente desde los argumentos usando desestructuración
      Object.assign(this, {
        idUser,
        userName,
        password,
        idRole,
        idStatus,
        idEmployee,
        userCode,
      });
    }
  }
  
  export default UsuariosModel;