
class EmployeeModel {
  
    constructor({
      codigo,
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      fechaAlta,
      fechaBaja,
      idSede,
      idTipoEmpleado,
      idStatus,
      idCargo,
    }) {
      this.codigo = codigo;
      this.primerNombre = primerNombre;
      this.segundoNombre = segundoNombre;
      this.primerApellido = primerApellido;
      this.segundoApellido = segundoApellido;
      this.fechaAlta = fechaAlta;
      this.fechaBaja = fechaBaja;
      this.idSede = idSede;
      this.idTipoEmpleado = idTipoEmpleado;
      this.idStatus = idStatus;
      this.idCargo = idCargo;
    }
  }
  
  export default EmployeeModel;
  