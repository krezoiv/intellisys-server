import sql from 'mssql';

class EmployeesFieldMappings {
  constructor() {
    this.fieldMappings = {
      codigo: sql.VarChar,
      primerNombre: sql.VarChar,
      segundoNombre: sql.VarChar,
      primerApellido: sql.VarChar,
      segundoApellido: sql.VarChar,
      fechaAlta: sql.Date,
      fechaBaja: sql.Date,
      idSede: sql.VarChar,
      idTipoEmpleado: sql.Int,
      idStatus: sql.Int,
      idCargo: sql.Int,
    };
  }

  getMappings() {
    return this.fieldMappings;
  }
}

export default new EmployeesFieldMappings();